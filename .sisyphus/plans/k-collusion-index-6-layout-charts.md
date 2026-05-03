# K-Collusion Index - Part 6: Layout & Recharts#

## TL;DR#
> **Part 6**: 대시보드 레이아웃 + Recharts 시각화 컴포넌트#
> **Tasks**: Task 8, Task 9#
> **Agent**: visual-engineering, quick#

---

## Context#

### Prerequisites:
- Task 1 완료: Next.js 프로젝트 초기화됨#
- Task 4 완료: TypeScript 타입 정의됨 (app/types/oecd.ts)#
- Task 6 완료: 지수 계산 모듈됨 (python/index_calculator.py)#

---

## TODOs#

- [ ] 8. 대시보드 레이아웃 + 네비게이션#

  **What to do**:#
  - `app/dashboard/layout.tsx` 생성 (대시보드 전용 레이아웃)#
  - `app/dashboard/page.tsx` 기본 구조 (나중에 Task 11에서 확장)#
  - 공통 레이아웃 컴포넌트:#
    - 헤더 (제목: "K-Collusion Index - 한국 물가 국제 비교")#
    - 네비게이션 (홈, 대시보드, 데이터 다운로드)#
  - 한국어 텍스트 적용#
  - 반응형 디자인 기본 적용#

  **Must NOT do**:#
  - 복잡한 스타일링 (Tailwind 사용하지 않음)#
  - 차트 컴포넌트 여기서 구현하지 않음 (Task 9에서)#

  **Recommended Agent Profile**:#
  - **Category**: `visual-engineering`#
    - Reason: UI 레이아웃과 구조 설계#
  - **Skills**: []#

  **Parallelization**:#
  - **Can Run In Parallel**: YES (within Wave 2)#
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 9, 10)#
  - **Blocks**: Task 11#
  - **Blocked By**: Task 1 (Next.js 프로젝트), Task 4 (타입 - 선택적)#

  **References**:#
  - Next.js App Router 레이아웃: https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#
  - `app/layout.tsx` - 루트 레이아웃 참조#

  **Acceptance Criteria**:#
  - [ ] `npm run build` 성공#
  - [ ] `/dashboard` 경로 접속 시 페이지 렌더링#
  - [ ] 한국어 텍스트 표시됨#

  **QA Scenarios**:#
  ```#
  Scenario: 대시보드 페이지 렌더링#
    Tool: Playwright#
    Preconditions: Next.js 빌드 완료 (npm run build && npm start)#
    Steps:#
      1. 페이지 접속: http://localhost:3000/dashboard#
      2. 제목 "K-Collusion Index" 표시 확인#
      3. 스크린샷 캡처#
    Expected Result: 페이지 로드, 한국어 텍스트 표시, 레이아웃 정상#
    Failure Indicators: 404 에러, 빈 페이지, 언어 오류#
    Evidence: .sisyphus/evidence/task-8-dashboard-page.png#

  Scenario: 네비게이션 링크 확인#
    Tool: Playwright#
    Preconditions: 대시보드 페이지 로드됨#
    Steps:#
      1. 네비게이션 바에서 "홈" 링크 찾기#
      2. 링크 클릭 → 홈으로 이동 확인#
    Expected Result: 홈(/) 또는 대시보드(/dashboard)로 이동#
    Evidence: .sisyphus/evidence/task-8-navigation.txt#
  ```#

  **Evidence to Capture:**#
  - [ ] .sisyphus/evidence/task-8-dashboard-page.png#
  - [ ] .sisyphus/evidence/task-8-navigation.txt#

  **Commit**: YES#
  - Message: `feat(ui): implement dashboard layout and navigation`#
  - Files: app/dashboard/layout.tsx, app/dashboard/page.tsx#
  - Pre-commit: npm run build#

---

- [ ] 9. Recharts 시각화 컴포넌트#

  **What to do**:#
  - `app/components/BarChart.tsx` - 막대그래프 컴포넌트 ("use client")#
  - `app/components/RankingTable.tsx` - 순위표 컴포넌트 ("use client")#
  - Recharts BarChart 사용:#
    - X축: 국가명, Y축: K-Collusion 지수 값#
    - 한국을 기준선(100)으로 표시#
    - 데이터 props로 받아 시각화#
    - 기본 스타일링 (인라인 스타일 또는 CSS)#

  **Must NOT do**:#
  - Server Component에서 Recharts 사용하지 않음 (반드시 "use client")#
  - 복잡한 상호작용 (필터링, 정렬) - 기본 기능만#

  **Recommended Agent Profile**:#
  - **Category**: `visual-engineering`#
    - Reason: Recharts를 사용한 시각화 컴포넌트 구현#
  - **Skills**: []#

  **Parallelization**:#
  - **Can Run In Parallel**: YES (within Wave 2)#
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 10)#
  - **Blocks**: Task 11#
  - **Blocked By**: Task 4 (타입 정의)#

  **References**:#
  - Recharts 공식 문서: https://recharts.org/en-US/api/BarChart#
  - `app/types/oecd.ts` - ChartDataItem 타입 참조#

  **Acceptance Criteria**:#
  - [ ] `npx tsc --noEmit` 성공#
  - [ ] BarChart와 RankingTable 컴포넌트가 props로 데이터 받음#
  - [ ] "use client" 지시어 포함됨#

  **QA Scenarios**:#
  ```#
  Scenario: BarChart 컴포넌트 렌더링#
    Tool: Playwright#
    Preconditions: 컴포넌트 구현됨, 테스트 페이지 생성#
    Steps:#
      1. 샘플 데이터로 BarChart 렌더링#
      2. 차트 컨테이너 확인 (role="img" 또는 chart)#
      3. 스크린샷 캡처#
    Expected Result: 막대그래프 표시, X축에 국가명, Y축에 값#
    Evidence: .sisyphus/evidence/task-9-bar-chart.png#

  Scenario: RankingTable 컴포넌트 테스트#
    Tool: Playwright#
    Preconditions: 컴포넌트 구현됨#
    Steps:#
      1. 샘플 데이터로 RankingTable 렌더링#
      2. 테이블 행 개수 확인 (G20 20개국)#
      3. 한국(KOR) 행 찾기 (index_value=100)#
    Expected Result: 20개 행, 한국이 100으로 표시됨#
    Evidence: .sisyphus/evidence/task-9-ranking-table.txt#
  ```#

  **Evidence to Capture:**#
  - [ ] .sisyphus/evidence/task-9-bar-chart.png#
  - [ ] .sisyphus/evidence/task-9-ranking-table.txt#

  **Commit**: YES#
  - Message: `feat(ui): create Recharts visualization components`#
  - Files: app/components/BarChart.tsx, app/components/RankingTable.tsx#
  - Pre-commit: npx tsc --noEmit#

---

## Evidence Directory Structure#
```#
.sisyphus/evidence/#
  task-8-dashboard-page.png#
  task-8-navigation.txt#
  task-9-bar-chart.png#
  task-9-ranking-table.txt#
```#

## Next Part#
After Part 6 completes, proceed to Part 7: Export, Main Page, Error Handling (Tasks 10, 11, 14)#
