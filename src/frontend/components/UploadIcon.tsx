import { useState } from "react";
import { useLottie } from "lottie-react";

import animationData from "../src/lotties/upload_lottie.json";

type UploadIconProps = {};

const UploadIcon: React.FC<UploadIconProps> = () => {
  const style = {
    height: 50,
    width: 50,
  };
  const options = {
    animationData: animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);
  return View;
};

export default UploadIcon;
