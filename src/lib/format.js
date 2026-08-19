export const fmtCurrency = (n, opts = {}) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    ...opts,
  }).format(n);

export const fmtCompactCurrency = (n) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n);

export const fmtNumber = (n) => new Intl.NumberFormat('en-US').format(n);

export const fmtPercent = (n, digits = 0) => `${n.toFixed(digits)}%`;
