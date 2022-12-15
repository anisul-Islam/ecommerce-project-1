import { Router } from "express";

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.js";
import { isAdmin, requireSignin } from "../middlewares/auth.js";
import { runValidation } from "../validations/index.js";
import { categoryValidator } from "../validations/category.js";

const categoryRoutes = Router();

categoryRoutes.post(
  "/categories",
  categoryValidator,
  runValidation,
  requireSignin,
  isAdmin,
  createCategory
);

categoryRoutes.get("/categories", getCategories);
categoryRoutes.get("/categories/:slug", getCategory);

categoryRoutes.put(
  "/categories/:categoryId",
  categoryValidator,
  runValidation,
  requireSignin,
  isAdmin,
  updateCategory
);

categoryRoutes.delete(
  "/categories/:categoryId",
  requireSignin,
  isAdmin,
  deleteCategory
);

export default categoryRoutes;
