import { GameBase, GameMetadata, GameVerifyResult } from "./GameBase";
import { createHash } from "crypto";

const PATTERN = new RegExp(
  /https:\/\/www\.nytimes\.com\/badges\/games\/mini.html\?d=([\d-]+)&t=(\d+)&c=([a-f0-9]{32})&smid=url-share/
);

//one day in ms
const ONE_DAY = 1000 * 60 * 60 * 24;

/**
 * Helper class for NYT's Mini Crossword game
 * https://www.nytimes.com/crosswords/game/mini
 * @extends GameBase
 */
export class MiniGame extends GameBase {
  gameTypeID = "mini";
  scoreSortDescending = false;
  gameName = "Mini Crossword";
  gameDescription = "https://www.nytimes.com/crosswords/game/mini";
  gameScoringDescription = "Scored based on time to solve. Faster is better.";

  public static messageIsType(message: string): boolean {
    return PATTERN.test(message);
  }

  public static messageIsValid(message: string): GameVerifyResult {
    const matches = PATTERN.exec(message);

    if (!matches) {
      return { valid: false, reason: "Message does not match pattern" };
    }

    //check #1: the puzzle is within +- 24 hours of that puzzle opening
    const date = matches[1];
    const [year, month, day] = date.split("-").map((x) => parseInt(x, 10));
    const puzzleDay = new Date(year, month - 1, day);
    const today = new Date();

    const timeDelta = today.getTime() - puzzleDay.getTime();
    if (Math.abs(timeDelta) > ONE_DAY) {
      return {
        valid: false,
        reason: "Results for future or past puzzles are not allowed",
      };
    }

    //check #2: the time is a valid number
    const time = parseInt(matches[2], 10);
    if (isNaN(time) || time <= 0) {
      return { valid: false, reason: "Invalid time" };
    }

    //check #3: checksum
    const cleartext = `d=${date}&t=${time}`;
    const hash = createHash("md5").update(cleartext).digest("hex");
    if (hash !== matches[3]) {
      return { valid: false, reason: "Checksum mismatch" };
    }

    return { valid: true };
  }

  public static getScore(message: string): number {
    const matches = PATTERN.exec(message);

    if (!matches) {
      return 0;
    }

    const time = parseInt(matches[2], 10);
    return time;
  }

  public static getGameMetadata(message: string): GameMetadata {
    const matches = PATTERN.exec(message);

    if (!matches) {
      return { instanceID: "" };
    }

    return {
      instanceID: `mini-${matches[1]}`,
    };
  }
}
