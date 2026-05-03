# K-Collusion Index - Part 3: OECD Data Fetching#

## TL;DR
> **Part 3**: OECD 데이터 페칭 모듈 구현
> **Task**: Task 3 only
> **Agent**: unspecified-high

---

## Context#

### Prerequisites:
- Task 2 완료: Python 가상환경 + 의존성 설치됨
- pandasdmx, requests, pandas 설치됨

---

## TODOs#

- [ ] 3. OECD 데이터 페칭 모듈 구현#

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
  - 데이터 시각화 코드 포함하지 않음#

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: OECD API 연동 및 데이터 처리 로직이 필요한 복잡한 작업#

  **Parallelization**:
  - **Can Run In Parallel**: NO (Python 환경 필요)
  - **Parallel Group**: Sequential after Task 2
  - **Blocks**: Task 6, Task 7, Task 12
  - **Blocked By**: Task 2 (Python 환경 필요)#

  **References**:
  - **API References**:
    - OECD API 문서: https://data.oecd.org/api/sdmx-json-documentation/
    - OECD API 상세 엔드포인트:
      - CPI: `https://sdmx.oecd.org/public/rest/data/OECD.SDD.CPI,DSD_CPI@DF_CPI/.{COUNTRIES}.A?startPeriod={START}&endPeriod={END}&format=jsondata`
      - PPP: `https://sdmx.oecd.org/public/rest/data/OECD.EL,DSD_PPP@DF_PPP/.{COUNTRIES}.A?startPeriod={START}&endPeriod={END}&format=jsondata`
  - **External References**:
    - pandasdmx 사용 예제: https://pandasdmx.readthedocs.io/en/latest/example.html
    - 샘플 노트북: https://nbviewer.jupyter.org/github/bdecon/econ_data/blob/master/APIs/OECD.ipynb#

  **Acceptance Criteria**:
  - [ ] `python -m pytest python/tests/test_oecd_fetcher.py -v` → PASS
  - [ ] CPI 데이터 수집 함수가 DataFrame 반환
  - [ ] G20 국가 코드가 정확히 정의됨#

  **QA Scenarios**:
  ```
  Scenario: OECD CPI 데이터 수집 테스트
    Tool: Bash (python)
    Preconditions: Python 환경 설정됨, oecd_fetcher.py 작성됨
    Steps:
      1. python -c "from oecd_fetcher import fetch_cpi_data; df = fetch_cpi_data(['KOR', 'USA'], 2020, 2023); print(df.head())"
    Expected Result: DataFrame 출력 (columns: country_code, year, value)
    Failure Indicators: ImportError, API 에러
    Evidence: .sisyphus/evidence/task-3-cpi-fetch-output.txt#

  Scenario: G20 국가 코드 확인
    Tool: Bash (python)
    Preconditions: oecd_fetcher.py에 G20 국가 정의됨
    Steps:
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
