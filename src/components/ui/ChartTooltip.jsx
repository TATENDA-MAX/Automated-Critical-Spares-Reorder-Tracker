export default function ChartTooltip({ active, payload, label, formatter }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="rounded-lg bg-[var(--color-navy-950)] text-white text-xs px-3 py-2.5 shadow-lg border border-[rgba(255,255,255,0.08)] min-w-[140px]">
      {label && <div className="font-semibold mb-1.5 text-[13px]">{label}</div>}
      <div className="flex flex-col gap-1">
        {payload.map((entry, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-[rgba(255,255,255,0.75)]">
              <span
                className="inline-block w-2 h-2 rounded-full shrink-0"
                style={{ background: entry.color || entry.fill }}
              />
              {entry.name}
            </span>
            <span className="tabular-nums font-medium">
              {formatter ? formatter(entry.value, entry) : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
