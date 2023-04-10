import Head from "components/Head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import { useStore } from "store";

// Icons
import { FiArrowLeft as ArrowIcon } from "react-icons/fi";
import {
  RiSearchEyeLine as ObjectDetectionIcon,
  RiShapeFill as LandmarkEstimationIcon,
} from "react-icons/ri";
import { BsFileEarmarkImage as ImageIcon } from "react-icons/bs";
import { TbAngle as CobbAngleIcon } from "react-icons/tb";

// Components (Libraries)
import Tippy from "@tippyjs/react";
import { motion } from "framer-motion";
import { TwitterPicker } from "react-color";
import { Resizable } from "re-resizable";

// Components
import SmallSwitch from "components/Switch/Switch";
import MultiSwitch from "components/Switch/MultiSwitch";
import ImageCanvas from "components/MainAppPage/ImageCanvas";
import ImageUploadBox from "components/ImageUploadBox";
import ExampleImageButton from "components/ExampleImageButton";
import ExportPopover from "components/MainAppPage/fixed/ExportPopover";

// Utils and Services
import getPrediction from "services/getPrediction";
import enterAnim from "@/utils/enterAnim";
import { debounce } from "lodash";

// Hooks
import usePanZoom from "use-pan-and-zoom";
import useServerDelayInformer from "@/hooks/useServerDelayInformer";

// CSS
import "tippy.js/animations/shift-toward-subtle.css";
import "tippy.js/animations/shift-away-subtle.css";
import useDelayMounted from "@/hooks/useDelayMounted";
import getMaxCobbAngle from "@/utils/cobbAngle/getMaxCobbAngle";

const DISPLAY_TYPES: LandmarkDisplayType[] = [
  "no_lines",
  "top_lines",
  "bottom_lines",
  "all_lines",
];

const MainAppPage = () => {
  // Ref
  const selectedFile = useStore((state) => state.selectedFile);
  const scolioVisAPIResponse = useStore((state) => state.scoliovisAPIResponse);

  // Draw Settings
  const drawSettings = useStore((state) => state.drawSettings);
  const setLandmarkSize = useStore((state) => state.setLandmarkSize);
  const setLandmarkColor = useStore((state) => state.setLandmarkColor);
  const setLandmarkDisplayType = useStore(
    (state) => state.setLandmarkDisplayType
  );
  const setScoliovisAPIResponse = useStore(
    (state) => state.setScoliovisAPIResponse
  );
  const setShowDetections = useStore((state) => state.setShowDetections);
  const setShowLandmarks = useStore((state) => state.setShowLandmarks);
  const setShowCobbAngle = useStore((state) => state.setShowCobbAngle);
  const setDetectionsScale = useStore((state) => state.setDetectionsScale);
  const setShowDetectionLabels = useStore(
    (state) => state.setShowDetectionLabels
  );

  const debounceFetch = debounce(fetchData, 800);
  async function fetchData(file: ISelectedFile) {
    console.log("Called fetchData!");
    sdInformer.start();
    setLoading(true);
    try {
      const res: any = await getPrediction(file);
      setScoliovisAPIResponse(res.data);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
    sdInformer.cancel();
  }

  // Hooks;
  useEffect(() => {
    setScoliovisAPIResponse();
    if (!selectedFile) return;
    debounceFetch(selectedFile);
  }, [selectedFile]);

  const sdInformer = useServerDelayInformer();
  const requestFailedDisplayCanMount = useDelayMounted(1000);

  // States
  const [loading, setLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { transform, setContainer, panZoomHandlers } = usePanZoom({
    zoomSensitivity: 0.001,
  });

  const ref = useRef<HTMLElement>(null);
  return (
    <div className="relative flex flex-col min-h-screen max-h-screen overflow-hidden">
      <Head pageTitle="Main App" pagePath="app" />
      <nav className="absolute grid grid-cols-5 p-3">
        <div className="col-span-1 flex justify-start h-12">
          <Link href="/">
            <a className="relative z-20 flex h-full px-5 items-center gap-2 border rounded-xl text-sm hover:bg-primary hover:border-primary hover:text-white hover:shadow-md transition bg-white bg-opacity-50">
              <ArrowIcon size="1.2rem" />
              <span>Back</span>
            </a>
          </Link>
        </div>
      </nav>
      <main
        ref={ref}
        className="min-h-screen max-h-screen flex flex-col sm:flex-row bg-gray-300 overflow-hidden"
      >
        {/* === MAIN SECTION === */}
        {selectedFile && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            ref={(el) => setContainer(el)}
            {...panZoomHandlers}
            style={{ touchAction: "none" }}
            className="flex-1 flex bg-opacity-50 p-3 shadow-inner cursor-grab active:cursor-grabbing overflow-hidden"
          >
            <div
              id="imageCanvasContainer"
              style={{ transform }}
              className="flex flex-col relative max-w-4xl w-full mx-auto"
            >
              <ImageCanvas />
            </div>
          </motion.div>
        )}
        {!selectedFile && (
          <div className="flex-1 flex bg-opacity-50 p-3 shadow-inner cursor-grab active:cursor-grabbing overflow-hidden">
            <div className="relative flex flex-col max-w-2xl w-full mx-auto">
              <ImageUploadBox file={selectedFile} bgClass="bg-gray-100" />
              <div className="fluid-container p-7 flex flex-col items-center gap-y-5">
                <motion.p
                  {...enterAnim(0.2)}
                  className="flex gap-x-2 items-center text-gray-500 text-sm"
                >
                  <ArrowIcon className="-rotate-90" />
                  Or try with these example spine images
                </motion.p>
                <motion.div {...enterAnim(0.3)} className="flex gap-5">
                  <ExampleImageButton
                    exampleImageURL="/example_images/1.jpg"
                    routeToApp={false}
                  />
                  <ExampleImageButton
                    exampleImageURL="/example_images/2.jpg"
                    routeToApp={false}
                  />
                  <ExampleImageButton
                    exampleImageURL="/example_images/3.jpg"
                    routeToApp={false}
                  />
                  <ExampleImageButton
                    exampleImageURL="/example_images/4.jpg"
                    routeToApp={false}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        )}
        {/* === SIDE BAR === */}
        <SideBarContainer>
          <h1 className="text-lg text-primary text-center">
            <span className="font-black">Scolio</span>Vis
          </h1>
          <hr />
          <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold">
            {/* <UploadIcon /> */}
            <span>Input Image</span>
          </h2>
          <div className="text-xs flex gap-x-2 items-center">
            <p className="truncate text-gray-500 text-xs flex gap-x-1">
              <ImageIcon className="transform translate-y-0.5" />
              <span>{selectedFile && selectedFile.name}</span>
            </p>
          </div>
          <hr />
          {!loading && scolioVisAPIResponse && (
            <>
              <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold">
                <SmallSwitch
                  enabled={drawSettings.showDetections}
                  setEnabled={setShowDetections}
                />
                <ObjectDetectionIcon />
                <span>Display Detections</span>
              </h2>
              {drawSettings.showDetections && (
                <div className="flex flex-col gap-y-0.5">
                  <div className="grid grid-cols-[50px,1fr] items-center border border-transparent pl-3 h-9 gap-x-2">
                    <div className="flex justify-start">
                      <input
                        className="cursor-pointer"
                        type="checkbox"
                        id="showDetectionLabels"
                        checked={drawSettings.showDetectionLabels}
                        onChange={(e) => {
                          setShowDetectionLabels(e.target.checked);
                          // e.target.checked
                        }}
                      />
                    </div>
                    <label
                      htmlFor="showDetectionLabels"
                      className="cursor-pointer select-none text-xs"
                    >
                      Show Detection Labels
                    </label>
                  </div>
                  <div className="grid grid-cols-[50px,1fr] items-center border border-transparent pl-3 h-9 gap-x-2">
                    <label className="text-xs truncate">Scale</label>
                    <div className="h-7 select-none flex">
                      <input
                        className="cursor-grab active:cursor-grabbing"
                        type="range"
                        min="1"
                        max="4"
                        onChange={(e) => {
                          setDetectionsScale(parseInt(e.target.value));
                        }}
                        value={drawSettings.detectionsScale}
                      />
                    </div>
                  </div>
                </div>
              )}
              <hr />
              <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold">
                <SmallSwitch
                  enabled={drawSettings.showLandmarks}
                  setEnabled={setShowLandmarks}
                />
                <LandmarkEstimationIcon />
                <span>Display Keypoints</span>
              </h2>
              {drawSettings.showLandmarks && (
                <div className="flex flex-col gap-y-0.5">
                  <div className="grid grid-cols-[50px,1fr] items-center border border-transparent pl-3 h-9 gap-x-2">
                    <label className="text-xs">Mode</label>
                    <div className="flex">
                      <MultiSwitch
                        currentIndex={currentIndex}
                        onChange={(indexClicked) => {
                          setCurrentIndex((prev) => {
                            setLandmarkDisplayType(DISPLAY_TYPES[indexClicked]);
                            return indexClicked;
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-[50px,1fr] items-center border border-transparent pl-3 h-9 gap-x-2">
                    <label className="text-xs">Colors</label>
                    <div className="flex gap-x-2">
                      <Tippy
                        interactive={true}
                        trigger="click"
                        theme="transparent"
                        placement="bottom"
                        animation="shift-away-subtle"
                        content={
                          <span>
                            <p className="bg-primary text-white border-t border-l border-r px-3 py-1.5 rounded-t-xl font-semibold">
                              Upper line color
                            </p>
                            <TwitterPicker
                              color={drawSettings.landmarkColor[0]}
                              colors={[
                                "#FFFFFF",
                                "#FF6900",
                                "#FCB900",
                                "#8ED1FC",
                                "#F78DA7",
                                "#7BDCB5",
                                "#00D084",
                              ]}
                              triangle="hide"
                              onChange={(color) => {
                                setLandmarkColor({
                                  topColor: color.hex,
                                });
                              }}
                            />
                          </span>
                        }
                      >
                        <div
                          className="h-7 w-7 border rounded-lg cursor-pointer"
                          style={{
                            background: drawSettings.landmarkColor[0],
                          }}
                        ></div>
                      </Tippy>
                      <Tippy
                        interactive={true}
                        trigger="click"
                        theme="transparent"
                        placement="bottom"
                        animation="shift-away-subtle"
                        content={
                          <span>
                            <p className="bg-primary text-white border-t border-l border-r px-3 py-1.5 rounded-t-xl font-semibold">
                              Lower line color
                            </p>
                            <TwitterPicker
                              color={drawSettings.landmarkColor[1]}
                              colors={[
                                "#FFFFFF",
                                "#FF6900",
                                "#FCB900",
                                "#8ED1FC",
                                "#F78DA7",
                                "#7BDCB5",
                                "#00D084",
                              ]}
                              triangle="hide"
                              onChange={(color) => {
                                setLandmarkColor({
                                  bottomColor: color.hex,
                                });
                              }}
                            />
                          </span>
                        }
                      >
                        <div
                          className="h-7 w-7 border rounded-lg cursor-pointer"
                          style={{ background: drawSettings.landmarkColor[1] }}
                        ></div>
                      </Tippy>
                    </div>
                  </div>
                  <div className="grid grid-cols-[50px,1fr] items-center border border-transparent pl-3 h-9 gap-x-2">
                    <label className="text-xs">Radius</label>
                    <div className="h-7 select-none flex">
                      <input
                        className="cursor-grab active:cursor-grabbing"
                        type="range"
                        min="0"
                        max="20"
                        onChange={(e) => {
                          setLandmarkSize(parseInt(e.target.value));
                        }}
                        value={drawSettings.landmarkSize}
                      />
                    </div>
                  </div>
                </div>
              )}
              <hr />
              <h2 className="flex items-center gap-x-2 text-sm text-gray-700 font-semibold">
                <SmallSwitch
                  enabled={drawSettings.showCobbAngle}
                  setEnabled={setShowCobbAngle}
                />
                <CobbAngleIcon />
                <span>Display Cobb Angle</span>
              </h2>
              <hr />
              {scolioVisAPIResponse && scolioVisAPIResponse.angles ? (
                <div className="flex flex-col gap-y-3 text-sm text-gray-700">
                  <p className="font-semibold">Results</p>
                  <div>Curve Type: {scolioVisAPIResponse.curve_type}</div>
                  <div>
                    <div className="grid grid-cols-[210px,1fr]">
                      <span>Proximal Thoracic (PT):</span>
                      <span>
                        {scolioVisAPIResponse.angles.pt.angle.toFixed(2)}°
                      </span>
                    </div>
                    <div className="grid grid-cols-[210px,1fr]">
                      <span>Main Thoracic (MT):</span>
                      <span>
                        {scolioVisAPIResponse.angles.mt.angle.toFixed(2)}°
                      </span>
                    </div>
                    <div className="grid grid-cols-[210px,1fr]">
                      <span>Thoracolumbar/Lumbar (TL/L):</span>
                      <span>
                        {scolioVisAPIResponse.angles.tl.angle.toFixed(2)}°
                      </span>
                    </div>
                  </div>
                  <p>
                    The greatest bend is found at{" "}
                    <b>
                      {getMaxCobbAngle(
                        scolioVisAPIResponse.angles
                      ).max.toUpperCase()}
                      :{" "}
                      {getMaxCobbAngle(
                        scolioVisAPIResponse.angles
                      ).value.toFixed(2)}
                      °
                    </b>{" "}
                    taken from the superior endplate of
                    <b>
                      (
                      {scolioVisAPIResponse.angles[
                        getMaxCobbAngle(scolioVisAPIResponse.angles).max
                      ].idxs[0] + 1}
                      )
                    </b>{" "}
                    and inferior endplate of (
                    <b>
                      {scolioVisAPIResponse.angles[
                        getMaxCobbAngle(scolioVisAPIResponse.angles).max
                      ].idxs[1] + 1}
                      )
                    </b>
                    .
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-y-2">
                  <p className="text-red-500 text-sm">
                    This particular image crashed our Cobb Angle Measurement
                    Algorithm so we can&apos;t display any info on it.
                  </p>
                  <p className="text-red-500 text-sm">
                    It&apos;s a bug that occurs in{" "}
                    <b>{(0.046875 * 100).toFixed(2)}%</b> or <b>6/128</b> of our
                    images. We&apos;re still trying to fix it. We hope you
                    understand!
                  </p>
                </div>
              )}
              <div className="flex-1" />
              <div className="">
                <ExportPopover />
              </div>
            </>
          )}

          {/* Display Elements */}

          {/* 1. Display Element: Loading */}
          {loading && <LoadingDisplay />}

          {/* 2. Display Element: No Image Chosen */}
          {!scolioVisAPIResponse && !selectedFile && !loading && (
            <NothingSelectedDisplay />
          )}

          {/* 3. Display Element: Failed Request */}
          {requestFailedDisplayCanMount &&
            !loading &&
            !scolioVisAPIResponse &&
            selectedFile && (
              <FailedRequestDisplay
                onTryAgainClick={() => {
                  fetchData(selectedFile);
                }}
              />
            )}
        </SideBarContainer>
      </main>
    </div>
  );
};

export default MainAppPage;

interface ISideBarContainerProps {}

const SideBarContainer: FCC<ISideBarContainerProps> = ({ children }) => {
  return (
    <>
      <Resizable
        enable={{
          bottom: false,
          bottomLeft: false,
          bottomRight: false,
          left: true,
          right: false,
          top: false,
          topLeft: false,
          topRight: false,
        }}
        maxWidth="450px"
        minWidth="250px"
        defaultSize={{ width: 320, height: "auto" }}
        handleClasses={{
          left: "hover:bg-blue-50 active:bg-blue-100 transition",
        }}
        className="hidden sm:order-last bg-white shadow-xl sm:flex flex-col overflow-y-auto w-full p-3 px-5 gap-y-3"
      >
        {children}
      </Resizable>
      <div className="order-first sm:hidden sm:order-last bg-white shadow-xl flex flex-col overflow-y-auto w-full p-3 px-5 gap-y-3 h-96">
        {children}
      </div>
    </>
  );
};

// DISPLAY ELEMENTS
const LoadingDisplay = () => {
  return (
    <div className="flex flex-col justify-center h-full gap-y-5">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: -12 }}
        transition={{
          yoyo: Infinity,
          duration: 0.5,
        }}
        className="flex justify-center"
      >
        <Image
          src="/assets/apexglass.png"
          width={150}
          height={150}
          objectFit="contain"
        />
      </motion.div>
      <p className="text-center text-sm text-gray-600 px-4">
        <b>Apex</b> is currently sending your spine to the server. Please wait a
        while...
      </p>
    </div>
  );
};

const NothingSelectedDisplay = () => {
  return (
    <div className="flex flex-col justify-center flex-1 gap-y-5">
      <motion.div
        animate={{
          rotate: [0, -5, 0, 5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        className="flex justify-center transform translate-x-3"
      >
        <Image
          src="/assets/apexfolder.png"
          width={150}
          height={150}
          objectFit="contain"
        />
      </motion.div>
      <div className="flex flex-col gap-y-2 max-w-xs w-full mx-auto">
        <h3 className="text-center font-bold text-gray-800">
          Please choose an image
        </h3>
        <p className="text-center text-sm text-gray-600 px-4">
          You haven&apos;t chosen an image yet. Upload or choose an image so{" "}
          <b>Apex</b> can get started!
        </p>
      </div>
    </div>
  );
};

// Failed Request Display Element
interface IFailedRequestDisplayProps {
  onTryAgainClick: () => void;
}
const FailedRequestDisplay: React.FC<IFailedRequestDisplayProps> = ({
  onTryAgainClick,
}) => {
  return (
    <div className="flex flex-col justify-center flex-1 gap-y-5">
      <motion.div
        animate={{
          scaleY: [1, 0.95, 1, 0.93, 1, 0.95, 1, 1, 1],
          scaleX: [1, 0.98, 1, 1, 0.98, 1, 1, 0.98, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
        className="flex justify-center transform translate-x-3"
      >
        <Image
          src="/assets/apexcrying.png"
          width={150}
          height={150}
          objectFit="contain"
          objectPosition="bottom"
        />
      </motion.div>
      <div className="flex flex-col gap-y-2 max-w-xs w-full mx-auto">
        <h3 className="text-center font-bold text-red-500">Request Failed!</h3>
        <p className="text-center text-sm text-gray-600 px-4">
          The server did not respond so the request failed. <b>Apex</b> is
          sorry! 😢
        </p>
      </div>
      <button
        className="font-semibold text-gray-800 text-sm hover:text-primary transition"
        onClick={onTryAgainClick}
      >
        Try again?
      </button>
    </div>
  );
};
