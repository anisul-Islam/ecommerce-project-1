import jwt from "jsonwebtoken";
import dev from "../config/index.js";
import User from "../model/user.js";

export const requireSignin = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(404)
        .json({ error: "no token found in request headers" });
    }
    const token = req.headers.authorization;

    const decoded = jwt.verify(token, String(dev.app.jwtSecretKey));
    req.userId = decoded._id;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};
export const isAdmin = async (req, res, next) => {
  try {
    const existingUser = await User.findById({ _id: req.userId });
    if (!existingUser) {
      return res.json({
        error: "user does not exist with this email. please register first",
      });
    }
    if (existingUser.role !== 1) {
      return res.status(401).json({
        error: "Unauthorized user",
      });
    }
    next();
  } catch (error) {
    return res.json(401).json(error);
  }
};
