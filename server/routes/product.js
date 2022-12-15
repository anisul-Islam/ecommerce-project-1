import { Router } from "express";
import formidable from "express-formidable";

import {
  createProduct,
  getProducts,
  getProduct,
  getPhoto,
  deletePhoto,
  updateProduct,
  getFilteredProducts,
  productsCount,
  searchProducts,
  getBraintreeToken,
  processBraintreePayment,
} from "../controllers/product.js";

import { isAdmin, requireSignin } from "../middlewares/auth.js";

const productRoutes = Router();

productRoutes.post(
  "/products",
  requireSignin,
  isAdmin,
  formidable(),
  createProduct
);

productRoutes.get("/products", getProducts);
productRoutes.get("/products/:slug", getProduct);
productRoutes.get("/products/photo/:productId", getPhoto);
productRoutes.post("/filtered-products", getFilteredProducts);
productRoutes.delete(
  "/products/:productId",
  requireSignin,
  isAdmin,
  deletePhoto
);
productRoutes.put(
  "/products/:productId",
  requireSignin,
  isAdmin,
  formidable(),
  updateProduct
);

productRoutes.get("/products-count", productsCount);
productRoutes.get("/products/search/:searchValue", searchProducts);

// payment routes
//get braintree token to show the payment UI
productRoutes.get("/braintree/token", getBraintreeToken);

// finalize the transactions
productRoutes.post(
  "/braintree/payment",
  requireSignin,
  processBraintreePayment
);

export default productRoutes;
