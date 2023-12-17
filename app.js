const express = require("express");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const fileUpload = require("express-fileupload");
const logger = require("./src/logger/logger.js");
const route = require("./src/route/file.route.js");
const database = require("./src/config/database.js");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

app.use((req, res, next) => {
  console.log(
    JSON.stringify({
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      responseTime: Date.now() - req.startTime,
    })
  );
  next();
});
app.use("/", route);
app.listen(port, () => logger.info(`Server is Listening at port: ${port}`));
