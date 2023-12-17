const express = require("express");
const router = express.Router();
const {
  uploadFile,
  fileList,
  fileDetail,
  deleteFile,
} = require("../controller/file.controller.js");

router.post("/upload", uploadFile);
router.get("/", fileList);
router.get("/:id", fileDetail);
router.delete("/:id", deleteFile);

module.exports = router;
