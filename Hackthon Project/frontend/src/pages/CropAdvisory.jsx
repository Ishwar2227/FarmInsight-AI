import { useEffect, useState } from 'react';
import { fetchCropAdvisory } from '../services/dataService';
import Loader from '../components/Loader';

const CropAdvisory = () => {
  const [advisories, setAdvisories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdvisory = async () => {
      try {
        const response = await fetchCropAdvisory();
        setAdvisories(response.data);
      } catch (error) {
        console.error('Advisory fetch failed', error);
      } finally {
        setLoading(false);
      }
    };
    loadAdvisory();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">Crop Advisory</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {advisories.map((item, idx) => (
          <div key={idx} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase text-slate-400">{item.stage}</p>
                <p className="text-xl font-semibold text-slate-900">{item.crop}</p>
              </div>
              <span className="text-3xl">🌱</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{item.recommendation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropAdvisory;


