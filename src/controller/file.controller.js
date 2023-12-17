const logger = require("../logger/logger");
const fs = require("fs");
const { PdfFile } = require("../model/file.model");
const PDFParser = require("pdf2json");
const pdfParser = new PDFParser(this, 1);

const uploadFile = async (req, res) => {
  try {
    if (req.file.fileName.split(".")[1] === "pdf") {
      return res.render("pages/index", { error: "file formate not supported" });
    } else {
      console.log("inside file");
      let _buffer = new Buffer.from(req.file.buffer, "base64");
      pdfParser.parseBuffer(_buffer);
      pdfParser.on("pdfParser_dataError", (errData) =>
        console.error(errData.parserError)
      );
      pdfParser.on("pdfParser_dataReady", async (pdfData) => {
        const content = pdfParser.getRawTextContent();
        const newFile = new PdfFile({
          fileName: Date.now() + "-" + req.file.originalname,
          content: content,
        });
        const insertedFile = await newFile.save();
      });
      // const fileList = await PdfFile.find().select({ fileName: 1, content: 1 });
      res.redirect("/");
    }
  } catch (error) {
    logger.log(error);
    return res.render("pages/index", { error: "file formate not supported" });
  }
};

const fileList = async (req, res) => {
  try {
    const fileList = await PdfFile.find().select({ fileName: 1, content: 1 });
    if (fileList.length > 0) {
      res.render("pages/index", {
        fileList: fileList,
      });
    } else {
      res.render("pages/index", {
        fileList: [],
      });
    }
  } catch (error) {
    logger.error(error);
  }
};
const fileDetail = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const file = await PdfFile.find({ _id: id });
    res.render("pages/fileDetail.ejs", {
      data: file,
    });
  } catch (error) {
    logger.error(error);
  }
};
const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFile = await PdfFile.findByIdAndDelete(id);
    res.status(200).json(deleteFile);
  } catch (error) {
    logger.error(error);
  }
};
const deleteManyFile = async (req, res) => {
  try {
    const deleteFile = await PdfFile.deleteMany();
    res.status(200).json(deleteFile);
  } catch (error) {
    logger.error(error);
  }
};
module.exports = {
  uploadFile,
  fileList,
  fileDetail,
  deleteFile,
  deleteManyFile,
};
