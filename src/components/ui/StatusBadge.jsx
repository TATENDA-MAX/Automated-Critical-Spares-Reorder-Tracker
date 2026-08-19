const STATUS_META = {
  critical: {
    label: 'Critical',
    color: 'var(--color-status-critical)',
    bg: 'rgba(208,59,59,0.1)',
    icon: (
      <path
        d="M8 1.5 15 14H1L8 1.5Z M8 6v3.5 M8 11.5h.01"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  warning: {
    label: 'Warning',
    color: 'var(--color-status-warning)',
    bg: 'rgba(201,133,0,0.12)',
    icon: (
      <path
        d="M8 1.5A6.5 6.5 0 1 1 8 14.5 6.5 6.5 0 0 1 8 1.5Z M8 5v3.5 M8 10.7h.01"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  ok: {
    label: 'OK',
    color: 'var(--color-status-good)',
    bg: 'rgba(12,163,12,0.1)',
    icon: (
      <path
        d="M8 1.5A6.5 6.5 0 1 1 8 14.5 6.5 6.5 0 0 1 8 1.5Z M5.3 8.2l1.8 1.8 3.6-3.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
};

export default function StatusBadge({ status, className = '' }) {
  const meta = STATUS_META[status] || STATUS_META.ok;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
      style={{ color: meta.color, background: meta.bg }}
    >
      <svg width="13" height="13" viewBox="0 0 16 16" style={{ color: meta.color }}>
        {meta.icon}
      </svg>
      {meta.label}
    </span>
  );
}

export { STATUS_META };
