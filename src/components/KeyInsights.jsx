export default function KeyInsights({ insights }) {
  return (
    <section className="rounded-xl bg-[var(--color-navy-950)] shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 1.5c-2.6 0-4.5 1.9-4.5 4.3 0 1.6.8 2.7 1.6 3.5.5.5.7.9.7 1.4v.3h4.4v-.3c0-.5.2-.9.7-1.4.8-.8 1.6-1.9 1.6-3.5C12.5 3.4 10.6 1.5 8 1.5Z"
            stroke="var(--color-gold-500)"
            strokeWidth="1.3"
          />
          <path d="M6.2 13h3.6M6.6 14.5h2.8" stroke="var(--color-gold-500)" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <h2 className="text-sm font-semibold text-white tracking-wide uppercase">Key Insights</h2>
      </div>
      <ul className="space-y-3">
        {insights.map((text, idx) => (
          <li key={idx} className="flex gap-3 text-sm text-white/85 leading-relaxed">
            <span
              className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: 'var(--color-gold-500)' }}
            />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}
