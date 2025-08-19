const mongoose = require("mongoose");

const conversionSchema = new mongoose.Schema({
  from: String,
  to: String,
  amount: Number,
  result: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Conversion", conversionSchema);