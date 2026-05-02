# Draft: K-Collusion Index (한국 물가 국제 비교 지수)

## Requirements (confirmed)
- **목적**: 일반 대중 정보제공 - 누구나 쉽게 한국 물가가 얼마나 비싼지 한눈에 파악
- **결과물 형태**: 웹 대시보드 + 데이터셋/시각화 코드
- **비교 대상**: G20 주요국 (19개국 + EU + 한국 = 20개국)
  - G20: 아르헨티나, 호주, 브라질, 캐나다, 중국, 프랑스, 독일, 인도, 인도네시아, 이탈리아, 일본, 멕시코, 러시아, 사우디아라비아, 남아프리카공화국, 한국, 터키, 영국, 미국, 유럽연합
- **비교 품목**: 식료품/장보기 + 전체 종합 CPI
- **대시보드 언어**: 한국어만
- **시각화 방식**: 순위표 + 막대그래프

## Technical Decisions
- **데이터 소스**: OECD Statistics (CPI, PPP 등 공식 통계)
- **기술 스택**: Python (Pandas - 데이터 처리) + Next.js/React (대시보드 프론트엔드)
- **지수 계산 방식**: 상대 지수 (Korea = 100 기준, 다른 나라는 상대적 비율)
- [TBD] 시각화 라이브러리: D3.js, Chart.js, Plotly, Vega-Lite?

## Research Findings

### OECD 데이터 접근 (librarian 조사 결과)
- **API 방식**: OECD SDMX-JSON REST API 사용
  - 기본 URL: `https://sdmx.oecd.org/public/rest/data/`
  - 데이터셋 ID: CPI는 `PRICES_CPI`, PPP는 구매력평가 데이터셋
  - 파라미터: `?startPeriod=YYYY&endPeriod=YYYY&format=jsondata`
  - 예시 엔드포인트: `https://sdmx.oecd.org/public/rest/data/OECD.SDD.TPS,DSD_PDB@DF_PDB_LV,1.0/.KOR+USA+JPN...?startPeriod=2020&format=csvfilewithlabels`
- **Python 라이브러리**:
  - `pandasdmx`: SDMX-JSON 지원, OECD 데이터를 pandas DataFrame으로 변환
  - `requests` + `pandas`: 직접 API 호출 후 CSV/JSON 파싱
  - GitHub 예제: https://github.com/dr-leo/pandaSDMX
- **참고 자료**:
  - OECD API 문서: https://data.oecd.org/api/sdmx-json-documentation/
  - 샘플 노트북: https://nbviewer.jupyter.org/github/bdecon/econ_data/blob/master/APIs/OECD.ipynb
  - Big Mac Index (참고 사례): https://github.com/TheEconomist/big-mac-data

### Next.js 대시보드 구조 (explore 조사 결과)
- **권장 구조**: Next.js App Router + TypeScript + Recharts
  - `app/` 디렉토리 기반 라우팅
  - Server Components로 데이터 페칭, Client Components로 차트 렌더링
  - `"use client"` 지시어로 대화형 차트 컴포넌트 구현
- **주요 파일 구조**:
  - `app/layout.tsx` - 글로벌 레이아웃
  - `app/dashboard/page.tsx` - 대시보드 메인 페이지
  - `app/components/ChartCard.tsx` - 재사용 가능한 차트 컴포넌트
  - `app/api/oecd/route.ts` - OECD 데이터 API 라우트
- **시각화 라이브러리**:
  - **Recharts (추천)**: React 친화적, TypeScript 지원 우수
  - Chart.js (react-chartjs-2): 간단한 차트에 적합
  - D3.js: 커스텀 시각화가 필요할 때
- **참고 프로젝트**:
  - MacroView (Next.js + OECD 데이터): https://github.com/rickypcyt/macroview
  - Big Mac Index 웹앱: https://github.com/ahmedsamir45/big_mac_index

### 지수 계산 방법론
- **Korea=100 기준 상대 지수**:
  - 기준년도(예: 2015 또는 2020) 설정
  - 각 국가의 물가지수 = (국가 물가값 / 한국 기준년도 물가값) × 100
  - 예: 일본 물가가 한국의 0.8배면 지수는 80, 미국이 1.2배면 120
- **데이터 모델**:
  - Long form: country_code, country_name, year, dataset_type (CPI/PPP), obs_value
  - Derived: index_KOR100 = (obs_value / korea_base_value) × 100

## Open Questions
- [ ] 구체적으로 어떤 품목/서비스를 비교할까? (식료품, 주거, 교통, 의료 등)
- [ ] 업데이트 주기: 일회성 분석 vs 정기적 업데이트 시스템?
- [ ] 지수의 이름: "K-Collusion Index" 그대로 사용? (한국 담합 지수? 물가 지수?)
- [ ] 언어: 한국어만? 영어 병기?

## Scope Boundaries
- **INCLUDE**: G20 국가 물가 비교, 웹 대시보드, 시각화, 데이터셋, 식료품+전체 CPI, Python 데이터 처리, Next.js/React 프론트엔드
- **EXCLUDE**: 
  - AI 예측 기능 (머신러닝/통계적 예측)
  - 사용자 인증 시스템 (로그인/회원가입)
  - 다국어 지원 (한국어만)
  - 모바일 앱 개발

## Test Strategy Decision
- **Infrastructure exists**: NO (신규 프로젝트)
- **Automated tests**: YES (TDD 방식)
- **Framework**: pytest (Python) + Playwright (대시보드 UI)
- **Agent-Executed QA**: 모든 작업에 포함 (필수)

## Commit Strategy
- **방식**: 기능별 커밋 (논리적 단위별)
- **예시**: data-setup, api-integration, dashboard-ui, visualization-components
