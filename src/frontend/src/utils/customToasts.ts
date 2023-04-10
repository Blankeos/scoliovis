import toast from "react-hot-toast";

export const imageUploadToasts = {
  success: () => {
    toast.success(`Successfully chose image!`);
  },
  error: () => {
    toast.error("Can't accept this file type.");
  },
};
