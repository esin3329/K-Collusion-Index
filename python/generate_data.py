"""
K-Collusion Index 데이터 생성 스크립트
OECD API에서 데이터를 가져와 지수를 계산하고 JSON 파일로 저장합니다.

실행: python python/generate_data.py
"""

import json
import os
from pathlib import Path
from datetime import datetime

# 선택적 import - pandas 없이도 작동하도록
try:
    from oecd_fetcher import fetch_cpi_data
    from index_calculator import calculate_k_collusion_index, get_ranking
    HAS_PANDAS = True
except ImportError:
    HAS_PANDAS = False

# G20 국가 코드
G20_COUNTRIES = [
    'ARG', 'AUS', 'BRA', 'CAN', 'CHN', 'FRA', 'DEU', 'IND', 'IDN', 'ITA',
    'JPN', 'KOR', 'MEX', 'RUS', 'SAU', 'ZAF', 'TUR', 'GBR', 'USA', 'EU27'
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


def generate_k_collusion_index_data(base_year: int = 2023) -> list:
    """
    K-Collusion Index 데이터를 생성합니다.
    
    Args:
        base_year: 기준 연도 (기본값: 2023)
    
    Returns:
        K-Collusion Index 리스트
    """
    if HAS_PANDAS:
        try:
            print(f"[*] OECD CPI 데이터 가져오는 중 (기준년도: {base_year})...")
            
            # CPI 데이터 가져오기
            cpi_df = fetch_cpi_data(countries=G20_COUNTRIES, start_year=base_year, end_year=base_year)
            
            if cpi_df.empty:
                raise ValueError("CPI 데이터를 가져올 수 없습니다.")
            
            print(f"[OK] CPI 데이터 가져오기 완료: {len(cpi_df)} 행")
            
            # K-Collusion 지수 계산
            print(f"[*] K-Collusion 지수 계산 중...")
            index_df = calculate_k_collusion_index(cpi_df, base_year=base_year, dataset_type="CPI")
            
            print(f"[OK] 지수 계산 완료: {len(index_df)} 국가")
            
            # DataFrame을 딕셔너리 리스트로 변환
            result = index_df.to_dict('records')
            
            # 결과 형식화 (API 응답 형식에 맞춤)
            formatted_result = []
            for item in result:
                formatted_result.append({
                    'countryCode': item['country_code'],
                    'countryName': item['country_name'],
                    'indexValue': float(item['index_value']),
                    'baseYear': base_year,
                })
            
            # 지수값 기준 내림차순 정렬
            formatted_result.sort(key=lambda x: x['indexValue'], reverse=True)
            
            return formatted_result
        
        except Exception as e:
            print(f"[ERROR] OECD 데이터 오류: {str(e)}")
            print("[*] 샘플 데이터로 대체합니다...")
            return generate_sample_data()
    else:
        print("[*] pandas 모듈이 없으므로 샘플 데이터를 사용합니다...")
        return generate_sample_data()


def generate_sample_data() -> list:
    """
    오류 발생 시 샘플 데이터를 반환합니다.
    """
    sample_indices = {
        'USA': 125.5, 'JPN': 98.2, 'DEU': 112.3, 'GBR': 118.7,
        'FRA': 110.5, 'CAN': 105.8, 'AUS': 108.2, 'CHN': 85.3,
        'IND': 72.1, 'MEX': 78.5, 'BRA': 82.4, 'RUS': 88.6,
        'SAU': 95.2, 'TUR': 68.3, 'ZAF': 75.8, 'ITA': 107.4,
        'IDN': 70.2, 'ARG': 65.4, 'EU27': 108.5, 'KOR': 100.0
    }
    
    result = []
    for country_code, index_value in sample_indices.items():
        result.append({
            'countryCode': country_code,
            'countryName': COUNTRY_NAMES.get(country_code, country_code),
            'indexValue': index_value,
            'baseYear': 2023,
        })
    
    result.sort(key=lambda x: x['indexValue'], reverse=True)
    return result


def save_to_json(data: list, output_dir: str = "public/data") -> str:
    """
    데이터를 JSON 파일로 저장합니다.
    
    Args:
        data: 저장할 데이터
        output_dir: 출력 디렉토리 (기본값: public/data)
    
    Returns:
        저장된 파일 경로
    """
    # 디렉토리 생성
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    # 파일 경로
    filename = output_path / "k-collusion-index.json"
    
    # JSON 저장
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump({
            'success': True,
            'data': data,
            'timestamp': datetime.now().isoformat(),
            'baseYear': 2023
        }, f, ensure_ascii=False, indent=2)
    
    print(f"[OK] 데이터 저장 완료: {filename}")
    return str(filename)


def main():
    """메인 함수"""
    print("=" * 60)
    print("K-Collusion Index 데이터 생성 시작")
    print("=" * 60)
    
    # 데이터 생성
    data = generate_k_collusion_index_data(base_year=2023)
    
    # JSON 파일로 저장
    filepath = save_to_json(data)
    
    # 생성된 데이터 미리보기
    print("\n[DATA] 생성된 데이터 (상위 5개):")
    for i, item in enumerate(data[:5], 1):
        print(f"  {i}. {item['countryName']}: {item['indexValue']}")
    
    print("\n" + "=" * 60)
    print("데이터 생성 완료!")
    print("=" * 60)


if __name__ == "__main__":
    main()
