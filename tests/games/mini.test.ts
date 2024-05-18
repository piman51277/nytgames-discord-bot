import { MiniGame } from "../../src/games/MiniGame";
//There is a date in the link, so we have to compute the current date to
//create a valid test case
const today = new Date();
const dateString = `${today.getFullYear().toString().padStart(4, "0")}-${(
  today.getMonth() + 1
)
  .toString()
  .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

const twoDaysBefore = new Date(Date.now() - 86400000 * 2);
const twoDaysBeforeString = `${twoDaysBefore
  .getFullYear()
  .toString()
  .padStart(4, "0")}-${(twoDaysBefore.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${twoDaysBefore.getDate().toString().padStart(2, "0")}`;
const twoDaysAhead = new Date(Date.now() + 86400000 * 2);
const twoDaysAheadString = `${twoDaysAhead
  .getFullYear()
  .toString()
  .padStart(4, "0")}-${(twoDaysAhead.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${twoDaysAhead.getDate().toString().padStart(2, "0")}`;

const irrelevantInput1 = "Puzzle-o-matic 1000";
const irrelevantInput2 = "Mini #1000";
const irrelevantInput3 = "Man I hate the mini";

const urlHeader = "https://www.nytimes.com/badges/games/mini.html";

const incompleteLink1 = "https://www.nytimes.com/badges/games/mini.html";
const incompleteLink2 = urlHeader + "?d=2024-05-02&t=62";
const incompleteLink3 =
  urlHeader + "?d=2024-05-02&c=c578663ad02512fcd6690293420a0270&smid=url-share";
const incompleteLink4 =
  urlHeader + "?d=2024-05-02&t=62&c=c578663ad02512fcd6690293420a0270";
const incompleteLink5 =
  urlHeader + "?t=62&c=c578663ad02512fcd669029&smid=url-share";

const incorrectDay1 =
  urlHeader +
  "?d=2024-05-02&t=62&c=c578663ad02512fcd6690293420a0270&smid=url-share";
const incorrectDay2 = `${urlHeader}?d=${twoDaysBeforeString}&t=62&c=c578663ad02512fcd6690293420a0270&smid=url-share`;
const incorrectDay3 = `${urlHeader}?d=${twoDaysAheadString}&t=62&c=c578663ad02512fcd6690293420a0270&smid=url-share`;

const invalidTime1 = `${urlHeader}?d=${dateString}&t=0&c=c578663ad02512fcd6690293420a0270&smid=url-share`;
const invalidTime2 = `${urlHeader}?d=${dateString}&t=-1&c=c578663ad02512fcd6690293420a0270&smid=url-share`;

const invalidChecksum = `${urlHeader}?d=${dateString}&t=62&c=c578663ad02512fcd6690293420a0271&smid=url-share`;

//generate a correct checksum to create a correct link
import { createHash } from "crypto";
const cleartext = `d=${dateString}&t=62`;
const hash = createHash("md5").update(cleartext).digest("hex");
const correctLink = `${urlHeader}?d=${dateString}&t=62&c=${hash}&smid=url-share`;

//MiniGame.messageIsType
test("MiniGame.messageIsType irrelevant input 1", () => {
  expect(MiniGame.messageIsType(irrelevantInput1)).toBe(false);
});

test("MiniGame.messageIsType irrelevant input 2", () => {
  expect(MiniGame.messageIsType(irrelevantInput2)).toBe(false);
});

test("MiniGame.messageIsType irrelevant input 3", () => {
  expect(MiniGame.messageIsType(irrelevantInput3)).toBe(false);
});

test("MiniGame.messageIsType incomplete link 1", () => {
  expect(MiniGame.messageIsType(incompleteLink1)).toBe(false);
});

test("MiniGame.messageIsType incomplete link 2", () => {
  expect(MiniGame.messageIsType(incompleteLink2)).toBe(false);
});

test("MiniGame.messageIsType incomplete link 3", () => {
  expect(MiniGame.messageIsType(incompleteLink3)).toBe(false);
});

test("MiniGame.messageIsType incomplete link 4", () => {
  expect(MiniGame.messageIsType(incompleteLink4)).toBe(false);
});

test("MiniGame.messageIsType incomplete link 5", () => {
  expect(MiniGame.messageIsType(incompleteLink5)).toBe(false);
});

test("MiniGame.messageIsType incorrect day 1", () => {
  expect(MiniGame.messageIsType(incorrectDay1)).toBe(true);
});

test("MiniGame.messageIsType incorrect day 2", () => {
  expect(MiniGame.messageIsType(incorrectDay2)).toBe(true);
});

test("MiniGame.messageIsType incorrect day 3", () => {
  expect(MiniGame.messageIsType(incorrectDay3)).toBe(true);
});

test("MiniGame.messageIsType invalid time 1", () => {
  expect(MiniGame.messageIsType(invalidTime1)).toBe(true);
});

test("MiniGame.messageIsType invalid time 2", () => {
  expect(MiniGame.messageIsType(invalidTime2)).toBe(false);
});

test("MiniGame.messageIsType invalid checksum", () => {
  expect(MiniGame.messageIsType(invalidChecksum)).toBe(true);
});

test("MiniGame.messageIsType correct link", () => {
  expect(MiniGame.messageIsType(correctLink)).toBe(true);
});

//MiniGame.messageIsValid
test("MiniGame.messageIsValid irrelevant input 1", () => {
  expect(MiniGame.messageIsValid(irrelevantInput1)).toEqual({
    valid: false,
    reason: "Message does not match pattern",
  });
});

test("MiniGame.messageIsValid irrelevant input 2", () => {
  expect(MiniGame.messageIsValid(irrelevantInput2)).toEqual({
    valid: false,
    reason: "Message does not match pattern",
  });
});

test("MiniGame.messageIsValid irrelevant input 3", () => {
  expect(MiniGame.messageIsValid(irrelevantInput3)).toEqual({
    valid: false,
    reason: "Message does not match pattern",
  });
});

test("MiniGame.messageIsValid incomplete link 1", () => {
  expect(MiniGame.messageIsValid(incompleteLink1)).toEqual({
    valid: false,
    reason: "Message does not match pattern",
  });
});

test("MiniGame.messageIsValid incomplete link 2", () => {
  expect(MiniGame.messageIsValid(incompleteLink2)).toEqual({
    valid: false,
    reason: "Message does not match pattern",
  });
});

test("MiniGame.messageIsValid incomplete link 3", () => {
  expect(MiniGame.messageIsValid(incompleteLink3)).toEqual({
    valid: false,
    reason: "Message does not match pattern",
  });
});

test("MiniGame.messageIsValid incomplete link 4", () => {
  expect(MiniGame.messageIsValid(incompleteLink4)).toEqual({
    valid: false,
    reason: "Message does not match pattern",
  });
});

test("MiniGame.messageIsValid incomplete link 5", () => {
  expect(MiniGame.messageIsValid(incompleteLink5)).toEqual({
    valid: false,
    reason: "Message does not match pattern",
  });
});

test("MiniGame.messageIsValid incorrect day 1", () => {
  expect(MiniGame.messageIsValid(incorrectDay1)).toEqual({
    valid: false,
    reason: "Results for future or past puzzles are not allowed",
  });
});

test("MiniGame.messageIsValid incorrect day 2", () => {
  expect(MiniGame.messageIsValid(incorrectDay2)).toEqual({
    valid: false,
    reason: "Results for future or past puzzles are not allowed",
  });
});

test("MiniGame.messageIsValid incorrect day 3", () => {
  expect(MiniGame.messageIsValid(incorrectDay3)).toEqual({
    valid: false,
    reason: "Results for future or past puzzles are not allowed",
  });
});

test("MiniGame.messageIsValid invalid time 1", () => {
  expect(MiniGame.messageIsValid(invalidTime1)).toEqual({
    valid: false,
    reason: "Invalid time",
  });
});

test("MiniGame.messageIsValid invalid time 2", () => {
  expect(MiniGame.messageIsValid(invalidTime2)).toEqual({
    valid: false,
    reason: "Message does not match pattern",
  });
});

test("MiniGame.messageIsValid invalid checksum", () => {
  expect(MiniGame.messageIsValid(invalidChecksum)).toEqual({
    valid: false,
    reason: "Checksum mismatch",
  });
});

test("MiniGame.messageIsValid correct link", () => {
  expect(MiniGame.messageIsValid(correctLink)).toEqual({
    valid: true,
  });
});

//MiniGame.getScore
test("MiniGame.getScore irrelevant input 1", () => {
  expect(MiniGame.getScore(irrelevantInput1)).toBe(0);
});

test("MiniGame.getScore irrelevant input 2", () => {
  expect(MiniGame.getScore(irrelevantInput2)).toBe(0);
});

test("MiniGame.getScore irrelevant input 3", () => {
  expect(MiniGame.getScore(irrelevantInput3)).toBe(0);
});

test("MiniGame.getScore incomplete link 1", () => {
  expect(MiniGame.getScore(incompleteLink1)).toBe(0);
});

test("MiniGame.getScore incomplete link 2", () => {
  expect(MiniGame.getScore(incompleteLink2)).toBe(0);
});

test("MiniGame.getScore incomplete link 3", () => {
  expect(MiniGame.getScore(incompleteLink3)).toBe(0);
});

test("MiniGame.getScore incomplete link 4", () => {
  expect(MiniGame.getScore(incompleteLink4)).toBe(0);
});

test("MiniGame.getScore incomplete link 5", () => {
  expect(MiniGame.getScore(incompleteLink5)).toBe(0);
});

test("MiniGame.getScore incorrect day 1", () => {
  expect(MiniGame.getScore(incorrectDay1)).toBe(62);
});

test("MiniGame.getScore incorrect day 2", () => {
  expect(MiniGame.getScore(incorrectDay2)).toBe(62);
});

test("MiniGame.getScore incorrect day 3", () => {
  expect(MiniGame.getScore(incorrectDay3)).toBe(62);
});

test("MiniGame.getScore invalid time 1", () => {
  expect(MiniGame.getScore(invalidTime1)).toBe(0);
});

test("MiniGame.getScore invalid time 2", () => {
  expect(MiniGame.getScore(invalidTime2)).toBe(0);
});

test("MiniGame.getScore invalid checksum", () => {
  expect(MiniGame.getScore(invalidChecksum)).toBe(62);
});

test("MiniGame.getScore correct link", () => {
  expect(MiniGame.getScore(correctLink)).toBe(62);
});

//MiniGame.getGameMetadata
test("MiniGame.getGameMetadata correct link", () => {
  expect(MiniGame.getGameMetadata(correctLink)).toEqual({
    instanceID: `mini-${dateString}`,
  });
});

test("MiniGame.getGameMetadata incorrect day 1", () => {
  expect(MiniGame.getGameMetadata(incorrectDay1)).toEqual({
    instanceID: `mini-2024-05-02`,
  });
});

test("MiniGame.getGameMetadata incorrect day 2", () => {
  expect(MiniGame.getGameMetadata(incorrectDay2)).toEqual({
    instanceID: `mini-${twoDaysBeforeString}`,
  });
});

test("MiniGame.getGameMetadata incorrect day 3", () => {
  expect(MiniGame.getGameMetadata(incorrectDay3)).toEqual({
    instanceID: `mini-${twoDaysAheadString}`,
  });
});

test("MiniGame.getGameMetadata invalid checksum", () => {
  expect(MiniGame.getGameMetadata(invalidChecksum)).toEqual({
    instanceID: `mini-${dateString}`,
  });
});

test("MiniGame.getGameMetadata irrelevant input 1", () => {
  expect(MiniGame.getGameMetadata(irrelevantInput1)).toEqual({
    instanceID: "",
  });
});

test("MiniGame.getGameMetadata irrelevant input 2", () => {
  expect(MiniGame.getGameMetadata(irrelevantInput2)).toEqual({
    instanceID: "",
  });
});

test("MiniGame.getGameMetadata irrelevant input 3", () => {
  expect(MiniGame.getGameMetadata(irrelevantInput3)).toEqual({
    instanceID: "",
  });
});
