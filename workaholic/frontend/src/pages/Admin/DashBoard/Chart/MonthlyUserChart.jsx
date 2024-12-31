import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function MonthlyUserChart({ userMonthlyData }) {
  const data = userMonthlyData.map((dt) => ({ name: `Tháng ${dt.month}`, value: dt.userCount }));

  return (
    <div className="w-full h-full flex justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis className="text-sm" dataKey="name" />
          <YAxis />
          <Tooltip labelClassName="text-black" />
          <Legend
            formatter={() => "Số lượng người đăng ký mới"} // Custom legend text
          />
          <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
