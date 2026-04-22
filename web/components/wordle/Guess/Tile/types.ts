export const TileStatus = {
  Empty: "empty",
  Absent: "absent",
  Present: "present",
  Correct: "correct",
} as const;

export type TileStatusType = (typeof TileStatus)[keyof typeof TileStatus];
