import express from "express";
import morgan from "morgan";
import chalk from "chalk";
import cors from "cors";

import dev from "./config/index.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";

const app = express();

const port = dev.app.serverPort || 3001;

app.listen(port, async () => {
  console.log(chalk.blue(`server is running at http://localhost:${port}`));
  await connectDB();
});

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

app.get("/test", (req, res) => {
  res.json({ message: "server is running well" });
});

// error handing middleware
app.use((req, res, next) => {
  return res.status(404).send({
    success: false,
    message: "Route not found",
  });
});

// error handing middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(200).send({
    success: false,
    message: err.message,
  });
});
