const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
const {
  uploadFile,
  fileList,
  fileDetail,
  deleteFile,
  deleteManyFile,
} = require("../controller/file.controller.js");

router.post("/upload", upload.single("file"), uploadFile);
router.get("/", fileList);
router.get("/:id", fileDetail);
router.delete("/:id", deleteFile);
router.delete("/", deleteManyFile);

module.exports = router;
