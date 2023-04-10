import React, { useState } from "react";
import Lottie from "lottie-react";
import { useLottie, LottieOptions, InteractivityProps } from "lottie-react";

import animationData from "../src/lotties/loader.json";

type ILoadingIconProps = {
  className?: string;
};

const LoadingIcon: React.FC<ILoadingIconProps> = ({
  className = "w-20 h-20",
}) => {
  return (
    <>
      <Lottie animationData={animationData} className={className} loop={true} />
    </>
  );
};

export default LoadingIcon;
