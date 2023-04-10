import React, { useState } from "react";
import Lottie from "lottie-react";
import { useLottie, LottieOptions, InteractivityProps } from "lottie-react";

import animationData from "../src/lotties/polygon_lottie.json";

type PolygonIconProps = {
  className?: string;
};

const PolygonIcon: React.FC<PolygonIconProps> = ({
  className = "w-20 h-20",
}) => {
  return (
    <>
      <Lottie animationData={animationData} className={className} loop={true} />
    </>
  );
};

export default PolygonIcon;
