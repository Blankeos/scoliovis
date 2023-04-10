import denormalizeLandmarks from "@/utils/denormalizeLandmarks";
import generatePathFromPoints from "@/utils/generatePathFromPoints";
import landmarksToCoordinates from "@/utils/landmarksToCoordinates";
import React, {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";
import { useStore } from "store";
import { mergeRefs } from "react-merge-refs";
import { inRange } from "lodash";
import createLongLine from "@/utils/cobbAngle/createLongLine";
import createPerpendicularLine from "@/utils/cobbAngle/createPerpendicularLine";
import getSlope from "@/utils/cobbAngle/getSlope";

interface IImageCanvasProps {}

/* eslint-disable react/display-name */
const ImageCanvas: React.FC<IImageCanvasProps> = (props, ref) => {
  // From Global State
  const scoliovisAPIResponse = useStore((state) => state.scoliovisAPIResponse);
  const selectedFile = useStore((state) => state.selectedFile);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef() as MutableRefObject<CanvasRenderingContext2D>;

  // State for drawing
  const [points, setPoints] = useState<number[][]>();
  const drawSettings = useStore((state) => state.drawSettings);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // null check
    if (!selectedFile) return; // null check

    canvas.width = selectedFile.width;
    canvas.height = selectedFile.height;

    const context = canvas.getContext("2d");
    if (!context) return;
    ctx.current = context;

    initialize();
  }, [scoliovisAPIResponse]);

  // Redraw everytime a setting changes
  useEffect(() => {
    if (drawSettings && selectedFile && ctx && points && scoliovisAPIResponse) {
      drawImage();
      drawLandmarks({
        points: points,
        drawSettings: drawSettings,
      });
      drawDetections({
        detections: scoliovisAPIResponse.detections,
        drawSettings: drawSettings,
      });
      drawAngles({
        angles: scoliovisAPIResponse.angles,
        midpointLines: scoliovisAPIResponse.midpoint_lines,
        drawSettings: drawSettings,
      });
    }
  }, [drawSettings]);

  async function initialize() {
    drawImage();
    if (!selectedFile || !scoliovisAPIResponse) return;
    let points: number[][] = [];
    if (inRange(Math.max(...scoliovisAPIResponse.landmarks), 0, 1)) {
      // from /getprediction
      points = denormalizeLandmarks(
        scoliovisAPIResponse.landmarks,
        selectedFile.width,
        selectedFile.height
      );
    } else {
      // from /v2/getprediction
      for (let i = 0; i < scoliovisAPIResponse.landmarks.length; i++) {
        points.push([
          scoliovisAPIResponse.landmarks[i],
          scoliovisAPIResponse.landmarks[i + 1],
        ]);
        i += 1;
      }
    }
    setPoints(points);
    drawLandmarks({
      points: points,
      drawSettings: drawSettings,
    });
    drawDetections({
      detections: scoliovisAPIResponse.detections,
      drawSettings: drawSettings,
    });
    drawAngles({
      angles: scoliovisAPIResponse.angles,
      midpointLines: scoliovisAPIResponse.midpoint_lines,
      drawSettings: drawSettings,
    });
  }

  function drawImage() {
    // Draw background
    if (!selectedFile || !canvasRef) return;
    ctx.current.fillRect(0, 0, selectedFile.width, selectedFile.height); // DO NOT RELY ON getBoundingBox for height and width because it's unreliable.

    // Draw Image
    ctx.current.drawImage(
      selectedFile.img,
      0,
      0,
      selectedFile.width,
      selectedFile.height
    );
  }

  function drawDetections({
    detections,
    drawSettings,
  }: {
    detections: DetectionType[];
    drawSettings: DrawSettingsType;
  }) {
    if (!drawSettings.showDetections) return;

    // Drawing Bboxes
    detections.forEach((detection, i) => {
      let width = detection.xmax - detection.xmin;
      let height = detection.ymax - detection.ymin;

      // Drawing Rects
      ctx.current.lineWidth = 2 * drawSettings.detectionsScale;
      ctx.current.strokeStyle = "blue";
      ctx.current.strokeRect(detection.xmin, detection.ymin, width, height);
    });

    // Draw BBox Labels
    if (!drawSettings.showDetectionLabels) return;
    detections.forEach((detection, i) => {
      let fontSize = 30 + drawSettings.detectionsScale * 0.8;
      // Drawing Text
      ctx.current.fillStyle = "white";
      ctx.current.font = `${fontSize}px sans-serif`;
      ctx.current.textBaseline = "top";

      let padding = 10; // in px
      let text = `(${i + 1}) vert: ${(detection.confidence * 100).toFixed(0)}%`;
      let tm = ctx.current.measureText(text);

      ctx.current.fillStyle = `rgba(0,0,255,0.5)`;
      ctx.current.fillRect(
        detection.xmin,
        detection.ymin,
        tm.width + padding,
        fontSize
      );

      ctx.current.fillStyle = "white";
      ctx.current.fillText(
        text,
        detection.xmin + padding * 0.5,
        detection.ymin
      );
    });
  }

  function drawLandmarks({
    points,
    drawSettings,
  }: {
    points: number[][];
    drawSettings: DrawSettingsType;
  }) {
    if (!drawSettings.showLandmarks) return;
    // DRAW POINTS
    ctx.current.lineWidth = 5;
    ctx.current.fillStyle = drawSettings.landmarkColor[0];
    let currVertPoint = 0;
    points.forEach((point, i) => {
      // Top Verts
      if ([0, 1].includes(currVertPoint))
        ctx.current.fillStyle = drawSettings.landmarkColor[0];
      if ([2, 3].includes(currVertPoint))
        ctx.current.fillStyle = drawSettings.landmarkColor[1];

      drawCircle(point[0], point[1], drawSettings.landmarkSize);

      currVertPoint = currVertPoint + 1;
      if (currVertPoint >= 4) currVertPoint = 0;
    });

    // DRAW PATHS
    const paths = generatePathFromPoints(
      points,
      drawSettings.landmarkDisplayType
    );
    // const paths = generatePathFromPoints(points, "no_lines");
    ctx.current.lineWidth = 8;
    switch (drawSettings.landmarkDisplayType) {
      case "all_lines":
        ctx.current.strokeStyle = "aqua";
        break;
      case "top_lines":
        ctx.current.strokeStyle = drawSettings.landmarkColor[0];
        break;
      case "bottom_lines":
        ctx.current.strokeStyle = drawSettings.landmarkColor[1];
        break;
      default:
        break;
    }

    paths.forEach((path) => {
      path.forEach((point, i) => {
        if (i === 0) {
          ctx.current.beginPath();
          ctx.current.moveTo(point[0], point[1]);
        } else ctx.current.lineTo(point[0], point[1]);

        if (i === path.length - 1) ctx.current.stroke();
      });
    });
  }

  function drawAngles({
    angles,
    midpointLines,
    drawSettings,
  }: {
    angles: AnglesType;
    midpointLines: ScolioVisAPIResponseType["midpoint_lines"];
    drawSettings: DrawSettingsType;
  }) {
    if (
      !drawSettings.showCobbAngle ||
      !scoliovisAPIResponse ||
      !selectedFile ||
      !midpointLines
    )
      return;

    // Draw Midpoints
    ctx.current.strokeStyle = "white";
    ctx.current.lineWidth = 5;
    midpointLines.forEach((mp, i) => {
      ctx.current.beginPath();
      ctx.current.moveTo(mp[0][0], mp[0][1]);
      ctx.current.lineTo(mp[1][0], mp[1][1]);
      ctx.current.stroke();
    });
    let top = 0;
    let bottom = 0;

    // Draw PT
    ctx.current.lineWidth = 5;
    ctx.current.strokeStyle = "orange";
    ctx.current.fillStyle = "orange";

    top = scoliovisAPIResponse.angles.pt.idxs[0];
    bottom = scoliovisAPIResponse.angles.pt.idxs[1];
    drawCobbAngleLines(
      [midpointLines[top][0], midpointLines[top][1]],
      [midpointLines[bottom][0], midpointLines[bottom][1]],
      "pt"
    );

    // Draw TL
    ctx.current.lineWidth = 5;
    ctx.current.strokeStyle = "lime";
    ctx.current.fillStyle = "lime";

    top = scoliovisAPIResponse.angles.tl.idxs[0];
    bottom = scoliovisAPIResponse.angles.tl.idxs[1];
    drawCobbAngleLines(
      [midpointLines[top][0], midpointLines[top][1]],
      [midpointLines[bottom][0], midpointLines[bottom][1]],
      "tl"
    );

    // Draw MT
    ctx.current.lineWidth = 5;
    ctx.current.strokeStyle = "magenta";
    ctx.current.fillStyle = "magenta";

    top = scoliovisAPIResponse.angles.mt.idxs[0];
    bottom = scoliovisAPIResponse.angles.mt.idxs[1];
    drawCobbAngleLines(
      [midpointLines[top][0], midpointLines[top][1]],
      [midpointLines[bottom][0], midpointLines[bottom][1]],
      "mt"
    );
  }

  function drawCobbAngleLines(
    top: [[number, number], [number, number]],
    bottom: [[number, number], [number, number]],
    angleType: keyof AnglesType
  ) {
    if (!selectedFile || !scoliovisAPIResponse) return;

    // 1. Draw Top
    let [topMinPoint, topMaxPoint] = createLongLine(
      top[0][0],
      top[1][0],
      top[0][1],
      top[1][1],
      selectedFile.width
    );
    drawLine(topMinPoint, topMaxPoint);

    // 2. Draw Bottom
    let [bottomMinPoint, bottomMaxPoint] = createLongLine(
      bottom[0][0],
      bottom[1][0],
      bottom[0][1],
      bottom[1][1],
      selectedFile.width
    );
    drawLine(bottomMinPoint, bottomMaxPoint);

    // 3. Draw Angle Label
    ctx.current.font = "bold 48px manrope";
    let text = `${angleType.toUpperCase()}=${scoliovisAPIResponse.angles[
      angleType
    ].angle.toFixed(2)}°`;
    let padding = 50;
    let textSize = ctx.current.measureText(text);
    let prevFillStyle = ctx.current.fillStyle;
    ctx.current.textBaseline = "middle";
    ctx.current.fillStyle = `rgba(0,0,0,0.7)`;
    ctx.current.fillRect(
      selectedFile.width - textSize.width - padding - padding / 2,
      topMaxPoint[1] + (bottomMaxPoint[1] - topMaxPoint[1]) / 2 - 48,
      textSize.width + padding,
      48 + padding
    );
    ctx.current.fillStyle = prevFillStyle;
    ctx.current.fillText(
      text,
      selectedFile.width - textSize.width - padding,
      topMaxPoint[1] + (bottomMaxPoint[1] - topMaxPoint[1]) / 2
    );

    return;
    // 4. DRAW PERPENDICULAR
    // 4.1 DRAW PERPENDICULAR: TOP
    // - Swapper Based on Slope
    let startX = 550;
    let endX = 400;
    let temp = 0;
    let m = getSlope(top[0][0], top[1][0], top[0][1], top[1][1]);
    if (m < 0) {
      // Top line has a negative slope, SWAP
      let temp = startX;
      startX = endX;
      endX = temp;
    }

    let [startPoint, endPoint] = createPerpendicularLine(
      top[0][0],
      top[1][0],
      top[0][1],
      top[1][1],
      endX,
      startX
    );
    // drawCircle(endPoint[0], endPoint[1], 20);
    // drawCircle(startPoint[0], startPoint[1], 20);
    drawLine(startPoint, endPoint);

    // 4.2 DRAW PERPENDICULAR =: Bottom
    // - Swapper Based on Slope
    startX = 550;
    endX = 400;
    temp = 0;
    m = getSlope(bottom[0][0], bottom[1][0], bottom[0][1], bottom[1][1]);
    if (m > 0) {
      // Top line has a negative slope, SWAP
      let temp = startX;
      startX = endX;
      endX = temp;
    }

    [startPoint, endPoint] = createPerpendicularLine(
      bottom[0][0],
      bottom[1][0],
      bottom[0][1],
      bottom[1][1],
      endX,
      startX
    );
    // drawCircle(endPoint[0], endPoint[1], 20);
    // drawCircle(startPoint[0], startPoint[1], 20);
    drawLine(startPoint, endPoint);
  }

  function drawLine(p1: [number, number], p2: [number, number]) {
    ctx.current.beginPath();
    ctx.current.moveTo(p1[0], p1[1]);
    ctx.current.lineTo(p2[0], p2[1]);
    ctx.current.stroke();
  }

  function drawCircle(x: number, y: number, radius: number) {
    ctx.current.beginPath();
    ctx.current.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.current.fill();
  }

  function drawHouse() {
    // Set line width
    ctx.current.lineWidth = 10;
    ctx.current.strokeStyle = "green";
    ctx.current.fillStyle = "green";

    // Wall
    ctx.current.strokeRect(75, 140, 150, 110);

    // Door
    ctx.current.fillRect(130, 190, 40, 60);

    // Roof
    ctx.current.beginPath();
    ctx.current.moveTo(50, 140);
    ctx.current.lineTo(150, 60);
    ctx.current.lineTo(250, 140);
    ctx.current.closePath();
    ctx.current.stroke();
  }

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-contain"
      id="image-canvas"
    />
  );
};

export default ImageCanvas;

// Loading an image from a URL in Canvas
// https://stackoverflow.com/questions/4773966/drawing-an-image-from-a-data-url-to-a-canvas

//   context.lineCap = "round";
//   context.lineWidth = 5;
//   context.strokeStyle = "darkGray";

// let url = "https://scoliovis-demo.vercel.app/example_images/3.jpg";
// let img = new Image();
// await new Promise((r) => (img.onload = r), (img.src = url));
// context.context.drawImage();
