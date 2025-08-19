const axios = require("axios");
const Joi = require("joi");
const Rate = require("../models/rate.model");

const schema = Joi.object({
  symbol: Joi.string().required(),
  value: Joi.number().positive().required()
});

class RatesService {
  async find() {
    return Rate.find();
  }

  async create(data) {
    const { error } = schema.validate(data);
    if (error) throw new Error(error.details[0].message);

    return Rate.findOneAndUpdate(
      { symbol: data.symbol },
      { value: data.value, updatedAt: Date.now() },
      { upsert: true, new: true }
    );
  }

  async fetchFromAPI() {
    const res = await axios.get("https://api.coingecko.com/api/v3/exchange_rates");
    const rates = res.data.rates;

    for (const [symbol, obj] of Object.entries(rates)) {
      await Rate.findOneAndUpdate(
        { symbol: symbol.toUpperCase() },
        { value: obj.value, updatedAt: Date.now() },
        { upsert: true }
      );
    }
  }
}

module.exports = new RatesService();