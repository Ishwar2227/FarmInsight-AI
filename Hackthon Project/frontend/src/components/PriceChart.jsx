import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const PriceChart = ({ data }) => {
  const formatted = data.map((item) => ({
    ...item,
    dateLabel: new Date(item.date).toLocaleDateString(),
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <AreaChart data={formatted}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2E7D32" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="dateLabel" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Area type="monotone" dataKey="price" stroke="#2E7D32" fillOpacity={1} fill="url(#colorPrice)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;


