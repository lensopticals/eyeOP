import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudnary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // console.log("File Uploaded on cloudiinary : ", result.url);

    return result;
  } catch (error) {
    return null;
  }
};

export { uploadOnCloudnary };
