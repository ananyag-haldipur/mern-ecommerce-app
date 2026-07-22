import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {

    console.log("==== AUTH DEBUG ====");

    console.log(
      "Authorization Header:",
      req.headers.authorization
    );

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {

      token =
      req.headers.authorization.split(" ")[1];

      console.log("Token Received:", token);

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      console.log("Decoded Token:", decoded);

      req.user =
      await User.findById(decoded.id)
      .select("-password");

      console.log("User Found:", req.user);

      if (!req.user) {

        return res.status(401).json({
          message: "User not found",
        });

      }

      return next();
    }

    return res.status(401).json({
      message: "Not authorized, token missing",
    });

  } catch (error) {

    console.log("AUTH ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid token",
    });

  }
};

export const admin = (req, res, next) => {

  if (
    req.user &&
    req.user.role === "admin"
  ) {

    return next();

  }

  return res.status(403).json({
    message: "Admin access only",
  });

};