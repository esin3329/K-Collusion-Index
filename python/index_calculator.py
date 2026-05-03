"""
K-Collusion Index 계산 모듈
한국을 기준(100)으로 설정하여 G20 국가들의 상대적 물가 지수를 계산합니다.
"""

import pandas as pd
import json
from typing import List, Optional
from datetime import datetime


def calculate_k_collusion_index(
    df: pd.DataFrame,
    base_year: int = 2020,
    dataset_type: str = "CPI"
) -> pd.DataFrame:
    """
    K-Collusion 지수를 계산합니다. (한국 = 100)

    Args:
        df: CPI 또는 PPP 데이터 DataFrame
        base_year: 기준 연도 (기본값: 2020)
        dataset_type: 데이터셋 유형 ("CPI" 또는 "PPP")

    Returns:
        DataFrame with columns: country_code, country_name, year, index_value, dataset_type
    """
    # 기준 연도 데이터만 필터링
    base_df = df[(df['year'] == base_year) & (df['dataset_type'] == dataset_type)].copy()

    if base_df.empty:
        raise ValueError(f"No data found for year {base_year} and dataset type {dataset_type}")

    # 한국의 기준값 가져오기
    korea_base = base_df[base_df['country_code'] == 'KOR']['value'].values

    if len(korea_base) == 0:
        raise ValueError("Korea (KOR) data not found in the dataset")

    korea_base_value = korea_base[0]

    # 모든 국가의 지수 계산: index = (value / korea_base_value) * 100
    result_df = base_df.copy()
    result_df['index_value'] = (result_df['value'] / korea_base_value) * 100
    result_df['index_value'] = result_df['index_value'].round(2)

    # 필요한 컬럼만 선택
    result_df = result_df[['country_code', 'country_name', 'year', 'index_value', 'dataset_type']]

    # 한국은 반드시 100이어야 함
    result_df.loc[result_df['country_code'] == 'KOR', 'index_value'] = 100.0

    return result_df.sort_values('index_value', ascending=False).reset_index(drop=True)


def calculate_multi_year_index(
    df: pd.DataFrame,
    start_year: int = 2020,
    end_year: int = 2024,
    dataset_type: str = "CPI"
) -> pd.DataFrame:
    """
    여러 해에 대한 K-Collusion 지수를 계산합니다.

    Args:
        df: CPI 또는 PPP 데이터 DataFrame
        start_year: 시작 연도
        end_year: 종료 연도
        dataset_type: 데이터셋 유형

    Returns:
        DataFrame with yearly index values
    """
    all_results = []

    for year in range(start_year, end_year + 1):
        year_df = df[(df['year'] == year) & (df['dataset_type'] == dataset_type)].copy()

        if year_df.empty:
            continue

        # 해당 연도의 한국 값으로 기준 설정
        korea_value = year_df[year_df['country_code'] == 'KOR']['value'].values
        if len(korea_value) == 0:
            continue

        korea_base_value = korea_value[0]
        year_df['index_value'] = (year_df['value'] / korea_base_value) * 100
        year_df['index_value'] = year_df['index_value'].round(2)

        # 한국은 반드시 100
        year_df.loc[year_df['country_code'] == 'KOR', 'index_value'] = 100.0

        all_results.append(year_df[['country_code', 'country_name', 'year', 'index_value', 'dataset_type']])

    if not all_results:
        raise ValueError("No data available for the specified years")

    return pd.concat(all_results, ignore_index=True).sort_values(
        ['year', 'index_value'], ascending=[True, False]
    ).reset_index(drop=True)


def export_to_csv(df: pd.DataFrame, filename: Optional[str] = None) -> str:
    """
    DataFrame을 CSV 파일로 내보냅니다.

    Args:
        df: 내보낼 DataFrame
        filename: 파일 이름 (기본값: k-collusion-index-YYYYMMDD.csv)

    Returns:
        저장된 파일 경로
    """
    if filename is None:
        date_str = datetime.now().strftime("%Y%m%d")
        filename = f"k-collusion-index-{date_str}.csv"

    df.to_csv(filename, index=False, encoding='utf-8-sig')
    return filename


def export_to_json(df: pd.DataFrame, filename: Optional[str] = None) -> str:
    """
    DataFrame을 JSON 파일로 내보냅니다.

    Args:
        df: 내보낼 DataFrame
        filename: 파일 이름 (기본값: k-collusion-index-YYYYMMDD.json)

    Returns:
        저장된 파일 경로
    """
    if filename is None:
        date_str = datetime.now().strftime("%Y%m%d")
        filename = f"k-collusion-index-{date_str}.json"

    # DataFrame을 JSON으로 변환
    json_data = df.to_dict(orient='records')

    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(json_data, f, ensure_ascii=False, indent=2)

    return filename


def get_ranking(df: pd.DataFrame) -> List[dict]:
    """
    국가별 순위를 반환합니다.

    Args:
        df: K-Collusion 지수 DataFrame

    Returns:
        순위 목록 (list of dicts with rank, country_code, country_name, index_value)
    """
    result = df.sort_values('index_value', ascending=False).reset_index(drop=True)
    result['rank'] = range(1, len(result) + 1)

    return result[['rank', 'country_code', 'country_name', 'index_value']].to_dict('records')


if __name__ == "__main__":
    # 테스트
    from oecd_fetcher import fetch_cpi_data

    print("테스트: CPI 데이터로 지수 계산...")
    cpi_df = fetch_cpi_data()
    index_df = calculate_k_collusion_index(cpi_df, base_year=2023, dataset_type="CPI")
    print(index_df)

    print("\n순위:")
    for item in get_ranking(index_df):
        print(f"{item['rank']}. {item['country_name']} ({item['country_code']}): {item['index_value']}")

    print("\nCSV 내보내기 테스트...")
    csv_file = export_to_csv(index_df)
    print(f"저장됨: {csv_file}")

    print("\nJSON 내보내기 테스트...")
    json_file = export_to_json(index_df)
    print(f"저장됨: {json_file}")