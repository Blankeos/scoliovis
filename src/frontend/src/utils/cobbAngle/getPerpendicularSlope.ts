export default function getPerpendicularSlope(p1: PointType, p2: PointType) {
  return (p2.x - p1.x) / (p2.y - p1.y);
}
