import Card from './ui/Card';
import { SUPPLIERS } from '../data/mockData';

const KEY_SUPPLIERS = [
  SUPPLIERS[0], // Sandvik
  SUPPLIERS[2], // Industrial Bearings & Belting Co.
  SUPPLIERS[4], // SafetyFirst PPE
  SUPPLIERS[5], // BME Explosives
];

function reliabilityColor(r) {
  if (r >= 0.92) return 'var(--color-status-good)';
  if (r >= 0.85) return 'var(--color-status-warning)';
  return 'var(--color-status-critical)';
}

export default function SupplierPerformance() {
  return (
    <Card
      title="Supplier Performance"
      subtitle="On-time delivery reliability, quoted lead time, and relative cost across key procurement partners"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {KEY_SUPPLIERS.map((s) => (
          <div key={s.name} className="rounded-lg border border-[var(--color-line)] p-3.5 flex flex-col gap-2.5">
            <p className="text-sm font-semibold text-[var(--color-ink-900)] leading-snug min-h-[2.5rem]">
              {s.name}
            </p>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[var(--color-ink-400)]">On-time reliability</span>
                <span className="font-semibold tabular-nums" style={{ color: reliabilityColor(s.reliability) }}>
                  {(s.reliability * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-[var(--color-line)] overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${s.reliability * 100}%`, background: reliabilityColor(s.reliability) }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-[var(--color-line)]">
              <span className="text-[var(--color-ink-400)]">Quoted lead time</span>
              <span className="font-medium tabular-nums text-[var(--color-ink-900)]">{s.quotedLeadTime}d</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-ink-400)]">Cost index</span>
              <span className="font-medium tabular-nums text-[var(--color-ink-900)]">
                {s.costIndex.toFixed(2)}×{' '}
                <span className="text-[var(--color-ink-400)] font-normal">
                  {s.costIndex > 1 ? 'premium' : 'below avg.'}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
