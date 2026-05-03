import { NextRequest, NextResponse } from 'next/server';
import { KCollusionIndex, COUNTRY_NAMES, G20_COUNTRIES } from '@/app/types/oecd';

// 샘플 데이터 생성 (실제 구현에서는 Python 스크립트 사용)
function generateSampleData(): KCollusionIndex[] {
  const baseYear = 2020;
  const data: KCollusionIndex[] = [];

  data.push({
    countryCode: 'KOR',
    countryName: COUNTRY_NAMES['KOR'],
    indexValue: 100,
    baseYear,
  });

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
    if (countryCode === 'KOR') continue;
    const indexValue = sampleIndices[countryCode] || 100;
    data.push({
      countryCode,
      countryName: COUNTRY_NAMES[countryCode],
      indexValue,
      baseYear,
    });
  }

  return data.sort((a, b) => b.indexValue - a.indexValue);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format')?.toLowerCase() || 'json';

    const data = generateSampleData();
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');

    if (format === 'csv') {
      // CSV 형식으로 내보내기
      const csvHeader = 'countryCode,countryName,indexValue,baseYear\n';
      const csvRows = data.map(item =>
        `${item.countryCode},"${item.countryName}",${item.indexValue},${item.baseYear}`
      ).join('\n');

      const csvContent = csvHeader + csvRows;

      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="k-collusion-index-${dateStr}.csv"`,
        },
      });
    } else {
      // JSON 형식으로 내보내기 (기본값)
      return NextResponse.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('데이터 내보내기 오류:', error);

    return NextResponse.json(
      {
        success: false,
        error: '데이터를 내보내는 과정에서 오류가 발생했습니다.',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}