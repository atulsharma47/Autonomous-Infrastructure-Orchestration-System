import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function AnalyticsChart({ data, color, title }) {
  return (
    <div
      className="
      bg-[#071018]
      border border-white/5
      rounded-3xl
      p-5
      h-65
      "
    >

      <div className="mb-6">

        <h2 className="text-white text-lg font-semibold">
          {title}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Real-time operational analytics
        </p>

      </div>

      <ResponsiveContainer width="100%" height="70%">

        <LineChart data={data}>

          <Tooltip
            contentStyle={{
              background: "#020617",
              border: "1px solid #1e293b",
              borderRadius: "16px",
              color: "white",
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={3}
            dot={false}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AnalyticsChart;