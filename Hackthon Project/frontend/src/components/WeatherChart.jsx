import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';

const WeatherChart = ({ data }) => {
  const formatted = data.map((item) => ({
    ...item,
    dateLabel: new Date(item.date).toLocaleDateString(),
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <LineChart data={formatted}>
          <XAxis dataKey="dateLabel" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#2E7D32" strokeWidth={2} />
          <Line type="monotone" dataKey="humidity" stroke="#F9A825" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeatherChart;


