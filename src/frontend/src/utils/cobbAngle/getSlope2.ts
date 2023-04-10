export default function getSlope2(p1: PointType, p2: PointType) {
  return (p2.y - p1.y) / (p2.x - p1.x);
}
