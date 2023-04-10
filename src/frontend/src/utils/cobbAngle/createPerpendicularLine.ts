import getPerpendicularSlope from "./getPerpendicularSlope";
import getSlope2 from "./getSlope2";
import getY1 from "./getY1";
import getY2 from "./getY2";

type Point = {
  x: number;
  y: number;
};

export default function createPerpendicularLine(
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  perpendicularEndX: number,
  perpendicularStartX: number
) {
  let p1: Point = { x: x1, y: y1 };
  let p2: Point = { x: x2, y: y2 };

  let m = getSlope2(p1, p2);
  let perpendicularStartY = getY1(perpendicularStartX, x2, y2, m);
  let perp_m = -1 * getPerpendicularSlope(p2, p1);

  let perpendicularEndY = getY1(
    perpendicularEndX,
    perpendicularStartX,
    perpendicularStartY,
    perp_m
  );

  let startPoint: [number, number] = [perpendicularEndX, perpendicularEndY];
  let endPoint: [number, number] = [perpendicularStartX, perpendicularStartY];
  return [startPoint, endPoint];
}
