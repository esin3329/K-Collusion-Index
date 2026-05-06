import DashboardClient from "@/app/components/DashboardClient";

export const metadata = {
  title: "K-Collusion Index",
  description: "G20 countries compared against Korea's relative price index.",
};

export default function Home() {
  return <DashboardClient />;
}
