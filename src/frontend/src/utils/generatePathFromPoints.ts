export default function generatePathFromPoints(
  points: number[][],
  displayType: LandmarkDisplayType
) {
  if (displayType === "no_lines") return [];
  let paths: number[][][] = [];

  const POINTS_PER_VERTEBRAE = 4;
  switch (displayType) {
    case "all_lines":
      for (let i = 0; i < points.length; i += POINTS_PER_VERTEBRAE) {
        if (i >= points.length) break; // for safety
        paths.push([
          points[i],
          points[i + 1],
          points[i + 3],
          points[i + 2],
          points[i],
        ]);
      }
      break;
    case "top_lines":
      for (let i = 0; i < points.length; i += POINTS_PER_VERTEBRAE) {
        if (i >= points.length) break; // for safety
        paths.push([points[i], points[i + 1]]);
      }
      break;
    case "bottom_lines":
      for (let i = 0; i < points.length; i += POINTS_PER_VERTEBRAE) {
        if (i >= points.length) break;
        paths.push([points[i + 2], points[i + 3]]);
      }
      break;
    default:
      return [];
  }
  return paths;
}
