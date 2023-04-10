// API stuff
import axios from "axios";

export default async function uploadFile(file: ISelectedFile) {
  let formData = new FormData();

  formData.append("image", file);
  formData.append("name", "Carlo Taleon");

  return await axios({
    url:
      process.env.NEXT_PUBLIC_UPLOADFILEAPI ||
      "http://localhost:8000/uploadfile",
    method: "POST",
    headers: {
      authorization: "your token",
    },
    data: formData,
  }).then(
    (res) => {
      return res;
    },
    (err) => {
      throw err; // Display errors in POST request
    }
  );
}
// async function handleUpload(e: React.MouseEvent<HTMLButtonElement>) {
//     // Null check "file" state
//     if (!file) {
//       // Display that no file is selected
//       return;
//     }
//     // setLoading(true);
//     let formdata = new FormData();

//     formdata.append("image", file);
//     formdata.append("name", "Carlo Taleon");

//     await axios({
//       url: "http://localhost:8000/uploadfile",
//       method: "POST",
//       headers: {
//         authorization: "your token",
//       },
//       data: formdata,
//     }).then(
//       (res) => {
//         // Display success in POST request
//       },
//       (err) => {
//         // Display errors in POST request
//       }
//     );
//     // setLoading(false);
//   }
