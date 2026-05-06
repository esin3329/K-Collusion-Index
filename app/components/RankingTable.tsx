"use client";

import { ChartDataItem } from "../types/oecd";

interface RankingTableProps {
  data: ChartDataItem[];
}

export default function RankingTable({ data }: RankingTableProps) {
  const sortedData = [...data].sort((a, b) => a.rank - b.rank);

  return (
    <div style={{ overflowX: "auto", margin: "20px 0" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          fontFamily: "sans-serif",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f8fafc", borderBottom: "2px solid #cbd5e1" }}>
            <th style={cellStyle}>순위</th>
            <th style={cellStyle}>국가</th>
            <th style={cellStyle}>지수</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr
              key={item.countryCode}
              style={{
                borderBottom: "1px solid #e2e8f0",
                backgroundColor: item.countryCode === "KOR" ? "#fff7ed" : "transparent",
                fontWeight: item.countryCode === "KOR" ? "bold" : "normal",
              }}
            >
              <td style={cellStyle}>{item.rank}</td>
              <td style={cellStyle}>{item.name}</td>
              <td style={cellStyle}>{item.value.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  padding: "12px",
  borderBottom: "1px solid #e2e8f0",
};
