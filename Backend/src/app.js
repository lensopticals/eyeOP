import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import addressRoutes from "./routes/address.routes.js";

import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5174",
      "http://192.168.43.44:5173",
      "https://lensop.netlify.app",
      "https://eyeop.netlify.app",
      "https://eye-op.netlify.app",
      "https://eyeop.onrender.com",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});

app.use(cookieParser());

app.use("/api/v1/user", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/", orderRoutes);
app.use("/api/v1/payments", paymentRoutes);

app.get("/", (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "Server is running Healthy" });
});

export default app;
