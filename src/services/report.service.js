const Conversion = require("../models/conversion.model");
const pdf = require("../utils/pdf");

class ReportService {
  async find() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const conversions = await Conversion.find({ createdAt: { $gte: today } });
    return pdf.generate(conversions);
  }
}

module.exports = new ReportService();