"use client";

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartDataItem } from "../types/oecd";

interface BarChartProps {
  data: ChartDataItem[];
}

export default function BarChart({ data }: BarChartProps) {
  return (
    <div style={{ width: "100%", height: "420px", margin: "20px 0" }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 70,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={90}
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis label={{ value: "K-Collusion Index", angle: -90, position: "insideLeft" }} />
          <Tooltip
            formatter={(value) => [
              typeof value === "number" ? value.toFixed(2) : value,
              "Index",
            ]}
            labelStyle={{ color: "#333" }}
          />
          <ReferenceLine y={100} stroke="#dc2626" strokeDasharray="3 3" label="Korea (100)" />
          <Bar dataKey="value" name="K-Collusion Index">
            {data.map((entry) => (
              <Cell
                key={entry.countryCode}
                fill={entry.countryCode === "KOR" ? "#ea580c" : "#2563eb"}
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
