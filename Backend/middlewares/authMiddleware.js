import JWT from "jsonwebtoken";
import { UserModel } from "../models/UserMode.js";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

//auth
export const authGuard = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    const message =
      error.name === "JsonWebTokenError"
        ? "Invalid token"
        : error.name === "TokenExpiredError"
        ? "Token expired"
        : "Authorization failed";

    res.status(401).json({ message });
  }
};

// is admin
export const isAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    return next();
  } else {
    const err = new Error("Not authorized! Admins only.");
    err.statusCode = 403;
    return next(err);
  }
};

//isguide
export const isGuide = (req, res, next) => {
  if (req.user.role === "guide") {
    return next();
  } else {
    const err = new Error("Not authorized! Guides only.");
    err.statusCode = 403;
    return next(err);
  }
};

//isnormal
export const isNormal = (req, res, next) => {
  if (req.user.role === "normal") {
    return next();
  } else {
    const err = new Error("Not authorized! Normal users only.");
    err.statusCode = 403;
    return next(err);
  }
};
