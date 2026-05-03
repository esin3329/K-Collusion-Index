import DashboardClient from '@/app/components/DashboardClient';

export const metadata = {
  title: '대시보드 | K-Collusion Index',
  description: 'G20 국가들과 한국의 물가 수준을 비교하는 대시보드입니다.',
};

export default function DashboardPage() {
  return <DashboardClient />;
}