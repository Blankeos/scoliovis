type DimensionsType = {
  img: HTMLImageElement;
  height: number;
  width: number;
};

const getImageDataFromURL = (dataURL: string) =>
  new Promise<DimensionsType>((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        img: img,
        height: img.height,
        width: img.width,
      });
    };
    img.src = dataURL;
  });

export default getImageDataFromURL;
//   https://stackoverflow.com/questions/7460272/getting-image-dimensions-using-javascript-file-api

// https://observablehq.com/@ehouais/how-to-get-image-data-from-an-url-or-a-file
