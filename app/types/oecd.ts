// G20 국가 코드 목록 (19개국 + EU + 한국 = 20개국)
export const G20_COUNTRIES = [
  'ARG', // Argentina
  'AUS', // Australia
  'BRA', // Brazil
  'CAN', // Canada
  'CHN', // China
  'FRA', // France
  'DEU', // Germany
  'IND', // India
  'IDN', // Indonesia
  'ITA', // Italy
  'JPN', // Japan
  'KOR', // Korea (기준 국가)
  'MEX', // Mexico
  'RUS', // Russia
  'SAU', // Saudi Arabia
  'ZAF', // South Africa
  'TUR', // Turkey
  'GBR', // United Kingdom
  'USA', // United States
  'EU27', // European Union
] as const;

export type G20CountryCode = typeof G20_COUNTRIES[number];

// 기준년도
export const BASE_YEAR = 2020;

// OECD 데이터 항목 타입
export interface OECDDataItem {
  countryCode: G20CountryCode;
  countryName: string;
  year: number;
  value: number;
  datasetType: 'CPI' | 'PPP';
}

// K-Collusion 지수 타입 (Korea=100 기준)
export interface KCollusionIndex {
  countryCode: G20CountryCode;
  countryName: string;
  indexValue: number;
  baseYear: number;
}

// 차트 데이터 타입
export interface ChartDataItem {
  name: string;
  value: number;
  rank: number;
}

// API 응답 타입
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

// 국가 이름 매핑
export const COUNTRY_NAMES: Record<G20CountryCode, string> = {
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
};
