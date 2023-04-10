import getSlope from "./getSlope";
import getY1 from "./getY1";
import getY2 from "./getY2";

export default function createLongLine(
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  imageWidth: number
): [[number, number], [number, number]] {
  let m = getSlope(x1, x2, y1, y2);

  let leftMostPoint: [number, number] = [-10, getY1(-10, x2, y2, m)];
  let rightMostPoint: [number, number] = [
    imageWidth,
    getY2(imageWidth, x1, y1, m),
  ];

  return [leftMostPoint, rightMostPoint];
}
