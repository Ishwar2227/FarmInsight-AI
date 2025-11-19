import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import WeatherChart from '../components/WeatherChart';
import AlertCard from '../components/AlertCard';
import { fetchAlerts, fetchMarketPrices, fetchWeather } from '../services/dataService';

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [market, setMarket] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [weatherRes, marketRes, alertRes] = await Promise.all([
          fetchWeather(),
          fetchMarketPrices(),
          fetchAlerts(),
        ]);
        setWeather(weatherRes.data);
        setMarket(marketRes.data);
        setAlerts(alertRes.data);
      } catch (error) {
        console.error('Failed to load overview data', error);
        setWeather({
          current: { temperature: 28, humidity: 60, rainfallChance: 30 },
          history: [],
        });
        setMarket([]);
        setAlerts([]);
      }
    };
    loadData();
  }, []);

  const stats = [
    {
      title: 'Current Temperature',
      value: weather?.current?.temperature ? `${weather.current.temperature} °C` : '—',
      icon: '🌤️',
      description: 'Live field condition',
    },
    {
      title: 'Humidity',
      value: weather?.current?.humidity ? `${weather.current.humidity}%` : '—',
      icon: '💧',
      description: 'Soil & air moisture',
    },
    {
      title: 'Market Highlights',
      value: `${market.length} crops`,
      icon: '📈',
      description: 'Updated price trends',
    },
  ];

  const shortcuts = [
    { label: 'Weather', to: '/weather', icon: '🌦️' },
    { label: 'Pest Detection', to: '/pest-detection', icon: '🪲' },
    { label: 'Irrigation', to: '/irrigation', icon: '💧' },
    { label: 'Market', to: '/market', icon: '📊' },
  ];

  return (
    <div className="space-y-8">
      <motion.section
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-dark to-primary px-6 py-10 text-white shadow-glow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-y-0 right-0 w-1/2 bg-grid-pattern opacity-30" />
        <div className="relative max-w-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">Smart insights</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">{t('welcome')}</h1>
          <p className="mt-3 text-base text-white/80">{t('tagline')}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {shortcuts.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/25"
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="absolute inset-y-0 right-6 hidden w-1/3 items-center justify-center md:flex">
          <div className="h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        </div>
      </motion.section>

      <motion.section
        className="grid gap-4 md:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </motion.section>

      <motion.section
        className="rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Weather Performance</h2>
            <p className="text-sm text-slate-500">Temperature & humidity over the past week</p>
          </div>
        </div>
        {weather?.history?.length ? (
          <WeatherChart data={weather.history} />
        ) : (
          <p className="mt-4 text-sm text-slate-500">Insufficient weather data available.</p>
        )}
      </motion.section>

      <motion.section
        className="rounded-3xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-100 backdrop-blur"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Latest Alerts</h2>
          <p className="text-sm text-slate-500">Field-ready notifications</p>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {alerts.length ? (
            alerts.map((alert, idx) => <AlertCard key={idx} {...alert} />)
          ) : (
            <p className="text-sm text-slate-500">No alerts available.</p>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;

