import { check } from "express-validator";

export const categoryValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("category name is missing")
    .isLength({ min: 3 })
    .withMessage("name must have at least 3 characters")
    .isLength({ max: 31 })
    .withMessage("name can have maximum 31characters"),
];
