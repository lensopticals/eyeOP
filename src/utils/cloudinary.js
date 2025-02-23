import { v2 as cloudinary } from "cloudinary";

const uploadOnCloudnary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: "lensOpticals",
      resource_type: "auto",
    });
    // console.log("File Uploaded on cloudiinary : ", result.url);

    return result;
  } catch (error) {
    return null;
  }
};

export { uploadOnCloudnary };
