"""Generate the static K-Collusion Index data file.

The app is deployed as a static Cloudflare Pages site, so the dashboard reads
public/data/k-collusion-index.json directly instead of calling a runtime API.
"""

from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

G20_COUNTRIES = [
    "ARG",
    "AUS",
    "BRA",
    "CAN",
    "CHN",
    "FRA",
    "DEU",
    "IND",
    "IDN",
    "ITA",
    "JPN",
    "KOR",
    "MEX",
    "RUS",
    "SAU",
    "ZAF",
    "TUR",
    "GBR",
    "USA",
    "EU27",
]

COUNTRY_NAMES = {
    "ARG": "아르헨티나",
    "AUS": "호주",
    "BRA": "브라질",
    "CAN": "캐나다",
    "CHN": "중국",
    "FRA": "프랑스",
    "DEU": "독일",
    "IND": "인도",
    "IDN": "인도네시아",
    "ITA": "이탈리아",
    "JPN": "일본",
    "KOR": "대한민국",
    "MEX": "멕시코",
    "RUS": "러시아",
    "SAU": "사우디아라비아",
    "ZAF": "남아프리카공화국",
    "TUR": "튀르키예",
    "GBR": "영국",
    "USA": "미국",
    "EU27": "유럽연합",
}

SAMPLE_INDICES = {
    "USA": 125.5,
    "GBR": 118.7,
    "DEU": 112.3,
    "FRA": 110.5,
    "EU27": 108.5,
    "AUS": 108.2,
    "ITA": 107.4,
    "CAN": 105.8,
    "KOR": 100.0,
    "JPN": 98.2,
    "SAU": 95.2,
    "RUS": 88.6,
    "CHN": 85.3,
    "BRA": 82.4,
    "MEX": 78.5,
    "ZAF": 75.8,
    "IND": 72.1,
    "IDN": 70.2,
    "TUR": 68.3,
    "ARG": 65.4,
}


def generate_sample_data(base_year: int = 2023) -> list[dict[str, object]]:
    data = [
        {
            "countryCode": country_code,
            "countryName": COUNTRY_NAMES[country_code],
            "indexValue": index_value,
            "baseYear": base_year,
        }
        for country_code, index_value in SAMPLE_INDICES.items()
    ]
    return sorted(data, key=lambda item: float(item["indexValue"]), reverse=True)


def save_to_json(data: list[dict[str, object]], output_dir: str = "public/data") -> Path:
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    filename = output_path / "k-collusion-index.json"

    payload = {
        "success": True,
        "data": data,
        "timestamp": datetime.now().isoformat(),
        "baseYear": 2023,
    }

    with filename.open("w", encoding="utf-8") as file:
        json.dump(payload, file, ensure_ascii=False, indent=2)
        file.write("\n")

    return filename


def main() -> None:
    print("Generating K-Collusion Index data")
    data = generate_sample_data(base_year=2023)
    filename = save_to_json(data)
    print(f"Wrote {filename}")
    for rank, item in enumerate(data[:5], 1):
        print(f"{rank}. {item['countryName']}: {item['indexValue']}")


if __name__ == "__main__":
    main()
