export default function getSlope(
  x1: number,
  x2: number,
  y1: number,
  y2: number
) {
  return (y2 - y1) / (x2 - x1);
}
