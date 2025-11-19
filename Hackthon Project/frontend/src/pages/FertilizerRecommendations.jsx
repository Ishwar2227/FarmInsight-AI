const recommendations = [
  {
    crop: 'Rice',
    stage: 'Vegetative',
    nutrients: 'Apply 50 kg Nitrogen, 30 kg Phosphorus, 20 kg Potassium per acre',
    tips: 'Split nitrogen doses to minimize losses and ensure proper puddling.',
  },
  {
    crop: 'Wheat',
    stage: 'Tillering',
    nutrients: 'Use 40 kg Nitrogen and 25 kg Phosphorus per acre.',
    tips: 'Apply zinc sulphate if chlorosis observed; irrigate lightly after application.',
  },
  {
    crop: 'Sugarcane',
    stage: 'Grand growth',
    nutrients: '80 kg Nitrogen, 40 kg Phosphorus, 40 kg Potassium per acre.',
    tips: 'Add farmyard manure to boost microbial activity.',
  },
];

const FertilizerRecommendations = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">Fertilizer Recommendations</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {recommendations.map((item) => (
          <div key={item.crop} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase text-slate-400">{item.stage}</p>
                <p className="text-xl font-semibold text-slate-900">{item.crop}</p>
              </div>
              <span className="text-3xl">🧪</span>
            </div>
            <p className="mt-3 text-sm text-slate-700">{item.nutrients}</p>
            <p className="mt-2 text-sm text-slate-500">{item.tips}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FertilizerRecommendations;


