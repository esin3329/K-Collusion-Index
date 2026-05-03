"use client";

import React from 'react';

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({
  message = '데이터를 불러오는 과정에서 오류가 발생했습니다.',
  onRetry
}: ErrorDisplayProps) {
  return (
    <div style={{
      backgroundColor: '#fff5f5',
      border: '1px solid #fc8181',
      borderRadius: '8px',
      padding: '2rem',
      textAlign: 'center',
      color: '#c53030',
      margin: '20px 0'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚠️</div>
      <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#e53e3e',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 500
          }}
        >
          다시 시도
        </button>
      )}
    </div>
  );
}