export const wobblyRadius = {
  sm: "255px 15px 225px 15px / 15px 225px 15px 255px",
  md: "15px 225px 15px 255px / 255px 15px 225px 15px",
  lg: "225px 15px 255px 15px / 15px 255px 15px 225px",
  pill: "255px 15px 225px 15px / 15px 225px 15px 255px",
} as const;

export const colors = {
  paper: "#fdfbf7",
  pencil: "#2d2d2d",
  muted: "#e5e0d8",
  accent: "#ff4d4d",
  bluePen: "#2d5da1",
  postIt: "#fff9c4",
} as const;

export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}
