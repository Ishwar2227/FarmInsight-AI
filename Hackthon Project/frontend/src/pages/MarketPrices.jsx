import { useEffect, useState } from 'react';
import { fetchMarketPrices } from '../services/dataService';
import PriceChart from '../components/PriceChart';
import Loader from '../components/Loader';

const MarketPrices = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPrices = async () => {
      try {
        const response = await fetchMarketPrices();
        setPrices(response.data);
      } catch (error) {
        console.error('Market prices error', error);
      } finally {
        setLoading(false);
      }
    };
    loadPrices();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-2xl font-semibold text-slate-900">Market Price Trends</h2>
        {prices.length ? (
          <PriceChart data={prices} />
        ) : (
          <p className="mt-3 text-sm text-slate-500">No market data available.</p>
        )}
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h3 className="text-xl font-semibold text-slate-900">Latest Prices</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="py-2">Crop</th>
                <th className="py-2">Price (₹/quintal)</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {prices.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2">{item.cropName}</td>
                  <td className="py-2 font-semibold text-slate-900">{item.price}</td>
                  <td className="py-2">{new Date(item.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarketPrices;


