// Extending to the right
// findY2(image_X_max, mp[0][0], mp[0][1])
export default function getY2(
  new_x2: number,
  x1: number,
  y1: number,
  slope: number
) {
  let y2 = slope * (new_x2 - x1) + y1;
  return y2;
}
