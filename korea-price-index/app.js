// =============================================
// DATA
// =============================================

// Helper: generate flag image HTML from country code
function flagImg(code, size = 20) {
  const lc = code.toLowerCase();
  return `<img src="https://flagcdn.com/w40/${lc}.png" alt="${code}" style="width:${size}px;height:${Math.round(size*0.75)}px;border-radius:3px;object-fit:cover;vertical-align:middle;">`;
}

const COUNTRIES = [
  { name: '스위스', nameEn: 'Switzerland', code: 'CH' },
  { name: '미국', nameEn: 'USA', code: 'US' },
  { name: '호주', nameEn: 'Australia', code: 'AU' },
  { name: '영국', nameEn: 'UK', code: 'GB' },
  { name: '독일', nameEn: 'Germany', code: 'DE' },
  { name: '프랑스', nameEn: 'France', code: 'FR' },
  { name: '한국', nameEn: 'South Korea', code: 'KR' },
  { name: '일본', nameEn: 'Japan', code: 'JP' },
  { name: '태국', nameEn: 'Thailand', code: 'TH' },
  { name: '베트남', nameEn: 'Vietnam', code: 'VN' },
];

// Numbeo-style indexes (NYC = 100)
const INDEX_DATA = {
  overall:    { CH: 101.2, US: 68.8, AU: 72.5, GB: 67.8, DE: 68.7, FR: 66.3, KR: 61.6, JP: 47.5, TH: 35.2, VN: 27.8 },
  food:       { CH: 112.5, US: 73.4, AU: 78.2, GB: 62.1, DE: 58.6, FR: 67.8, KR: 72.8, JP: 52.4, TH: 34.6, VN: 24.3 },
  rent:       { CH: 64.8, US: 72.3, AU: 55.2, GB: 52.7, DE: 36.5, FR: 41.3, KR: 28.4, JP: 24.8, TH: 12.5, VN: 8.2 },
  restaurant: { CH: 118.3, US: 72.1, AU: 74.5, GB: 66.8, DE: 60.2, FR: 68.9, KR: 52.3, JP: 42.6, TH: 18.4, VN: 14.2 },
};

// Korea-relative index (Korea = 100)
const KOREA_REL = COUNTRIES.map(c => {
  const o = INDEX_DATA.overall;
  const f = INDEX_DATA.food;
  const r = INDEX_DATA.restaurant;
  const rn = INDEX_DATA.rent;
  return {
    ...c,
    overall: Math.round((o[c.code] / o.KR) * 100),
    food: Math.round((f[c.code] / f.KR) * 100),
    restaurant: Math.round((r[c.code] / r.KR) * 100),
    rent: Math.round((rn[c.code] / rn.KR) * 100),
    transport: c.code === 'KR' ? 100 :
      c.code === 'CH' ? 178 : c.code === 'US' ? 132 : c.code === 'AU' ? 145 :
      c.code === 'GB' ? 158 : c.code === 'DE' ? 125 : c.code === 'FR' ? 118 :
      c.code === 'JP' ? 105 : c.code === 'TH' ? 52 : 38,
  };
});

// Item prices in USD
const ITEM_PRICES = [
  {
    name: '커피 (카페라떼)', emoji: '☕',
    prices: { KR: 4.50, US: 5.20, JP: 3.80, GB: 4.10, DE: 3.90, CH: 6.80, VN: 2.10, TH: 2.80 }
  },
  {
    name: '빅맥 세트', emoji: '🍔',
    prices: { KR: 5.80, US: 5.69, JP: 3.50, GB: 5.20, DE: 5.40, CH: 8.20, VN: 3.20, TH: 4.10 }
  },
  {
    name: '쌀 1kg', emoji: '🍚',
    prices: { KR: 4.20, US: 2.50, JP: 4.80, GB: 2.10, DE: 2.30, CH: 3.50, VN: 0.90, TH: 1.10 }
  },
  {
    name: '사과 1kg', emoji: '🍎',
    prices: { KR: 6.50, US: 4.20, JP: 5.80, GB: 3.10, DE: 2.80, CH: 4.30, VN: 2.50, TH: 3.20 }
  },
  {
    name: '소고기 1kg', emoji: '🥩',
    prices: { KR: 42.00, US: 15.50, JP: 28.00, GB: 14.80, DE: 14.20, CH: 48.00, VN: 11.00, TH: 12.00 }
  },
  {
    name: '지하철 1회', emoji: '🚇',
    prices: { KR: 1.00, US: 2.75, JP: 1.60, GB: 3.20, DE: 3.50, CH: 4.80, VN: 0.30, TH: 0.50 }
  },
];

// Bar colors
const BAR_COLORS = {
  CH: 'linear-gradient(90deg, #ef4444, #f97316)',
  US: 'linear-gradient(90deg, #3b82f6, #6366f1)',
  AU: 'linear-gradient(90deg, #f59e0b, #f97316)',
  GB: 'linear-gradient(90deg, #8b5cf6, #a855f7)',
  DE: 'linear-gradient(90deg, #64748b, #94a3b8)',
  FR: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
  KR: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
  JP: 'linear-gradient(90deg, #ec4899, #f43f5e)',
  TH: 'linear-gradient(90deg, #10b981, #06b6d4)',
  VN: 'linear-gradient(90deg, #22c55e, #10b981)',
};

// =============================================
// RENDER BAR CHART
// =============================================
function renderBarChart(tab = 'overall') {
  const container = document.getElementById('barChart');
  const data = INDEX_DATA[tab];
  const sorted = [...COUNTRIES].sort((a, b) => data[b.code] - data[a.code]);
  const maxVal = Math.max(...Object.values(data));

  container.innerHTML = sorted.map(c => {
    const val = data[c.code];
    const pct = (val / maxVal) * 100;
    const isKorea = c.code === 'KR';
    return `
      <div class="bar-row ${isKorea ? 'korea-highlight' : ''}">
        <div class="bar-country">
          <span class="flag">${flagImg(c.code, 22)}</span>
          <span>${c.name}</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width: 0%; background: ${BAR_COLORS[c.code]}; ${isKorea ? 'box-shadow: 0 0 20px rgba(59,130,246,0.3);' : ''}" data-width="${pct}"></div>
        </div>
        <div class="bar-value" style="${isKorea ? 'color: var(--accent-blue);' : ''}">${val.toFixed(1)}</div>
      </div>
    `;
  }).join('');

  // Animate bars
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      container.querySelectorAll('.bar-fill').forEach(el => {
        el.style.width = el.dataset.width + '%';
      });
    });
  });
}

// =============================================
// RENDER COMPARISON TABLE
// =============================================
function renderCompTable() {
  const tbody = document.querySelector('#compTable tbody');
  const sorted = [...KOREA_REL].sort((a, b) => b.overall - a.overall);

  tbody.innerHTML = sorted.map(c => {
    const isKorea = c.code === 'KR';
    const badgeClass = v => v > 120 ? 'high' : v > 90 ? 'mid' : 'low';
    return `
      <tr class="${isKorea ? 'highlight-row' : ''}">
        <td>
          <div class="country-cell">
            <span class="flag">${flagImg(c.code, 22)}</span>
            <span>${c.name}</span>
          </div>
        </td>
        <td><span class="index-badge ${badgeClass(c.overall)}">${c.overall}</span></td>
        <td><span class="index-badge ${badgeClass(c.food)}">${c.food}</span></td>
        <td><span class="index-badge ${badgeClass(c.restaurant)}">${c.restaurant}</span></td>
        <td><span class="index-badge ${badgeClass(c.rent)}">${c.rent}</span></td>
        <td><span class="index-badge ${badgeClass(c.transport)}">${c.transport}</span></td>
      </tr>
    `;
  }).join('');
}

// =============================================
// RENDER ITEM CARDS
// =============================================
function renderItems() {
  const grid = document.getElementById('itemsGrid');
  const displayCountries = ['KR', 'US', 'JP', 'CH', 'DE', 'VN'];

  grid.innerHTML = ITEM_PRICES.map(item => {
    const maxPrice = Math.max(...Object.values(item.prices));
    const koreaPrice = item.prices.KR;

    const bars = displayCountries
      .filter(code => item.prices[code] !== undefined)
      .sort((a, b) => item.prices[b] - item.prices[a])
      .map(code => {
        const price = item.prices[code];
        const pct = (price / maxPrice) * 100;
        const ctr = COUNTRIES.find(c => c.code === code);
        const isKorea = code === 'KR';
        const color = BAR_COLORS[code];
        return `
          <div class="price-bar-row ${isKorea ? 'is-korea' : ''}">
            <span class="country-name">${flagImg(code, 16)} ${ctr.name}</span>
            <div class="mini-track">
              <div class="mini-fill" style="width: ${pct}%; background: ${color};" ></div>
            </div>
            <span class="price-val">$${price.toFixed(2)}</span>
          </div>
        `;
      }).join('');

    return `
      <div class="item-card">
        <div class="item-header">
          <div class="item-name">
            <span class="emoji">${item.emoji}</span>
            ${item.name}
          </div>
          <div class="korea-price">${flagImg('KR', 18)} $${koreaPrice.toFixed(2)}</div>
        </div>
        <div class="price-bars">${bars}</div>
      </div>
    `;
  }).join('');
}

// =============================================
// TAB SWITCHING
// =============================================
document.querySelectorAll('.chart-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderBarChart(tab.dataset.tab);
  });
});

// =============================================
// SCROLL ANIMATIONS
// =============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// =============================================
// INIT
// =============================================
renderBarChart('overall');
renderCompTable();
renderItems();
