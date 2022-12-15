import { Router } from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  accountActivation,
} from "../controllers/auth.js";
import { isAdmin, requireSignin } from "../middlewares/auth.js";
import { loginValidator, registrationValidator } from "../validations/auth.js";
import { runValidation } from "../validations/index.js";

const authRoutes = Router();

authRoutes.post(
  "/register",
  registrationValidator,
  runValidation,
  registerUser
);

authRoutes.post("/account-activation", accountActivation);

authRoutes.post("/login", loginValidator, runValidation, loginUser);
authRoutes.get("/auth-check", requireSignin, (req, res) => {
  return res.json({ ok: true });
});
authRoutes.get("/admin-check", requireSignin, isAdmin, (req, res) => {
  return res.json({ ok: true });
});
authRoutes.post("/logout", requireSignin, logoutUser);
// authRoutes.get("/secret", requireSignin, isAdmin, (req, res) => {
//   console.log(req.user);
//   res.send("hello");
// });

export default authRoutes;
