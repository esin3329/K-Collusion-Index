"""K-Collusion Index calculation helpers."""

from __future__ import annotations

import json
from datetime import datetime
from typing import Optional

import pandas as pd


def calculate_k_collusion_index(
    df: pd.DataFrame,
    base_year: int = 2020,
    dataset_type: str = "CPI",
) -> pd.DataFrame:
    """Calculate relative price index values with Korea fixed at 100."""
    base_df = df[
        (df["year"] == base_year) & (df["dataset_type"] == dataset_type)
    ].copy()

    if base_df.empty:
        raise ValueError(
            f"No data found for year {base_year} and dataset type {dataset_type}"
        )

    korea_base = base_df[base_df["country_code"] == "KOR"]["value"].values

    if len(korea_base) == 0:
        raise ValueError("Korea (KOR) data not found in the dataset")

    korea_base_value = korea_base[0]

    result_df = base_df.copy()
    result_df["index_value"] = (result_df["value"] / korea_base_value) * 100
    result_df["index_value"] = result_df["index_value"].round(2)
    result_df.loc[result_df["country_code"] == "KOR", "index_value"] = 100.0

    result_df = result_df[
        ["country_code", "country_name", "year", "index_value", "dataset_type"]
    ]

    return result_df.sort_values("index_value", ascending=False).reset_index(drop=True)


def calculate_multi_year_index(
    df: pd.DataFrame,
    start_year: int = 2020,
    end_year: int = 2024,
    dataset_type: str = "CPI",
) -> pd.DataFrame:
    """Calculate yearly K-Collusion Index values over a year range."""
    all_results = []

    for year in range(start_year, end_year + 1):
        year_df = df[
            (df["year"] == year) & (df["dataset_type"] == dataset_type)
        ].copy()

        if year_df.empty:
            continue

        korea_value = year_df[year_df["country_code"] == "KOR"]["value"].values
        if len(korea_value) == 0:
            continue

        korea_base_value = korea_value[0]
        year_df["index_value"] = (year_df["value"] / korea_base_value) * 100
        year_df["index_value"] = year_df["index_value"].round(2)
        year_df.loc[year_df["country_code"] == "KOR", "index_value"] = 100.0

        all_results.append(
            year_df[
                ["country_code", "country_name", "year", "index_value", "dataset_type"]
            ]
        )

    if not all_results:
        raise ValueError("No data available for the specified years")

    return (
        pd.concat(all_results, ignore_index=True)
        .sort_values(["year", "index_value"], ascending=[True, False])
        .reset_index(drop=True)
    )


def export_to_csv(df: pd.DataFrame, filename: Optional[str] = None) -> str:
    """Export a DataFrame to CSV and return the written file path."""
    if filename is None:
        date_str = datetime.now().strftime("%Y%m%d")
        filename = f"k-collusion-index-{date_str}.csv"

    df.to_csv(filename, index=False, encoding="utf-8-sig")
    return filename


def export_to_json(df: pd.DataFrame, filename: Optional[str] = None) -> str:
    """Export a DataFrame to JSON and return the written file path."""
    if filename is None:
        date_str = datetime.now().strftime("%Y%m%d")
        filename = f"k-collusion-index-{date_str}.json"

    json_data = df.to_dict(orient="records")

    with open(filename, "w", encoding="utf-8") as file:
        json.dump(json_data, file, ensure_ascii=False, indent=2)

    return filename


def get_ranking(df: pd.DataFrame) -> list[dict]:
    """Return country ranking rows sorted by index value descending."""
    result = df.sort_values("index_value", ascending=False).reset_index(drop=True)
    result["rank"] = range(1, len(result) + 1)

    return result[["rank", "country_code", "country_name", "index_value"]].to_dict(
        "records"
    )


if __name__ == "__main__":
    from oecd_fetcher import fetch_cpi_data

    print("Testing K-Collusion Index calculation with CPI data...")
    cpi_df = fetch_cpi_data()
    index_df = calculate_k_collusion_index(cpi_df, base_year=2023, dataset_type="CPI")
    print(index_df)

    print("\nRanking:")
    for item in get_ranking(index_df):
        print(
            f"{item['rank']}. {item['country_name']} "
            f"({item['country_code']}): {item['index_value']}"
        )
