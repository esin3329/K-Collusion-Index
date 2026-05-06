"use client";

import { useEffect, useMemo, useState } from "react";
import BarChart from "@/app/components/BarChart";
import ErrorDisplay from "@/app/components/ErrorDisplay";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import RankingTable from "@/app/components/RankingTable";
import { ChartDataItem, KCollusionIndex } from "@/app/types/oecd";

type DataFile = {
  success: boolean;
  data?: KCollusionIndex[];
  error?: string;
  timestamp?: string;
  baseYear?: number;
};

export default function DashboardClient() {
  const [data, setData] = useState<KCollusionIndex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/data/k-collusion-index.json", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`데이터 파일을 찾을 수 없습니다. (${res.status})`);
      }

      const json = (await res.json()) as DataFile;

      if (!json.success || !json.data) {
        throw new Error(json.error || "데이터가 없습니다.");
      }

      setData(json.data);
      setLastUpdated(json.timestamp || null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "데이터를 불러오는 과정에서 오류가 발생했습니다.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData: ChartDataItem[] = useMemo(
    () =>
      [...data]
        .sort((a, b) => b.indexValue - a.indexValue)
        .map((item, index) => ({
          name: item.countryName,
          value: item.indexValue,
          rank: index + 1,
          countryCode: item.countryCode,
        })),
    [data],
  );

  const koreaData = data.find((item) => item.countryCode === "KOR");
  const avgIndex =
    data.length > 0
      ? data.reduce((sum, item) => sum + item.indexValue, 0) / data.length
      : 0;
  const highestCountry =
    data.length > 0
      ? data.reduce((max, item) =>
          item.indexValue > max.indexValue ? item : max,
        )
      : null;
  const lowestCountry =
    data.length > 0
      ? data.reduce((min, item) =>
          item.indexValue < min.indexValue ? item : min,
        )
      : null;

  const downloadCsv = () => {
    const csvHeader = "countryCode,countryName,indexValue,baseYear\n";
    const csvRows = data
      .map(
        (item) =>
          `${item.countryCode},"${item.countryName}",${item.indexValue},${item.baseYear}`,
      )
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "k-collusion-index.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={fetchData} />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <section style={{ borderBottom: "2px solid #e2e8f0", paddingBottom: "1.5rem" }}>
        <h2
          style={{
            fontSize: "2rem",
            color: "#1e293b",
            marginBottom: "0.5rem",
            fontWeight: 700,
          }}
        >
          한국 물가 국제 비교
        </h2>
        <p style={{ color: "#64748b", fontSize: "1.05rem", lineHeight: 1.6 }}>
          대한민국을 기준값 100으로 두고 G20 주요 국가의 상대 물가 수준을 비교합니다.
        </p>
        {lastUpdated && (
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: "0.5rem" }}>
            마지막 업데이트: {new Date(lastUpdated).toLocaleString("ko-KR")}
          </p>
        )}
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
        }}
      >
        <MetricCard label="기준 국가" value={`${koreaData?.countryName || "대한민국"} (100)`} />
        <MetricCard label="평균 지수" value={avgIndex.toFixed(1)} />
        <MetricCard
          label="최고 물가"
          value={
            highestCountry
              ? `${highestCountry.countryName} (${highestCountry.indexValue.toFixed(1)})`
              : "-"
          }
        />
        <MetricCard
          label="최저 물가"
          value={
            lowestCountry
              ? `${lowestCountry.countryName} (${lowestCountry.indexValue.toFixed(1)})`
              : "-"
          }
        />
      </section>

      <section style={panelStyle}>
        <h3 style={headingStyle}>물가 지수 비교 차트</h3>
        <BarChart data={chartData} />
      </section>

      <section style={panelStyle}>
        <h3 style={headingStyle}>국가별 순위</h3>
        <RankingTable data={chartData} />
      </section>

      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <button type="button" onClick={downloadCsv} style={buttonStyle}>
          CSV 다운로드
        </button>
        <a href="/data/k-collusion-index.json" download style={buttonStyle}>
          JSON 다운로드
        </a>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: "#1e3a8a",
        borderRadius: "8px",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        boxShadow: "0 4px 6px rgba(15, 23, 42, 0.12)",
      }}
    >
      <span style={{ color: "#bfdbfe", fontSize: "0.9rem" }}>{label}</span>
      <span style={{ color: "white", fontSize: "1.25rem", fontWeight: 700 }}>
        {value}
      </span>
    </div>
  );
}

const panelStyle = {
  background: "white",
  borderRadius: "8px",
  padding: "1.5rem",
  boxShadow: "0 2px 4px rgba(15, 23, 42, 0.06)",
  border: "1px solid #e2e8f0",
};

const headingStyle = {
  fontSize: "1.25rem",
  color: "#1e293b",
  marginBottom: "1rem",
  fontWeight: 700,
  borderLeft: "4px solid #2563eb",
  paddingLeft: "0.75rem",
};

const buttonStyle = {
  display: "inline-block",
  padding: "0.75rem 1.5rem",
  backgroundColor: "#15803d",
  color: "white",
  textDecoration: "none",
  borderRadius: "8px",
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
};
