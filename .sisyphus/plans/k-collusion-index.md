# K-Collusion Index - Part 1: Next.js Setup#

## TL;DR
> **Part 1**: Next.js ?�로?�트 초기??+ TypeScript ?�정
> **Task**: Task 1 only
> **Agent**: quick

---

## Context#

### Original Request
"?�국물�?�??�른 ?�라?� 비교?�여 ?�마??비싼지 ?�료�?분석?�여 ?�눈??�????�는 지?�로 만들?�줘"

### Key Decisions
- 기술 ?�택: Python (Pandas) + Next.js/React
- TypeScript ?�용
- Recharts ?�각??- Tailwind CSS ?�용 ????
---

## TODOs#

- [x] 1. Next.js ?�로?�트 초기??+ TypeScript ?�정

- [x] CI. Add GitHub Actions workflow to run prebuild data generation and Next.js build

- [x] Fix: removed invalid smoke-test condition from weekly-data-update workflow (2026-05-04T01:23:45Z)

- [x] Fix: removed tracked Python bytecode and updated .gitignore (2026-05-04T11:40:42Z)

  **What to do**:
  - `npx create-next-app@latest . --ts --app --eslint --no-tailwind --no-src-dir --import-alias "@/*"` ?�행
  - TypeScript ?�정 ?�인 (tsconfig.json)
  - Recharts ?�치: `npm install recharts`
  - Playwright ?�치: `npm init playwright@latest` (?�택: chromium�?
  - 기본 ?�일 구조 ?�성 (app/layout.tsx, app/page.tsx ??

  **Must NOT do**:
  - Tailwind CSS ?�치?��? ?�음 (?�수 CSS ?�는 ?�라???��????�용)
  - `src/` ?�렉?�리 ?�성?��? ?�음 (app/ 직접 ?�용)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Reason**: ?�순 ?�로?�트 초기??�??�키지 ?�치 ?�업

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 4, 5)
  - **Blocks**: Task 8, Task 9 (?�이?�웃/컴포?�트 ?�성 ???�요)
  - **Blocked By**: None (can start immediately)

  **References**:
  - Next.js App Router 공식 문서: https://nextjs.org/docs/app/getting-started
  - Recharts 공식 문서: https://recharts.org/en-US/

    **Acceptance Criteria**:
    - [x] `npm run build` ?�공
  - [ ] `npm run dev` ?�행 ??기본 ?�이지 ?�시
  - [ ] package.json??recharts, playwright ?�존??존재

  **QA Scenarios**:
  ```
  Scenario: Next.js ?�로?�트 빌드 ?�공
    Tool: Bash (npm)
    Preconditions: ?�로?�트 초기???�료
    Steps:
      1. npm run build ?�행
      2. 종료 코드 0 ?�인
    Expected Result: 빌드 ?�공, .next ?�렉?�리 ?�성
    Evidence: .sisyphus/evidence/task-1-build-output.txt

  Scenario: Recharts import ?�스??    Tool: Bash (node)
    Preconditions: npm install ?�료
    Steps:
      1. node -e "const Recharts = require('recharts'); console.log('OK')"
    Expected Result: "OK" 출력
    Evidence: .sisyphus/evidence/task-1-recharts-test.txt
  ```

  **Commit**: YES
  - Message: `feat: initialize Next.js project with TypeScript and dependencies`
  - Files: package.json, tsconfig.json, next.config.js, app/layout.tsx, app/page.tsx

---

## Evidence to Capture#
- [ ] .sisyphus/evidence/task-1-build-output.txt
- [ ] .sisyphus/evidence/task-1-recharts-test.txt

## Next Part#
After Part 1 completes, proceed to Part 2: Python Environment
# K-Collusion Index - Part 2: Python Environment#

## TL;DR
> **Part 2**: Python 가?�환�?+ ?�존???�치
> **Task**: Task 2 only
> **Agent**: quick

---

## Context#

### Prerequisites:
- Windows ?�경
- Python 3.x ?�치??
---

## TODOs#

- [x] 2. Python 가?�환�?+ ?�존???�치

  **What to do**:
  - Python 가?�환�??�성: `python -m venv venv`
  - 가?�환�??�성??(Windows: `venv\Scripts\activate`)
  - ?�수 ?�키지 ?�치: `pip install pandas requests pandasdmx pytest`
  - requirements.txt ?�성: `pip freeze > requirements.txt`
  - `python/` ?�렉?�리 ?�성 (?�이??처리 코드??

  **Must NOT do**:
  - ?�역 Python ?�경???�키지 ?�치?��? ?�음
  - 불필?�한 ?�키지 ?�치?��? ?�음 (?�이???�각?�용 matplotlib ???�외)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - **Reason**: ?�키지 ?�치 �??�경 ?�정�??�요

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 4, 5)
  - **Blocks**: Task 3, Task 6 (Python 모듈 ?�행 ???�요)
  - **Blocked By**: None (can start immediately)

  **References**:
  - Python venv 문서: https://docs.python.org/3/library/venv.html
  - pandasdmx 문서: https://pandasdmx.readthedocs.io/

  **Acceptance Criteria**:
  - [ ] `python -m pytest --version` ?�행 ?�공
  - [ ] `python -c "import pandasdmx; print('OK')"` ?�공
  - [ ] requirements.txt ?�일 존재

  **QA Scenarios**:
  ```
  Scenario: Python ?�경 ?�스??    Tool: Bash (python)
    Preconditions: 가?�환�??�성??    Steps:
      1. python -c "import pandas; import requests; import pandasdmx; print('All OK')"
    Expected Result: "All OK" 출력
    Evidence: .sisyphus/evidence/task-2-python-import.txt

  Scenario: pytest ?�행 ?�인
    Tool: Bash (pytest)
    Preconditions: pytest ?�치??    Steps:
      1. python -m pytest --version
    Expected Result: pytest 버전 ?�보 출력
    Evidence: .sisyphus/evidence/task-2-pytest-version.txt
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-2-python-import.txt
  - [ ] .sisyphus/evidence/task-2-pytest-version.txt

  **Commit**: YES
  - Message: `setup: configure Python environment and dependencies`
  - Files: requirements.txt, python/.gitkeep

---

## Evidence to Capture#
- [ ] .sisyphus/evidence/task-2-python-import.txt
- [ ] .sisyphus/evidence/task-2-pytest-version.txt

## Next Part#
After Part 2 completes, proceed to Part 3: OECD Data Fetching (Task 3)
# K-Collusion Index - Part 3: OECD Data Fetching#

## TL;DR
> **Part 3**: OECD ?�이???�칭 모듈 구현
> **Task**: Task 3 only
> **Agent**: unspecified-high

---

## Context#

### Prerequisites:
- Task 2 ?�료: Python 가?�환�?+ ?�존???�치??- pandasdmx, requests, pandas ?�치??
---

## TODOs#

- [x] 3. OECD ?�이???�칭 모듈 구현#

  **What to do**:
  - `python/oecd_fetcher.py` ?�성
  - OECD SDMX-JSON API ?�동 ?�수 구현:
    - `fetch_cpi_data(countries, start_year, end_year)` - CPI ?�이???�집
    - `fetch_ppp_data(countries, start_year, end_year)` - PPP ?�이???�집
  - G20 �?? 코드 ?�의 (KOR, USA, JPN, DEU, etc.)
  - pandasdmx ?�는 requests + pandas ?�용
  - ?�이???�제: country_code, year, value 컬럼?�로 ?�리
  - ?�위 ?�스???�성 (pytest)

  **Must NOT do**:
  - API ???�드코딩?��? ?�음 (OECD API??무료, ??불필??
  - 과도???�외 처리 (?�순???�러 메시지�?
  - ?�이???�각??코드 ?�함?��? ?�음#

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: OECD API ?�동 �??�이??처리 로직???�요??복잡???�업#

  **Parallelization**:
  - **Can Run In Parallel**: NO (Python ?�경 ?�요)
  - **Parallel Group**: Sequential after Task 2
  - **Blocks**: Task 6, Task 7, Task 12
  - **Blocked By**: Task 2 (Python ?�경 ?�요)#

  **References**:
  - **API References**:
    - OECD API 문서: https://data.oecd.org/api/sdmx-json-documentation/
    - OECD API ?�세 ?�드?�인??
      - CPI: `https://sdmx.oecd.org/public/rest/data/OECD.SDD.CPI,DSD_CPI@DF_CPI/.{COUNTRIES}.A?startPeriod={START}&endPeriod={END}&format=jsondata`
      - PPP: `https://sdmx.oecd.org/public/rest/data/OECD.EL,DSD_PPP@DF_PPP/.{COUNTRIES}.A?startPeriod={START}&endPeriod={END}&format=jsondata`
  - **External References**:
    - pandasdmx ?�용 ?�제: https://pandasdmx.readthedocs.io/en/latest/example.html
    - ?�플 ?�트�? https://nbviewer.jupyter.org/github/bdecon/econ_data/blob/master/APIs/OECD.ipynb#

  **Acceptance Criteria**:
  - [ ] `python -m pytest python/tests/test_oecd_fetcher.py -v` ??PASS
  - [ ] CPI ?�이???�집 ?�수가 DataFrame 반환
  - [ ] G20 �?? 코드가 ?�확???�의??

  **QA Scenarios**:
  ```
  Scenario: OECD CPI ?�이???�집 ?�스??    Tool: Bash (python)
    Preconditions: Python ?�경 ?�정?? oecd_fetcher.py ?�성??    Steps:
      1. python -c "from oecd_fetcher import fetch_cpi_data; df = fetch_cpi_data(['KOR', 'USA'], 2020, 2023); print(df.head())"
    Expected Result: DataFrame 출력 (columns: country_code, year, value)
    Failure Indicators: ImportError, API ?�러
    Evidence: .sisyphus/evidence/task-3-cpi-fetch-output.txt#

  Scenario: G20 �?? 코드 ?�인
    Tool: Bash (python)
    Preconditions: oecd_fetcher.py??G20 �?? ?�의??    Steps:
      1. python -c "from oecd_fetcher import G20_COUNTRIES; print(len(G20_COUNTRIES), 'countries')"
    Expected Result: "20 countries" 출력
    Evidence: .sisyphus/evidence/task-3-g20-countries.txt#
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-3-cpi-fetch-output.txt
  - [ ] .sisyphus/evidence/task-3-g20-countries.txt#

  **Commit**: YES
  - Message: `feat(data): implement OECD data fetching module`
  - Files: python/oecd_fetcher.py, python/tests/test_oecd_fetcher.py#
---

## Evidence to Capture#
- [ ] .sisyphus/evidence/task-3-cpi-fetch-output.txt
- [ ] .sisyphus/evidence/task-3-g20-countries.txt#

## Next Part#
After Part 3 completes, proceed to Part 4: TypeScript Types & README (Tasks 4, 5)
# K-Collusion Index - Part 4: TypeScript Types & README#

## TL;DR
> **Part 4**: TypeScript ?�???�의 + README 문서??> **Tasks**: Task 4, Task 5
> **Agents**: quick, writing#

---

## Context#

### Prerequisites:
- Task 1 ?�료: Next.js ?�로?�트 초기?�됨
- Task 2 ?�료: Python ?�경 ?�정??

---

## TODOs#

- [x] 4. TypeScript ?�???�터?�이???�의#

  **What to do**:
  - `app/types/oecd.ts` ?�성
  - ?�이??모델 ?�터?�이???�의:
    - `OECDDataItem`: { countryCode, countryName, year, value, datasetType }
    - `KCollusionIndex`: { countryCode, countryName, indexValue, baseYear }
    - `ChartDataItem`: { name, value, rank }
  - API ?�답 ?�???�의
  - ?�수 ?�의: G20 �?? 목록, 기�??�도#

  **Must NOT do**:
  - 구현 로직 ?�함?��? ?�음 (?�?�만 ?�의)
  - 과도???�네�??�용?��? ?�음#

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: ?�???�의�??�요, 복잡??로직 ?�음#

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 5)
  - **Blocks**: Task 7, Task 9
  - **Blocked By**: None (can start immediately)#

  **References**:
  - TypeScript ?�터?�이???�제: https://www.typescriptlang.org/docs/handbook/interfaces.html#

  **Acceptance Criteria**:
  - [ ] `tsc --noEmit` ?�공 (?�???�류 ?�음)
  - [ ] ?�의???�터?�이?��? ?�른 ?�일?�서 import 가??

  **QA Scenarios**:
  ```
  Scenario: TypeScript ?�??컴파???�인
    Tool: Bash (tsc)
    Preconditions: tsconfig.json ?�정??    Steps:
      1. npx tsc --noEmit
    Expected Result: ?�러 ?�이 종료 (exit code 0)
    Evidence: .sisyphus/evidence/task-4-tsc-output.txt#
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-4-tsc-output.txt#

  **Commit**: YES
  - Message: `feat(types): define TypeScript interfaces for OECD data`
  - Files: app/types/oecd.ts#

---

- [x] 5. ?�로?�트 문서??(README)#

  **What to do**:
  - `README.md` ?�성 (?�로?�트 루트)
  - ?�용 ?�함:
    - ?�로?�트 개요 (K-Collusion Index ?�개)
    - 기술 ?�택 (Next.js, Python, OECD API)
    - ?�치 �??�행 방법
    - ?�이??출처 �??�이?�스
  - ?�국?�로 ?�성#

  **Must NOT do**:
  - 과도?�게 �?문서 ?�성?��? ?�음
  - 구현 ?��??�항 ?�열?��? ?�음 (코드 ?�체가 문서)#

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: 문서 ?�성 ?�업#

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4)
  - **Blocks**: None
  - **Blocked By**: None (can start immediately)#

  **References**:
  - README ?�성 가?�드: https://www.makeareadme.com/#

  **Acceptance Criteria**:
  - [ ] README.md ?�일 존재
  - [ ] ?�국?�로 ?�성??  - [ ] ?�치 방법 명시??

  **QA Scenarios**:
  ```
  Scenario: README 존재 ?�인
    Tool: Bash (ls)
    Preconditions: ?�업 ?�료
    Steps:
      1. cat README.md | head -20
    Expected Result: README ?�용 출력 (?�국???�함)
    Evidence: .sisyphus/evidence/task-5-readme.txt#
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-5-readme.txt#

  **Commit**: YES
  - Message: `docs: add project README`
  - Files: README.md#

---

## Evidence to Capture#
- [ ] .sisyphus/evidence/task-4-tsc-output.txt#
- [ ] .sisyphus/evidence/task-5-readme.txt#

## Next Part#
After Part 4 completes, proceed to Part 5: Index Calculator & API Routes (Tasks 6, 7)#
# K-Collusion Index - Part 5: Index Calculator & API#

## TL;DR#
> **Part 5**: 지??계산 모듈 + Next.js API ?�우??
> **Tasks**: Task 6, Task 7#
> **Agent**: unspecified-high, quick#

---

## Context#

### Prerequisites:
- Task 3 ?�료: OECD ?�이???�칭 모듈 구현??(python/oecd_fetcher.py)#
- Task 4 ?�료: TypeScript ?�???�의??(app/types/oecd.ts)#

---

## TODOs#

- [x] 6. 지수계산 모듈 구현 (Korea=100) ✅

  **What to do**:
  - `python/index_calculator.py` ?�성#
  - K-Collusion 지??계산 ?�수:#
    - `calculate_k_collusion_index(df, base_year=2020)` - Korea=100 기�? 지??계산#
    - ?�식: index = (country_value / korea_base_value) × 100#
    - CPI?� PPP ?�이??처리#
    - 결과�?CSV?� JSON?�로 ?�?�하???�수#
    - ?�위 ?�스???�성 (pytest)#

  **Must NOT do**:
  - ?�각??코드 ?�함?��? ?�음#
  - ???�레?�워???�존??추�??��? ?�음 (?�수 Python)#

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`#
    - Reason: ?�이??변??로직�?지??계산 ?�고리즘???�요#

  **Parallelization**:
  - **Can Run In Parallel**: NO (OECD ?�이??모듈 ?�요)#
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 10)#
  - **Blocks**: Task 10, Task 11, Task 12#
  - **Blocked By**: Task 3 (?�이???�칭 모듈)#

  **References**:
  - **Pattern References**: `python/oecd_fetcher.py` - ?�이??로드 ?�턴 참조#
  - **Data Model**:#
    - Long form: `country_code, country_name, year, dataset_type (CPI/PPP), obs_value`#
    - Derived: `index_KOR100 = (obs_value / korea_base_value) × 100`#

  **Acceptance Criteria**:
  - [ ] `python -m pytest python/tests/test_index_calculator.py -v` ??PASS#
  - [ ] 지??계산 결과가 ?�바른�? 검�?(Korea=100 ?�인)#
  - [ ] CSV/JSON 출력 ?�일 ?�성??

  **QA Scenarios**:
  ```
  Scenario: 지??계산 ?�스??
    Tool: Bash (python)#
    Preconditions: oecd_fetcher.py?� ?�플 ?�이??존재#
    Steps:#
      1. python -c "from index_calculator import calculate_k_collusion_index; df = calculate_k_collusion_index(sample_df, 2020); print(df[df.country_code=='KOR']['index_value'].iloc[0])"#
    Expected Result: 100.0 출력 (?�국 기�?)#
    Evidence: .sisyphus/evidence/task-6-index-calc.txt#

  Scenario: CSV 출력 ?�인#
    Tool: Bash (cat)#
    Preconditions: 지??계산 �??�???�료#
    Steps:#
      1. head -5 data/k-collusion-index.csv#
    Expected Result: CSV ?�더?� ?�이????출력 (country_code, index_value ?�함)#
    Evidence: .sisyphus/evidence/task-6-csv-output.txt#
  ```

  **Evidence to Capture:**#
  - [ ] .sisyphus/evidence/task-6-index-calc.txt#
  - [ ] .sisyphus/evidence/task-6-csv-output.txt#

  **Commit**: YES#
  - Message: `feat(data): implement K-Collusion index calculator`#
  - Files: python/index_calculator.py, python/tests/test_index_calculator.py, data/.gitkeep#

---

- [x] 7. Next.js API ?�우???�정#

  **What to do**:
  - `app/api/oecd/route.ts` ?�성#
  - GET ?�들??구현:#
    - OECD ?�이??조회 (Python ?�크립트 ?�행 ?�는 미리 계산???�이??로드)#
    - JSON ?�답 반환 (K-Collusion 지???�이??#
    - API ?�답 ?�???�의 (TypeScript)#
    - ?�러 처리 (?�이???�음, Python ?�행 ?�패 ??#

  **Must NOT do**:
  - 복잡??비즈?�스 로직 ?�함?��? ?�음 (?�이???�공�?#
  - ?�이?�베?�스 ?�결?��? ?�음 (?�일 기반)#

  **Recommended Agent Profile**:
  - **Category**: `quick`#
    - Reason: API ?�우???�정 �??�이??반환 로직#

  **Parallelization**:
  - **Can Run In Parallel**: YES (within Wave 2)#
  - **Parallel Group**: Wave 2 (with Tasks 6, 8, 9, 10)#
  - **Blocks**: Task 11, Task 13, Task 14#
  - **Blocked By**: Task 3 (?�이??모듈), Task 4 (?�???�의)#

  **References**:
  - **Pattern References**:#
    - Next.js App Router API ?�우?? https://nextjs.org/docs/app/building-your-application/routing/route-handlers#
    - `app/types/oecd.ts` - API ?�답 ?�???�의 참조#

  **Acceptance Criteria**:
  - [ ] `curl http://localhost:3000/api/oecd` ?�행 ??JSON ?�답#
  - [ ] ?�답??G20 �?? ?�이???�함#
  - [ ] TypeScript ?�???�류 ?�음#

  **QA Scenarios**:
  ```
  Scenario: API ?�드?�인???�스??
    Tool: Bash (curl)#
    Preconditions: Next.js 개발 ?�버 ?�행 �?(npm run dev)#
    Steps:#
      1. curl -s http://localhost:3000/api/oecd | head -20#
    Expected Result: JSON ?�이??출력 (countryCode, indexValue ?�함)#
    Failure Indicators: 404 ?�러, JSON ?�싱 ?�류#
    Evidence: .sisyphus/evidence/task-7-api-response.json#

  Scenario: API ?�답 구조 ?�인#
    Tool: Bash (curl + jq)#
    Preconditions: API ?�답 ?�공#
    Steps:#
      1. curl -s http://localhost:3000/api/oecd | jq '.[0] | keys'#
    Expected Result: ["countryCode", "countryName", "indexValue", ...] 출력#
    Evidence: .sisyphus/evidence/task-7-api-keys.txt#
  ```

  **Evidence to Capture:**#
  - [ ] .sisyphus/evidence/task-7-api-response.json#
  - [ ] .sisyphus/evidence/task-7-api-keys.txt#

  **Commit**: YES#
  - Message: `feat(api): add Next.js API routes for OECD data`#
  - Files: app/api/oecd/route.ts#

---

## Evidence to Capture#
- [ ] .sisyphus/evidence/task-6-index-calc.txt#
- [ ] .sisyphus/evidence/task-6-csv-output.txt#
- [ ] .sisyphus/evidence/task-7-api-response.json#
- [ ] .sisyphus/evidence/task-7-api-keys.txt#

## Next Part#
After Part 5 completes, proceed to Part 6: Layout & Recharts (Tasks 8, 9)#
# K-Collusion Index - Part 6: Layout & Recharts#

## TL;DR#
> **Part 6**: ?�?�보???�이?�웃 + Recharts ?�각??컴포?�트#
> **Tasks**: Task 8, Task 9#
> **Agent**: visual-engineering, quick#

---

## Context#

### Prerequisites:
- Task 1 ?�료: Next.js ?�로?�트 초기?�됨#
- Task 4 ?�료: TypeScript ?�???�의??(app/types/oecd.ts)#
- Task 6 ?�료: 지??계산 모듈??(python/index_calculator.py)#

---

## TODOs#

- [x] 8. ?�?�보???�이?�웃 + ?�비게이??

  **What to do**:#
  - `app/dashboard/layout.tsx` ?�성 (?�?�보???�용 ?�이?�웃)#
  - `app/dashboard/page.tsx` 기본 구조 (?�중??Task 11?�서 ?�장)#
  - 공통 ?�이?�웃 컴포?�트:#
    - ?�더 (?�목: "K-Collusion Index - ?�국 물�? �?�� 비교")#
    - ?�비게이??(?? ?�?�보?? ?�이???�운로드)#
  - ?�국???�스???�용#
  - 반응???�자??기본 ?�용#

  **Must NOT do**:#
  - 복잡???��??�링 (Tailwind ?�용?��? ?�음)#
  - 차트 컴포?�트 ?�기??구현?��? ?�음 (Task 9?�서)#

  **Recommended Agent Profile**:#
  - **Category**: `visual-engineering`#
    - Reason: UI ?�이?�웃�?구조 ?�계#
  - **Skills**: []#

  **Parallelization**:#
  - **Can Run In Parallel**: YES (within Wave 2)#
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 9, 10)#
  - **Blocks**: Task 11#
  - **Blocked By**: Task 1 (Next.js ?�로?�트), Task 4 (?�??- ?�택??#

  **References**:#
  - Next.js App Router ?�이?�웃: https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#
  - `app/layout.tsx` - 루트 ?�이?�웃 참조#

  **Acceptance Criteria**:#
  - [ ] `npm run build` ?�공#
  - [ ] `/dashboard` 경로 ?�속 ???�이지 ?�더�?
  - [ ] ?�국???�스???�시??

  **QA Scenarios**:#
  ```#
  Scenario: ?�?�보???�이지 ?�더�?
    Tool: Playwright#
    Preconditions: Next.js 빌드 ?�료 (npm run build && npm start)#
    Steps:#
      1. ?�이지 ?�속: http://localhost:3000/dashboard#
      2. ?�목 "K-Collusion Index" ?�시 ?�인#
      3. ?�크린샷 캡처#
    Expected Result: ?�이지 로드, ?�국???�스???�시, ?�이?�웃 ?�상#
    Failure Indicators: 404 ?�러, �??�이지, ?�어 ?�류#
    Evidence: .sisyphus/evidence/task-8-dashboard-page.png#

  Scenario: ?�비게이??링크 ?�인#
    Tool: Playwright#
    Preconditions: ?�?�보???�이지 로드??
    Steps:#
      1. ?�비게이??바에??"?? 링크 찾기#
      2. 링크 ?�릭 ???�으�??�동 ?�인#
    Expected Result: ??/) ?�는 ?�?�보??/dashboard)�??�동#
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

- [x] 9. Recharts ?�각??컴포?�트#

  **What to do**:#
  - `app/components/BarChart.tsx` - 막�?그래??컴포?�트 ("use client")#
  - `app/components/RankingTable.tsx` - ?�위??컴포?�트 ("use client")#
  - Recharts BarChart ?�용:#
    - X�? �??�? Y�? K-Collusion 지??�?
    - ?�국??기�???100)?�로 ?�시#
    - ?�이??props�?받아 ?�각??
    - 기본 ?��??�링 (?�라???��????�는 CSS)#

  **Must NOT do**:#
  - Server Component?�서 Recharts ?�용?��? ?�음 (반드??"use client")#
  - 복잡???�호?�용 (?�터�? ?�렬) - 기본 기능�?

  **Recommended Agent Profile**:#
  - **Category**: `visual-engineering`#
    - Reason: Recharts�??�용???�각??컴포?�트 구현#
  - **Skills**: []#

  **Parallelization**:#
  - **Can Run In Parallel**: YES (within Wave 2)#
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 10)#
  - **Blocks**: Task 11#
  - **Blocked By**: Task 4 (?�???�의)#

  **References**:#
  - Recharts 공식 문서: https://recharts.org/en-US/api/BarChart#
  - `app/types/oecd.ts` - ChartDataItem ?�??참조#

  **Acceptance Criteria**:#
  - [ ] `npx tsc --noEmit` ?�공#
  - [ ] BarChart?� RankingTable 컴포?�트가 props�??�이??받음#
  - [ ] "use client" 지?�어 ?�함??

  **QA Scenarios**:#
  ```#
  Scenario: BarChart 컴포?�트 ?�더�?
    Tool: Playwright#
    Preconditions: 컴포?�트 구현?? ?�스???�이지 ?�성#
    Steps:#
      1. ?�플 ?�이?�로 BarChart ?�더�?
      2. 차트 컨테?�너 ?�인 (role="img" ?�는 chart)#
      3. ?�크린샷 캡처#
    Expected Result: 막�?그래???�시, X축에 �??�? Y축에 �?
    Evidence: .sisyphus/evidence/task-9-bar-chart.png#

  Scenario: RankingTable 컴포?�트 ?�스??
    Tool: Playwright#
    Preconditions: 컴포?�트 구현??
    Steps:#
      1. ?�플 ?�이?�로 RankingTable ?�더�?
      2. ?�이�???개수 ?�인 (G20 20개국)#
      3. ?�국(KOR) ??찾기 (index_value=100)#
    Expected Result: 20�??? ?�국??100?�로 ?�시??
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
# K-Collusion Index - Part 7: Export, Main Page, Error Handling#

## TL;DR#
> **Part 7**: ?�이???�보?�기, 메인 ?�?�보?? ?�러 처리#
> **Tasks**: Task 10, Task 11, Task 14#
> **Agent**: quick, visual-engineering#

---

## Context#

### Prerequisites:
- Task 6 ?�료: 지??계산 모듈 (python/index_calculator.py)#
- Task 7 ?�료: API ?�우??(app/api/oecd/route.ts)#
- Task 8-9 ?�료: ?�이?�웃 & Recharts 컴포?�트#

---

## TODOs#

- [x] 10. ?�이?�셋 ?�보?�기 기능#

  **What to do**:#
  - `app/api/export/route.ts` ?�성#
  - CSV/JSON ?�운로드 ?�드?�인??#
    - `/api/export?format=csv` - CSV ?�일 ?�운로드#
    - `/api/export?format=json` - JSON ?�일 ?�운로드#
    - ?�일 ?�름: `k-collusion-index-YYYYMMDD.csv/json`#
    - HTTP ?�더 ?�정 (Content-Disposition, Content-Type)#

  **Must NOT do**:#
  - ?�이??변??로직 ?�함?��? ?�음 (?��? 계산???�이???�용)#
  - ?�축 ?�일 ?�성?��? ?�음 (?�순 ?�일 ?�운로드�?#

  **Recommended Agent Profile**:#
  - **Category**: `quick`#
    - Reason: API ?�우?�에???�일 ?�운로드 ?�공#

  **Parallelization**:#
  - **Can Run In Parallel**: YES (within Wave 2)#
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8, 9)#
  - **Blocks**: Task 11 (?�이???�운로드 링크)#
  - **Blocked By**: Task 6 (지??계산 ?�료, ?�이???�일 존재)#

  **References**:#
  - Next.js Route Handlers: https://nextjs.org/docs/app/building-your-application/routing/route-handlers#
  - `app/api/oecd/route.ts` - API ?�우???�턴 참조#

  **Acceptance Criteria**:#
  - [ ] `curl http://localhost:3000/api/export?format=csv` ??CSV ?�일 ?�운로드#
  - [ ] `curl http://localhost:3000/api/export?format=json` ??JSON ?�일 ?�운로드#
  - [ ] ?�일 ?�름???�짜 ?�함??

  **QA Scenarios**:#
  ```#
  Scenario: CSV ?�운로드 ?�스??
    Tool: Bash (curl)#
    Preconditions: Next.js ?�버 ?�행 �? ?�이???�일 존재#
    Steps:#
      1. curl -OJ "http://localhost:3000/api/export?format=csv"#
      2. ls -l k-collusion-index-*.csv#
    Expected Result: CSV ?�일 ?�운로드, ?�용??countryCode, indexValue ?�함#
    Evidence: .sisyphus/evidence/task-10-export-csv.csv#

  Scenario: JSON ?�운로드 ?�스??
    Tool: Bash (curl)#
    Preconditions: JSON ?�이??존재#
    Steps:#
      1. curl "http://localhost:3000/api/export?format=json" | jq '.[0]'#
    Expected Result: JSON 배열 출력, �?번째 ?�소??countryCode ?�함#
    Evidence: .sisyphus/evidence/task-10-export-json.json#
  ```#

  **Evidence to Capture:**#
  - [ ] .sisyphus/evidence/task-10-export-csv.csv#
  - [ ] .sisyphus/evidence/task-10-export-json.json#

  **Commit**: YES#
  - Message: `feat(api): add dataset export functionality`#
  - Files: app/api/export/route.ts#

---

- [x] 11. 메인 ?�?�보???�이지 구현#

  **What to do**:#
  - `app/dashboard/page.tsx` ?�성#
  - API?�서 ?�이???�칭 (?�버 ?�이???�는 ?�라?�언??#
  - BarChart?� RankingTable 컴포?�트 ?�합#
  - ?�이???�머�??�계 ?�시:#
    - ?�국�?가??물�?가 ?��? ?�라#
    - ?�국�?가??물�?가 ??? ?�라#
    - ?�균 지??
  - ?�국???�이�??�용#

  **Must NOT do**:#
  - ?�라?�언???�이?�에?�만 ?�이???�칭 (SEO 고려, ?�버 컴포?�트 ?�용)#
  - 과도???�니메이??(?�순?�고 빠른 로딩)#

  **Recommended Agent Profile**:#
  - **Category**: `visual-engineering`#
    - Reason: ?�?�보??UI ?�합 �??�이???�각??

  **Parallelization**:#
  - **Can Run In Parallel**: NO (?�른 ?�업???�료 ?�요)#
  - **Parallel Group**: Wave 3 (with Tasks 12, 13, 14)#
  - **Blocks**: Task 13 (Playwright ?�스??#
  - **Blocked By**: Task 7 (API), Task 8 (?�이?�웃), Task 9 (컴포?�트), Task 10 (?�이??#

  **References**:#
  - `app/components/BarChart.tsx` - 막�?그래??컴포?�트#
  - `app/components/RankingTable.tsx` - ?�위??컴포?�트#
  - `app/api/oecd/route.ts` - ?�이??API#

  **Acceptance Criteria**:#
  - [ ] `npm run build` ?�공#
  - [ ] `/dashboard` ?�이지?�서 차트?� ?�이�?모두 ?�시#
  - [ ] ?�국???�스??모든 곳에 ?�용#
  - [ ] ?�이???�머�??�계 ?�확???�시#

  **QA Scenarios**:#
  ```#
  Scenario: ?�?�보??메인 ?�이지 ?�더�?
    Tool: Playwright#
    Preconditions: Next.js 빌드 ?�료, API ?�이??준�?
    Steps:#
      1. http://localhost:3000/dashboard ?�속#
      2. BarChart 컴포?�트 존재 ?�인 (role="img" ?�는 chart)#
      3. RankingTable 컴포?�트 존재 ?�인 (table)#
      4. "?�국 물�? �?�� 비교" ?�목 ?�인#
      5. ?�크린샷 캡처#
    Expected Result: 차트, ?�이�? ?�목 모두 ?�시, ?�국???�스??
    Failure Indicators: 컴포?�트 ?�락, ?�이??로딩 ?�패, ?�어 ?�류#
    Evidence: .sisyphus/evidence/task-11-dashboard-main.png#

  Scenario: ?�이???�확???�인 (?�국=100)#
    Tool: Playwright#
    Preconditions: ?�?�보???�이지 로드??
    Steps:#
      1. ?�이블에??"?�국" ?�는 "KOR" ??찾기#
      2. ?�당 ?�의 지??값이 100?��? ?�인#
      3. ?�른 �???�의 지??값이 100 주�????�는지 ?�인#
    Expected Result: ?�국 지??100, ?�른 �????50-200 범위#
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

- [x] 14. ?�러 처리 + 로딩 ?�태 UI#

  **What to do**:#
  - API ?�출 ?�패 ???�러 메시지 ?�시#
  - ?�이??로딩 �??�켈?�톤/?�피??UI#
  - �??�이???�태 처리#
  - ?�국???�러 메시지:#
    - "?�이?��? 불러?�는 �??�류가 발생?�습?�다."#
    - "?�이?��? ?�습?�다."#

  **Must NOT do**:#
  - 복잡???�러 복구 로직 (?�순 ?�시?�만)#
  - 콘솔 로그 ?�기�?(?�로?�션)#

  **Recommended Agent Profile**:#
  - **Category**: `quick`#
    - Reason: UI ?�태 관�?�??�러 처리#

  **Parallelization**:#
  - **Can Run In Parallel**: YES (within Wave 3)#
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 13)#
  - **Blocks**: None#
  - **Blocked By**: Task 7 (API), Task 11 (?�?�보??#

  **References**:#
  - `app/api/oecd/route.ts` - API ?�러 ?�답 참조#
  - React ?�러 바운?�리 ?�턴#

  **Acceptance Criteria**:#
  - [ ] API ?�러 ???�용??친화??메시지 ?�시#
  - [ ] 로딩 �??�피???�켈?�톤 ?�시#
  - [ ] ?�국??메시지 ?�용#

  **QA Scenarios**:#
  ```#
  Scenario: API ?�러 ??메시지 ?�시#
    Tool: Playwright#
    Preconditions: API ?�버 중단 ?�는 ?�러 ?�답 ?��??�이??
    Steps:#
      1. API ?�러 발생 ?�도 (?�버 중단)#
      2. ?�?�보???�이지 ?�속#
      3. "?�이?��? 불러?�는 �??�류가 발생?�습?�다." 메시지 ?�인#
    Expected Result: ?�러 메시지 ?�시, ???�래???�음#
    Failure Indicators: ?�이???�크�? Uncaught Error#
    Evidence: .sisyphus/evidence/task-14-error-handling.png#

  Scenario: 로딩 ?�태 ?�시#
    Tool: Playwright#
    Preconditions: ?�린 ?�트?�크 ?��??�이??
    Steps:#
      1. ?�트?�크 지???��??�이??(slow 3G)#
      2. ?�이지 ?�속#
      3. 로딩 ?�피???�켈?�톤 ?�인#
    Expected Result: 로딩 UI ?�시#
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
# K-Collusion Index - Part 8: Testing & Verification#

## TL;DR#
> **Part 8**: Testing & Final Verification - pytest, Playwright, Final Verification Wave#
> **Tasks**: Task 12, Task 13, F1-F4#
> **Agent**: unspecified-high, oracle, deep#

---

## Context (Dependencies from Part 1-7)#

### Completed in Part 1-7:#
- Task 1: Next.js ?�로?�트 초기???�료#
- Task 2: Python 가?�환�?+ ?�존???�치 ?�료#
- Task 3: OECD ?�이???�칭 모듈 구현 ?�료 (python/oecd_fetcher.py)#
- Task 4: TypeScript ?�???�터?�이???�의 ?�료 (app/types/oecd.ts)#
- Task 5: ?�로?�트 문서???�료 (README.md)#
- Task 6: 지??계산 모듈 구현 ?�료 (python/index_calculator.py)#
- Task 7: Next.js API ?�우???�정 ?�료 (app/api/oecd/route.ts)#
- Task 8: ?�?�보???�이?�웃 + ?�비게이???�료 (app/dashboard/layout.tsx)#
- Task 9: Recharts ?�각??컴포?�트 ?�료 (app/components/*.tsx)#
- Task 10: ?�이?�셋 ?�보?�기 기능 ?�료 (app/api/export/route.ts)#
- Task 11: 메인 ?�?�보???�이지 구현 ?�료 (app/dashboard/page.tsx)#
- Task 14: ?�러 처리 + 로딩 ?�태 UI ?�료#

### Ready for Part 8:#
- 모든 Python 모듈 구현 ?�료 (Task 3, 6)#
- 모든 UI 컴포?�트 구현 ?�료 (Task 8, 9, 11, 14)#
- API ?�우???�정 ?�료 (Task 7, 10)#
- Next.js 빌드 ?�공 ?�태#

---

## TODOs - Part 8#

- [x] 12. pytest ?�스???�성 (Python)#

  **What to do**:#
  - `python/tests/test_oecd_fetcher.py` - OECD ?�칭 모듈 ?�스??
  - `python/tests/test_index_calculator.py` - 지??계산 ?�스??
  - ?�스??켬스:**#
    - ?�상 ?�이??처리#
    - �??�이??처리#
    - ?�국 기�??�도 계산 ?�확??
    - CSV/JSON 출력 검�?

  **Must NOT do**:#
  - ?�제 OECD API ?�출?��? ?�음 (mock ?�용)#
  - 과도???�스??(?�수 켬스�?#

  **Recommended Agent Profile**:#
  - **Category**: `unspecified-high`#
    - **Reason**: Python ?�스???�성 �?검�?

  **Parallelization**:#
  - **Can Run In Parallel**: YES (within Wave 3)#
  - **Parallel Group**: Wave 3 (with Tasks 11, 13, 14)#
  - **Blocks**: None (?�스?�는 ?�립??#
  - **Blocked By**: Task 3 (oecd_fetcher), Task 6 (index_calculator)#

  **References**:#
  - **Pattern References**:#
    - `python/oecd_fetcher.py` - ?�스???�??모듈#
    - `python/index_calculator.py` - ?�스???�??모듈#
    - pytest 공식 문서: https://docs.pytest.org/#

  **Acceptance Criteria**:#
  - [ ] `python -m pytest python/tests/ -v` ??PASS (모든 ?�스??#
  - [ ] ?�스??커버리�? 80% ?�상#
  - [ ] mock???�용??API ?�출 ?��??�이??

  **QA Scenarios**:#
  ```#
  Scenario: pytest ?�체 ?�행#
    Tool: Bash (pytest)#
    Preconditions: 모든 Python 모듈 구현??
    Steps:#
      1. cd python && python -m pytest tests/ -v --tb=short#
    Expected Result: 모든 ?�스???�과, ?�패 ?�음#
    Failure Indicators: FAILED ?�스???�음, ImportError#
    Evidence: .sisyphus/evidence/task-12-pytest-output.txt#

  Scenario: ?�스??커버리�? ?�인#
    Tool: Bash (pytest)#
    Preconditions: pytest-cov ?�치??
    Steps:#
      1. python -m pytest tests/ --cov=python --cov-report=term#
      2. 커버리�? 80% ?�상 ?�인#
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

- [x] 13. Playwright ?�스???�성 (UI)#

  **What to do**:#
  - `e2e/dashboard.spec.ts` ?�성#
  - ?�스??켬스:**#
    - ?�?�보???�이지 로드#
    - 차트 ?�더�??�인#
    - ?�이�??�이???�시 ?�인#
    - ?�국???�스???�시 ?�인#
    - ?�이???�운로드 링크 ?�동 ?�인#

  **Must NOT do**:#
  - 복잡???�호?�용 ?�스??(?�수 기능�?#
  - API 모킹?��? ?�음 (?�제 API ?�용)#

  **Recommended Agent Profile**:#
  - **Category**: `unspecified-high`#
    - **Reason**: Playwright E2E ?�스???�성#

  **Parallelization**:#
  - **Can Run In Parallel**: YES (within Wave 3)#
  - **Parallel Group**: Wave 3 (with Tasks 11, 12, 14)#
  - **Blocks**: None#
  - **Blocked By**: Task 11 (?�?�보???�이지)#

  **References**:#
  - **Pattern References**:#
    - Playwright 문서: https://playwright.dev/#
    - `app/dashboard/page.tsx` - ?�스???�???�이지#

  **Acceptance Criteria**:#
  - [ ] `npx playwright test` ??PASS (모든 ?�스??#
  - [ ] ?�?�보??UI ?�소???�상 ?�인#
  - [ ] ?�국???�스??검�?

  **QA Scenarios**:#
  ```#
  Scenario: Playwright ?�체 ?�스???�행#
    Tool: Bash (playwright)#
    Preconditions: Next.js ?�버 ?�행 �? Playwright ?�치??
    Steps:#
      1. npx playwright test e2e/dashboard.spec.ts --reporter=list#
    Expected Result: 모든 ?�스???�과#
    Failure Indicators: FAILED ?�스?? ?�?�아??
    Evidence: .sisyphus/evidence/task-13-playwright-report.txt#

  Scenario: ?�?�보???�각???��? ?�스??
    Tool: Playwright (screenshot)#
    Preconditions: ?�?�보???�이지 로드??
    Steps:#
      1. ?�이지 ?�크린샷 촬영 (?�체 ?�이지)#
      2. ?�크린샷 ?�일 존재 ?�인#
    Expected Result: ?�크린샷 ?�일 ?�성, UI ?�소??보임#
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

## Final Verification Wave (MANDATORY ??after ALL implementation tasks)#

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.#
>#
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**#
> **Never mark F1-F4 as checked before getting user's okay.** Rejection or user feedback -> fix -> re-run -> present again -> wait for okay.#

- [x] F1. **Plan Compliance Audit** ??`oracle`#
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns ??reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.#
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`#

- [x] F2. **Code Quality Review** ??`unspecified-high`#
  Run `tsc --noEmit` + linter + `npm test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp).#
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`#

- [x] F3. **Real Manual QA** ??`unspecified-high` (+ `playwright` skill if UI)#
  Start from clean state. Execute EVERY QA scenario from EVERY task ??follow exact steps, capture evidence. Test cross-task integration (features working together, not isolation). Test edge cases: empty state, invalid input, rapid actions. Save to `.sisyphus/evidence/final-qa/`.#
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`#

- [x] F4. **Scope Fidelity Check** ??`deep`#
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 ??everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.#
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
