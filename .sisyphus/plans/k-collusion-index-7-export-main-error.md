# K-Collusion Index - Part 7: Export, Main Page, Error Handling#

## TL;DR#
> **Part 7**: 데이터 내보내기, 메인 대시보드, 에러 처리#
> **Tasks**: Task 10, Task 11, Task 14#
> **Agent**: quick, visual-engineering#

---

## Context#

### Prerequisites:
- Task 6 완료: 지수 계산 모듈 (python/index_calculator.py)#
- Task 7 완료: API 라우트 (app/api/oecd/route.ts)#
- Task 8-9 완료: 레이아웃 & Recharts 컴포넌트#

---

## TODOs#

- [ ] 10. 데이터셋 내보내기 기능#

  **What to do**:#
  - `app/api/export/route.ts` 생성#
  - CSV/JSON 다운로드 엔드포인트:#
    - `/api/export?format=csv` - CSV 파일 다운로드#
    - `/api/export?format=json` - JSON 파일 다운로드#
    - 파일 이름: `k-collusion-index-YYYYMMDD.csv/json`#
    - HTTP 헤더 설정 (Content-Disposition, Content-Type)#

  **Must NOT do**:#
  - 데이터 변환 로직 포함하지 않음 (이미 계산된 데이터 사용)#
  - 압축 파일 생성하지 않음 (단순 파일 다운로드만)#

  **Recommended Agent Profile**:#
  - **Category**: `quick`#
    - Reason: API 라우트에서 파일 다운로드 제공#

  **Parallelization**:#
  - **Can Run In Parallel**: YES (within Wave 2)#
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 9)#
  - **Blocks**: Task 11 (데이터 다운로드 링크)#
  - **Blocked By**: Task 6 (지수 계산 완료, 데이터 파일 존재)#

  **References**:#
  - Next.js Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/route-handlers#
  - `app/api/oecd/route.ts` - API 라우트 패턴 참조#

  **Acceptance Criteria**:#
  - [ ] `curl http://localhost:3000/api/export?format=csv` → CSV 파일 다운로드#
  - [ ] `curl http://localhost:3000/api/export?format=json` → JSON 파일 다운로드#
  - [ ] 파일 이름에 날짜 포함됨#

  **QA Scenarios**:#
  ```#
  Scenario: CSV 다운로드 테스트#
    Tool: Bash (curl)#
    Preconditions: Next.js 서버 실행 중, 데이터 파일 존재#
    Steps:#
      1. curl -OJ "http://localhost:3000/api/export?format=csv"#
      2. ls -l k-collusion-index-*.csv#
    Expected Result: CSV 파일 다운로드, 내용에 countryCode, indexValue 포함#
    Evidence: .sisyphus/evidence/task-10-export-csv.csv#

  Scenario: JSON 다운로드 테스트#
    Tool: Bash (curl)#
    Preconditions: JSON 데이터 존재#
    Steps:#
      1. curl "http://localhost:3000/api/export?format=json" | jq '.[0]'#
    Expected Result: JSON 배열 출력, 첫 번째 요소에 countryCode 포함#
    Evidence: .sisyphus/evidence/task-10-export-json.json#
  ```#

  **Evidence to Capture:**#
  - [ ] .sisyphus/evidence/task-10-export-csv.csv#
  - [ ] .sisyphus/evidence/task-10-export-json.json#

  **Commit**: YES#
  - Message: `feat(api): add dataset export functionality`#
  - Files: app/api/export/route.ts#

---

- [ ] 11. 메인 대시보드 페이지 구현#

  **What to do**:#
  - `app/dashboard/page.tsx` 완성#
  - API에서 데이터 페칭 (서버 사이드 또는 클라이언트)#
  - BarChart와 RankingTable 컴포넌트 통합#
  - 데이터 섬머리 통계 표시:#
    - 한국과 가장 물가가 높은 나라#
    - 한국과 가장 물가가 낮은 나라#
    - 평균 지수#
  - 한국어 레이블 적용#

  **Must NOT do**:#
  - 클라이언트 사이드에서만 데이터 페칭 (SEO 고려, 서버 컴포넌트 활용)#
  - 과도한 애니메이션 (단순하고 빠른 로딩)#

  **Recommended Agent Profile**:#
  - **Category**: `visual-engineering`#
    - Reason: 대시보드 UI 통합 및 데이터 시각화#

  **Parallelization**:#
  - **Can Run In Parallel**: NO (다른 작업들 완료 필요)#
  - **Parallel Group**: Wave 3 (with Tasks 12, 13, 14)#
  - **Blocks**: Task 13 (Playwright 테스트)#
  - **Blocked By**: Task 7 (API), Task 8 (레이아웃), Task 9 (컴포넌트), Task 10 (데이터)#

  **References**:#
  - `app/components/BarChart.tsx` - 막대그래프 컴포넌트#
  - `app/components/RankingTable.tsx` - 순위표 컴포넌트#
  - `app/api/oecd/route.ts` - 데이터 API#

  **Acceptance Criteria**:#
  - [ ] `npm run build` 성공#
  - [ ] `/dashboard` 페이지에서 차트와 테이블 모두 표시#
  - [ ] 한국어 텍스트 모든 곳에 적용#
  - [ ] 데이터 섬머리 통계 정확히 표시#

  **QA Scenarios**:#
  ```#
  Scenario: 대시보드 메인 페이지 렌더링#
    Tool: Playwright#
    Preconditions: Next.js 빌드 완료, API 데이터 준비#
    Steps:#
      1. http://localhost:3000/dashboard 접속#
      2. BarChart 컴포넌트 존재 확인 (role="img" 또는 chart)#
      3. RankingTable 컴포넌트 존재 확인 (table)#
      4. "한국 물가 국제 비교" 제목 확인#
      5. 스크린샷 캡처#
    Expected Result: 차트, 테이블, 제목 모두 표시, 한국어 텍스트#
    Failure Indicators: 컴포넌트 누락, 데이터 로딩 실패, 언어 오류#
    Evidence: .sisyphus/evidence/task-11-dashboard-main.png#

  Scenario: 데이터 정확성 확인 (한국=100)#
    Tool: Playwright#
    Preconditions: 대시보드 페이지 로드됨#
    Steps:#
      1. 테이블에서 "한국" 또는 "KOR" 행 찾기#
      2. 해당 행의 지수 값이 100인지 확인#
      3. 다른 국가들의 지수 값이 100 주변에 있는지 확인#
    Expected Result: 한국 지수=100, 다른 국가들 50-200 범위#
    Evidence: .sisyphus/evidence/task-11-korea-index.txt#
  ```#

  **Evidence to Capture:**#
  - [ ] .sisyphus/evidence/task-11-dashboard-main.png#
  - [ ] .sisyphus/evidence/task-11-korea-index.txt#

  **Commit**: YES#
  - Message: `feat(ui): implement main dashboard page with charts and table`#
  - Files: app/dashboard/page.tsx#
  - Pre-commit: npm run build#

---

- [ ] 14. 에러 처리 + 로딩 상태 UI#

  **What to do**:#
  - API 호출 실패 시 에러 메시지 표시#
  - 데이터 로딩 중 스켈레톤/스피너 UI#
  - 빈 데이터 상태 처리#
  - 한국어 에러 메시지:#
    - "데이터를 불러오는 중 오류가 발생했습니다."#
    - "데이터가 없습니다."#

  **Must NOT do**:#
  - 복잡한 에러 복구 로직 (단순 재시도만)#
  - 콘솔 로그 남기기 (프로덕션)#

  **Recommended Agent Profile**:#
  - **Category**: `quick`#
    - Reason: UI 상태 관리 및 에러 처리#

  **Parallelization**:#
  - **Can Run In Parallel**: YES (within Wave 3)#
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 13)#
  - **Blocks**: None#
  - **Blocked By**: Task 7 (API), Task 11 (대시보드)#

  **References**:#
  - `app/api/oecd/route.ts` - API 에러 응답 참조#
  - React 에러 바운더리 패턴#

  **Acceptance Criteria**:#
  - [ ] API 에러 시 사용자 친화적 메시지 표시#
  - [ ] 로딩 중 스피너/스켈레톤 표시#
  - [ ] 한국어 메시지 적용#

  **QA Scenarios**:#
  ```#
  Scenario: API 에러 시 메시지 표시#
    Tool: Playwright#
    Preconditions: API 서버 중단 또는 에러 응답 시뮬레이션#
    Steps:#
      1. API 에러 발생 유도 (서버 중단)#
      2. 대시보드 페이지 접속#
      3. "데이터를 불러오는 중 오류가 발생했습니다." 메시지 확인#
    Expected Result: 에러 메시지 표시, 앱 크래시 없음#
    Failure Indicators: 화이트 스크린, Uncaught Error#
    Evidence: .sisyphus/evidence/task-14-error-handling.png#

  Scenario: 로딩 상태 표시#
    Tool: Playwright#
    Preconditions: 느린 네트워크 시뮬레이션#
    Steps:#
      1. 네트워크 지연 시뮬레이션 (slow 3G)#
      2. 페이지 접속#
      3. 로딩 스피너/스켈레톤 확인#
    Expected Result: 로딩 UI 표시#
    Evidence: .sisyphus/evidence/task-14-loading-state.png#
  ```#

  **Evidence to Capture:**#
  - [ ] .sisyphus/evidence/task-14-error-handling.png#
  - [ ] .sisyphus/evidence/task-14-loading-state.png#

  **Commit**: YES#
  - Message: `feat(ui): add error handling and loading states`#
  - Files: app/components/ErrorDisplay.tsx, app/components/LoadingSpinner.tsx (optional)#
  - Pre-commit: npm run build#

---

## Evidence Directory Structure#
```#
.sisyphus/evidence/#
  task-10-export-csv.csv#
  task-10-export-json.json#
  task-11-dashboard-main.png#
  task-11-korea-index.txt#
  task-14-error-handling.png#
  task-14-loading-state.png#
```#

## Next Part#
After Part 7 completes, proceed to Part 8: Testing & Final Verification (Tasks 12, 13, F1-F4)#
