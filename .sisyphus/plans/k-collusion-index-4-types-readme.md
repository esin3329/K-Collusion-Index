# K-Collusion Index - Part 4: TypeScript Types & README#

## TL;DR
> **Part 4**: TypeScript 타입 정의 + README 문서화
> **Tasks**: Task 4, Task 5
> **Agents**: quick, writing#

---

## Context#

### Prerequisites:
- Task 1 완료: Next.js 프로젝트 초기화됨
- Task 2 완료: Python 환경 설정됨#

---

## TODOs#

- [ ] 4. TypeScript 타입/인터페이스 정의#

  **What to do**:
  - `app/types/oecd.ts` 생성
  - 데이터 모델 인터페이스 정의:
    - `OECDDataItem`: { countryCode, countryName, year, value, datasetType }
    - `KCollusionIndex`: { countryCode, countryName, indexValue, baseYear }
    - `ChartDataItem`: { name, value, rank }
  - API 응답 타입 정의
  - 상수 정의: G20 국가 목록, 기준년도#

  **Must NOT do**:
  - 구현 로직 포함하지 않음 (타입만 정의)
  - 과도한 제네릭 사용하지 않음#

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 타입 정의만 필요, 복잡한 로직 없음#

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 5)
  - **Blocks**: Task 7, Task 9
  - **Blocked By**: None (can start immediately)#

  **References**:
  - TypeScript 인터페이스 예제: https://www.typescriptlang.org/docs/handbook/interfaces.html#

  **Acceptance Criteria**:
  - [ ] `tsc --noEmit` 성공 (타입 오류 없음)
  - [ ] 정의된 인터페이스를 다른 파일에서 import 가능#

  **QA Scenarios**:
  ```
  Scenario: TypeScript 타입 컴파일 확인
    Tool: Bash (tsc)
    Preconditions: tsconfig.json 설정됨
    Steps:
      1. npx tsc --noEmit
    Expected Result: 에러 없이 종료 (exit code 0)
    Evidence: .sisyphus/evidence/task-4-tsc-output.txt#
  ```

  **Evidence to Capture:**
  - [ ] .sisyphus/evidence/task-4-tsc-output.txt#

  **Commit**: YES
  - Message: `feat(types): define TypeScript interfaces for OECD data`
  - Files: app/types/oecd.ts#

---

- [ ] 5. 프로젝트 문서화 (README)#

  **What to do**:
  - `README.md` 생성 (프로젝트 루트)
  - 내용 포함:
    - 프로젝트 개요 (K-Collusion Index 소개)
    - 기술 스택 (Next.js, Python, OECD API)
    - 설치 및 실행 방법
    - 데이터 출처 및 라이선스
  - 한국어로 작성#

  **Must NOT do**:
  - 과도하게 긴 문서 작성하지 않음
  - 구현 세부사항 나열하지 않음 (코드 자체가 문서)#

  **Recommended Agent Profile**:
  - **Category**: `writing`
    - Reason: 문서 작성 작업#

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4)
  - **Blocks**: None
  - **Blocked By**: None (can start immediately)#

  **References**:
  - README 작성 가이드: https://www.makeareadme.com/#

  **Acceptance Criteria**:
  - [ ] README.md 파일 존재
  - [ ] 한국어로 작성됨
  - [ ] 설치 방법 명시됨#

  **QA Scenarios**:
  ```
  Scenario: README 존재 확인
    Tool: Bash (ls)
    Preconditions: 작업 완료
    Steps:
      1. cat README.md | head -20
    Expected Result: README 내용 출력 (한국어 포함)
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
