const mongoose = require('mongoose');

const marketDataSchema = new mongoose.Schema(
  {
    cropName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MarketData', marketDataSchema);


