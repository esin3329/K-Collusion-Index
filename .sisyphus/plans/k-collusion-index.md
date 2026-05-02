# K-Collusion Index (한국 물가 국제 비교 지수)

## TL;DR

> **Quick Summary**: G20 국가와 한국의 물가를 OECD 통계 데이터를 활용해 비교하고, 한국=100 기준 상대지수로 시각화하는 웹 대시보드를 구축합니다.
>
> **Deliverables**:
> - Next.js + React 웹 대시보드 (한국어, Recharts 시각화)
> - Python 데이터 처리 모듈 (OECD API 연동, K-Collusion 지수 계산)
> - 자동화 테스트 (pytest + Playwright)
> - 데이터셋 (CSV/JSON 형식)
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Task 1 → Task 3 → Task 6 → Task 7 → Task 11 → F1-F4

---

## Context

### Original Request
"한국물가를 다른 나라와 비교하여 얼마나 비싼지 자료를 분석하여 한눈에 볼 수 있는 지수로 만들어줘"

### Interview Summary
**Key Discussions**:
- 목적: 일반 대중 정보제공 - 누구나 쉽게 한국 물가 수준 파악
- 결과물: 웹 대시보드 + 데이터셋/시각화 코드
- 비교 대상: G20 주요국 (19개국 + EU + 한국 = 20개국)
- 비교 품목: 식료품/장보기 + 전체 종합 CPI
- 기술 스택: Python (Pandas) + Next.js/React
- 지수 방식: 상대 지수 (Korea = 100 기준)
- 대시보드 언어: 한국어만
- 시각화: 순위표 + 막대그래프

**Research Findings**:
- OECD API: SDMX-JSON REST API (`https://sdmx.oecd.org/public/rest/data/`)
- Python 라이브러리: pandasdmx, requests, pandas
- Next.js 구조: App Router, Server/Client Components, Recharts
- 참고 프로젝트: Big Mac Index, MacroView

### Metis Review
**Identified Gaps** (timeout - auto-proceeded):
- 데이터 갱신 주기 명시 필요
- 오류 처리 전략 (API 실패 시)
- 기준년도 설정 (2015 또는 2020 권장)

### G20 국가 코드 (OECD API용)
- **KOR** (South Korea), **USA** (United States), **JPN** (Japan), **DEU** (Germany), **GBR** (United Kingdom)
- **FRA** (France), **ITA** (Italy), **CAN** (Canada), **AUS** (Australia), **BRA** (Brazil)
- **CHN** (China), **IND** (India), **RUS** (Russia), **MEX** (Mexico), **ZAF** (South Africa)
- **ARG** (Argentina), **IDN** (Indonesia), **SAU** (Saudi Arabia), **TUR** (Turkey), **EU** (European Union)

### OECD API 상세 엔드포인트 예제
- **CPI 데이터 수집**:
  - URL 패턴: `https://sdmx.oecd.org/public/rest/data/OECD.SDD.CPI,DSD_CPI@DF_CPI/.{COUNTRIES}.A?startPeriod={START}&endPeriod={END}&format=jsondata`
  - 예제: `https://sdmx.oecd.org/public/rest/data/OECD.SDD.CPI,DSD_CPI@DF_CPI/.KOR+USA+JPN+DEU+GBR.A?startPeriod=2020&endPeriod=2023&format=jsondata`
- **PPP 데이터 수집**:
  - URL 패턴: `https://sdmx.oecd.org/public/rest/data/OECD.EL,DSD_PPP@DF_PPP/.{COUNTRIES}.A?startPeriod={START}&endPeriod={END}&format=jsondata`
- **CSV 포맷 사용 시**:
  - `format=csvfilewithlabels` 파라미터 사용
  - pandas.read_csv()로 직접 로드 가능

### 지수 계산 방법론 및 데이터 모델
- **Korea=100 기준 상대 지수**:
  - 기준년도(2020 권장) 설정
  - 각 국가의 물가지수 = (국가 물가값 / 한국 기준년도 물가값) × 100
  - 예: 일본 물가가 한국의 0.8배면 지수는 80, 미국이 1.2배면 120
- **데이터 모델**:
  - Long form: `country_code, country_name, year, dataset_type (CPI/PPP), obs_value`
  - Derived: `index_KOR100 = (obs_value / korea_base_value) × 100`
  - Wide form (시각화용): year × country columns

---

## Work Objectives

### Core Objective
G20 국가의 OECD 물가 통계(CPI, PPP)를 수집·가공하여 한국=100 기준 상대지수(K-Collusion Index)를 계산하고, 이를 직관적인 웹 대시보드로 시각화하여 일반 대중에게 제공한다.

### Concrete Deliverables
- `python/oecd_fetcher.py` - OECD API 연동 모듈
- `python/index_calculator.py` - K-Collusion 지수 계산 모듈
- `app/` - Next.js App Router 프로젝트 (TypeScript)
- `app/api/oecd/route.ts` - OECD 데이터 제공 API 라우트
- `app/dashboard/page.tsx` - 메인 대시보드 페이지
- `app/components/*.tsx` - Recharts 시각화 컴포넌트
- `tests/` - pytest (Python) + Playwright (UI) 테스트
- `data/` - 가공된 데이터셋 (CSV/JSON)

### Definition of Done
- [ ] G20 20개국 데이터 수집 완료 (CPI, PPP)
- [ ] K-Collusion 지수 계산 완료 (Korea=100)
- [ ] 대시보드에서 순위표와 막대그래프 표시
- [ ] 한국어 인터페이스 완성
- [ ] pytest와 Playwright 테스트 모두 통과
- [ ] `npm run build` 성공

### Must Have
- G20 국가 비교 지수 (Korea=100 기준)
- 식료품/장보기 품목 + 전체 CPI 종합
- 순위표 + 막대그래프 시각화
- 한국어 대시보드
- Python + Next.js/React 기술 스택

### Must NOT Have (Guardrails)
- AI 예측 기능 (머신러닝/통계적 예측) - 제외
- 사용자 인증 시스템 (로그인/회원가입) - 제외
- 다국어 지원 (영어 등 추가) - 한국어만
- 모바일 앱 개발 - 웹 대시보드만
- 과도한 추상화 - 단순하고 명확한 코드 유지
- 불필요한 외부 라이브러리 - 최소한의 의존성만 사용

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed. No exceptions.
> Acceptance criteria requiring "user manually tests/confirms" are FORBIDDEN.

### Test Decision
- **Infrastructure exists**: NO (신규 프로젝트)
- **Automated tests**: YES (TDD 방식)
- **Framework**: pytest (Python) + Playwright (Next.js UI)
- **If TDD**: Each task follows RED (failing test) → GREEN (minimal impl) → REFACTOR

### QA Policy
Every task MUST include agent-executed QA scenarios (see TODO template below).
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright - Navigate, interact, assert DOM, screenshot
- **TUI/CLI**: Use interactive_bash (tmux) - Run command, send keystrokes, validate output
- **API/Backend**: Use Bash (curl) - Send requests, assert status + response fields
- **Library/Module**: Use Bash (python) - Import, call functions, compare output

---

## Execution Strategy

### Parallel Execution Waves

> Maximize throughput by grouping independent tasks into parallel waves.
> Each wave completes before the next begins.
> Target: 5-8 tasks per wave. Fewer than 3 per wave (except final) = under-splitting.

```
Wave 1 (Start Immediately - foundation + scaffolding):
├── Task 1: Next.js 프로젝트 초기화 + TypeScript 설정 [quick]
├── Task 2: Python 가상환경 + 의존성 설치 [quick]
├── Task 3: OECD 데이터 페칭 모듈 구현 [unspecified-high]
├── Task 4: TypeScript 타입/인터페이스 정의 [quick]
└── Task 5: 프로젝트 문서화 (README) [writing]

Wave 2 (After Wave 1 - core modules, MAX PARALLEL):
├── Task 6: 지수 계산 모듈 구현 (Korea=100) (depends: 3) [unspecified-high]
├── Task 7: Next.js API 라우트 설정 (depends: 3, 4) [quick]
├── Task 8: 대시보드 레이아웃 + 네비게이션 (depends: 1) [visual-engineering]
├── Task 9: Recharts 시각화 컴포넌트 (depends: 4) [visual-engineering]
└── Task 10: 데이터셋 내보내기 기능 (depends: 6) [quick]

Wave 3 (After Wave 2 - integration + UI):
├── Task 11: 메인 대시보드 페이지 구현 (depends: 7, 8, 9, 10) [visual-engineering]
├── Task 12: pytest 테스트 작성 (Python) (depends: 3, 6) [unspecified-high]
├── Task 13: Playwright 테스트 작성 (UI) (depends: 11) [unspecified-high]
└── Task 14: 에러 처리 + 로딩 상태 UI (depends: 7, 11) [quick]

Wave FINAL (After ALL tasks — 4 parallel reviews, then user okay):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)
-> Present results -> Get explicit user okay

Critical Path: Task 1 → Task 3 → Task 6 → Task 7 → Task 11 → Task 13 → F1-F4 → user okay
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 5 (Waves 1 & 2)
```

### Dependency Matrix

- **1**: - - 8, 2
- **2**: - - 3, 6, 1
- **3**: 2 - 6, 7, 12, 2
- **4**: - - 7, 9, 2
- **5**: - - 2
- **6**: 3 - 10, 11, 12, 2
- **7**: 3, 4 - 11, 13, 14, 2
- **8**: 1 - 11, 2
- **9**: 4 - 11, 2
- **10**: 6 - 11, 2
- **11**: 7, 8, 9, 10 - 13, 14, 3
- **12**: 3, 6 - 3
- **13**: 11 - 3
- **14**: 7, 11 - 3

### Agent Dispatch Summary

- **1**: **5** - T1 → `quick`, T2 → `quick`, T3 → `unspecified-high`, T4 → `quick`, T5 → `writing`
- **2**: **5** - T6 → `unspecified-high`, T7 → `quick`, T8 → `visual-engineering`, T9 → `visual-engineering`, T10 → `quick`
- **3**: **4** - T11 → `visual-engineering`, T12 → `unspecified-high`, T13 → `unspecified-high`, T14 → `quick`
- **FINAL**: **4** - F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

> Implementation + Test = ONE Task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info + QA Scenarios.
> **A task WITHOUT QA Scenarios is INCOMPLETE. No exceptions.**

- [ ] 1. Next.js 프로젝트 초기화 + TypeScript 설정

  **What to do**:
  - `npx create-next-app@latest . --ts --app --eslint --no-tailwind --no-src-dir --import-alias "@/*"` 실행
  - TypeScript 설정 확인 (tsconfig.json)
  - Recharts 설치: `npm install recharts`
  - Playwright 설치: `npm init playwright@latest` (선택: chromium만)
  - 기본 파일 구조 생성 (app/layout.tsx, app/page.tsx 등)

  **Must NOT do**:
  - Tailwind CSS 설치하지 않음 (순수 CSS 또는 인라인 스타일 사용)
  - `src/` 디렉토리 생성하지 않음 (app/ 직접 사용)

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: 단순 프로젝트 초기화 및 패키지 설치 작업
  - **Skills**: []
    - No additional skills needed for project scaffolding
  - **Skills Evaluated but Omitted**:
    - `playwright`: 초기 설치만 하므로 실제 테스트 작성은 아님

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 4, 5)
  - **Blocks**: Task 8, Task 9 (레이아웃/컴포넌트 생성 시 필요)
  - **Blocked By**: None (can start immediately)

  **References** (CRITICAL - Be Exhaustive):

  **Pattern References** (existing code to follow):
  - Next.js App Router 공식 문서: https://nextjs.org/docs/app/getting-started

  **External References** (libraries and frameworks):
  - Next.js 설치 가이드: https://nextjs.org/docs/app/getting-started/installation
  - Recharts 공식 문서: https://recharts.org/en-US/

  **Acceptance Criteria**:

  **If TDD (tests enabled):**
  - [ ] `npm run build` 성공
  - [ ] `npm run dev` 실행 시 기본 페이지 표시
  - [ ] package.json에 recharts, playwright 의존성 존재

  **QA Scenarios (MANDATORY - task is INCOMPLETE without these):**

  ```
  Scenario: Next.js 프로젝트 빌드 성공
    Tool: Bash (npm)
    Preconditions: 프로젝트 초기화 완료
    Steps:
      1. npm run build 실행
      2. 종료 코드 0 확인
    Expected Result: 빌드 성공, .next 디렉토리 생성
    Failure Indicators: 빌드 에러, TypeScript 에러
    Evidence: .sisyphus/evidence/task-1-build-output.txt

  Scenario: Recharts import 테스트
    Tool: Bash (node)
    Preconditions: npm install 완료
    Steps:
      1. node -e "const Recharts = require('recharts'); console.log('OK')"
    Expected Result: "OK" 출력
    Failure Indicators: Module not found 에러
    Evidence: .sisyphus/evidence/task-1-recharts-test.txt
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-1-build-output.txt
  - [ ] .sisyphus/evidence/task-1-recharts-test.txt

  **Commit**: YES
  - Message: `feat: initialize Next.js project with TypeScript and dependencies`
  - Files: package.json, tsconfig.json, next.config.js, app/layout.tsx, app/page.tsx
  - Pre-commit: npm run build

- [ ] 2. Python 가상환경 + 의존성 설치

  **What to do**:
  - Python 가상환경 생성: `python -m venv venv`
  - 가상환경 활성화 (Windows: `venv\Scripts\activate`)
  - 필수 패키지 설치: `pip install pandas requests pandasdmx pytest`
  - requirements.txt 생성: `pip freeze > requirements.txt`
  - `python/` 디렉토리 생성 (데이터 처리 코드용)

  **Must NOT do**:
  - 전역 Python 환경에 패키지 설치하지 않음
  - 불필요한 패키지 설치하지 않음 (데이터 시각화용 matplotlib 등 제외)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 패키지 설치 및 환경 설정만 필요
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `git-master`: 단순 설치 작업, git 커밋은 별도 작업에서

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 4, 5)
  - **Blocks**: Task 3, Task 6 (Python 모듈 실행 시 필요)
  - **Blocked By**: None (can start immediately)

  **References**:
  - Python venv 문서: https://docs.python.org/3/library/venv.html
  - pandasdmx 문서: https://pandasdmx.readthedocs.io/

  **Acceptance Criteria**:
  - [ ] `python -m pytest --version` 실행 성공
  - [ ] `python -c "import pandasdmx; print('OK')"` 성공
  - [ ] requirements.txt 파일 존재

  **QA Scenarios**:

  ```
  Scenario: Python 환경 테스트
    Tool: Bash (python)
    Preconditions: 가상환경 활성화
    Steps:
      1. python -c "import pandas; import requests; import pandasdmx; print('All OK')"
    Expected Result: "All OK" 출력
    Failure Indicators: ImportError
    Evidence: .sisyphus/evidence/task-2-python-import.txt

  Scenario: pytest 실행 확인
    Tool: Bash (pytest)
    Preconditions: pytest 설치됨
    Steps:
      1. python -m pytest --version
    Expected Result: pytest 버전 정보 출력
    Evidence: .sisyphus/evidence/task-2-pytest-version.txt
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-2-python-import.txt
  - [ ] .sisyphus/evidence/task-2-pytest-version.txt

  **Commit**: YES
  - Message: `setup: configure Python environment and dependencies`
  - Files: requirements.txt, python/.gitkeep
  - Pre-commit: python -m pytest --collect-only

- [ ] 3. OECD 데이터 페칭 모듈 구현

  **What to do**:
  - `python/oecd_fetcher.py` 생성
  - OECD SDMX-JSON API 연동 함수 구현:
    - `fetch_cpi_data(countries, start_year, end_year)` - CPI 데이터 수집
    - `fetch_ppp_data(countries, start_year, end_year)` - PPP 데이터 수집
  - G20 국가 코드 정의 (KOR, USA, JPN, DEU, etc.)
  - pandasdmx 또는 requests + pandas 사용
  - 데이터 정제: country_code, year, value 컬럼으로 정리
  - 단위 테스트 작성 (pytest)

  **Must NOT do**:
  - API 키 하드코딩하지 않음 (OECD API는 무료, 키 불필요)
  - 과도한 예외 처리 (단순한 에러 메시지만)
  - 데이터 시각화 코드 포함하지 않음

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: OECD API 연동 및 데이터 처리 로직이 필요한 복잡한 작업
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `git-master`: 코드 작성에 집중, 커밋은 별도

  **Parallelization**:
  - **Can Run In Parallel**: NO (Python 환경 필요)
  - **Parallel Group**: Sequential after Task 2
  - **Blocks**: Task 6, Task 7, Task 12
  - **Blocked By**: Task 2 (Python 환경 필요)

  **References**:

  **API/Type References**:
  - OECD API 문서: https://data.oecd.org/api/sdmx-json-documentation/
  - 샘플 노트북: https://nbviewer.jupyter.org/github/bdecon/econ_data/blob/master/APIs/OECD.ipynb

  **External References**:
  - pandasdmx 사용 예제: https://pandasdmx.readthedocs.io/en/latest/example.html
  - OECD SDMX 엔드포인트: https://sdmx.oecd.org/public/rest/data/

  **Acceptance Criteria**:

  **If TDD:**
  - [ ] `python -m pytest python/tests/test_oecd_fetcher.py -v` → PASS
  - [ ] CPI 데이터 수집 함수가 DataFrame 반환
  - [ ] G20 국가 코드가 정확히 정의됨

  **QA Scenarios**:

  ```
  Scenario: OECD CPI 데이터 수집 테스트
    Tool: Bash (python)
    Preconditions: Python 환경 설정됨, oecd_fetcher.py 작성됨
    Steps:
      1. python -c "from oecd_fetcher import fetch_cpi_data; df = fetch_cpi_data(['KOR', 'USA'], 2020, 2023); print(df.head())"
    Expected Result: DataFrame 출력 (columns: country_code, year, value)
    Failure Indicators: ImportError, API 에러
    Evidence: .sisyphus/evidence/task-3-cpi-fetch-output.txt

  Scenario: G20 국가 코드 확인
    Tool: Bash (python)
    Preconditions: oecd_fetcher.py에 G20 국가 정의됨
    Steps:
      1. python -c "from oecd_fetcher import G20_COUNTRIES; print(len(G20_COUNTRIES), 'countries')"
    Expected Result: "20 countries" 출력
    Evidence: .sisyphus/evidence/task-3-g20-countries.txt
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-3-cpi-fetch-output.txt
  - [ ] .sisyphus/evidence/task-3-g20-countries.txt

  **Commit**: YES
  - Message: `feat(data): implement OECD data fetching module`
  - Files: python/oecd_fetcher.py, python/tests/test_oecd_fetcher.py
  - Pre-commit: python -m pytest python/tests/ -v

- [ ] 4. TypeScript 타입/인터페이스 정의

  **What to do**:
  - `app/types/oecd.ts` 생성
  - 데이터 모델 인터페이스 정의:
    - `OECDDataItem`: { countryCode, countryName, year, value, datasetType }
    - `KCollusionIndex`: { countryCode, countryName, indexValue, baseYear }
    - `ChartDataItem`: { name, value, rank }
  - API 응답 타입 정의
  - 상수 정의: G20 국가 목록, 기준년도

  **Must NOT do**:
  - 구현 로직 포함하지 않음 (타입만 정의)
  - 과도한 제네릭 사용하지 않음

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 타입 정의만 필요, 복잡한 로직 없음
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - None

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 5)
  - **Blocks**: Task 7, Task 9
  - **Blocked By**: None (can start immediately)

  **References**:

  **Pattern References**:
  - TypeScript 인터페이스 예제: https://www.typescriptlang.org/docs/handbook/interfaces.html

  **Acceptance Criteria**:
  - [ ] `tsc --noEmit` 성공 (타입 오류 없음)
  - [ ] 정의된 인터페이스를 다른 파일에서 import 가능

  **QA Scenarios**:

  ```
  Scenario: TypeScript 타입 컴파일 확인
    Tool: Bash (tsc)
    Preconditions: tsconfig.json 설정됨
    Steps:
      1. npx tsc --noEmit
    Expected Result: 에러 없이 종료 (exit code 0)
    Failure Indicators: TypeScript 컴파일 에러
    Evidence: .sisyphus/evidence/task-4-tsc-output.txt
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-4-tsc-output.txt

  **Commit**: YES
  - Message: `feat(types): define TypeScript interfaces for OECD data`
  - Files: app/types/oecd.ts
  - Pre-commit: npx tsc --noEmit

- [ ] 5. 프로젝트 문서화 (README)

  **What to do**:
  - `README.md` 생성 (프로젝트 루트)
  - 내용 포함:
    - 프로젝트 개요 (K-Collusion Index 소개)
    - 기술 스택 (Next.js, Python, OECD API)
    - 설치 및 실행 방법
    - 데이터 출처 및 라이선스
  - 한국어로 작성

  **Must NOT do**:
  - 과도하게 긴 문서 작성하지 않음
  - 구현 세부사항 나열하지 않음 (코드 자체가 문서)

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: 문서 작성 작업
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - None

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4)
  - **Blocks**: None
  - **Blocked By**: None (can start immediately)

  **References**:
  - README 작성 가이드: https://www.makeareadme.com/

  **Acceptance Criteria**:
  - [ ] README.md 파일 존재
  - [ ] 한국어로 작성됨
  - [ ] 설치 방법 명시됨

  **QA Scenarios**:

  ```
  Scenario: README 존재 확인
    Tool: Bash (ls)
    Preconditions: 작업 완료
    Steps:
      1. cat README.md | head -20
    Expected Result: README 내용 출력 (한국어 포함)
    Evidence: .sisyphus/evidence/task-5-readme.txt
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-5-readme.txt

  **Commit**: YES
  - Message: `docs: add project README`
  - Files: README.md
  - Pre-commit: None

- [ ] 6. 지수 계산 모듈 구현 (Korea=100)

  **What to do**:
  - `python/index_calculator.py` 생성
  - K-Collusion 지수 계산 함수:
    - `calculate_k_collusion_index(df, base_year=2020)` - Korea=100 기준 지수 계산
    - 수식: index = (country_value / korea_base_value) × 100
  - CPI와 PPP 데이터 처리
  - 결과를 CSV와 JSON으로 저장하는 함수
  - 단위 테스트 작성 (pytest)

  **Must NOT do**:
  - 시각화 코드 포함하지 않음
  - 웹 프레임워크 의존성 추가하지 않음 (순수 Python)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 데이터 변환 로직과 지수 계산 알고리즘이 필요
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - None

  **Parallelization**:
  - **Can Run In Parallel**: NO (OECD 데이터 모듈 필요)
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 10)
  - **Blocks**: Task 10, Task 11, Task 12
  - **Blocked By**: Task 3 (데이터 페칭 모듈)

  **References**:

  **Pattern References**:
  - `python/oecd_fetcher.py` - 데이터 로드 패턴 참조

  **Acceptance Criteria**:

  **If TDD:**
  - [ ] `python -m pytest python/tests/test_index_calculator.py -v` → PASS
  - [ ] 지수 계산 결과가 올바른지 검증 (Korea=100 확인)
  - [ ] CSV/JSON 출력 파일 생성됨

  **QA Scenarios**:

  ```
  Scenario: 지수 계산 테스트
    Tool: Bash (python)
    Preconditions: oecd_fetcher.py와 샘플 데이터 존재
    Steps:
      1. python -c "from index_calculator import calculate_k_collusion_index; df = calculate_k_collusion_index(sample_df, 2020); print(df[df.country_code=='KOR']['index_value'].iloc[0])"
    Expected Result: 100.0 출력 (한국 기준)
    Failure Indicators: 계산 오류, 한국 지수가 100이 아님
    Evidence: .sisyphus/evidence/task-6-index-calc.txt

  Scenario: CSV 출력 확인
    Tool: Bash (cat)
    Preconditions: 지수 계산 및 저장 완료
    Steps:
      1. head -5 data/k-collusion-index.csv
    Expected Result: CSV 헤더와 데이터 행 출력 (country_code, index_value 포함)
    Evidence: .sisyphus/evidence/task-6-csv-output.txt
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-6-index-calc.txt
  - [ ] .sisyphus/evidence/task-6-csv-output.txt

  **Commit**: YES
  - Message: `feat(data): implement K-Collusion index calculator`
  - Files: python/index_calculator.py, python/tests/test_index_calculator.py, data/.gitkeep
  - Pre-commit: python -m pytest python/tests/ -v

- [ ] 7. Next.js API 라우트 설정

  **What to do**:
  - `app/api/oecd/route.ts` 생성
  - GET 핸들러 구현:
    - OECD 데이터 조회 (Python 스크립트 실행 또는 미리 계산된 데이터 로드)
    - JSON 응답 반환 (K-Collusion 지수 데이터)
  - API 응답 타입 정의 (TypeScript)
  - 에러 처리 (데이터 없음, Python 실행 실패 등)

  **Must NOT do**:
  - 복잡한 비즈니스 로직 포함하지 않음 (데이터 제공만)
  - 데이터베이스 연결하지 않음 (파일 기반)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: API 라우트 설정 및 데이터 반환 로직
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `playwright`: API 테스트는 별도 작업에서

  **Parallelization**:
  - **Can Run In Parallel**: YES (within Wave 2)
  - **Parallel Group**: Wave 2 (with Tasks 6, 8, 9, 10)
  - **Blocks**: Task 11, Task 13, Task 14
  - **Blocked By**: Task 3 (데이터 모듈), Task 4 (타입 정의)

  **References**:

  **Pattern References**:
  - Next.js App Router API 라우트: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
  - `app/types/oecd.ts` - API 응답 타입 정의 참조

  **Acceptance Criteria**:
  - [ ] `curl http://localhost:3000/api/oecd` 실행 시 JSON 응답
  - [ ] 응답에 G20 국가 데이터 포함
  - [ ] TypeScript 타입 오류 없음

  **QA Scenarios**:

  ```
  Scenario: API 엔드포인트 테스트
    Tool: Bash (curl)
    Preconditions: Next.js 개발 서버 실행 중 (npm run dev)
    Steps:
      1. curl -s http://localhost:3000/api/oecd | head -20
    Expected Result: JSON 데이터 출력 (countryCode, indexValue 포함)
    Failure Indicators: 404 에러, JSON 파싱 오류
    Evidence: .sisyphus/evidence/task-7-api-response.json

  Scenario: API 응답 구조 확인
    Tool: Bash (curl + jq)
    Preconditions: API 응답 성공
    Steps:
      1. curl -s http://localhost:3000/api/oecd | jq '.[0] | keys'
    Expected Result: ["countryCode", "countryName", "indexValue", ...] 출력
    Evidence: .sisyphus/evidence/task-7-api-keys.txt
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-7-api-response.json
  - [ ] .sisyphus/evidence/task-7-api-keys.txt

  **Commit**: YES
  - Message: `feat(api): add Next.js API routes for OECD data`
  - Files: app/api/oecd/route.ts
  - Pre-commit: npx tsc --noEmit

- [ ] 8. 대시보드 레이아웃 + 네비게이션

  **What to do**:
  - `app/dashboard/layout.tsx` 생성 (대시보드 전용 레이아웃)
  - `app/dashboard/page.tsx` 기본 구조 (나중에 Task 11에서 확장)
  - 공통 레이아웃 컴포넌트:
    - 헤더 (제목: "K-Collusion Index - 한국 물가 국제 비교")
    - 네비게이션 (홈, 대시보드, 데이터 다운로드)
  - 한국어 텍스트 적용
  - 반응형 디자인 기본 적용

  **Must NOT do**:
  - 복잡한 스타일링 (Tailwind 사용하지 않음)
  - 차트 컴포넌트 여기서 구현하지 않음 (Task 9에서)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI 레이아웃과 구조 설계
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `playwright`: UI 테스트는 Task 13에서

  **Parallelization**:
  - **Can Run In Parallel**: YES (within Wave 2)
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 9, 10)
  - **Blocks**: Task 11
  - **Blocked By**: Task 1 (Next.js 프로젝트), Task 4 (타입 - 선택적)

  **References**:

  **Pattern References**:
  - Next.js App Router 레이아웃: https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates
  - `app/layout.tsx` - 루트 레이아웃 참조

  **Acceptance Criteria**:
  - [ ] `npm run build` 성공
  - [ ] `/dashboard` 경로 접속 시 페이지 렌더링
  - [ ] 한국어 텍스트 표시됨

  **QA Scenarios**:

  ```
  Scenario: 대시보드 페이지 렌더링
    Tool: Playwright
    Preconditions: Next.js 빌드 완료 (npm run build && npm start)
    Steps:
      1. 페이지 접속: http://localhost:3000/dashboard
      2. 제목 "K-Collusion Index" 표시 확인
      3. 스크린샷 캡처
    Expected Result: 페이지 로드, 한국어 텍스트 표시, 레이아웃 정상
    Failure Indicators: 404 에러, 빈 페이지, 언어 오류
    Evidence: .sisyphus/evidence/task-8-dashboard-page.png

  Scenario: 네비게이션 링크 확인
    Tool: Playwright
    Preconditions: 대시보드 페이지 로드됨
    Steps:
      1. 네비게이션 바에서 "홈" 링크 찾기
      2. 링크 클릭 → 홈으로 이동 확인
    Expected Result: 홈(/) 또는 대시보드(/dashboard)로 이동
    Evidence: .sisyphus/evidence/task-8-navigation.txt
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-8-dashboard-page.png
  - [ ] .sisyphus/evidence/task-8-navigation.txt

  **Commit**: YES
  - Message: `feat(ui): implement dashboard layout and navigation`
  - Files: app/dashboard/layout.tsx, app/dashboard/page.tsx
  - Pre-commit: npm run build

- [ ] 9. Recharts 시각화 컴포넌트

  **What to do**:
  - `app/components/BarChart.tsx` - 막대그래프 컴포넌트 ("use client")
  - `app/components/RankingTable.tsx` - 순위표 컴포넌트 ("use client")
  - Recharts BarChart 사용:
    - X축: 국가명, Y축: K-Collusion 지수 값
    - 한국을 기준선(100)으로 표시
  - 데이터 props로 받아 시각화
  - 기본 스타일링 (인라인 스타일 또는 CSS)

  **Must NOT do**:
  - Server Component에서 Recharts 사용하지 않음 (반드시 "use client")
  - 복잡한 상호작용 (필터링, 정렬) - 기본 기능만

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Recharts를 사용한 시각화 컴포넌트 구현
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - None

  **Parallelization**:
  - **Can Run In Parallel**: YES (within Wave 2)
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 10)
  - **Blocks**: Task 11
  - **Blocked By**: Task 4 (타입 정의)

  **References**:

  **Pattern References**:
  - Recharts 공식 문서: https://recharts.org/en-US/api/BarChart
  - `app/types/oecd.ts` - ChartDataItem 타입 참조

  **External References**:
  - Recharts 예제: https://recharts.org/en-US/examples

  **Acceptance Criteria**:
  - [ ] `npx tsc --noEmit` 성공
  - [ ] BarChart와 RankingTable 컴포넌트가 props로 데이터 받음
  - [ ] "use client" 지시어 포함됨

  **QA Scenarios**:

  ```
  Scenario: BarChart 컴포넌트 렌더링
    Tool: Playwright
    Preconditions: 컴포넌트 구현됨, 테스트 페이지 생성
    Steps:
      1. 샘플 데이터로 BarChart 렌더링
      2. 차트 컨테이너 확인 (role="img" 또는 chart)
      3. 스크린샷 캡처
    Expected Result: 막대그래프 표시, X축에 국가명, Y축에 값
    Evidence: .sisyphus/evidence/task-9-bar-chart.png

  Scenario: RankingTable 컴포넌트 테스트
    Tool: Playwright
    Preconditions: 컴포넌트 구현됨
    Steps:
      1. 샘플 데이터로 RankingTable 렌더링
      2. 테이블 행 개수 확인 (G20 20개국)
      3. 한국(KOR) 행 찾기 (index_value=100)
    Expected Result: 20개 행, 한국이 100으로 표시됨
    Evidence: .sisyphus/evidence/task-9-ranking-table.txt
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-9-bar-chart.png
  - [ ] .sisyphus/evidence/task-9-ranking-table.txt

  **Commit**: YES
  - Message: `feat(ui): create Recharts visualization components`
  - Files: app/components/BarChart.tsx, app/components/RankingTable.tsx
  - Pre-commit: npx tsc --noEmit

- [ ] 10. 데이터셋 내보내기 기능

  **What to do**:
  - `app/api/export/route.ts` 생성
  - CSV/JSON 다운로드 엔드포인트:
    - `/api/export?format=csv` - CSV 파일 다운로드
    - `/api/export?format=json` - JSON 파일 다운로드
  - 파일 이름: `k-collusion-index-YYYYMMDD.csv/json`
  - HTTP 헤더 설정 (Content-Disposition, Content-Type)

  **Must NOT do**:
  - 데이터 변환 로직 포함하지 않음 (이미 계산된 데이터 사용)
  - 압축 파일 생성하지 않음 (단순 파일 다운로드만)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: API 라우트에서 파일 다운로드 제공
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - None

  **Parallelization**:
  - **Can Run In Parallel**: YES (within Wave 2)
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 9)
  - **Blocks**: Task 11 (데이터 다운로드 링크)
  - **Blocked By**: Task 6 (지수 계산 완료, 데이터 파일 존재)

  **References**:

  **Pattern References**:
  - Next.js Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
  - `app/api/oecd/route.ts` - API 라우트 패턴 참조

  **Acceptance Criteria**:
  - [ ] `curl http://localhost:3000/api/export?format=csv` → CSV 파일 다운로드
  - [ ] `curl http://localhost:3000/api/export?format=json` → JSON 파일 다운로드
  - [ ] 파일 이름에 날짜 포함됨

  **QA Scenarios**:

  ```
  Scenario: CSV 다운로드 테스트
    Tool: Bash (curl)
    Preconditions: Next.js 서버 실행 중, 데이터 파일 존재
    Steps:
      1. curl -OJ "http://localhost:3000/api/export?format=csv"
      2. ls -l k-collusion-index-*.csv
    Expected Result: CSV 파일 다운로드, 내용에 countryCode, indexValue 포함
    Evidence: .sisyphus/evidence/task-10-export-csv.csv

  Scenario: JSON 다운로드 테스트
    Tool: Bash (curl)
    Preconditions: JSON 데이터 존재
    Steps:
      1. curl "http://localhost:3000/api/export?format=json" | jq '.[0]'
    Expected Result: JSON 배열 출력, 첫 번째 요소에 countryCode 포함
    Evidence: .sisyphus/evidence/task-10-export-json.json
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-10-export-csv.csv
  - [ ] .sisyphus/evidence/task-10-export-json.json

  **Commit**: YES
  - Message: `feat(api): add dataset export functionality`
  - Files: app/api/export/route.ts
  - Pre-commit: npx tsc --noEmit

- [ ] 11. 메인 대시보드 페이지 구현

  **What to do**:
  - `app/dashboard/page.tsx` 완성
  - API에서 데이터 페칭 (서버 사이드 또는 클라이언트)
  - BarChart와 RankingTable 컴포넌트 통합
  - 데이터 섬머리 통계 표시:
    - 한국과 가장 물가가 높은 나라
    - 한국과 가장 물가가 낮은 나라
    - 평균 지수
  - 한국어 레이블 적용

  **Must NOT do**:
  - 클라이언트 사이드에서만 데이터 페칭 (SEO 고려, 서버 컴포넌트 활용)
  - 과도한 애니메이션 (단순하고 빠른 로딩)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: 대시보드 UI 통합 및 데이터 시각화
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `playwright`: 테스트는 Task 13에서

  **Parallelization**:
  - **Can Run In Parallel**: NO (다른 작업들 완료 필요)
  - **Parallel Group**: Wave 3 (with Tasks 12, 13, 14)
  - **Blocks**: Task 13 (Playwright 테스트)
  - **Blocked By**: Task 7 (API), Task 8 (레이아웃), Task 9 (컴포넌트), Task 10 (데이터)

  **References**:

  **Pattern References**:
  - `app/components/BarChart.tsx` - 막대그래프 컴포넌트
  - `app/components/RankingTable.tsx` - 순위표 컴포넌트
  - `app/api/oecd/route.ts` - 데이터 API

  **Acceptance Criteria**:
  - [ ] `npm run build` 성공
  - [ ] `/dashboard` 페이지에서 차트와 테이블 모두 표시
  - [ ] 한국어 텍스트 모든 곳에 적용
  - [ ] 데이터 섬머리 통계 정확히 표시

  **QA Scenarios**:

  ```
  Scenario: 대시보드 메인 페이지 렌더링
    Tool: Playwright
    Preconditions: Next.js 빌드 완료, API 데이터 준비
    Steps:
      1. http://localhost:3000/dashboard 접속
      2. BarChart 컴포넌트 존재 확인 (role="img" 또는 chart)
      3. RankingTable 컴포넌트 존재 확인 (table)
      4. "한국 물가 국제 비교" 제목 확인
      5. 스크린샷 캡처
    Expected Result: 차트, 테이블, 제목 모두 표시, 한국어 텍스트
    Failure Indicators: 컴포넌트 누락, 데이터 로딩 실패, 언어 오류
    Evidence: .sisyphus/evidence/task-11-dashboard-main.png

  Scenario: 데이터 정확성 확인 (한국=100)
    Tool: Playwright
    Preconditions: 대시보드 페이지 로드됨
    Steps:
      1. 테이블에서 "한국" 또는 "KOR" 행 찾기
      2. 해당 행의 지수 값이 100인지 확인
      3. 다른 국가들의 지수 값이 100 주변에 있는지 확인
    Expected Result: 한국 지수=100, 다른 국가들 50-200 범위
    Evidence: .sisyphus/evidence/task-11-korea-index.txt
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-11-dashboard-main.png
  - [ ] .sisyphus/evidence/task-11-korea-index.txt

  **Commit**: YES
  - Message: `feat(ui): implement main dashboard page with charts and table`
  - Files: app/dashboard/page.tsx
  - Pre-commit: npm run build

- [ ] 12. pytest 테스트 작성 (Python)

  **What to do**:
  - `python/tests/test_oecd_fetcher.py` - OECD 페칭 모듈 테스트
  - `python/tests/test_index_calculator.py` - 지수 계산 테스트
  - 테스트 케이스:
    - 정상 데이터 처리
    - 빈 데이터 처리
    - 한국 기준년도 계산 정확성
    - CSV/JSON 출력 검증

  **Must NOT do**:
  - 실제 OECD API 호출하지 않음 (mock 사용)
  - 과도한 테스트 (필수 케이스만)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Python 테스트 작성 및 검증
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - None

  **Parallelization**:
  - **Can Run In Parallel**: YES (within Wave 3)
  - **Parallel Group**: Wave 3 (with Tasks 11, 13, 14)
  - **Blocks**: None (테스트는 독립적)
  - **Blocked By**: Task 3 (oecd_fetcher), Task 6 (index_calculator)

  **References**:

  **Pattern References**:
  - `python/oecd_fetcher.py` - 테스트 대상 모듈
  - `python/index_calculator.py` - 테스트 대상 모듈
  - pytest 공식 문서: https://docs.pytest.org/

  **Acceptance Criteria**:
  - [ ] `python -m pytest python/tests/ -v` → PASS (모든 테스트)
  - [ ] 테스트 커버리지 80% 이상
  - [ ] mock을 사용해 API 호출 시뮬레이션

  **QA Scenarios**:

  ```
  Scenario: pytest 전체 실행
    Tool: Bash (pytest)
    Preconditions: 모든 Python 모듈 구현됨
    Steps:
      1. cd python && python -m pytest tests/ -v --tb=short
    Expected Result: 모든 테스트 통과, 실패 없음
    Failure Indicators: FAILED 테스트 있음, ImportError
    Evidence: .sisyphus/evidence/task-12-pytest-output.txt

  Scenario: 테스트 커버리지 확인
    Tool: Bash (pytest)
    Preconditions: pytest-cov 설치됨
    Steps:
      1. python -m pytest tests/ --cov=python --cov-report=term
      2. 커버리지 80% 이상 확인
    Expected Result: Coverage report, 80%+ coverage
    Evidence: .sisyphus/evidence/task-12-coverage.txt
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-12-pytest-output.txt
  - [ ] .sisyphus/evidence/task-12-coverage.txt

  **Commit**: YES
  - Message: `test: add pytest tests for Python modules`
  - Files: python/tests/test_oecd_fetcher.py, python/tests/test_index_calculator.py
  - Pre-commit: python -m pytest python/tests/ -v

- [ ] 13. Playwright 테스트 작성 (UI)

  **What to do**:
  - `e2e/dashboard.spec.ts` 생성
  - 테스트 케이스:
    - 대시보드 페이지 로드
    - 차트 렌더링 확인
    - 테이블 데이터 표시 확인
    - 한국어 텍스트 표시 확인
    - 데이터 다운로드 링크 작동 확인

  **Must NOT do**:
  - 복잡한 상호작용 테스트 (필수 기능만)
  - API 모킹하지 않음 (실제 API 사용)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Playwright E2E 테스트 작성
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - None

  **Parallelization**:
  - **Can Run In Parallel**: YES (within Wave 3)
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 14)
  - **Blocks**: None
  - **Blocked By**: Task 11 (대시보드 페이지)

  **References**:

  **Pattern References**:
  - Playwright 문서: https://playwright.dev/
  - `app/dashboard/page.tsx` - 테스트 대상 페이지

  **External References**:
  - Playwright 예제: https://playwright.dev/docs/intro

  **Acceptance Criteria**:
  - [ ] `npx playwright test` → PASS (모든 테스트)
  - [ ] 대시보드 UI 요소들 정상 확인
  - [ ] 한국어 텍스트 검증

  **QA Scenarios**:

  ```
  Scenario: Playwright 전체 테스트 실행
    Tool: Bash (playwright)
    Preconditions: Next.js 서버 실행 중, Playwright 설치됨
    Steps:
      1. npx playwright test e2e/dashboard.spec.ts --reporter=list
    Expected Result: 모든 테스트 통과
    Failure Indicators: FAILED 테스트, 타임아웃
    Evidence: .sisyphus/evidence/task-13-playwright-report.txt

  Scenario: 대시보드 시각적 회귀 테스트
    Tool: Playwright (screenshot)
    Preconditions: 대시보드 페이지 로드됨
    Steps:
      1. 페이지 스크린샷 촬영 (전체 페이지)
      2. 스크린샷 파일 존재 확인
    Expected Result: 스크린샷 파일 생성, UI 요소들 보임
    Evidence: .sisyphus/evidence/task-13-dashboard-screenshot.png
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-13-playwright-report.txt
  - [ ] .sisyphus/evidence/task-13-dashboard-screenshot.png

  **Commit**: YES
  - Message: `test: add Playwright E2E tests for dashboard`
  - Files: e2e/dashboard.spec.ts
  - Pre-commit: npx playwright test

- [ ] 14. 에러 처리 + 로딩 상태 UI

  **What to do**:
  - API 호출 실패 시 에러 메시지 표시
  - 데이터 로딩 중 스켈레톤/스피너 UI
  - 빈 데이터 상태 처리
  - 한국어 에러 메시지:
    - "데이터를 불러오는 중 오류가 발생했습니다."
    - "데이터가 없습니다."

  **Must NOT do**:
  - 복잡한 에러 복구 로직 (단순 재시도만)
  - 콘솔 로그 남기기 (프로덕션)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: UI 상태 관리 및 에러 처리
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - None

  **Parallelization**:
  - **Can Run In Parallel**: YES (within Wave 3)
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 13)
  - **Blocks**: None
  - **Blocked By**: Task 7 (API), Task 11 (대시보드)

  **References**:

  **Pattern References**:
  - `app/api/oecd/route.ts` - API 에러 응답 참조
  - React 에러 바운더리 패턴

  **Acceptance Criteria**:
  - [ ] API 에러 시 사용자 친화적 메시지 표시
  - [ ] 로딩 중 스피너/스켈레톤 표시
  - [ ] 한국어 메시지 적용

  **QA Scenarios**:

  ```
  Scenario: API 에러 시 메시지 표시
    Tool: Playwright
    Preconditions: API 서버 중단 또는 에러 응답 시뮬레이션
    Steps:
      1. API 에러 발생 유도 (서버 중단)
      2. 대시보드 페이지 접속
      3. "데이터를 불러오는 중 오류가 발생했습니다." 메시지 확인
    Expected Result: 에러 메시지 표시, 앱 크래시 없음
    Failure Indicators: 화이트 스크린, Uncaught Error
    Evidence: .sisyphus/evidence/task-14-error-handling.png

  Scenario: 로딩 상태 표시
    Tool: Playwright
    Preconditions: 느린 네트워크 시뮬레이션
    Steps:
      1. 네트워크 지연 시뮬레이션 (slow 3G)
      2. 페이지 접속
      3. 로딩 스피너/스켈레톤 확인
    Expected Result: 로딩 UI 표시
    Evidence: .sisyphus/evidence/task-14-loading-state.png
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-14-error-handling.png
  - [ ] .sisyphus/evidence/task-14-loading-state.png

  **Commit**: YES
  - Message: `feat(ui): add error handling and loading states`
  - Files: app/components/ErrorDisplay.tsx, app/components/LoadingSpinner.tsx (optional)
  - Pre-commit: npm run build

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
>
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**
> **Never mark F1-F4 as checked before getting user's okay.** Rejection or user feedback -> fix -> re-run -> present again -> wait for okay.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + linter + `npm test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp).
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill if UI)
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (features working together, not isolation). Test edge cases: empty state, invalid input, rapid actions. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **1**: `feat: initialize Next.js project with TypeScript` - package.json, tsconfig.json, npm install
- **2**: `setup: configure Python environment and dependencies` - requirements.txt, venv setup
- **3**: `feat(data): implement OECD data fetching module` - python/oecd_fetcher.py
- **6**: `feat(data): implement K-Collusion index calculator` - python/index_calculator.py
- **7**: `feat(api): add Next.js API routes for OECD data` - app/api/oecd/route.ts
- **8-11**: `feat(ui): implement dashboard layout and visualization` - app/dashboard/*.tsx, components/*.tsx
- **12-13**: `test: add pytest and Playwright tests` - tests/*.py, e2e/*.spec.ts

---

## Success Criteria

### Verification Commands
```bash
# Python tests
cd python && python -m pytest tests/ -v

# Next.js build
npm run build

# Next.js tests (if configured)
npm test

# Playwright tests
npx playwright test
```

### Final Checklist
- [ ] All "Must Have" present (G20 comparison, Korea=100 index, dashboard, etc.)
- [ ] All "Must NOT Have" absent (no AI prediction, no auth, no multilingual, no mobile app)
- [ ] All tests pass (pytest + Playwright)
- [ ] Dashboard displays in Korean
- [ ] Data visualization shows ranking table + bar charts
