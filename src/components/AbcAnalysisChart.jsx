import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import Card from './ui/Card';
import ChartTooltip from './ui/ChartTooltip';
import { fmtCompactCurrency, fmtPercent } from '../lib/format';

const CLASS_COLOR = { A: '#184f95', B: '#3987e5', C: '#9ec5f4' };
const CLASS_DESC = {
  A: 'High value, tight control',
  B: 'Moderate value, standard review',
  C: 'Low value, bulk/periodic review',
};

export default function AbcAnalysisChart({ abc }) {
  const topItems = abc.rows.slice(0, 14).map((r) => ({
    name: r.sku,
    fullName: r.name,
    value: r.value,
    class: r.class,
    pctOfTotal: r.pctOfTotal,
  }));

  return (
    <Card
      title="ABC Analysis"
      subtitle="Pareto classification of SKUs by value contribution — a small share of items drives most inventory value"
    >
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3">
          <p className="text-xs font-medium text-[var(--color-ink-600)] mb-2">
            Top 14 SKUs by inventory value
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={topItems} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
              <CartesianGrid stroke="var(--color-line)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: 'var(--color-ink-400)' }}
                tickLine={false}
                axisLine={{ stroke: 'var(--color-line-strong)' }}
                interval={0}
                angle={-40}
                textAnchor="end"
                height={56}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'var(--color-ink-400)' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => fmtCompactCurrency(v)}
                width={54}
              />
              <Tooltip
                cursor={{ fill: 'rgba(11,23,32,0.04)' }}
                content={
                  <ChartTooltip
                    formatter={(v, entry) =>
                      `${fmtCompactCurrency(v)} · Class ${entry.payload.class}`
                    }
                  />
                }
              />
              <Bar dataKey="value" name="Inventory value" radius={[4, 4, 0, 0]} maxBarSize={26}>
                {topItems.map((it, idx) => (
                  <Cell key={idx} fill={CLASS_COLOR[it.class]} />
                ))}
                <LabelList
                  dataKey="class"
                  position="top"
                  style={{ fontSize: 10, fill: 'var(--color-ink-600)', fontWeight: 600 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="xl:col-span-2 flex flex-col justify-center gap-3">
          <p className="text-xs font-medium text-[var(--color-ink-600)]">
            Share of SKUs vs. share of value
          </p>
          {abc.summary.map((s) => (
            <div key={s.class} className="rounded-lg border border-[var(--color-line)] p-3">
              <div className="flex items-center justify-between mb-2">
                <span
                  className="inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: CLASS_COLOR[s.class] }}
                >
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full"
                    style={{ background: CLASS_COLOR[s.class] }}
                  />
                  Class {s.class}
                </span>
                <span className="text-[11px] text-[var(--color-ink-400)]">{CLASS_DESC[s.class]}</span>
              </div>
              <div className="space-y-1.5">
                <BarRow label="SKUs" pct={s.skuPct} sub={`${s.skuCount} items`} color={CLASS_COLOR[s.class]} />
                <BarRow label="Value" pct={s.valuePct} sub={fmtCompactCurrency(s.value)} color={CLASS_COLOR[s.class]} strong />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function BarRow({ label, pct, sub, color, strong }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-10 text-[var(--color-ink-400)]">{label}</span>
      <div className="flex-1 h-3 rounded-full bg-[var(--color-line)] overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.max(pct, 3)}%`,
            background: color,
            opacity: strong ? 1 : 0.55,
            boxShadow: 'inset 0 0 0 1px rgba(11,11,11,0.12)',
          }}
        />
      </div>
      <span className="w-12 tabular-nums font-medium text-[var(--color-ink-900)]">
        {fmtPercent(pct)}
      </span>
      <span className="w-20 text-[var(--color-ink-400)] tabular-nums text-right">{sub}</span>
    </div>
  );
}
