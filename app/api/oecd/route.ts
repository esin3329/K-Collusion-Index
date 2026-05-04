import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // public/data/k-collusion-index.json 파일에서 데이터 읽기
    const dataPath = join(process.cwd(), 'public/data/k-collusion-index.json');
    const fileContent = readFileSync(dataPath, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    return NextResponse.json(jsonData);
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