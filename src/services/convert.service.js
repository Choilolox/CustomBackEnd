const Joi = require("joi");
const Rate = require("../models/rate.model");
const Conversion = require("../models/conversion.model");
const rabbit = require("../utils/rabbit");

const schema = Joi.object({
  from: Joi.string().required(),
  to: Joi.string().required(),
  amount: Joi.number().positive().required()
});

class ConvertService {
  async create(data) {
    const { error } = schema.validate(data);
    if (error) throw new Error(error.details[0].message);

    const fromRate = await Rate.findOne({ symbol: data.from });
    const toRate = await Rate.findOne({ symbol: data.to });
    if (!fromRate || !toRate) throw new Error("Rate not available");

    const result = (data.amount / fromRate.value) * toRate.value;

    const conversion = await Conversion.create({
      ...data,
      result
    });

    await rabbit.publish("conversions", conversion);

    return conversion;
  }
}

module.exports = new ConvertService();