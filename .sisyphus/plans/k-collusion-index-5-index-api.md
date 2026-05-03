# K-Collusion Index - Part 5: Index Calculator & API#

## TL;DR#
> **Part 5**: 지수 계산 모듈 + Next.js API 라우트#
> **Tasks**: Task 6, Task 7#
> **Agent**: unspecified-high, quick#

---

## Context#

### Prerequisites:
- Task 3 완료: OECD 데이터 페칭 모듈 구현됨 (python/oecd_fetcher.py)#
- Task 4 완료: TypeScript 타입 정의됨 (app/types/oecd.ts)#

---

## TODOs#

- [ ] 6. 지수 계산 모듈 구현 (Korea=100)#

  **What to do**:
  - `python/index_calculator.py` 생성#
  - K-Collusion 지수 계산 함수:#
    - `calculate_k_collusion_index(df, base_year=2020)` - Korea=100 기준 지수 계산#
    - 수식: index = (country_value / korea_base_value) × 100#
    - CPI와 PPP 데이터 처리#
    - 결과를 CSV와 JSON으로 저장하는 함수#
    - 단위 테스트 작성 (pytest)#

  **Must NOT do**:
  - 시각화 코드 포함하지 않음#
  - 웹 프레임워크 의존성 추가하지 않음 (순수 Python)#

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`#
    - Reason: 데이터 변환 로직과 지수 계산 알고리즘이 필요#

  **Parallelization**:
  - **Can Run In Parallel**: NO (OECD 데이터 모듈 필요)#
  - **Parallel Group**: Wave 2 (with Tasks 7, 8, 9, 10)#
  - **Blocks**: Task 10, Task 11, Task 12#
  - **Blocked By**: Task 3 (데이터 페칭 모듈)#

  **References**:
  - **Pattern References**: `python/oecd_fetcher.py` - 데이터 로드 패턴 참조#
  - **Data Model**:#
    - Long form: `country_code, country_name, year, dataset_type (CPI/PPP), obs_value`#
    - Derived: `index_KOR100 = (obs_value / korea_base_value) × 100`#

  **Acceptance Criteria**:
  - [ ] `python -m pytest python/tests/test_index_calculator.py -v` → PASS#
  - [ ] 지수 계산 결과가 올바른지 검증 (Korea=100 확인)#
  - [ ] CSV/JSON 출력 파일 생성됨#

  **QA Scenarios**:
  ```
  Scenario: 지수 계산 테스트#
    Tool: Bash (python)#
    Preconditions: oecd_fetcher.py와 샘플 데이터 존재#
    Steps:#
      1. python -c "from index_calculator import calculate_k_collusion_index; df = calculate_k_collusion_index(sample_df, 2020); print(df[df.country_code=='KOR']['index_value'].iloc[0])"#
    Expected Result: 100.0 출력 (한국 기준)#
    Evidence: .sisyphus/evidence/task-6-index-calc.txt#

  Scenario: CSV 출력 확인#
    Tool: Bash (cat)#
    Preconditions: 지수 계산 및 저장 완료#
    Steps:#
      1. head -5 data/k-collusion-index.csv#
    Expected Result: CSV 헤더와 데이터 행 출력 (country_code, index_value 포함)#
    Evidence: .sisyphus/evidence/task-6-csv-output.txt#
  ```

  **Evidence to Capture:**#
  - [ ] .sisyphus/evidence/task-6-index-calc.txt#
  - [ ] .sisyphus/evidence/task-6-csv-output.txt#

  **Commit**: YES#
  - Message: `feat(data): implement K-Collusion index calculator`#
  - Files: python/index_calculator.py, python/tests/test_index_calculator.py, data/.gitkeep#

---

- [ ] 7. Next.js API 라우트 설정#

  **What to do**:
  - `app/api/oecd/route.ts` 생성#
  - GET 핸들러 구현:#
    - OECD 데이터 조회 (Python 스크립트 실행 또는 미리 계산된 데이터 로드)#
    - JSON 응답 반환 (K-Collusion 지수 데이터)#
    - API 응답 타입 정의 (TypeScript)#
    - 에러 처리 (데이터 없음, Python 실행 실패 등)#

  **Must NOT do**:
  - 복잡한 비즈니스 로직 포함하지 않음 (데이터 제공만)#
  - 데이터베이스 연결하지 않음 (파일 기반)#

  **Recommended Agent Profile**:
  - **Category**: `quick`#
    - Reason: API 라우트 설정 및 데이터 반환 로직#

  **Parallelization**:
  - **Can Run In Parallel**: YES (within Wave 2)#
  - **Parallel Group**: Wave 2 (with Tasks 6, 8, 9, 10)#
  - **Blocks**: Task 11, Task 13, Task 14#
  - **Blocked By**: Task 3 (데이터 모듈), Task 4 (타입 정의)#

  **References**:
  - **Pattern References**:#
    - Next.js App Router API 라우트: https://nextjs.org/docs/app/building-your-application/routing/route-handlers#
    - `app/types/oecd.ts` - API 응답 타입 정의 참조#

  **Acceptance Criteria**:
  - [ ] `curl http://localhost:3000/api/oecd` 실행 시 JSON 응답#
  - [ ] 응답에 G20 국가 데이터 포함#
  - [ ] TypeScript 타입 오류 없음#

  **QA Scenarios**:
  ```
  Scenario: API 엔드포인트 테스트#
    Tool: Bash (curl)#
    Preconditions: Next.js 개발 서버 실행 중 (npm run dev)#
    Steps:#
      1. curl -s http://localhost:3000/api/oecd | head -20#
    Expected Result: JSON 데이터 출력 (countryCode, indexValue 포함)#
    Failure Indicators: 404 에러, JSON 파싱 오류#
    Evidence: .sisyphus/evidence/task-7-api-response.json#

  Scenario: API 응답 구조 확인#
    Tool: Bash (curl + jq)#
    Preconditions: API 응답 성공#
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
