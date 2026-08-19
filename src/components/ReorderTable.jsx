import { useMemo, useState } from 'react';
import Card from './ui/Card';
import StatusBadge from './ui/StatusBadge';
import { fmtCurrency, fmtNumber } from '../lib/format';
import { categoryLabel } from '../lib/analytics';

const COLUMNS = [
  { key: 'status', label: 'Urgency', sortable: true },
  { key: 'sku', label: 'SKU', sortable: true },
  { key: 'name', label: 'Item', sortable: true },
  { key: 'category', label: 'Category', sortable: true },
  { key: 'currentStock', label: 'On Hand', sortable: true, align: 'right' },
  { key: 'reorderPoint', label: 'Reorder Pt.', sortable: true, align: 'right' },
  { key: 'leadTimeDays', label: 'Lead Time', sortable: true, align: 'right' },
  { key: 'supplier', label: 'Supplier', sortable: true },
  { key: 'value', label: 'Value', sortable: true, align: 'right' },
];

const STATUS_RANK = { critical: 0, warning: 1, ok: 2 };

const ROW_TINT = {
  critical: 'bg-[rgba(208,59,59,0.045)]',
  warning: 'bg-[rgba(201,133,0,0.045)]',
  ok: '',
};

export default function ReorderTable({ items }) {
  const [sort, setSort] = useState({ key: 'status', dir: 'asc' });

  const sorted = useMemo(() => {
    const copy = [...items];
    copy.sort((a, b) => {
      let av = a[sort.key];
      let bv = b[sort.key];
      if (sort.key === 'status') {
        av = STATUS_RANK[a.status];
        bv = STATUS_RANK[b.status];
      } else if (sort.key === 'category') {
        av = categoryLabel(a.category);
        bv = categoryLabel(b.category);
      }
      if (typeof av === 'string') {
        const cmp = av.localeCompare(bv);
        return sort.dir === 'asc' ? cmp : -cmp;
      }
      return sort.dir === 'asc' ? av - bv : bv - av;
    });
    return copy;
  }, [items, sort]);

  const toggleSort = (key) => {
    setSort((s) => (s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));
  };

  return (
    <Card
      title="Reorder Alerts"
      subtitle="Items at or below reorder point — sorted by urgency by default. Click a column to sort."
    >
      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-sm min-w-[820px]">
          <thead>
            <tr className="border-b border-[var(--color-line)]">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && toggleSort(col.key)}
                  className={`px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-ink-400)] select-none ${
                    col.align === 'right' ? 'text-right' : 'text-left'
                  } ${col.sortable ? 'cursor-pointer hover:text-[var(--color-ink-900)]' : ''}`}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {sort.key === col.key && (
                      <span className="text-[var(--color-gold-600)]">
                        {sort.dir === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((item) => (
              <tr
                key={item.sku}
                className={`border-b border-[var(--color-line)] last:border-0 ${ROW_TINT[item.status]}`}
              >
                <td className="px-3 py-2.5">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-3 py-2.5 font-mono text-xs text-[var(--color-ink-600)]">{item.sku}</td>
                <td className="px-3 py-2.5 font-medium text-[var(--color-ink-900)] max-w-[220px] truncate">
                  {item.name}
                </td>
                <td className="px-3 py-2.5 text-[var(--color-ink-600)] whitespace-nowrap">
                  {categoryLabel(item.category)}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums">
                  {fmtNumber(item.currentStock)} <span className="text-[var(--color-ink-400)]">{item.unit}</span>
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums text-[var(--color-ink-600)]">
                  {fmtNumber(item.reorderPoint)}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums text-[var(--color-ink-600)]">
                  {item.leadTimeDays}d
                </td>
                <td className="px-3 py-2.5 text-[var(--color-ink-600)] whitespace-nowrap max-w-[200px] truncate">
                  {item.supplier}
                </td>
                <td className="px-3 py-2.5 text-right tabular-nums font-medium">{fmtCurrency(item.value)}</td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length} className="px-3 py-8 text-center text-[var(--color-ink-400)]">
                  No items match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
