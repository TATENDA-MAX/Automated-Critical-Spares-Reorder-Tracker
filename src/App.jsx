import { useMemo, useState } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import KpiCards from './components/KpiCards';
import StockHealthChart from './components/StockHealthChart';
import AbcAnalysisChart from './components/AbcAnalysisChart';
import TurnoverChart from './components/TurnoverChart';
import ReorderTable from './components/ReorderTable';
import StockValueTrend from './components/StockValueTrend';
import CategoryDonut from './components/CategoryDonut';
import SupplierPerformance from './components/SupplierPerformance';
import KeyInsights from './components/KeyInsights';
import { INVENTORY_ITEMS } from './data/mockData';
import {
  computeKpis,
  computeAbcAnalysis,
  computeCategorySummary,
  computeInsights,
} from './lib/analytics';

export default function App() {
  const [filters, setFilters] = useState({ search: '', category: 'all', status: 'all' });

  const searchScoped = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return INVENTORY_ITEMS.filter((item) => {
      const matchesCategory = filters.category === 'all' || item.category === filters.category;
      const matchesSearch =
        !q ||
        item.sku.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.supplier.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [filters.search, filters.category]);

  const tableItems = useMemo(() => {
    return searchScoped.filter((item) =>
      filters.status === 'all' ? item.status !== 'ok' : item.status === filters.status
    );
  }, [searchScoped, filters.status]);

  const kpis = useMemo(() => computeKpis(searchScoped), [searchScoped]);
  const categorySummary = useMemo(() => computeCategorySummary(searchScoped), [searchScoped]);
  const abc = useMemo(() => computeAbcAnalysis(searchScoped), [searchScoped]);

  // Insights are computed off the full, unfiltered portfolio so they stay a
  // stable analyst read regardless of what the user is currently filtering.
  const fullCategorySummary = useMemo(() => computeCategorySummary(INVENTORY_ITEMS), []);
  const fullAbc = useMemo(() => computeAbcAnalysis(INVENTORY_ITEMS), []);
  const insights = useMemo(
    () => computeInsights(INVENTORY_ITEMS, fullCategorySummary, fullAbc),
    [fullCategorySummary, fullAbc]
  );

  return (
    <div className="min-h-screen bg-[var(--color-page)]">
      <Header />

      <main className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col gap-6">
        <KpiCards kpis={kpis} />

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          resultCount={searchScoped.length}
          totalCount={INVENTORY_ITEMS.length}
        />

        <StockHealthChart categorySummary={categorySummary} />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3">
            <AbcAnalysisChart abc={abc} />
          </div>
          <div className="xl:col-span-2">
            <TurnoverChart categorySummary={categorySummary} />
          </div>
        </div>

        <ReorderTable items={tableItems} />

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          <div className="xl:col-span-3">
            <StockValueTrend />
          </div>
          <div className="xl:col-span-2">
            <CategoryDonut categorySummary={categorySummary} />
          </div>
        </div>

        <SupplierPerformance />

        <KeyInsights insights={insights} />

        <footer className="text-center text-xs text-[var(--color-ink-400)] py-4">
          Magaya Mining — Inventory &amp; Critical Spares Dashboard · Proof of concept built with mock
          data for demonstration purposes only.
        </footer>
      </main>
    </div>
  );
}
