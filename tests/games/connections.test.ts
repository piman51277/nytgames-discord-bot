import { ConnectionsGame } from "./../../src/games/ConnectionsGame";

//puzzle # is a time-sensitive check, so we have to figure out the expected time
const CONN_START_TIME = "2023-06-12T00:00:00.000Z";
const ONE_DAY = 1000 * 60 * 60 * 24;
const startDate = Date.parse(CONN_START_TIME);
const currentDate = Date.now();
const elapsed = currentDate - startDate;
const puzzleNumber = Math.floor(elapsed / ONE_DAY) + 1;

/* Test Data */

const irrelevantInput1 = "Puzzle-o-matic 1000";
const irrelevantInput2 = "Connections Puzzle #1000";
const irrelevantInput3 = "Man I hate connections";

const incompleteInput = `Connections \nPuzzle #${puzzleNumber}`;

const incorrectDay1 = `Connections \nPuzzle #${
  puzzleNumber + 2
}\n🟨🟨🟨🟨\n🟩🟩🟩🟩\n🟦🟦🟦🟦\n🟪🟪🟪🟪`;
const incorrectDay2 = `Connections \nPuzzle #${
  puzzleNumber - 2
}\n🟨🟨🟨🟨\n🟩🟩🟩🟩\n🟦🟦🟦🟦\n🟪🟪🟪🟪`;

const puzzleHeader = `Connections \nPuzzle #${puzzleNumber}`;
const perfectWin = puzzleHeader + "\n🟨🟨🟨🟨\n🟩🟩🟩🟩\n🟦🟦🟦🟦\n🟪🟪🟪🟪";
const loss4guesses =
  puzzleHeader + "\n🟨🟨🟨🟨\n🟩🟩🟩🟩\n🟦🟦🟦🟪\n🟦🟦🟦🟪\n🟦🟦🟦🟪\n🟦🟦🟦🟪";
const win3guesses =
  puzzleHeader +
  "\n🟨🟨🟨🟨\n🟩🟩🟩🟩\n🟦🟦🟦🟪\n🟦🟦🟦🟪\n🟦🟦🟦🟪\n🟦🟦🟦🟦\n🟪🟪🟪🟪";

const incompleteGrid1 = puzzleHeader + "\n🟨🟨🟨🟨\n🟩🟩🟩🟩\n🟪🟪🟪🟪🟪";
const incompleteGrid2 = puzzleHeader + "\n🟨🟨🟨🟨\n🟩🟩🟩🟩\n🟦🟦🟦🟦\n🟪🟪🟪";
const incompleteGrid3 =
  puzzleHeader +
  "\n🟨🟨🟨🟨\n🟩🟩🟩🟩\n🟦🟦🟦🟪\n🟦🟦🟦🟪\n🟦🟦🟪\n🟦🟦🟦🟪\n🟪🟪🟪🟪";
const incompleteGrid4 =
  puzzleHeader +
  "\n🟨🟨🟨🟨\n🟩🟩🟩🟩\n🟦🟦🟦🟪\n🟦🟦🟦🟪\n🟦🟦🟦🟦🟪\n🟦🟦🟦🟪\n🟪🟪🟪🟪";

const repeatAfterComplete =
  puzzleHeader + "\n🟨🟨🟨🟨\n🟩🟩🟩🟩\n🟦🟦🟨🟦\n🟪🟪🟪🟪";
const continueAfterEnd =
  puzzleHeader +
  "\n🟨🟨🟨🟨\n🟩🟩🟩🟩\n🟦🟦🟦🟪\n🟦🟦🟦🟪\n🟦🟦🟦🟪\n🟦🟦🟦🟪\n🟪🟪🟪🟪";

const fiveMistakes =
  puzzleHeader +
  "\n🟨🟨🟨🟨\n🟩🟩🟩🟩\n🟦🟦🟦🟪\n🟦🟦🟦🟪\n🟦🟦🟦🟪\n🟦🟦🟦🟪\n🟦🟦🟦🟪";

const incompleteGame =
  puzzleHeader + "\n🟨🟨🟨🟨\n🟩🟩🟩🟩\n🟦🟦🟦🟪\n🟦🟦🟦🟪\n🟦🟦🟦🟪\n🟦🟦🟦🟦";

/* Test Cases */

//ConnectionGame.messageIsType
test("ConnectionsGame.messageIsType irrelevant input 1", () => {
  expect(ConnectionsGame.messageIsType(irrelevantInput1)).toBe(false);
});

test("ConnectionsGame.messageIsType irrelevant input 2", () => {
  expect(ConnectionsGame.messageIsType(irrelevantInput2)).toBe(false);
});

test("ConnectionsGame.messageIsType irrelevant input 3", () => {
  expect(ConnectionsGame.messageIsType(irrelevantInput3)).toBe(false);
});

test("ConnectionsGame.messageIsType incomplete input", () => {
  expect(ConnectionsGame.messageIsType(incompleteInput)).toBe(false);
});

test("ConnectionsGame.messageIsType correct 1", () => {
  expect(ConnectionsGame.messageIsType(perfectWin)).toBe(true);
});

test("ConnectionsGame.messageIsType correct 2", () => {
  expect(ConnectionsGame.messageIsType(loss4guesses)).toBe(true);
});

test("ConnectionsGame.messageIsType correct 3", () => {
  expect(ConnectionsGame.messageIsType(win3guesses)).toBe(true);
});

test("ConnectionsGame.messageIsType incorrect day 1", () => {
  expect(ConnectionsGame.messageIsType(incorrectDay1)).toBe(true);
});

test("ConnectionsGame.messageIsType incorrect day 2", () => {
  expect(ConnectionsGame.messageIsType(incorrectDay2)).toBe(true);
});

test("ConnectionsGame.messageIsType incomplete grid 1", () => {
  expect(ConnectionsGame.messageIsType(incompleteGrid1)).toBe(false);
});

test("ConnectionsGame.messageIsType incomplete grid 2", () => {
  expect(ConnectionsGame.messageIsType(incompleteGrid2)).toBe(false);
});

test("ConnectionsGame.messageIsType incomplete grid 3", () => {
  expect(ConnectionsGame.messageIsType(incompleteGrid3)).toBe(true);
});

test("ConnectionsGame.messageIsType incomplete grid 4", () => {
  expect(ConnectionsGame.messageIsType(incompleteGrid4)).toBe(true);
});

test("ConnectionsGame.messageIsType repeat after complete", () => {
  expect(ConnectionsGame.messageIsType(repeatAfterComplete)).toBe(true);
});

test("ConnectionsGame.messageIsType continue after end", () => {
  expect(ConnectionsGame.messageIsType(continueAfterEnd)).toBe(true);
});

test("ConnectionsGame.messageIsType five mistakes", () => {
  expect(ConnectionsGame.messageIsType(fiveMistakes)).toBe(true);
});

test("ConnectionsGame.messageIsType incomplete game", () => {
  expect(ConnectionsGame.messageIsType(incompleteGame)).toBe(true);
});

//ConnectionsGame.messageIsValid

test("ConnectionsGame.messageIsValid perfect win", () => {
  expect(ConnectionsGame.messageIsValid(perfectWin)).toEqual({ valid: true });
});

test("ConnectionsGame.messageIsValid loss 4 guesses", () => {
  expect(ConnectionsGame.messageIsValid(loss4guesses)).toEqual({ valid: true });
});

test("ConnectionsGame.messageIsValid win 3 guesses", () => {
  expect(ConnectionsGame.messageIsValid(win3guesses)).toEqual({ valid: true });
});

test("ConnectionsGame.messageIsValid irrelevant input 1", () => {
  expect(ConnectionsGame.messageIsValid(irrelevantInput1)).toEqual({
    valid: false,
    reason: "Message does not match pattern",
  });
});

test("ConnectionsGame.messageIsValid irrelevant input 2", () => {
  expect(ConnectionsGame.messageIsValid(irrelevantInput2)).toEqual({
    valid: false,
    reason: "Message does not match pattern",
  });
});

test("ConnectionsGame.messageIsValid irrelevant input 3", () => {
  expect(ConnectionsGame.messageIsValid(irrelevantInput3)).toEqual({
    valid: false,
    reason: "Message does not match pattern",
  });
});

test("ConnectionsGame.messageIsValid incorrect day 1", () => {
  expect(ConnectionsGame.messageIsValid(incorrectDay1)).toEqual({
    valid: false,
    reason: "Results for future or past puzzles are not allowed",
  });
});

test("ConnectionsGame.messageIsValid incorrect day 2", () => {
  expect(ConnectionsGame.messageIsValid(incorrectDay2)).toEqual({
    valid: false,
    reason: "Results for future or past puzzles are not allowed",
  });
});

test("ConnectionsGame.messageIsValid incomplete grid 1", () => {
  expect(ConnectionsGame.messageIsValid(incompleteGrid1)).toEqual({
    valid: false,
    reason: "Message does not match pattern",
  });
});

test("ConnectionsGame.messageIsValid incomplete grid 2", () => {
  expect(ConnectionsGame.messageIsValid(incompleteGrid2)).toEqual({
    valid: false,
    reason: "Message does not match pattern",
  });
});

test("ConnectionsGame.messageIsValid incomplete grid 3", () => {
  expect(ConnectionsGame.messageIsValid(incompleteGrid3)).toEqual({
    valid: false,
    reason: "Incomplete grid",
  });
});

test("ConnectionsGame.messageIsValid incomplete grid 4", () => {
  expect(ConnectionsGame.messageIsValid(incompleteGrid4)).toEqual({
    valid: false,
    reason: "Incomplete grid",
  });
});

test("ConnectionsGame.messageIsValid repeat after complete", () => {
  expect(ConnectionsGame.messageIsValid(repeatAfterComplete)).toEqual({
    valid: false,
    reason: "Color used after completion",
  });
});

test("ConnectionsGame.messageIsValid continue after end", () => {
  expect(ConnectionsGame.messageIsValid(continueAfterEnd)).toEqual({
    valid: false,
    reason: "Game continued after loss",
  });
});

test("ConnectionsGame.messageIsValid five mistakes", () => {
  expect(ConnectionsGame.messageIsValid(fiveMistakes)).toEqual({
    valid: false,
    reason: "Game continued after loss",
  });
});

test("ConnectionsGame.messageIsValid incomplete game", () => {
  expect(ConnectionsGame.messageIsValid(incompleteGame)).toEqual({
    valid: false,
    reason: "Incomplete puzzle",
  });
});

//ConnectionsGame.getScore
test("ConnectionsGame.getScore perfect win", () => {
  expect(ConnectionsGame.getScore(perfectWin)).toEqual(12);
});

test("ConnectionsGame.getScore loss 4 guesses", () => {
  expect(ConnectionsGame.getScore(loss4guesses)).toEqual(4);
});

test("ConnectionsGame.getScore win 3 guesses", () => {
  expect(ConnectionsGame.getScore(win3guesses)).toEqual(9);
});

//ConnectionsGame.getGameMetadata
test("ConnectionsGame.getGameMetadata perfect win", () => {
  expect(ConnectionsGame.getGameMetadata(perfectWin)).toEqual({
    instanceID: `connections-${puzzleNumber}`,
  });
});

test("ConnectionsGame.getGameMetadata loss 4 guesses", () => {
  expect(ConnectionsGame.getGameMetadata(loss4guesses)).toEqual({
    instanceID: `connections-${puzzleNumber}`,
  });
});

test("ConnectionsGame.getGameMetadata win 3 guesses", () => {
  expect(ConnectionsGame.getGameMetadata(win3guesses)).toEqual({
    instanceID: `connections-${puzzleNumber}`,
  });
});
