// export enum TileStatus {
//   NOT_GUESSED,
//   GUESSED_WRONG,
//   GUESSED_RIGHT,
// }
export const TileStatus = { NotGuessed: "NOT_GUESSED", GuessedWrong: "GUESSED_WRONG", GuessedRight: "GUESSED_RIGHT" } as const;

export type TileStatusType = (typeof TileStatus)[keyof typeof TileStatus];
