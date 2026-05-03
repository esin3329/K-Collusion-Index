import { test, expect } from '@playwright/test';

test.describe('K-Collusion Index Dashboard', () => {
  test('대시보드 페이지가 정상적으로 로드된다', async ({ page }) => {
    await page.goto('/dashboard');

    // 페이지 제목 확인
    await expect(page).toHaveTitle(/K-Collusion Index/);

    // 헤더 텍스트 확인
    await expect(page.locator('h2')).toContainText('한국 물가 국제 비교');
  });

  test('통계 요약이 표시된다', async ({ page }) => {
    await page.goto('/dashboard');

    // 통계 박스 확인
    await expect(page.locator('text=기준 국가')).toBeVisible();
    await expect(page.locator('text=평균 지수')).toBeVisible();
    await expect(page.locator('text=최고 물가')).toBeVisible();
    await expect(page.locator('text=최저 물가')).toBeVisible();
  });

  test('차트가 표시된다', async ({ page }) => {
    await page.goto('/dashboard');

    // 차트 섹션 확인
    await expect(page.locator('text=물가 지수 비교')).toBeVisible();

    // Recharts 차트 컨테이너 확인
    await expect(page.locator('.recharts-wrapper')).toBeVisible({ timeout: 10000 });
  });

  test('순위 테이블이 표시된다', async ({ page }) => {
    await page.goto('/dashboard');

    // 테이블 섹션 확인
    await expect(page.locator('text=국가별 순위')).toBeVisible();

    // 테이블 행 확인 (최소 10개 이상의 국가)
    const rows = page.locator('table tbody tr');
    await expect(rows).toHaveCount(20); // G20 20개국
  });

  test('한국이 100으로 표시된다', async ({ page }) => {
    await page.goto('/dashboard');

    // 한국이 기준(100)으로 표시되는지 확인
    await expect(page.locator('text=대한민국 (100)')).toBeVisible();
  });

  test('내보내기 링크가 작동한다', async ({ page }) => {
    await page.goto('/dashboard');

    // CSV 다운로드 링크 확인
    const csvLink = page.locator('a:has-text("CSV 다운로드")');
    await expect(csvLink).toBeVisible();
    await expect(csvLink).toHaveAttribute('href', '/api/export?format=csv');

    // JSON 다운로드 링크 확인
    const jsonLink = page.locator('a:has-text("JSON 다운로드")');
    await expect(jsonLink).toBeVisible();
    await expect(jsonLink).toHaveAttribute('href', '/api/export?format=json');
  });

  test('API 응답이 올바른 구조를 갖는다', async ({ page }) => {
    const response = await page.request.get('/api/oecd');
    expect(response.ok()).toBeTruthy();

    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.data).toBeDefined();
    expect(Array.isArray(json.data)).toBe(true);

    // 첫 번째 데이터 항목의 구조 확인
    if (json.data.length > 0) {
      const item = json.data[0];
      expect(item.countryCode).toBeDefined();
      expect(item.countryName).toBeDefined();
      expect(item.indexValue).toBeDefined();
      expect(item.baseYear).toBeDefined();
    }
  });

  test('한국의 지수가 100이다', async ({ page }) => {
    const response = await page.request.get('/api/oecd');
    const json = await response.json();

    const koreaData = json.data.find((item: any) => item.countryCode === 'KOR');
    expect(koreaData).toBeDefined();
    expect(koreaData.indexValue).toBe(100);
  });
});