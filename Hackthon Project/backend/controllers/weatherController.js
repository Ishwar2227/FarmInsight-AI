const WeatherLog = require('../models/WeatherLog');

/**
 * Returns dummy current weather data with recent logs for charting.
 */
const getTodayWeather = async (req, res, next) => {
  try {
    const dummyData = {
      location: req.query.location || 'Sample Village',
      temperature: 28,
      humidity: 65,
      rainfallChance: 45,
      windSpeed: 8,
      conditions: 'Partly Cloudy',
      updatedAt: new Date(),
    };

    // Fetch last 7 logs if available, otherwise craft synthetic ones
    const logs = await WeatherLog.find().sort({ date: -1 }).limit(7);

    const history =
      logs.length > 0
        ? logs
        : Array.from({ length: 7 }).map((_, idx) => ({
            temperature: 25 + idx,
            humidity: 60 + idx,
            date: new Date(Date.now() - idx * 86400000),
          }));

    res.json({
      success: true,
      data: {
        current: dummyData,
        history,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTodayWeather };


