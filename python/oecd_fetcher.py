"""
OECD 데이터페칭 모듈
G20 국가들의 CPI 및 PPP 데이터를 수집합니다.
"""

import pandas as pd
import requests
from typing import List, Dict, Any

# G20 국가 코드 (20개국)
G20_COUNTRIES = [
    'ARG',  # Argentina
    'AUS',  # Australia
    'BRA',  # Brazil
    'CAN',  # Canada
    'CHN',  # China
    'FRA',  # France
    'DEU',  # Germany
    'IND',  # India
    'IDN',  # Indonesia
    'ITA',  # Italy
    'JPN',  # Japan
    'KOR',  # Korea
    'MEX',  # Mexico
    'RUS',  # Russia
    'SAU',  # Saudi Arabia
    'ZAF',  # South Africa
    'TUR',  # Turkey
    'GBR',  # United Kingdom
    'USA',  # United States
    'EU27', # European Union
]

# 국가명 매핑
COUNTRY_NAMES = {
    'ARG': '아르헨티나',
    'AUS': '호주',
    'BRA': '브라질',
    'CAN': '캐나다',
    'CHN': '중국',
    'FRA': '프랑스',
    'DEU': '독일',
    'IND': '인도',
    'IDN': '인도네시아',
    'ITA': '이탈리아',
    'JPN': '일본',
    'KOR': '대한민국',
    'MEX': '멕시코',
    'RUS': '러시아',
    'SAU': '사우디아라비아',
    'ZAF': '남아프리카공화국',
    'TUR': '터키',
    'GBR': '영국',
    'USA': '미국',
    'EU27': '유럽연합',
}

# OECD API 기본 URL
OECD_API_BASE = "https://sdmx.oecd.org/public/rest/data"


def fetch_cpi_data(countries: List[str] = None, start_year: int = 2020, end_year: int = 2024) -> pd.DataFrame:
    """
    CPI (소비자물가지수) 데이터를 수집합니다.
    
    Args:
        countries: 국가 코드 목록 (기본값: G20 전체)
        start_year: 시작 연도
        end_year: 종료 연도
    
    Returns:
        DataFrame with columns: country_code, country_name, year, value
    """
    if countries is None:
        countries = G20_COUNTRIES
    
    # OECD CPI 데이터셋
    # 실제 구현에서는 pandasdmx를 사용하거나 직접 API 호출
    # 여기서는 샘플 데이터 반환 (실제 API 연동 전 테스트용)
    
    data = []
    for country in countries:
        for year in range(start_year, end_year + 1):
            # 샘플 데이터 (실제 구현에서는 API 호출)
            # 한국 = 100 기준,其他国家는 상대적 값
            base_value = 100
            if country == 'KOR':
                value = 100.0
            else:
                # 랜덤 값 (실제 구현에서는 API에서 가져옴)
                import random
                value = base_value + random.uniform(-30, 50)
            
            data.append({
                'country_code': country,
                'country_name': COUNTRY_NAMES.get(country, country),
                'year': year,
                'value': round(value, 2),
                'dataset_type': 'CPI'
            })
    
    return pd.DataFrame(data)


def fetch_ppp_data(countries: List[str] = None, start_year: int = 2020, end_year: int = 2024) -> pd.DataFrame:
    """
    PPP (구매력평가) 데이터를 수집합니다.
    
    Args:
        countries: 국가 코드 목록 (기본값: G20 전체)
        start_year: 시작 연도
        end_year: 종료 연도
    
    Returns:
        DataFrame with columns: country_code, country_name, year, value
    """
    if countries is None:
        countries = G20_COUNTRIES
    
    data = []
    for country in countries:
        for year in range(start_year, end_year + 1):
            # 샘플 데이터 (실제 구현에서는 API 호출)
            base_value = 100
            if country == 'KOR':
                value = 100.0
            else:
                import random
                value = base_value + random.uniform(-20, 40)
            
            data.append({
                'country_code': country,
                'country_name': COUNTRY_NAMES.get(country, country),
                'year': year,
                'value': round(value, 2),
                'dataset_type': 'PPP'
            })
    
    return pd.DataFrame(data)


def fetch_oecd_data(dataflow_id: str, countries: List[str] = None, 
                    start_period: str = "2020", end_period: str = "2024") -> Dict[str, Any]:
    """
    OECD SDMX-JSON API를 직접 호출합니다.
    
    Args:
        dataflow_id: 데이터플로우 ID
        countries: 국가 코드 목록
        start_period: 시작 기간
        end_period: 종료 기간
    
    Returns:
        API 응답 (dict)
    """
    if countries is None:
        countries = G20_COUNTRIES
    
    # 국가 코드 문자열 생성
    country_str = "+".join(countries)
    
    # API URL 구성
    url = f"{OECD_API_BASE}/OECD.SDD.CPI,DSD_CPI@DF_CPI/{country_str}.A?startPeriod={start_period}&endPeriod={end_period}&format=jsondata"
    
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        return {"error": str(e)}


if __name__ == "__main__":
    # 테스트
    print("Testing CPI data fetch...")
    cpi_df = fetch_cpi_data(['KOR', 'USA', 'JPN'], 2023, 2024)
    print(cpi_df)
    
    print("\nTesting PPP data fetch...")
    ppp_df = fetch_ppp_data(['KOR', 'USA', 'JPN'], 2023, 2024)
    print(ppp_df)