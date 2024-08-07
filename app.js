const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
logger.info("Connecting to: ", config.MONGODB_URI);

// mongoose
//   .connect(config.MONGODB_URI)
//   .then(() => {
//     logger.info("Connected to MongoDB");
//   })
//   .catch((error) =>
//     logger.error("Error connecting to MongoDB: ", error.message)
//   );

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

// Middleware para conectar a MongoDB
const connectToMongoDB = async () => {
  try {
    logger.info("Connecting to MongoDB...");
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB: ", error.message);
    process.exit(1); // Si hay un error de conexión, salimos de la aplicación
  }
};

connectToMongoDB();

module.exports = app;
