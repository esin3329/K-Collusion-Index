import Link from 'next/link';
import styles from './layout.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>K-Collusion Index - 한국 물가 비교</h1>
      </header>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={styles.navItem}>
              홈
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className={styles.navItem}>
              대시보드
            </Link>
          </li>
          <li>
            <Link href="/dashboard/download" className={styles.navItem}>
              데이터 다운로드
            </Link>
          </li>
        </ul>
      </nav>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
