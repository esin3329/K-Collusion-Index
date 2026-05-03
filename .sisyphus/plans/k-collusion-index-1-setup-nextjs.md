# K-Collusion Index - Part 1: Next.js Setup#

## TL;DR
> **Part 1**: Next.js 프로젝트 초기화 + TypeScript 설정
> **Task**: Task 1 only
> **Agent**: quick

---

## Context#

### Original Request
"한국물가를 다른 나라와 비교하여 얼마나 비싼지 자료를 분석하여 한눈에 볼 수 있는 지수로 만들어줘"

### Key Decisions
- 기술 스택: Python (Pandas) + Next.js/React
- TypeScript 사용
- Recharts 시각화
- Tailwind CSS 사용 안 함

---

## TODOs#

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
  - **Category**: `quick`
  - **Reason**: 단순 프로젝트 초기화 및 패키지 설치 작업

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 4, 5)
  - **Blocks**: Task 8, Task 9 (레이아웃/컴포넌트 생성 시 필요)
  - **Blocked By**: None (can start immediately)

  **References**:
  - Next.js App Router 공식 문서: https://nextjs.org/docs/app/getting-started
  - Recharts 공식 문서: https://recharts.org/en-US/

  **Acceptance Criteria**:
  - [ ] `npm run build` 성공
  - [ ] `npm run dev` 실행 시 기본 페이지 표시
  - [ ] package.json에 recharts, playwright 의존성 존재

  **QA Scenarios**:
  ```
  Scenario: Next.js 프로젝트 빌드 성공
    Tool: Bash (npm)
    Preconditions: 프로젝트 초기화 완료
    Steps:
      1. npm run build 실행
      2. 종료 코드 0 확인
    Expected Result: 빌드 성공, .next 디렉토리 생성
    Evidence: .sisyphus/evidence/task-1-build-output.txt

  Scenario: Recharts import 테스트
    Tool: Bash (node)
    Preconditions: npm install 완료
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
