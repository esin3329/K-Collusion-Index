# K-Collusion Index (한국 물가 지수 비교 서비스)

K-Collusion Index는 한국의 물가 수준을 G20 국가들과 비교하여 시각화하는 웹 대시보드 프로젝트입니다. OECD 데이터를 활용하여 한국을 기준(100)으로 설정한 상대적 물가 지수를 제공합니다.

## 주요 기능

- **지수 계산**: 한국 물가를 100으로 설정하여 G20 국가들의 상대적 물가 지수 산출
- **데이터 시각화**: Recharts를 활용한 직관적인 바 차트 및 순위 테이블 제공
- **데이터 내보내기**: 분석된 데이터를 외부 형식으로 내보내는 기능
- **실시간 데이터**: OECD API를 통한 최신 물가 데이터 반영

## 기술 스택

- **Frontend**: Next.js (App Router), TypeScript, Recharts
- **Data Processing**: Python (pandas, pandasdmx)
- **Data Source**: OECD SDMX-JSON API
- **Styling**: Pure CSS (No Tailwind CSS)

## 설치 및 실행 방법

### 1. Python 환경 설정
데이터 처리를 위해 Python 가상환경을 설정하고 필요한 패키지를 설치합니다.

```bash
# 가상환경 생성
python -m venv venv

# 가상환경 활성화 (Windows)
.\venv\Scripts\activate

# 가상환경 활성화 (POSIX)
source venv/bin/activate

# 필요한 패키지 설치
pip install pandas pandasdmx requests
```

### 2. Node.js 환경 설정
프론트엔드 의존성을 설치하고 개발 서버를 실행합니다.

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속하여 결과를 확인할 수 있습니다.

## CI / Build-time data generation (CI / 빌드 시 데이터 생성)

이 프로젝트는 빌드 시점에 최신 데이터를 수집하여 정적 파일로 포함합니다. GitHub Actions를 통해 자동화되어 있으며, 로컬에서도 동일한 과정을 수행할 수 있습니다.

### CI 워크플로우 (.github/workflows/prebuild.yml)
- **트리거**: `main` 브랜치로의 push 및 pull request 발생 시 실행됩니다.
- **역할**: Python 환경을 구축하고 `python/generate_data.py`를 실행하여 `public/data/k-collusion-index.json` 파일을 생성합니다. 이후 Next.js 빌드를 진행하여 데이터가 포함된 정적 사이트를 생성합니다.

### 로컬에서 데이터 생성하기 (Local Prebuild)
CI와 동일하게 로컬에서 데이터를 수집하고 생성하려면 다음 단계를 따르세요.

#### 1. Python 가상환경 생성 및 활성화
```bash
# POSIX (Linux, macOS)
python -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
.\venv\Scripts\activate
```

#### 2. 필수 패키지 설치
```bash
pip install pandas pandasdmx requests
```

#### 3. 데이터 생성 스크립트 실행 및 확인
```bash
# POSIX
python python/generate_data.py && ls public/data/k-collusion-index.json

# Windows
python python/generate_data.py; if (Test-Path public/data/k-collusion-index.json) { ls public/data/k-collusion-index.json }
```

## 데이터 출처
본 프로젝트는 [OECD SDMX-JSON API](https://sdmx.oecd.org/public/rest/data/)에서 제공하는 공식 데이터를 사용합니다.

## 라이선스
이 프로젝트는 MIT 라이선스를 따릅니다.
