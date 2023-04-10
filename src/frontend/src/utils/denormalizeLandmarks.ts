import { multiply } from "mathjs";

export default function denormalizeLandmarks(
  landmarks: number[],
  width: number,
  height: number
) {
  //  Denormalize
  const firstHalf = landmarks.slice(0, 68); // this is the normalized x.
  const secondHalf = landmarks.slice(68); // this is the normalized y.

  const denormalizedX = multiply(firstHalf, width) as number[];
  const denormalizedY = multiply(secondHalf, height) as number[];

  //   Turn into Coordinate Array
  const coordinateArray = denormalizedX.map((x, i) => [x, denormalizedY[i]]);

  return coordinateArray;
}
