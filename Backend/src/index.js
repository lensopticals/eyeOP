import app from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
dotenv.config({
  path: "../.env",
});

const port = process.env.PORT || 8000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB()
  .then(() => {
    // Listening for error
    app.on("error", (error) => {
      console.log("Error in server!! \n\n", error);
    });

    app.listen(port, () => {
      console.log(`Server ⚙️ running on Port ${port}`);
    });
  })
  .catch((err) => {
    console.log(`ERROR: Error in mongoDb connecton!!`);
  });
