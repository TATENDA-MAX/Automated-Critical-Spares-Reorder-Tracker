# Magaya Mining — Inventory & Critical Spares Dashboard

A single-page inventory analytics dashboard built as a portfolio proof-of-concept
for an Inventory Analyst application. It simulates the spares, consumables,
fuel/reagents, heavy-equipment, and drilling/blasting inventory of a mid-size
mining operation and applies techniques an analyst would actually use: ABC
(Pareto) classification, reorder-point health checks, turnover analysis, and
supplier reliability comparison.

All data is deterministic mock data — see [`src/data/mockData.js`](src/data/mockData.js).

## Stack

- React 19 + Vite
- Tailwind CSS v4
- Recharts

## Run it

```bash
npm install
npm run dev
```

## What's in the dashboard

- **KPI bar** — total inventory value, active SKUs, items below reorder point,
  value-weighted average turnover, and critical stockout count.
- **Stock Health Overview** — on-hand value vs. reorder-point value by category.
- **ABC Analysis** — Pareto classification of SKUs by value contribution, plus a
  share-of-SKUs-vs-share-of-value breakdown per class.
- **Inventory Turnover by Category** — value-weighted turns/year, slow-movers flagged.
- **Reorder Alerts** — sortable table of at-risk items with urgency, lead time,
  and supplier.
- **Stock Value Trend** — 12-month inventory value with a simulated supply-chain
  disruption annotated.
- **Category Breakdown** — donut of inventory value by category.
- **Supplier Performance** — on-time reliability, lead time, and cost index for
  four key suppliers.
- **Key Insights** — analyst-style observations computed from the dataset.

A search/filter bar (SKU, item, category, urgency status) drives the KPIs,
charts, and the reorder table together.
