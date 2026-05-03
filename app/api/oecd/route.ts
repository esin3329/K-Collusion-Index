import { NextResponse } from 'next/server';
import { KCollusionIndex, COUNTRY_NAMES, G20_COUNTRIES } from '@/app/types/oecd';

// 샘플 데이터 (실제 구현에서는 Python 스크립트 실행 또는 사전 계산된 데이터 사용)
function generateSampleData(): KCollusionIndex[] {
  const baseYear = 2020;
  const data: KCollusionIndex[] = [];

  // 한국은 반드시 100
  data.push({
    countryCode: 'KOR',
    countryName: COUNTRY_NAMES['KOR'],
    indexValue: 100,
    baseYear,
  });

  //其他国家는 상대적 지수 (샘플 값)
  const sampleIndices: Record<string, number> = {
    'USA': 125.5,
    'JPN': 98.2,
    'DEU': 112.3,
    'GBR': 118.7,
    'FRA': 110.5,
    'CAN': 105.8,
    'AUS': 108.2,
    'CHN': 85.3,
    'IND': 72.1,
    'MEX': 78.5,
    'BRA': 82.4,
    'RUS': 88.6,
    'SAU': 95.2,
    'TUR': 68.3,
    'ZAF': 75.8,
    'ITA': 107.4,
    'IDN': 70.2,
    'ARG': 65.4,
    'EU27': 108.5,
  };

  for (const countryCode of G20_COUNTRIES) {
    if (countryCode === 'KOR') continue; // 한국은 이미 추가됨

    const indexValue = sampleIndices[countryCode] || 100;
    data.push({
      countryCode,
      countryName: COUNTRY_NAMES[countryCode],
      indexValue,
      baseYear,
    });
  }

  // 지수 순으로 정렬
  return data.sort((a, b) => b.indexValue - a.indexValue);
}

export async function GET() {
  try {
    // 실제 구현에서는 Python 스크립트를 실행하여 데이터 계산
    // const pythonResult = await runPythonScript();
    // const data = JSON.parse(pythonResult);

    // 샘플 데이터 사용 (개발 단계)
    const data = generateSampleData();

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('OECD 데이터 조회 오류:', error);

    return NextResponse.json(
      {
        success: false,
        error: '데이터를 불러오는 과정에서 오류가 발생했습니다.',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}