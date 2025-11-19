import { useEffect, useState } from 'react';
import WeatherChart from '../components/WeatherChart';
import { fetchWeather } from '../services/dataService';
import Loader from '../components/Loader';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const response = await fetchWeather();
        setWeatherData(response.data);
      } catch (error) {
        console.error('Weather fetch failed', error);
      } finally {
        setLoading(false);
      }
    };
    loadWeather();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-2xl font-semibold">Today&apos;s Weather</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <WeatherMetric label="Temperature" value={`${weatherData?.current?.temperature ?? '--'} °C`} />
          <WeatherMetric label="Humidity" value={`${weatherData?.current?.humidity ?? '--'} %`} />
          <WeatherMetric label="Rainfall Chance" value={`${weatherData?.current?.rainfallChance ?? '--'} %`} />
          <WeatherMetric label="Wind Speed" value={`${weatherData?.current?.windSpeed ?? '--'} km/h`} />
        </div>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h3 className="text-xl font-semibold text-slate-900">7-day trend</h3>
        {weatherData?.history?.length ? (
          <WeatherChart data={weatherData.history} />
        ) : (
          <p className="text-sm text-slate-500">No history data available.</p>
        )}
      </div>
    </div>
  );
};

const WeatherMetric = ({ label, value }) => (
  <div className="rounded-xl border border-slate-100 p-4 text-center">
    <p className="text-sm text-slate-500">{label}</p>
    <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
  </div>
);

export default WeatherDashboard;


