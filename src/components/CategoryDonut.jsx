import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import Card from './ui/Card';
import ChartTooltip from './ui/ChartTooltip';
import { fmtCompactCurrency, fmtPercent } from '../lib/format';

function SliceLabel({ cx, cy, midAngle, outerRadius, percent }) {
  const pct = percent * 100;
  if (pct < 4) return null; // too thin to label without collision
  const RAD = Math.PI / 180;
  const r = outerRadius + 18;
  const x = cx + r * Math.cos(-midAngle * RAD);
  const y = cy + r * Math.sin(-midAngle * RAD);
  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      style={{ fontSize: 11, fontWeight: 600, fill: 'var(--color-ink-600)' }}
    >
      {`${pct.toFixed(0)}%`}
    </text>
  );
}

export default function CategoryDonut({ categorySummary }) {
  const total = categorySummary.reduce((s, c) => s + c.stockValue, 0) || 1;
  const data = categorySummary.map((c) => ({
    name: c.label,
    value: Math.round(c.stockValue),
    pct: (c.stockValue / total) * 100,
    color: c.color,
  }));

  return (
    <Card title="Category Breakdown" subtitle="Share of total inventory value by category">
      <div className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={2}
              stroke="var(--color-surface)"
              strokeWidth={2}
              label={(props) => <SliceLabel {...props} />}
              labelLine={false}
              isAnimationActive={false}
            >
              {data.map((d, idx) => (
                <Cell key={idx} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              content={
                <ChartTooltip
                  formatter={(v, entry) => `${fmtCompactCurrency(v)} · ${fmtPercent(entry.payload.pct, 1)}`}
                />
              }
            />
          </PieChart>
        </ResponsiveContainer>
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mt-1">
          {data.map((d) => (
            <li key={d.name} className="flex items-center gap-2 text-xs">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.color }} />
              <span className="text-[var(--color-ink-600)] truncate">{d.name}</span>
              <span className="ml-auto tabular-nums font-medium text-[var(--color-ink-900)]">
                {fmtCompactCurrency(d.value)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
