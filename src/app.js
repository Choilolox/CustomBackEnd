require("dotenv").config();
const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const mongoose = require("mongoose");

const ratesService = require("./services/rates.service");
const convertService = require("./services/convert.service");
const reportService = require("./services/report.service");

const app = express(feathers());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/currency-api");

app.get("/", (req, res) => res.send("Currency Conversion API 🚀"));

app.get("/rates", async (req, res) => res.json(await ratesService.find()));
app.post("/rates", async (req, res) => {
  try {
    const result = await ratesService.create(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/convert", async (req, res) => {
  try {
    const result = await convertService.create(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/report", async (req, res) => {
  try {
    const buffer = await reportService.find();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.errorHandler());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

module.exports = app;