"""
K-Collusion Index 계산 모듈 테스트
"""

import pytest
import pandas as pd
import os
from index_calculator import (
    calculate_k_collusion_index,
    calculate_multi_year_index,
    export_to_csv,
    export_to_json,
    get_ranking
)


# 테스트용 샘플 데이터 생성
def create_sample_cpi_data():
    """테스트용 샘플 CPI 데이터 생성"""
    data = []
    countries = ['KOR', 'USA', 'JPN', 'DEU', 'GBR', 'FRA', 'CAN', 'AUS']
    country_names = {
        'KOR': '대한민국', 'USA': '미국', 'JPN': '일본', 'DEU': '독일',
        'GBR': '영국', 'FRA': '프랑스', 'CAN': '캐나다', 'AUS': '호주'
    }

    for country in countries:
        for year in [2020, 2021, 2022, 2023]:
            if country == 'KOR':
                value = 100.0
            else:
                # 한국 대비 상대적 값
                value = 100.0 + (hash(country + str(year)) % 100 - 50)

            data.append({
                'country_code': country,
                'country_name': country_names.get(country, country),
                'year': year,
                'value': round(value, 2),
                'dataset_type': 'CPI'
            })

    return pd.DataFrame(data)


class TestCalculateKCollusionIndex:
    """K-Collusion 지수 계산 테스트"""

    def test_korea_index_equals_100(self):
        """한국의 지수는 반드시 100이어야 함"""
        df = create_sample_cpi_data()
        result = calculate_k_collusion_index(df, base_year=2023, dataset_type="CPI")

        korea_row = result[result['country_code'] == 'KOR']
        assert len(korea_row) == 1
        assert korea_row['index_value'].values[0] == 100.0

    def test_index_calculation_formula(self):
        """지수 계산 공식 검증"""
        df = create_sample_cpi_data()
        result = calculate_k_collusion_index(df, base_year=2023, dataset_type="CPI")

        # USA의 지수가 100보다 크거나 작을 수 있음 (상대적 지수)
        usa_row = result[result['country_code'] == 'USA']
        usa_index = usa_row['index_value'].values[0]

        # 한국은 100,其他国家는 상대적
        assert usa_index > 0  # 지수가 양수인지 확인

    def test_required_columns(self):
        """필수 컬럼 존재 확인"""
        df = create_sample_cpi_data()
        result = calculate_k_collusion_index(df, base_year=2023, dataset_type="CPI")

        required_columns = ['country_code', 'country_name', 'year', 'index_value', 'dataset_type']
        for col in required_columns:
            assert col in result.columns

    def test_base_year_filter(self):
        """기준 연도 필터링 확인"""
        df = create_sample_cpi_data()
        result = calculate_k_collusion_index(df, base_year=2022, dataset_type="CPI")

        assert all(result['year'] == 2022)

    def test_dataset_type_filter(self):
        """데이터셋 유형 필터링 확인"""
        df = create_sample_cpi_data()
        result = calculate_k_collusion_index(df, base_year=2023, dataset_type="CPI")

        assert all(result['dataset_type'] == 'CPI')


class TestCalculateMultiYearIndex:
    """複数年 지수 계산 테스트"""

    def test_multiple_years(self):
        """複数년 데이터 처리"""
        df = create_sample_cpi_data()
        result = calculate_multi_year_index(df, start_year=2022, end_year=2023, dataset_type="CPI")

        assert len(result) > 0
        assert result['year'].nunique() == 2

    def test_korea_always_100(self):
        """모든 해에서 한국은 100"""
        df = create_sample_cpi_data()
        result = calculate_multi_year_index(df, start_year=2020, end_year=2023, dataset_type="CPI")

        korea_data = result[result['country_code'] == 'KOR']
        assert all(korea_data['index_value'] == 100.0)


class TestExportFunctions:
    """내보내기 기능 테스트"""

    def test_export_to_csv(self):
        """CSV 내보내기"""
        df = create_sample_cpi_data()
        result = calculate_k_collusion_index(df, base_year=2023, dataset_type="CPI")

        test_file = "test_output.csv"
        if os.path.exists(test_file):
            os.remove(test_file)

        saved_file = export_to_csv(result, test_file)

        assert os.path.exists(saved_file)
        assert saved_file == test_file

        # 파일 읽어서 검증
        loaded_df = pd.read_csv(test_file)
        assert len(loaded_df) == len(result)

        # 정리
        os.remove(test_file)

    def test_export_to_json(self):
        """JSON 내보내기"""
        df = create_sample_cpi_data()
        result = calculate_k_collusion_index(df, base_year=2023, dataset_type="CPI")

        test_file = "test_output.json"
        if os.path.exists(test_file):
            os.remove(test_file)

        saved_file = export_to_json(result, test_file)

        assert os.path.exists(saved_file)
        assert saved_file == test_file

        # 파일 읽어서 검증
        with open(test_file, 'r', encoding='utf-8') as f:
            import json
            data = json.load(f)
            assert len(data) == len(result)

        # 정리
        os.remove(test_file)


class TestGetRanking:
    """순위 기능 테스트"""

    def test_ranking_order(self):
        """순위 정렬 확인"""
        df = create_sample_cpi_data()
        result = calculate_k_collusion_index(df, base_year=2023, dataset_type="CPI")
        ranking = get_ranking(result)

        # 첫 번째 순위는 가장 높은 지수
        assert ranking[0]['index_value'] >= ranking[1]['index_value']

    def test_ranking_includes_rank(self):
        """순위에 rank 필드 포함"""
        df = create_sample_cpi_data()
        result = calculate_k_collusion_index(df, base_year=2023, dataset_type="CPI")
        ranking = get_ranking(result)

        assert 'rank' in ranking[0]
        assert ranking[0]['rank'] == 1


class TestEdgeCases:
    """엣지 케이스 테스트"""

    def test_empty_dataframe(self):
        """빈 DataFrame 처리"""
        empty_df = pd.DataFrame(columns=['country_code', 'country_name', 'year', 'value', 'dataset_type'])

        with pytest.raises(ValueError):
            calculate_k_collusion_index(empty_df)

    def test_no_korea_data(self):
        """한국 데이터 없는 경우"""
        df = create_sample_cpi_data()
        df = df[df['country_code'] != 'KOR']

        with pytest.raises(ValueError):
            calculate_k_collusion_index(df)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])