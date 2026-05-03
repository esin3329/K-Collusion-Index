# K-Collusion Index - Part 2: Python Environment#

## TL;DR
> **Part 2**: Python 가상환경 + 의존성 설치
> **Task**: Task 2 only
> **Agent**: quick

---

## Context#

### Prerequisites:
- Windows 환경
- Python 3.x 설치됨

---

## TODOs#

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
    - **Reason**: 패키지 설치 및 환경 설정만 필요

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

---

## Evidence to Capture#
- [ ] .sisyphus/evidence/task-2-python-import.txt
- [ ] .sisyphus/evidence/task-2-pytest-version.txt

## Next Part#
After Part 2 completes, proceed to Part 3: OECD Data Fetching (Task 3)
