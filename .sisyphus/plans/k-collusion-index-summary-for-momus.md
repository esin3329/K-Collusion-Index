# K-Collusion Index - Plan Summary for Momus Review#

## TL;DR#
> **Quick Summary**: G20 국가와 한국의 물가를 OECD 통계 데이터를 활용해 비교하고, 한국=100 기준 상대지수로 시각화하는 웹 대시보드를 구축합니다.#
> **Deliverables**: Next.js + React 웹 대시보드, Python 데이터 처리 모듈, 자동화 테스트, 데이터셋#
> **Estimated Effort**: Medium#
> **Parallel Execution**: YES - 3 waves#
> **Critical Path**: Task 1 → Task 3 → Task 6 → Task 7 → Task 11 → F1-F4#

---

## Context#

### Original Request#
"한국물가를 다른 나라와 비교하여 얼마나 비싼지 자료를 분석하여 한눈에 볼 수 있는 지수로 만들어줘"#

### Key Decisions#
- 목적: 일반 대중 정보제공#
- 결과물: 웹 대시보드 + 데이터셋/시각화 코드#
- 비교 대상: G20 주요국 (20개국)#
- 비교 품목: 식료품/장보기 + 전체 종합 CPI#
- 기술 스택: Python (Pandas) + Next.js/React#
- 지수 방식: 상대 지수 (Korea = 100 기준)#
- 대시보드 언어: 한국어만#
- 시각화: 순위표 + 막대그래프#

### Research Findings#
- OECD API: SDMX-JSON REST API (`https://sdmx.oecd.org/public/rest/data/`)#
- Python 라이브러리: pandasdmx, requests, pandas#
- Next.js 구조: App Router, Server/Client Components, Recharts#
- 참고 프로젝트: Big Mac Index, MacroView#

### G20 국가 코드 (OECD API용)#
- **KOR** (South Korea), **USA** (United States), **JPN** (Japan), **DEU** (Germany), **GBR** (United Kingdom)#
- **FRA** (France), **ITA** (Italy), **CAN** (Canada), **AUS** (Australia), **BRA** (Brazil)#
- **CHN** (China), **IND** (India), **RUS** (Russia), **MEX** (Mexico), **ZAF** (South Africa)#
- **ARG** (Argentina), **IDN** (Indonesia), **SAU** (Saudi Arabia), **TUR** (Turkey), **EU** (European Union)#

---

## Work Objectives#

### Core Objective#
G20 국가의 OECD 물가 통계(CPI, PPP)를 수집·가공하여 한국=100 기준 상대지수(K-Collusion Index)를 계산하고, 이를 직관적인 웹 대시보드로 시각화하여 일반 대중에게 제공한다.#

### Concrete Deliverables#
- `python/oecd_fetcher.py` - OECD API 연동 모듈#
- `python/index_calculator.py` - K-Collusion 지수 계산 모듈#
- `app/` - Next.js App Router 프로젝트 (TypeScript)#
- `app/api/oecd/route.ts` - OECD 데이터 제공 API 라우트#
- `app/dashboard/page.tsx` - 메인 대시보드 페이지#
- `app/components/*.tsx` - Recharts 시각화 컴포넌트#
- `tests/` - pytest (Python) + Playwright (UI) 테스트#
- `data/` - 가공된 데이터셋 (CSV/JSON)#

### Definition of Done#
- [ ] G20 20개국 데이터 수집 완료 (CPI, PPP)#
- [ ] K-Collusion 지수 계산 완료 (Korea=100)#
- [ ] 대시보드에서 순위표와 막대그래프 표시#
- [ ] 한국어 인터페이스 완성#
- [ ] pytest와 Playwright 테스트 모두 통과#
- [ ] `npm run build` 성공#

### Must Have#
- G20 국가 비교 지수 (Korea=100 기준)#
- 식료품/장보기 품목 + 전체 CPI 종합#
- 순위표 + 막대그래프 시각화#
- 한국어 대시보드#
- Python + Next.js/React 기술 스택#

### Must NOT Have (Guardrails)#
- AI 예측 기능 (머신러닝/통계적 예측) - 제외#
- 사용자 인증 시스템 (로그인/회원가입) - 제외#
- 다국어 지원 (영어 등 추가) - 한국어만#
- 모바일 앱 개발 - 웹 대시보드만#
- 과도한 추상화 - 단순하고 명확한 코드 유지#
- 불필요한 외부 라이브러리 - 최소한의 의존성만 사용#

---

## Execution Strategy#

### Parallel Execution Waves#

**Wave 1** (Foundation):#
├── Task 1: Next.js 프로젝트 초기화 + TypeScript 설정 [quick]#
├── Task 2: Python 가상환경 + 의존성 설치 [quick]#
├── Task 3: OECD 데이터 페칭 모듈 구현 [unspecified-high]#
├── Task 4: TypeScript 타입/인터페이스 정의 [quick]#
└── Task 5: 프로젝트 문서화 (README) [writing]#

**Wave 2** (Core Modules):#
├── Task 6: 지수 계산 모듈 구현 (Korea=100) (depends: 3) [unspecified-high]#
├── Task 7: Next.js API 라우트 설정 (depends: 3, 4) [quick]#
├── Task 8: 대시보드 레이아웃 + 네비게이션 (depends: 1) [visual-engineering]#
├── Task 9: Recharts 시각화 컴포넌트 (depends: 4) [visual-engineering]#
└── Task 10: 데이터셋 내보내기 기능 (depends: 6) [quick]#

**Wave 3** (Integration + UI):#
├── Task 11: 메인 대시보드 페이지 구현 (depends: 7, 8, 9, 10) [visual-engineering]#
├── Task 12: pytest 테스트 작성 (Python) (depends: 3, 6) [unspecified-high]#
├── Task 13: Playwright 테스트 작성 (UI) (depends: 11) [unspecified-high]#
└── Task 14: 에러 처리 + 로딩 상태 UI (depends: 7, 11) [quick]#

**Wave FINAL** (Verification):#
├── Task F1: Plan compliance audit (oracle)#
├── Task F2: Code quality review (unspecified-high)#
├── Task F3: Real manual QA (unspecified-high)#
└── Task F4: Scope fidelity check (deep)#

---

## TODOs Summary#

### Wave 1 Tasks#
- [ ] 1. Next.js 프로젝트 초기화 + TypeScript 설정 (quick)#
- [ ] 2. Python 가상환경 + 의존성 설치 (quick)#
- [ ] 3. OECD 데이터 페칭 모듈 구현 (unspecified-high)#
- [ ] 4. TypeScript 타입/인터페이스 정의 (quick)#
- [ ] 5. 프로젝트 문서화 (README) (writing)#

### Wave 2 Tasks#
- [ ] 6. 지수 계산 모듈 구현 (Korea=100) (unspecified-high)#
- [ ] 7. Next.js API 라우트 설정 (quick)#
- [ ] 8. 대시보드 레이아웃 + 네비게이션 (visual-engineering)#
- [ ] 9. Recharts 시각화 컴포넌트 (visual-engineering)#
- [ ] 10. 데이터셋 내보내기 기능 (quick)#

### Wave 3 Tasks#
- [ ] 11. 메인 대시보드 페이지 구현 (visual-engineering)#
- [ ] 12. pytest 테스트 작성 (Python) (unspecified-high)#
- [ ] 13. Playwright 테스트 작성 (UI) (unspecified-high)#
- [ ] 14. 에러 처리 + 로딩 상태 UI (quick)#

### Final Verification Tasks#
- [ ] F1. Plan Compliance Audit (oracle)#
- [ ] F2. Code Quality Review (unspecified-high)#
- [ ] F3. Real Manual QA (unspecified-high)#
- [ ] F4. Scope Fidelity Check (deep)#

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

## Evidence Directory Structure#
```#
.sisyphus/evidence/#
  # Wave 1#
  task-1-build-output.txt#
  task-1-recharts-test.txt#
  task-2-python-import.txt#
  task-2-pytest-version.txt#
  task-3-cpi-fetch-output.txt#
  task-3-g20-countries.txt#
  task-4-tsc-output.txt#
  task-5-readme.txt#

  # Wave 2#
  task-6-index-calc.txt#
  task-6-csv-output.txt#
  task-7-api-response.json#
  task-7-api-keys.txt#
  task-8-dashboard-page.png#
  task-8-navigation.txt#
  task-9-bar-chart.png#
  task-9-ranking-table.txt#
  task-10-export-csv.csv#
  task-10-export-json.json#

  # Wave 3#
  task-11-dashboard-main.png#
  task-11-korea-index.txt#
  task-12-pytest-output.txt#
  task-12-coverage.txt#
  task-13-playwright-report.txt#
  task-13-dashboard-screenshot.png#
  task-14-error-handling.png#
  task-14-loading-state.png#

  # Final Verification#
  final-qa/#
```#

---

## Project Completion#

After ALL tasks complete (including Final Verification Wave F1-F4 with ALL APPROVED):#
1. All 8 part files are complete#
2. All tasks verified and tested#
3. Present final results to user#
4. Get explicit user "okay" before marking work complete# 
