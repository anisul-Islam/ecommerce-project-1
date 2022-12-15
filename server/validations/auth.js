import { check } from "express-validator";

export const registrationValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is missing")
    .isLength({ min: 3 })
    .withMessage("name must have at least 3 characters")
    .isLength({ max: 31 })
    .withMessage("name can have maximum 31characters"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is missing")
    .isEmail()
    .withMessage("Not a valid email"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 6 })
    .withMessage("password must have at least 6 characters"),
];

export const loginValidator = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is missing")
    .isEmail()
    .withMessage("Not a valid email"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 6 })
    .withMessage("password must have at least 6 characters"),
];
