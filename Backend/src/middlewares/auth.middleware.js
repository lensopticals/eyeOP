import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { refreshAccessToken } from "../controllers/user.controller.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    
    const token = authHeader?.split(" ")[1] || req.cookies?.accessToken;
    if (!token) {
      await refreshAccessToken(req, res);
      return;
    }
    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized request" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized request" });
  }
};

export const authoriseRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Permission denied for ${req.user.role}`,
      });
    }
    next();
  };
};
