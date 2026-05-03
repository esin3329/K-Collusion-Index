"use client";

import React from 'react';
import { ChartDataItem } from '../types/oecd';

interface RankingTableProps {
  data: ChartDataItem[];
}

export default function RankingTable({ data }: RankingTableProps) {
  // Sort data by rank
  const sortedData = [...data].sort((a, b) => a.rank - b.rank);

  return (
    <div style={{ overflowX: 'auto', margin: '20px 0' }}>
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        textAlign: 'left',
        fontFamily: 'sans-serif'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Rank</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Country</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #ddd' }}>Index Value</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr 
              key={item.name} 
              style={{ 
                borderBottom: '1px solid #ddd',
                backgroundColor: item.name === '대한민국' ? '#fff3e0' : 'transparent',
                fontWeight: item.name === '대한민국' ? 'bold' : 'normal'
              }}
            >
              <td style={{ padding: '12px' }}>{item.rank}</td>
              <td style={{ padding: '12px' }}>{item.name}</td>
              <td style={{ padding: '12px' }}>{item.value.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
