interface ISelectedFile extends File {
  img: HTMLImageElement;
  src: string;
  width: number;
  height: number;
}

type DrawSettingsType = {
  // Detections
  showDetections: boolean;
  showDetectionLabels: boolean;
  detectionsScale: number;

  // Landmarks
  showLandmarks: boolean;
  landmarkDisplayType: LandmarkDisplayType;
  landmarkSize: number;
  landmarkColor: [string, string];
  lineWidth: number;

  // Cobb Angle
  showCobbAngle: boolean;
};

type LandmarkDisplayType =
  | "no_lines"
  | "top_lines"
  | "bottom_lines"
  | "all_lines";

type ScolioVisAPIResponseType = {
  landmarks: number[];
  detections: DetectionType[];
  angles: AnglesType;
  midpoint_lines: [[number, number], [number, number]][];
  curve_type: "C" | "S";
  // Removed
  normalized_detections: DetectionType[];
  base64_image: string;
};

type AnglesType = {
  [K in "pt" | "mt" | "tl"]: {
    angle: number;
    idxs: [number, number];
  };
};
type DetectionType = {
  class: number;
  confidence: number;
  name: string;
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
};

type PointType = {
  x: number;
  y: number;
};

type LineType = {
  p1: PointType;
  p2: PointType;
};

type CobbAngleLinesType = {
  top: LineType;
  bottom: LineType;
};
// Custom Type for a React functional component with props AND CHILDREN
// Source: https://stackoverflow.com/questions/71788254/react-18-typescript-children-fc/71800185#71800185 solution by ashuvssut
// Import syntax in d.ts files: https://stackoverflow.com/questions/39040108/import-class-in-definition-file-d-ts
type FCC<P = {}> = import("react").FC<import("react").PropsWithChildren<P>>;

// Temporary Segmentation Response Type
interface ISegmentationResponse {
  encoded_img: string;
  filename: string;
  name: string;
}

declare module "pdfjs-dist/build/pdf.worker.entry";
