const express = require("express");
require("dotenv").config();
const fileUpload = require("express-fileupload");
const logger = require("./src/logger/logger.js");
const route = require("./src/route/file.route.js");
const database = require("./src/config/database.js");
const app = express();
const port = process.env.PORT || 3000;

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
app.use(
  fileUpload({
    // limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use("/file", route);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => logger.info(`Server is Listening at port: ${port}`));
