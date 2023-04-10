// Extending to the left
// findY1(0, mp[1][0], mp[1][1])
export default function getY1(
  new_x1: number,
  x2: number,
  y2: number,
  slope: number
) {
  let y1 = -1 * (slope * (x2 - new_x1) - y2);
  return y1;
}
