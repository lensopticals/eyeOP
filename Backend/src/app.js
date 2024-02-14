import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.route.js";

// import orderRoutes from "./routes/order.routes.js";


const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser());

app.use("/api/v1/user", userRoutes);

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
// app.use("/api/v1", orderRoutes);

export default app;
