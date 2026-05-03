# K-Collusion Index - Part 8: Testing & Verification#

## TL;DR#
> **Part 8**: Testing & Final Verification - pytest, Playwright, Final Verification Wave#
> **Tasks**: Task 12, Task 13, F1-F4#
> **Agent**: unspecified-high, oracle, deep#

---

## Context (Dependencies from Part 1-7)#

### Completed in Part 1-7:#
- Task 1: Next.js 프로젝트 초기화 완료#
- Task 2: Python 가상환경 + 의존성 설치 완료#
- Task 3: OECD 데이터 페칭 모듈 구현 완료 (python/oecd_fetcher.py)#
- Task 4: TypeScript 타입/인터페이스 정의 완료 (app/types/oecd.ts)#
- Task 5: 프로젝트 문서화 완료 (README.md)#
- Task 6: 지수 계산 모듈 구현 완료 (python/index_calculator.py)#
- Task 7: Next.js API 라우트 설정 완료 (app/api/oecd/route.ts)#
- Task 8: 대시보드 레이아웃 + 네비게이션 완료 (app/dashboard/layout.tsx)#
- Task 9: Recharts 시각화 컴포넌트 완료 (app/components/*.tsx)#
- Task 10: 데이터셋 내보내기 기능 완료 (app/api/export/route.ts)#
- Task 11: 메인 대시보드 페이지 구현 완료 (app/dashboard/page.tsx)#
- Task 14: 에러 처리 + 로딩 상태 UI 완료#

### Ready for Part 8:#
- 모든 Python 모듈 구현 완료 (Task 3, 6)#
- 모든 UI 컴포넌트 구현 완료 (Task 8, 9, 11, 14)#
- API 라우트 설정 완료 (Task 7, 10)#
- Next.js 빌드 성공 상태#

---

## TODOs - Part 8#

- [ ] 12. pytest 테스트 작성 (Python)#

  **What to do**:#
  - `python/tests/test_oecd_fetcher.py` - OECD 페칭 모듈 테스트#
  - `python/tests/test_index_calculator.py` - 지수 계산 테스트#
  - 테스트 켬스:**#
    - 정상 데이터 처리#
    - 빈 데이터 처리#
    - 한국 기준년도 계산 정확성#
    - CSV/JSON 출력 검증#

  **Must NOT do**:#
  - 실제 OECD API 호출하지 않음 (mock 사용)#
  - 과도한 테스트 (필수 켬스만)#

  **Recommended Agent Profile**:#
  - **Category**: `unspecified-high`#
    - **Reason**: Python 테스트 작성 및 검증#

  **Parallelization**:#
  - **Can Run In Parallel**: YES (within Wave 3)#
  - **Parallel Group**: Wave 3 (with Tasks 11, 13, 14)#
  - **Blocks**: None (테스트는 독립적)#
  - **Blocked By**: Task 3 (oecd_fetcher), Task 6 (index_calculator)#

  **References**:#
  - **Pattern References**:#
    - `python/oecd_fetcher.py` - 테스트 대상 모듈#
    - `python/index_calculator.py` - 테스트 대상 모듈#
    - pytest 공식 문서: https://docs.pytest.org/#

  **Acceptance Criteria**:#
  - [ ] `python -m pytest python/tests/ -v` → PASS (모든 테스트)#
  - [ ] 테스트 커버리지 80% 이상#
  - [ ] mock을 사용해 API 호출 시뮬레이션#

  **QA Scenarios**:#
  ```#
  Scenario: pytest 전체 실행#
    Tool: Bash (pytest)#
    Preconditions: 모든 Python 모듈 구현됨#
    Steps:#
      1. cd python && python -m pytest tests/ -v --tb=short#
    Expected Result: 모든 테스트 통과, 실패 없음#
    Failure Indicators: FAILED 테스트 있음, ImportError#
    Evidence: .sisyphus/evidence/task-12-pytest-output.txt#

  Scenario: 테스트 커버리지 확인#
    Tool: Bash (pytest)#
    Preconditions: pytest-cov 설치됨#
    Steps:#
      1. python -m pytest tests/ --cov=python --cov-report=term#
      2. 커버리지 80% 이상 확인#
    Expected Result: Coverage report, 80%+ coverage#
    Evidence: .sisyphus/evidence/task-12-coverage.txt#
  ```#

  **Evidence to Capture:**#
  - [ ] .sisyphus/evidence/task-12-pytest-output.txt#
  - [ ] .sisyphus/evidence/task-12-coverage.txt#

  **Commit**: YES#
  - Message: `test: add pytest tests for Python modules`#
  - Files: python/tests/test_oecd_fetcher.py, python/tests/test_index_calculator.py#
  - Pre-commit: python -m pytest python/tests/ -v#

---

- [ ] 13. Playwright 테스트 작성 (UI)#

  **What to do**:#
  - `e2e/dashboard.spec.ts` 생성#
  - 테스트 켬스:**#
    - 대시보드 페이지 로드#
    - 차트 렌더링 확인#
    - 테이블 데이터 표시 확인#
    - 한국어 텍스트 표시 확인#
    - 데이터 다운로드 링크 작동 확인#

  **Must NOT do**:#
  - 복잡한 상호작용 테스트 (필수 기능만)#
  - API 모킹하지 않음 (실제 API 사용)#

  **Recommended Agent Profile**:#
  - **Category**: `unspecified-high`#
    - **Reason**: Playwright E2E 테스트 작성#

  **Parallelization**:#
  - **Can Run In Parallel**: YES (within Wave 3)#
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 14)#
  - **Blocks**: None#
  - **Blocked By**: Task 11 (대시보드 페이지)#

  **References**:#
  - **Pattern References**:#
    - Playwright 문서: https://playwright.dev/#
    - `app/dashboard/page.tsx` - 테스트 대상 페이지#

  **Acceptance Criteria**:#
  - [ ] `npx playwright test` → PASS (모든 테스트)#
  - [ ] 대시보드 UI 요소들 정상 확인#
  - [ ] 한국어 텍스트 검증#

  **QA Scenarios**:#
  ```#
  Scenario: Playwright 전체 테스트 실행#
    Tool: Bash (playwright)#
    Preconditions: Next.js 서버 실행 중, Playwright 설치됨#
    Steps:#
      1. npx playwright test e2e/dashboard.spec.ts --reporter=list#
    Expected Result: 모든 테스트 통과#
    Failure Indicators: FAILED 테스트, 타임아웃#
    Evidence: .sisyphus/evidence/task-13-playwright-report.txt#

  Scenario: 대시보드 시각적 회귀 테스트#
    Tool: Playwright (screenshot)#
    Preconditions: 대시보드 페이지 로드됨#
    Steps:#
      1. 페이지 스크린샷 촬영 (전체 페이지)#
      2. 스크린샷 파일 존재 확인#
    Expected Result: 스크린샷 파일 생성, UI 요소들 보임#
    Evidence: .sisyphus/evidence/task-13-dashboard-screenshot.png#
  ```#

  **Evidence to Capture:**#
  - [ ] .sisyphus/evidence/task-13-playwright-report.txt#
  - [ ] .sisyphus/evidence/task-13-dashboard-screenshot.png#

  **Commit**: YES#
  - Message: `test: add Playwright E2E tests for dashboard`#
  - Files: e2e/dashboard.spec.ts#
  - Pre-commit: npx playwright test#

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)#

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.#
>#
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**#
> **Never mark F1-F4 as checked before getting user's okay.** Rejection or user feedback -> fix -> re-run -> present again -> wait for okay.#

- [ ] F1. **Plan Compliance Audit** — `oracle`#
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.#
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`#

- [ ] F2. **Code Quality Review** — `unspecified-high`#
  Run `tsc --noEmit` + linter + `npm test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp).#
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`#

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill if UI)#
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (features working together, not isolation). Test edge cases: empty state, invalid input, rapid actions. Save to `.sisyphus/evidence/final-qa/`.#
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`#

- [ ] F4. **Scope Fidelity Check** — `deep`#
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.#
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`#

---

## Commit Strategy (Summary)#

- **1**: `feat: initialize Next.js project with TypeScript` - package.json, tsconfig.json, npm install#
- **2**: `setup: configure Python environment and dependencies` - requirements.txt, venv setup#
- **3**: `feat(data): implement OECD data fetching module` - python/oecd_fetcher.py#
- **6**: `feat(data): implement K-Collusion index calculator` - python/index_calculator.py#
- **7**: `feat(api): add Next.js API routes for OECD data` - app/api/oecd/route.ts#
- **8-11**: `feat(ui): implement dashboard layout and visualization` - app/dashboard/*.tsx, components/*.tsx#
- **12-13**: `test: add pytest and Playwright tests` - tests/*.py, e2e/*.spec.ts#

---

## Success Criteria#

### Verification Commands#
```bash#
# Python tests#
cd python && python -m pytest tests/ -v#

# Next.js build#
npm run build#

# Next.js tests (if configured)#
npm test#

# Playwright tests#
npx playwright test#
```#

### Final Checklist#
- [ ] All "Must Have" present (G20 comparison, Korea=100 index, dashboard, etc.)#
- [ ] All "Must NOT Have" absent (no AI prediction, no auth, no multilingual, no mobile app)#
- [ ] All tests pass (pytest + Playwright)#
- [ ] Dashboard displays in Korean#
- [ ] Data visualization shows ranking table + bar charts#

---

## Evidence Directory Structure (All Parts)#
```#
.sisyphus/evidence/#
  # Part 1#
  task-1-build-output.txt#
  task-1-recharts-test.txt#
  task-2-python-import.txt#
  task-2-pytest-version.txt#

  # Part 2#
  task-3-cpi-fetch-output.txt#
  task-3-g20-countries.txt#
  task-4-tsc-output.txt#
  task-5-readme.txt#

  # Part 3#
  task-6-index-calc.txt#
  task-6-csv-output.txt#
  task-7-api-response.json#
  task-7-api-keys.txt#

  # Part 4#
  task-8-dashboard-page.png#
  task-8-navigation.txt#
  task-9-bar-chart.png#
  task-9-ranking-table.txt#
  task-10-export-csv.csv#
  task-10-export-json.json#

  # Part 5#
  task-11-dashboard-main.png#
  task-11-korea-index.txt#

  # Part 6#
  task-12-pytest-output.txt#
  task-12-coverage.txt#
  task-13-playwright-report.txt#
  task-13-dashboard-screenshot.png#
  task-14-error-handling.png#
  task-14-loading-state.png#

  # Part 8 (Final)# 
  final-qa/#
```#

---

## Project Completion#

After Part 8 completes (including Final Verification Wave F1-F4 with ALL APPROVED):#
1. All 8 part files are complete#
2. All tasks verified and tested#
3. Present final results to user#
4. Get explicit user "okay" before marking work complete# 
