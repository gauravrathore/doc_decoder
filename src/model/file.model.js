const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const PdfFile = mongoose.model("PdfFile", fileSchema);

module.exports = { PdfFile };
