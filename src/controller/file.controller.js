const logger = require("../logger/logger");
const fs = require("fs");
const { PdfFile } = require("../model/file.model");
const PDFParser = require("pdf2json");
const pdfParser = new PDFParser(this, 1);

const uploadFile = async (req, res) => {
  try {
    console.log(req.files.file.name);
    let _buffer = new Buffer.from(req.files.file.data, "base64");
    pdfParser.parseBuffer(_buffer);
    pdfParser.on("pdfParser_dataError", (errData) =>
      console.error(errData.parserError)
    );
    pdfParser.on("pdfParser_dataReady", async (pdfData) => {
      const content = pdfParser.getRawTextContent();
      const newFile = new PdfFile({
        fileName: Date.now() + "-" + req.files.file.name,
        content: content,
      });
      const insertedFile = await newFile.save();
      res.status(201).send({ data: insertedFile });
    });
  } catch (error) {
    console.log(error);
    logger.error(error);
  }
};

const fileList = async (req, res) => {
  try {
    const fileList = await PdfFile.find();
    res.status(200).send({ data: fileList });
  } catch (error) {
    logger.error(error);
  }
};
const fileDetail = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const file = await PdfFile.findById(id);
    res.status(200).send({ data: file });
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
module.exports = {
  uploadFile,
  fileList,
  fileDetail,
  deleteFile,
};
