const MarketData = require('../models/MarketData');

/**
 * Returns dummy market prices with trend data.
 */
const getMarketPrices = async (req, res, next) => {
  try {
    const defaultData = [
      { cropName: 'Wheat', price: 2100, date: new Date() },
      { cropName: 'Rice', price: 2500, date: new Date() },
      { cropName: 'Maize', price: 1850, date: new Date() },
      { cropName: 'Soybean', price: 4300, date: new Date() },
    ];

    const marketData = await MarketData.find().sort({ date: -1 }).limit(20);
    const responseData = marketData.length ? marketData : defaultData;

    res.json({
      success: true,
      data: responseData,
      message: 'Latest market prices fetched successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMarketPrices };


