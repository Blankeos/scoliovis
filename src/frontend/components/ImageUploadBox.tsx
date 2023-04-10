import React, { useEffect, useState } from "react";

// Icons
import PolygonIcon from "./PolygonIcon";
import UploadIcon from "./UploadIcon";
import { CgSpinner as SpinnerIcon } from "react-icons/cg";

// Hooks
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { imageUploadToasts } from "../src/utils/customToasts";
import { useStore } from "store";
import getImageDataFromURL from "@/utils/getImageDataFromURL";

type ImageUploadBoxProps = {
  file: ISelectedFile | undefined;
  onSuccess?: () => void;
  bgClass?: string;
};
const ImageUploadBox: React.FC<ImageUploadBoxProps> = ({
  file,
  onSuccess = () => {},
  bgClass = "bg-gray-100 bg-opacity-60 backdrop-blur-md",
}) => {
  const setSelectedFile = useStore((state) => state.setSelectedFile);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDropAccepted: async (acceptedFiles) => {
      imageUploadToasts.success();
      const file = acceptedFiles[0];
      const src = URL.createObjectURL(file);
      const { width, height, img } = await getImageDataFromURL(src);

      setSelectedFile(
        Object.assign(file, {
          img: img,
          src: src,
          width: width,
          height: height,
        })
      );
      onSuccess();
    },
    onDropRejected: (fileRejection) => {
      imageUploadToasts.error();
    },
  });
  return (
    <>
      <input {...getInputProps()} />
      <label
        {...getRootProps()}
        className={`h-full w-full rounded-xl text-gray-400 cursor-pointer border border-gray-300 hover:shadow-inner transition relative overflow-hidden ${
          bgClass || ""
        }`}
        style={{
          backgroundImage: `url('${file?.src}')`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className={`group absolute inset-0 transition bg-gray-900 ${
            isDragActive ? "bg-opacity-80" : "bg-opacity-0"
          } hover:bg-opacity-70`}
        >
          <div
            className={`w-full h-full flex justify-center items-center flex-col gap-5 transition group-hover:opacity-100 text-center p-8 ${
              file
                ? isDragActive
                  ? "opacity-100"
                  : "opacity-0"
                : "opacity-100"
            } `}
          >
            <UploadIcon />
            <span>
              <b className="font-semibold">Upload a spine x-ray image</b> or
              drag it here.
            </span>
          </div>
        </div>
      </label>
    </>
  );
};

//  bg-gradient-to-bl from-[#87fce8] to-[#abb7e5]

export default ImageUploadBox;
