import axios from "axios";

export const uploadMultiFile = async (fileList) => {
  console.log("Hello");
  try {
    const results = await Promise.all(
      fileList.map(async (item) => {
        const imageUrl = await uploadOneFile(item);
        return imageUrl;
      })
    );
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

const API_CLOUDINARY = "https://api.cloudinary.com/v1_1/annnn/image/upload";

export const uploadOneFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "xhkmjqak");

  try {
    const res = await axios.post(API_CLOUDINARY, formData);
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
};
