const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  value: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Rate", rateSchema);