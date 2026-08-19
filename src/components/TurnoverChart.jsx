import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import Card from './ui/Card';
import ChartTooltip from './ui/ChartTooltip';

const SLOW_THRESHOLD = 3;

export default function TurnoverChart({ categorySummary }) {
  const data = categorySummary
    .map((c) => ({
      label: c.label,
      turnover: Math.round(c.avgTurnover * 10) / 10,
      slow: c.avgTurnover < SLOW_THRESHOLD,
    }))
    .sort((a, b) => b.turnover - a.turnover);

  return (
    <Card
      title="Inventory Turnover by Category"
      subtitle={`Value-weighted turns per year — categories below ${SLOW_THRESHOLD}× are flagged slow-moving`}
    >
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 4, right: 28, left: 0, bottom: 4 }}
        >
          <CartesianGrid stroke="var(--color-line)" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fontSize: 11, fill: 'var(--color-ink-400)' }}
            tickLine={false}
            axisLine={{ stroke: 'var(--color-line-strong)' }}
            tickFormatter={(v) => `${v}×`}
          />
          <YAxis
            type="category"
            dataKey="label"
            tick={{ fontSize: 11, fill: 'var(--color-ink-600)' }}
            tickLine={false}
            axisLine={false}
            width={150}
          />
          <ReferenceLine
            x={SLOW_THRESHOLD}
            stroke="var(--color-status-critical)"
            strokeDasharray="4 3"
            label={{
              value: 'Slow-moving threshold',
              position: 'top',
              fontSize: 10,
              fill: 'var(--color-status-critical)',
            }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(11,23,32,0.04)' }}
            content={
              <ChartTooltip
                formatter={(v, entry) =>
                  `${v}× / yr${entry.payload.slow ? ' · Slow-moving' : ''}`
                }
              />
            }
          />
          <Bar dataKey="turnover" name="Turnover" radius={[0, 4, 4, 0]} maxBarSize={22}>
            {data.map((d, idx) => (
              <Cell key={idx} fill={d.slow ? 'var(--color-status-warning)' : 'var(--color-navy-700)'} />
            ))}
            <LabelList
              dataKey="turnover"
              position="right"
              formatter={(v) => `${v}×`}
              style={{ fontSize: 11, fill: 'var(--color-ink-600)', fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-1 text-[11px] text-[var(--color-ink-400)]">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: 'var(--color-navy-700)' }} />
          Healthy turnover
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: 'var(--color-status-warning)' }} />
          Slow-moving / at risk of dead stock
        </span>
      </div>
    </Card>
  );
}
