import { GameBase, GameMetadata, GameVerifyResult } from "./GameBase";

//Matches even if the result is in the middle of the message
const PATTERN = new RegExp(
  /Connections \nPuzzle #(\d+)\n([🟨🟩🟪🟦\n]+)/gu,
  "u"
);

//first day of Connections, Puzzle #1. This is used to check if a
//puzzle result was completed recently
const CONN_START_TIME = "2023-06-12T00:00:00.000Z";

//one day in ms
const ONE_DAY = 1000 * 60 * 60 * 24;

//maximum allowed deviation from the current date.
//(Set to + - 24 hours so I don't want to deal with timezone hijinks)
const TIME_EPSILON = ONE_DAY;

//matches one row
const FOUR_ELEM_PATTERN = new RegExp(/^[🟨🟩🟪🟦]{4}$/u, "u");

/**
 * Helper class for NYT's Connections game
 * https://www.nytimes.com/games/connections
 * @extends GameBase
 */
export class ConnectionsGame extends GameBase {
  gameTypeID = "connections";
  scoreSortDescending = false;
  gameName = "Connections";
  gameDescription = "https://www.nytimes.com/games/connections";
  gameScoringDescription =
    "2 points are awarded for each correct connection. 1 point is awarded for each mistake remaining.";

  public static messageIsType(message: string): boolean {
    return PATTERN.test(message);
  }

  public static messageIsValid(message: string): GameVerifyResult {
    const matches = PATTERN.exec(message);

    if (!matches) {
      return { valid: false, reason: "Message does not match pattern" };
    }

    const puzzleNumber = parseInt(matches[1], 10);
    const grid = matches[2];

    //check #1: the puzzle number is within the expected range
    if (puzzleNumber <= 0) {
      return { valid: false, reason: "Puzzle number is out of range" };
    }

    //check #2: the puzzle result is within +- 24 hours of that puzzle opening
    const startDate = Date.parse(CONN_START_TIME);
    const currentDate = Date.now();

    const elapsed = currentDate - startDate;
    const expectedElapsed = (puzzleNumber - 1) * ONE_DAY;

    if (Math.abs(elapsed - expectedElapsed) > TIME_EPSILON) {
      return {
        valid: false,
        reason: "Results for future or past puzzles are not allowed",
      };
    }

    //check #3: every row has 4 elements.
    const rows = grid
      .trim()
      .split("\n")
      .filter((row) => row.length > 0);

    //this is actually really tricky because Unicode, so we're relying on regex here
    if (!rows.every((row) => FOUR_ELEM_PATTERN.test(row))) {
      return {
        valid: false,
        reason: "Incomplete grid",
      };
    }

    //check #4: completed colors don't appear again
    //check #5: no rows after 4 mistakes are made
    const colorsCompleted: { [key: string]: boolean } = {
      "🟨": false,
      "🟩": false,
      "🟦": false,
      "🟪": false,
    };
    let mistakes = 0;
    let completed = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      for (const char of row) {
        if (colorsCompleted[char]) {
          return {
            valid: false,
            reason: "Color used after completion",
          };
        }
      }

      //are all four chars the same?
      if (new Set(row).size === 1) {
        //this is a hack to work around Unicode and that fact that these chars
        //are surrogate pairs this converts to an array of strings because
        //arrays handle pairs correcly, unlike .charAt() or directly indexing
        const firstChar = [...row][0];
        colorsCompleted[firstChar] = true;
        completed++;
      } else {
        mistakes++;
      }

      if (mistakes == 4 && i < rows.length - 1) {
        return {
          valid: false,
          reason: "Game continued after loss",
        };
      }
    }

    //check #6: game goes to completion (4 mistakes or all correct)
    const gameCompleteWin = completed == 4 && mistakes < 4;
    const gameCompleteLoss = completed < 4 && mistakes == 4;
    if (!(gameCompleteWin || gameCompleteLoss)) {
      return {
        valid: false,
        reason: "Incomplete puzzle",
      };
    }

    return { valid: true };
  }

  public static getScore(message: string): number {
    const matches = PATTERN.exec(message);

    //this should never have to be triggered, as messages should be verified
    //before a score is calculated.
    if (!matches) {
      return 0;
    }

    const grid = matches[2];

    const rows = grid
      .trim()
      .split("\n")
      .filter((row) => row.length > 0);

    let mistakes = 0;
    let completed = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (new Set(row).size === 1) {
        completed++;
      } else {
        mistakes++;
      }
    }

    return 2 * completed + (4 - mistakes);
  }

  public static getGameMetadata(message: string): GameMetadata {
    const matches = PATTERN.exec(message);

    //this should never have to be triggered, as messages should be verified
    //before metadata is gathered
    if (!matches) {
      return { instanceID: "" };
    }

    const puzzleNumber = parseInt(matches[1], 10);
    return { instanceID: `connections-${puzzleNumber}` };
  }
}
