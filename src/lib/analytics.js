import { CATEGORIES, CATEGORY_LABEL, CATEGORY_COLOR } from '../data/mockData';

export function computeKpis(items) {
  const totalValue = items.reduce((s, i) => s + i.value, 0);
  const skuCount = items.length;
  const belowReorder = items.filter((i) => i.status !== 'ok');
  const critical = items.filter((i) => i.status === 'critical');
  const avgTurnover =
    items.reduce((s, i) => s + i.turnover * i.value, 0) / (totalValue || 1);

  return {
    totalValue,
    skuCount,
    belowReorderCount: belowReorder.length,
    criticalCount: critical.length,
    avgTurnover,
  };
}

// Classic ABC analysis: sort by value desc, classify by cumulative %
// contribution — A up to 80%, B up to 95%, C the remainder.
export function computeAbcAnalysis(items) {
  const totalValue = items.reduce((s, i) => s + i.value, 0) || 1;
  const sorted = [...items].sort((a, b) => b.value - a.value);

  let cumValue = 0;
  const rows = sorted.map((item, idx) => {
    cumValue += item.value;
    const cumPct = (cumValue / totalValue) * 100;
    let cls = 'C';
    if (cumPct <= 80) cls = 'A';
    else if (cumPct <= 95) cls = 'B';
    return {
      rank: idx + 1,
      sku: item.sku,
      name: item.name,
      category: item.category,
      value: item.value,
      pctOfTotal: (item.value / totalValue) * 100,
      cumPct,
      class: cls,
    };
  });

  const summary = ['A', 'B', 'C'].map((cls) => {
    const clsItems = rows.filter((r) => r.class === cls);
    const value = clsItems.reduce((s, r) => s + r.value, 0);
    return {
      class: cls,
      skuCount: clsItems.length,
      skuPct: (clsItems.length / rows.length) * 100,
      value,
      valuePct: (value / totalValue) * 100,
    };
  });

  return { rows, summary };
}

export function computeCategorySummary(items) {
  return CATEGORIES.map((cat) => {
    const catItems = items.filter((i) => i.category === cat.key);
    const stockValue = catItems.reduce((s, i) => s + i.value, 0);
    const reorderPointValue = catItems.reduce(
      (s, i) => s + i.reorderPoint * i.unitCost,
      0
    );
    const belowReorder = catItems.filter((i) => i.status !== 'ok').length;
    const critical = catItems.filter((i) => i.status === 'critical').length;
    const avgTurnover =
      catItems.reduce((s, i) => s + i.turnover * i.value, 0) /
      (stockValue || 1);

    return {
      key: cat.key,
      label: cat.label,
      shortLabel: cat.shortLabel,
      color: cat.color,
      itemCount: catItems.length,
      stockValue,
      reorderPointValue,
      belowReorder,
      critical,
      avgTurnover,
      slowMoving: avgTurnover < 3,
    };
  });
}

export function computeInsights(items, categorySummary, abc) {
  const insights = [];

  // 1. Category most exposed to stockout risk.
  const byRisk = [...categorySummary]
    .map((c) => ({ ...c, riskPct: (c.belowReorder / c.itemCount) * 100 }))
    .sort((a, b) => b.riskPct - a.riskPct)[0];
  if (byRisk && byRisk.riskPct > 0) {
    insights.push(
      `${byRisk.label} shows ${byRisk.riskPct.toFixed(0)}% of SKUs below reorder point (${byRisk.belowReorder} of ${byRisk.itemCount}), including ${byRisk.critical} at critical stockout risk — extended supplier lead times in this category are the main driver.`
    );
  }

  // 2. ABC concentration.
  const aClass = abc.summary.find((s) => s.class === 'A');
  if (aClass) {
    insights.push(
      `Class A items are just ${aClass.skuPct.toFixed(0)}% of SKUs but account for ${aClass.valuePct.toFixed(0)}% of total inventory value (${fmtC(aClass.value)}) — these deserve tighter cycle-count frequency and dedicated reorder review, while C-class items are candidates for bulk/periodic ordering to cut admin overhead.`
    );
  }

  // 3. Slow-moving / dead stock, called out at the item level.
  const overstocked = [...items]
    .filter((i) => i.turnover < 1.5 && i.currentStock > i.reorderPoint)
    .sort((a, b) => b.value - a.value)[0];
  if (overstocked) {
    insights.push(
      `${overstocked.name} (${overstocked.sku}) is overstocked at ${overstocked.currentStock.toLocaleString()} ${overstocked.unit} against a ${overstocked.reorderPoint.toLocaleString()}-unit reorder point and turns just ${overstocked.turnover.toFixed(1)}× a year — ${fmtC(overstocked.value)} of working capital sitting as near-dead stock.`
    );
  }

  const slowCats = categorySummary.filter((c) => c.slowMoving).map((c) => c.label);
  if (slowCats.length) {
    insights.push(
      `${slowCats.join(' and ')} run below the 3× annual turnover benchmark, tying up working capital relative to faster-moving categories like Consumables & PPE — worth a slow-mover / obsolescence review next cycle.`
    );
  }

  return insights;
}

function fmtC(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n);
}

export function categoryLabel(key) {
  return CATEGORY_LABEL[key] || key;
}

export function categoryColor(key) {
  return CATEGORY_COLOR[key] || '#898781';
}
