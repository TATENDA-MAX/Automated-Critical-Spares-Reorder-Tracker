import { fmtCompactCurrency, fmtNumber } from '../lib/format';

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="rounded-xl bg-[var(--color-surface)] border border-[rgba(11,11,11,0.08)] shadow-sm p-4 flex flex-col gap-1.5 min-w-0">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-ink-400)]">
        {label}
      </span>
      <span
        className="text-2xl font-semibold tabular-nums leading-tight"
        style={{ color: accent || 'var(--color-ink-900)' }}
      >
        {value}
      </span>
      {sub && <span className="text-xs text-[var(--color-ink-600)]">{sub}</span>}
    </div>
  );
}

export default function KpiCards({ kpis }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      <StatCard
        label="Total Inventory Value"
        value={fmtCompactCurrency(kpis.totalValue)}
        sub="Across all warehouses"
      />
      <StatCard label="Active SKUs" value={fmtNumber(kpis.skuCount)} sub="Tracked line items" />
      <StatCard
        label="Below Reorder Point"
        value={fmtNumber(kpis.belowReorderCount)}
        sub={`${((kpis.belowReorderCount / kpis.skuCount) * 100).toFixed(0)}% of catalog`}
        accent="var(--color-status-warning)"
      />
      <StatCard
        label="Avg. Stock Turnover"
        value={`${kpis.avgTurnover.toFixed(1)}×`}
        sub="Value-weighted, per annum"
      />
      <StatCard
        label="Critical Stockout Risk"
        value={fmtNumber(kpis.criticalCount)}
        sub="At or below 50% of ROP"
        accent="var(--color-status-critical)"
      />
    </div>
  );
}
