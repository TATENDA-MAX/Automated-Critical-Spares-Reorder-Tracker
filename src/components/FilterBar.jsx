import { CATEGORIES } from '../data/mockData';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All statuses' },
  { value: 'critical', label: 'Critical' },
  { value: 'warning', label: 'Warning' },
  { value: 'ok', label: 'OK' },
];

const selectClass =
  'appearance-none rounded-lg border border-[var(--color-line-strong)] bg-[var(--color-surface)] text-sm text-[var(--color-ink-900)] pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-500)]/40 focus:border-[var(--color-gold-500)]';

export default function FilterBar({ filters, setFilters, resultCount, totalCount }) {
  const chevron = (
    <svg
      className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-ink-400)]"
      width="12"
      height="12"
      viewBox="0 0 12 12"
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const isFiltered =
    filters.search !== '' || filters.category !== 'all' || filters.status !== 'all';

  return (
    <div className="rounded-xl bg-[var(--color-surface)] border border-[rgba(11,11,11,0.08)] shadow-sm px-4 py-3 flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[220px]">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-400)]"
          width="15"
          height="15"
          viewBox="0 0 16 16"
        >
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" fill="none" />
          <path d="m11 11 3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
          placeholder="Search by SKU, item name, or supplier…"
          className="w-full rounded-lg border border-[var(--color-line-strong)] bg-transparent pl-9 pr-3 py-2 text-sm text-[var(--color-ink-900)] placeholder:text-[var(--color-ink-400)] focus:outline-none focus:ring-2 focus:ring-[var(--color-gold-500)]/40 focus:border-[var(--color-gold-500)]"
        />
      </div>

      <div className="relative">
        <select
          value={filters.category}
          onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
          className={selectClass}
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.key} value={c.key}>
              {c.label}
            </option>
          ))}
        </select>
        {chevron}
      </div>

      <div className="relative">
        <select
          value={filters.status}
          onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
          className={selectClass}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {chevron}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <span className="text-xs text-[var(--color-ink-400)] tabular-nums">
          {resultCount} of {totalCount} SKUs
        </span>
        {isFiltered && (
          <button
            onClick={() => setFilters({ search: '', category: 'all', status: 'all' })}
            className="text-xs font-medium text-[var(--color-navy-700)] hover:text-[var(--color-gold-600)] underline underline-offset-2"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
