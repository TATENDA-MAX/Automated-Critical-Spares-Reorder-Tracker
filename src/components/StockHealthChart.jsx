import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Card from './ui/Card';
import ChartTooltip from './ui/ChartTooltip';
import { fmtCompactCurrency } from '../lib/format';

export default function StockHealthChart({ categorySummary }) {
  const data = categorySummary.map((c) => ({
    label: c.shortLabel,
    fullLabel: c.label,
    'On-hand value': Math.round(c.stockValue),
    'Reorder-point value': Math.round(c.reorderPointValue),
    belowReorder: c.belowReorder,
    itemCount: c.itemCount,
  }));

  return (
    <Card
      title="Stock Health Overview"
      subtitle="On-hand value vs. reorder point, by category — bars near or below the reorder line signal replenishment risk"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }} barGap={4}>
          <CartesianGrid stroke="var(--color-line)" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11, fill: 'var(--color-ink-400)' }}
            tickLine={false}
            axisLine={{ stroke: 'var(--color-line-strong)' }}
            interval={0}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--color-ink-400)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => fmtCompactCurrency(v)}
            width={56}
          />
          <Tooltip
            cursor={{ fill: 'rgba(11,23,32,0.04)' }}
            content={<ChartTooltip formatter={(v) => fmtCompactCurrency(v)} />}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: 'var(--color-ink-600)', paddingTop: 8 }}
            iconType="circle"
            iconSize={8}
          />
          <Bar dataKey="On-hand value" fill="var(--color-navy-700)" radius={[4, 4, 0, 0]} maxBarSize={38} />
          <Bar dataKey="Reorder-point value" fill="var(--color-gold-500)" radius={[4, 4, 0, 0]} maxBarSize={38} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
