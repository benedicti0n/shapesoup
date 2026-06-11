export interface Point {
  x: number;
  y: number;
}

export function moveTo(x: number, y: number): string {
  return `M ${x} ${y}`;
}

export function lineTo(x: number, y: number): string {
  return `L ${x} ${y}`;
}

export function cubicBezierTo(
  cp1x: number,
  cp1y: number,
  cp2x: number,
  cp2y: number,
  x: number,
  y: number
): string {
  return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
}

export function closePath(): string {
  return "Z";
}

export function smoothClosedPath(points: Point[]): string {
  if (points.length < 3) return "";

  const commands: string[] = [];
  const len = points.length;

  for (let i = 0; i < len; i++) {
    const p0 = points[(i - 1 + len) % len];
    const p1 = points[i];
    const p2 = points[(i + 1) % len];
    const p3 = points[(i + 2) % len];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    if (i === 0) {
      commands.push(moveTo(p1.x, p1.y));
    }
    commands.push(cubicBezierTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y));
  }

  commands.push(closePath());
  return commands.join(" ");
}
