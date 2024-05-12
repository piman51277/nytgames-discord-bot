//Metadata for individual instances of games
export type GameMetadata = {
  instanceID: string; //A unique identifier for each day's puzzle
};

//result object for erification
export type GameVerifyResult = {
  valid: boolean;
  reason?: string;
};

/**
 * Base class for all Games.
 */
export class GameBase {
  //internal ID to be used for this type of game
  public static gameTypeID: string;

  //whether higher scores for this game are better than lower ones
  public static scoreSortDescending: boolean;

  //front-facing name for the game
  public static gameName: string;

  //front-facing game decription
  public static gameDescription: string;

  //front-facing explanation of scoring rules
  public static gameScoringDescription: string;

  /**
   * Identifies if a given string contains a share message for this particular game
   * @param message the discord message
   * @returns true if string contains share message, false othrwise
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static messageIsType(message: string): boolean {
    return false;
  }

  /**
   * Verifies if a given message contains a valid state for this game
   *  @param message the discord message
   * @returns true if message is valid, false othrwise
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static messageIsValid(message: string): GameVerifyResult {
    return { valid: false, reason: "" };
  }

  /**
   * Extracts a score value from the message. Meaning of score depends on game type.
   * @param message the discord message
   * @returns -1 if message is invalid, the score otherwise.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getScore(message: string): number {
    return 0;
  }

  /**
   * Extracts metadata about this particular game from the message.
   * @param message the discord message
   * @returns relevant metadata about the game
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getGameMetadata(message: string): GameMetadata {
    return { instanceID: "" };
  }
}
