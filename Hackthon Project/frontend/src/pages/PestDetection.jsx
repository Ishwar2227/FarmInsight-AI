import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import { uploadPestImage } from '../services/dataService';

const PestDetection = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files?.[0]);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    try {
      const response = await uploadPestImage(formData);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-2xl font-semibold text-slate-900">AI Pest & Disease Detection</h2>
        <p className="mt-2 text-sm text-slate-500">Upload a clear image of the affected crop area.</p>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <ImageUploader onChange={handleFileChange} fileName={file?.name} />
          <button
            type="submit"
            disabled={!file || loading}
            className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-slate-200"
          >
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </button>
        </form>
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
      </div>
      {result && (
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900">Result</h3>
          <p className="mt-2 text-sm text-slate-700">
            <strong>Probable Disease:</strong> {result.probableDisease}
          </p>
          <p className="mt-1 text-sm text-slate-700">
            <strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%
          </p>
          <p className="mt-2 text-sm text-slate-600">{result.recommendedAction}</p>
        </div>
      )}
    </div>
  );
};

export default PestDetection;


