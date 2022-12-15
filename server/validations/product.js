import { check } from "express-validator";

export const productValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is missing")
    .isLength({ min: 3 })
    .withMessage("name must have at least 3 characters")
    .isLength({ max: 200 })
    .withMessage("name can have maximum 200 characters"),

  check("description")
    .trim()
    .notEmpty()
    .withMessage("description is missing")
    .isLength({ min: 5 })
    .withMessage("description must have at least 5 characters"),

  check("price").trim().notEmpty().withMessage("price is missing"),

  check("category").trim().notEmpty().withMessage("category is missing"),
];
