// Source of this code: https://stackoverflow.com/questions/62179675/how-to-convert-image-source-into-a-javascript-file-object

import getImageDataFromURL from "@/utils/getImageDataFromURL";

// ***Here is the code for converting "image source" (url) to "Base64".***
const getUrlExtension = (url: string) => {
  return url.split(/[#?]/)[0].split(".").pop()?.trim();
};
const getImgName = (url: string) => {
  return url.split(/[#?]/)[0].split("/").pop()?.trim();
};

const urlToSelectedFile = async (imgUrl: string): Promise<ISelectedFile> => {
  var imgExt = getUrlExtension(imgUrl);
  var imgName = getImgName(imgUrl);
  const response = await fetch(imgUrl);
  const blob = await response.blob();
  const file = new File([blob], imgName || `no_name.${imgExt}`, {
    type: blob.type,
  });

  const src = URL.createObjectURL(file);
  const { img, width, height } = await getImageDataFromURL(src);

  // Create Image Bitmap

  return Object.assign(file, {
    img: img,
    src: src,
    width: width,
    height: height,
  });
};
export default urlToSelectedFile;
