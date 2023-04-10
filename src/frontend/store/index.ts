import create from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import produce from "immer";

export interface IStoreState {
  //   States
  selectedFile?: ISelectedFile;
  drawSettings: DrawSettingsType;
  scoliovisAPIResponse?: ScolioVisAPIResponseType;

  // Actions: Context
  setSelectedFile: (file?: ISelectedFile) => void;
  setScoliovisAPIResponse: (responseData?: ScolioVisAPIResponseType) => void;

  // Actions: DrawSettings
  setLandmarkDisplayType: (displayType: LandmarkDisplayType) => void;
  setLandmarkSize: (size: number) => void;
  setLandmarkColor: ({
    topColor,
    bottomColor,
  }: {
    topColor?: string;
    bottomColor?: string;
  }) => void;
  setLineWidth: (lineWidth: number) => void;
  setShowDetections: (show: boolean) => void;
  setShowDetectionLabels: (show: boolean) => void;
  setShowLandmarks: (show: boolean) => void;
  setShowCobbAngle: (show: boolean) => void;
  setDetectionsScale: (scale: number) => void;
}

export const useStore = create<IStoreState>()(
  devtools(
    immer((set) => ({
      selectedFile: undefined,
      drawSettings: {
        showCobbAngle: true,
        showLandmarks: false,
        showDetections: true,
        showDetectionLabels: true,
        landmarkDisplayType: "no_lines",
        landmarkColor: ["#FFFFFF", "#8ED1FC"],
        landmarkSize: 7,
        lineWidth: 2,
        detectionsScale: 1,
      },
      scoliovisAPIResponse: undefined,
      setScoliovisAPIResponse: (responseData) =>
        set((state) => {
          state.scoliovisAPIResponse = responseData;
        }),
      setSelectedFile: (file) =>
        set((state) => {
          // I added 'any' just to make the typescript compiler happy.
          // Issue is with the HTMLImageElement type not being compatible with WriteableDraft).
          // It's too deep to fix, but this works anyway)
          state.selectedFile = file as any;
        }),
      setLandmarkDisplayType: (displayType) =>
        set((state) => {
          state.drawSettings.landmarkDisplayType = displayType;
        }),
      setLandmarkSize: (size) =>
        set((state) => {
          state.drawSettings.landmarkSize = size;
        }),
      setLandmarkColor: ({ topColor, bottomColor }) =>
        set((state) => {
          if (topColor) state.drawSettings.landmarkColor[0] = topColor;
          if (bottomColor) state.drawSettings.landmarkColor[1] = bottomColor;
        }),
      setLineWidth: (lineWidth) =>
        set((state) => {
          state.drawSettings.lineWidth = lineWidth;
        }),
      setShowDetections: (show) =>
        set((state) => {
          state.drawSettings.showDetections = show;
        }),
      setShowLandmarks: (show) =>
        set((state) => {
          state.drawSettings.showLandmarks = show;
        }),
      setShowCobbAngle: (show) =>
        set((state) => {
          state.drawSettings.showCobbAngle = show;
        }),
      setDetectionsScale: (scale) =>
        set((state) => {
          state.drawSettings.detectionsScale = scale;
        }),
      setShowDetectionLabels: (show) =>
        set((state) => {
          state.drawSettings.showDetectionLabels = show;
        }),
    }))
  )
);

// export const useStore = create<IStoreState>()(
//   devtools((set) => ({
//     selectedFile: undefined,
//     drawSettings: {
//       landmarkDisplayType: "no_lines",
//       landmarkColor: ["#FFFFFF", "#8ED1FC"],
//       landmarkSize: 7,
//       lineWidth: 2,
//     },
//     scoliovisAPIResponse: undefined,
//     setScoliovisAPIResponse: (responseData) =>
//       set(
//         produce((state: any) => {
//           state.scoliovisAPIResponse = responseData;
//         })
//       ),
//     setSelectedFile: (file) =>
//       set(
//         produce((state: any) => {
//           state.selectedFile = file;
//         })
//       ),
//     setLandmarkDisplayType: (displayType) =>
//       set(
//         produce((state: any) => {
//           state.drawSettings.landmarkDisplayType = displayType;
//         })
//       ),
//     setLandmarkSize: (size) =>
//       set(
//         produce((state: any) => {
//           state.drawSettings.landmarkSize = size;
//         })
//       ),
//     setLandmarkColor: ({ topColor, bottomColor }) =>
//       set(
//         produce((state: any) => {
//           if (topColor) state.drawSettings.landmarkColor[0] = topColor;
//           if (bottomColor) state.drawSettings.landmarkColor[1] = bottomColor;
//         })
//       ),
//   }))
// );
