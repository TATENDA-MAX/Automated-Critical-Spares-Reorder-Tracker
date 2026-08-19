import logo from '../assets/magaya-logo.png';

export default function Header() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-[var(--color-navy-950)] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Magaya Mining" className="h-11 w-auto" />
          <div className="h-9 w-px bg-white/15 hidden sm:block" />
          <div>
            <h1 className="text-lg font-semibold tracking-tight leading-tight">
              Inventory &amp; Critical Spares Dashboard
            </h1>
            <p className="text-xs text-white/55 mt-0.5">
              Supply Chain &amp; Materials Management — Group Sites
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-white/55">{dateStr}</p>
          <p className="text-xs text-[var(--color-gold-500)] font-medium mt-0.5">
            Prepared by T. Satiyi · Inventory Analyst (Candidate)
          </p>
        </div>
      </div>
    </header>
  );
}
