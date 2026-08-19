export default function Card({ title, subtitle, actions, children, className = '' }) {
  return (
    <section
      className={`rounded-xl bg-[var(--color-surface)] border border-[rgba(11,11,11,0.08)] shadow-sm p-5 ${className}`}
    >
      {(title || actions) && (
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            {title && (
              <h2 className="text-sm font-semibold text-[var(--color-ink-900)] tracking-wide uppercase">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs text-[var(--color-ink-400)] mt-0.5">{subtitle}</p>
            )}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}
