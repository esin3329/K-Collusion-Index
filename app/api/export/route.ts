import { NextRequest, NextResponse } from 'next/server';
import { KCollusionIndex } from '@/app/types/oecd';
import { readFileSync } from 'fs';
import { join } from 'path';

// public/data/k-collusion-index.json에서 데이터 로드
function loadDataFromFile(): KCollusionIndex[] {
  try {
    const dataPath = join(process.cwd(), 'public/data/k-collusion-index.json');
    const fileContent = readFileSync(dataPath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
    return jsonData.data || [];
  } catch (error) {
    console.error('데이터 파일 읽기 오류:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format')?.toLowerCase() || 'json';

    const data = loadDataFromFile();
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