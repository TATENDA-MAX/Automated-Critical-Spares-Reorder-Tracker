import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts';
import Card from './ui/Card';
import ChartTooltip from './ui/ChartTooltip';
import { fmtCompactCurrency } from '../lib/format';
import { STOCK_VALUE_TREND, DISRUPTION_NOTE } from '../data/mockData';

export default function StockValueTrend() {
  const dip = STOCK_VALUE_TREND.find((d) => d.month === DISRUPTION_NOTE.month);

  return (
    <Card
      title="Stock Value Trend"
      subtitle="Total on-hand inventory value, trailing 12 months"
    >
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={STOCK_VALUE_TREND} margin={{ top: 12, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid stroke="var(--color-line)" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: 'var(--color-ink-400)' }}
            tickLine={false}
            axisLine={{ stroke: 'var(--color-line-strong)' }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--color-ink-400)' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => fmtCompactCurrency(v)}
            width={56}
            domain={['dataMin - 100000', 'dataMax + 100000']}
          />
          <Tooltip content={<ChartTooltip formatter={(v) => fmtCompactCurrency(v)} />} />
          <Line
            type="monotone"
            dataKey="value"
            name="Stock value"
            stroke="var(--color-navy-700)"
            strokeWidth={2}
            dot={{ r: 3, fill: 'var(--color-navy-700)', strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
          {dip && (
            <ReferenceDot
              x={dip.month}
              y={dip.value}
              r={6}
              fill="var(--color-status-critical)"
              stroke="white"
              strokeWidth={2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-2 flex items-start gap-2 rounded-lg bg-[rgba(208,59,59,0.06)] border border-[rgba(208,59,59,0.15)] px-3 py-2">
        <span
          className="mt-0.5 w-2 h-2 rounded-full shrink-0"
          style={{ background: 'var(--color-status-critical)' }}
        />
        <p className="text-xs text-[var(--color-ink-600)]">
          <span className="font-semibold text-[var(--color-ink-900)]">{DISRUPTION_NOTE.month} dip: </span>
          {DISRUPTION_NOTE.text}
        </p>
      </div>
    </Card>
  );
}
