import { useState } from 'react';
import { requestIrrigationSuggestion } from '../services/dataService';

const IrrigationGuidance = () => {
  const [form, setForm] = useState({ cropType: '', soilMoisture: 50, upcomingRain: false });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await requestIrrigationSuggestion({
        ...form,
        soilMoisture: Number(form.soilMoisture),
      });
      setResult(response.data);
    } catch (error) {
      console.error('Irrigation suggestion failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-2xl font-semibold text-slate-900">Smart Irrigation Guidance</h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-600">Crop Type</label>
            <input
              name="cropType"
              value={form.cropType}
              onChange={handleChange}
              placeholder="e.g. Wheat"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600">Soil Moisture (%)</label>
            <input
              type="number"
              name="soilMoisture"
              value={form.soilMoisture}
              onChange={handleChange}
              min="0"
              max="100"
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2"
              required
            />
          </div>
          <label className="flex items-center space-x-2 text-sm font-medium text-slate-600">
            <input
              type="checkbox"
              name="upcomingRain"
              checked={form.upcomingRain}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300"
            />
            <span>Rain expected in the next 24h</span>
          </label>
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-slate-200"
            disabled={loading}
          >
            {loading ? 'Calculating...' : 'Get Suggestion'}
          </button>
        </form>
      </div>
      {result && (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Recommendation</h3>
          <p className="mt-2 text-sm text-slate-700">{result.recommendation}</p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-600">
            {result.tips?.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IrrigationGuidance;


