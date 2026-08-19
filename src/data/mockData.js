// Deterministic mock data for the Magaya Mining inventory dashboard.
// A small seeded PRNG keeps numbers stable across renders/builds while still
// looking naturally varied, so the story told by the charts doesn't drift.

function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(19830406);
const rand = (min, max) => min + rng() * (max - min);
const randInt = (min, max) => Math.round(rand(min, max));
const pick = (arr) => arr[Math.floor(rng() * arr.length)];

export const CATEGORIES = [
  {
    key: 'spares',
    label: 'Spare Parts & Maintenance',
    shortLabel: 'Spares & Maint.',
    color: '#2a78d6',
  },
  {
    key: 'consumables',
    label: 'Consumables & PPE',
    shortLabel: 'Consumables',
    color: '#1baf7a',
  },
  {
    key: 'fuel',
    label: 'Fuel & Reagents',
    shortLabel: 'Fuel & Reagents',
    color: '#eda100',
  },
  {
    key: 'heavy_equipment',
    label: 'Heavy Equipment Parts',
    shortLabel: 'Heavy Equip.',
    color: '#4a3aa7',
  },
  {
    key: 'drilling_blasting',
    label: 'Drilling & Blasting Supplies',
    shortLabel: 'Drilling & Blast.',
    color: '#e34948',
  },
];

export const CATEGORY_COLOR = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.color]));
export const CATEGORY_LABEL = Object.fromEntries(CATEGORIES.map((c) => [c.key, c.label]));

const SUPPLIERS = [
  { name: 'Sandvik Mining & Rock Technology', quotedLeadTime: 21, reliability: 0.94, costIndex: 1.08 },
  { name: 'Boart Longyear Zimbabwe', quotedLeadTime: 18, reliability: 0.9, costIndex: 1.0 },
  { name: 'Industrial Bearings & Belting Co.', quotedLeadTime: 10, reliability: 0.88, costIndex: 0.93 },
  { name: 'Sable Chemicals & Reagents', quotedLeadTime: 14, reliability: 0.85, costIndex: 0.97 },
  { name: 'SafetyFirst PPE Distributors', quotedLeadTime: 7, reliability: 0.97, costIndex: 1.02 },
  { name: 'BME Explosives (Pvt) Ltd', quotedLeadTime: 35, reliability: 0.78, costIndex: 1.15 },
];
export { SUPPLIERS };

// name, unit, unitCost, category, supplier index, annual usage (units), lead time override
const ITEM_TEMPLATES = [
  // ---- Spare Parts & Maintenance ----
  ['SP-1001', 'SKF Bearing 6205-2RS', 'spares', 'ea', 42, 2, 480],
  ['SP-1002', 'Conveyor Idler Roller 89mm', 'spares', 'ea', 68, 2, 260],
  ['SP-1003', 'Hydraulic Filter Element HF6177', 'spares', 'ea', 35, 2, 620],
  ['SP-1004', 'V-Belt A-Section 1600mm', 'spares', 'ea', 24, 2, 340],
  ['SP-1005', 'Crusher Jaw Plate - Manganese Steel', 'spares', 'ea', 1450, 0, 24],
  ['SP-1006', 'Pump Impeller - Warman 6/4', 'spares', 'ea', 620, 0, 32],
  ['SP-1007', 'Conveyor Belt Splice Kit', 'spares', 'kit', 210, 2, 48],
  ['SP-1008', 'Grease Nipple M10 Straight', 'spares', 'ea', 3, 2, 900],
  ['SP-1009', 'Gearbox Oil Seal 75x100x12', 'spares', 'ea', 18, 2, 410],
  ['SP-1010', 'Vibrating Screen Mesh Panel', 'spares', 'ea', 340, 0, 60],
  ['SP-1011', 'Ball Mill Liner Bolt Set', 'spares', 'set', 95, 2, 180],
  ['SP-1012', 'Air Filter Cartridge - CAT 1R-0716', 'spares', 'ea', 58, 0, 520],
  ['SP-1013', 'Conveyor Head Pulley Lagging', 'spares', 'ea', 780, 2, 18],

  // ---- Consumables & PPE ----
  ['CS-2001', 'Nitrile Gloves (Box of 100)', 'consumables', 'box', 9, 4, 2600],
  ['CS-2002', 'Safety Helmet - Class E', 'consumables', 'ea', 22, 4, 340],
  ['CS-2003', 'Respirator Cartridge P100', 'consumables', 'ea', 14, 4, 1800],
  ['CS-2004', 'Reflective Vest - Hi-Vis Orange', 'consumables', 'ea', 12, 4, 420],
  ['CS-2005', 'Ear Plugs Corded (Box of 200)', 'consumables', 'box', 16, 4, 960],
  ['CS-2006', 'Safety Goggles - Anti-Fog', 'consumables', 'ea', 8, 4, 780],
  ['CS-2007', 'Steel Toe Boots - Size 9', 'consumables', 'pair', 65, 4, 260],
  ['CS-2008', 'First Aid Kit - Site Standard', 'consumables', 'kit', 48, 4, 90],
  ['CS-2009', 'Geological Sample Bags (Pack of 500)', 'consumables', 'pack', 21, 4, 340],
  ['CS-2010', 'Coveralls - FR Rated', 'consumables', 'ea', 38, 4, 520],
  ['CS-2011', 'Dust Mask N95 (Box of 50)', 'consumables', 'box', 19, 4, 1200],
  ['CS-2012', 'Fall Arrest Harness', 'consumables', 'ea', 84, 4, 60],

  // ---- Fuel & Reagents ----
  ['FR-3001', 'Diesel Fuel (Bulk, per Litre)', 'fuel', 'L', 1.42, 3, 480000],
  ['FR-3002', 'Hydraulic Oil ISO 46 (205L Drum)', 'fuel', 'drum', 610, 3, 96],
  ['FR-3003', 'Engine Oil 15W-40 (205L Drum)', 'fuel', 'drum', 560, 3, 84],
  ['FR-3004', 'Sodium Cyanide (NaCN) Briquette (1t)', 'fuel', 't', 2850, 3, 180],
  ['FR-3005', 'Flocculant - Magnafloc 351 (25kg)', 'fuel', 'bag', 165, 3, 260],
  ['FR-3006', 'Lime (Quicklime) Bulk (t)', 'fuel', 't', 210, 3, 420],
  ['FR-3007', 'Grease - EP2 Lithium (18kg Pail)', 'fuel', 'pail', 92, 3, 140],
  ['FR-3008', 'Coolant Concentrate (20L)', 'fuel', 'ea', 74, 3, 110],
  ['FR-3009', 'Xanthate SIBX Pellets (25kg)', 'fuel', 'bag', 145, 3, 190],
  ['FR-3010', 'Activated Carbon - Coconut Shell (t)', 'fuel', 't', 1680, 3, 48],

  // ---- Heavy Equipment Parts ----
  ['HE-4001', 'CAT 793 Haul Truck Tyre 24.00R35', 'heavy_equipment', 'ea', 8200, 0, 48],
  ['HE-4002', 'Excavator Bucket Teeth - CAT J350', 'heavy_equipment', 'ea', 165, 0, 340],
  ['HE-4003', 'Wheel Loader Hydraulic Cylinder', 'heavy_equipment', 'ea', 3400, 0, 16],
  ['HE-4004', 'Dump Truck Brake Pad Set', 'heavy_equipment', 'set', 920, 0, 60],
  ['HE-4005', 'Drill Rig Rotary Head Assembly', 'heavy_equipment', 'ea', 12400, 0, 6],
  ['HE-4006', 'Track Chain Link - Komatsu D375', 'heavy_equipment', 'ea', 540, 0, 42],
  ['HE-4007', 'Alternator - CAT 3512 Engine', 'heavy_equipment', 'ea', 1250, 0, 20],
  ['HE-4008', 'Turbocharger - Detroit Diesel Series 60', 'heavy_equipment', 'ea', 2650, 0, 14],
  ['HE-4009', 'Radiator Assembly - CAT 777', 'heavy_equipment', 'ea', 4100, 0, 10],
  ['HE-4010', 'Final Drive Motor - Komatsu PC800', 'heavy_equipment', 'ea', 6800, 0, 8],
  ['HE-4011', 'Front End Loader Bucket - 4.5m3', 'heavy_equipment', 'ea', 15200, 0, 4],

  // ---- Drilling & Blasting Supplies ----
  ['DB-5001', 'ANFO Explosive (Bulk, per kg)', 'drilling_blasting', 'kg', 0.95, 5, 620000],
  ['DB-5002', 'Emulsion Explosive Cartridge 32mm', 'drilling_blasting', 'ea', 4.2, 5, 42000],
  ['DB-5003', 'Non-Electric Detonator - Surface', 'drilling_blasting', 'ea', 3.6, 5, 18000],
  ['DB-5004', 'Detonating Cord 5g/m (500m roll)', 'drilling_blasting', 'roll', 88, 5, 420],
  ['DB-5005', 'Booster - Pentolite 400g', 'drilling_blasting', 'ea', 6.8, 5, 9600],
  ['DB-5006', 'Blast Hole Stemming Bags (Pack of 200)', 'drilling_blasting', 'pack', 34, 1, 260],
  ['DB-5007', 'Drill Rod - 4m T45', 'drilling_blasting', 'ea', 210, 1, 180],
  ['DB-5008', 'Button Bit - 89mm Retrac', 'drilling_blasting', 'ea', 340, 1, 220],
  ['DB-5009', 'Down-the-Hole Hammer Bit 5"', 'drilling_blasting', 'ea', 890, 1, 60],
  ['DB-5010', 'Shock Tube Connector Block', 'drilling_blasting', 'ea', 2.1, 5, 14000],
];

// Overrides tell a deliberate story: a few dead-stock items, a cluster of
// critical stockouts in Drilling & Blasting (single-supplier lead-time risk),
// and a couple of clear "A" items driving disproportionate value.
const OVERRIDES = {
  'SP-1005': { currentStock: 3, reorderPoint: 6 }, // crusher wear part, low count, high value
  'HE-4005': { currentStock: 0, reorderPoint: 1 }, // rotary head, long lead capital spare
  'HE-4011': { currentStock: 0, reorderPoint: 1 },
  'DB-5001': { currentStock: 8400, reorderPoint: 22000 }, // bulk ANFO running low ahead of blast schedule
  'DB-5003': { currentStock: 420, reorderPoint: 1500 },
  'DB-5005': { currentStock: 180, reorderPoint: 600 },
  'FR-3004': { currentStock: 2, reorderPoint: 8 }, // cyanide, tightly controlled low buffer
  'SP-1008': { currentStock: 1400, reorderPoint: 300 }, // dead stock: cheap fastener, way overstocked
  'CS-2012': { currentStock: 48, reorderPoint: 10 }, // slow mover, overstocked harnesses
  'FR-3010': { currentStock: 26, reorderPoint: 6 }, // slow mover, activated carbon
};

function buildItem([sku, name, category, unit, unitCost, supplierIdx, annualUsage]) {
  const supplier = SUPPLIERS[supplierIdx];
  const monthlyUsage = annualUsage / 12;
  // Baseline "healthy" stock is 1.5-3x monthly usage; reorder point ~0.8-1.3x monthly usage.
  const baseStock = Math.max(1, Math.round(monthlyUsage * rand(1.4, 3.2)));
  const reorderPoint = Math.max(1, Math.round(monthlyUsage * rand(0.7, 1.3)));
  const leadTimeDays = Math.max(3, Math.round(supplier.quotedLeadTime * rand(0.85, 1.35)));

  const override = OVERRIDES[sku] || {};
  const currentStock = override.currentStock ?? baseStock;
  const rp = override.reorderPoint ?? reorderPoint;

  const reorderQty = Math.max(1, Math.round(monthlyUsage * rand(1.5, 2.5)));

  let status = 'ok';
  if (currentStock <= rp * 0.5) status = 'critical';
  else if (currentStock <= rp) status = 'warning';

  const value = Math.round(currentStock * unitCost * 100) / 100;
  const avgInventoryUnits = (currentStock + rp) / 2 || 1;
  const turnover = Math.round((annualUsage / Math.max(avgInventoryUnits, 1)) * 10) / 10;

  return {
    sku,
    name,
    category,
    unit,
    unitCost,
    currentStock,
    reorderPoint: rp,
    reorderQty,
    leadTimeDays,
    supplier: supplier.name,
    annualUsage,
    status,
    value,
    turnover,
  };
}

export const INVENTORY_ITEMS = ITEM_TEMPLATES.map(buildItem);

// ---- 12-month stock value trend, with a simulated Q2 border-post customs
// disruption that delayed heavy-equipment imports from South Africa. ----
export const STOCK_VALUE_TREND = (() => {
  const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const totalValue = INVENTORY_ITEMS.reduce((s, i) => s + i.value, 0);
  const base = totalValue * 0.86;
  const series = [
    1.0, 1.03, 1.05, 1.1, 1.07, 1.02, 0.94, 0.8, 0.83, 0.93, 1.01, 1.06,
  ];
  return months.map((month, i) => ({
    month,
    value: Math.round(base * series[i]),
  }));
})();

export const DISRUPTION_NOTE = {
  month: 'Apr',
  text: 'Beitbridge border-post customs backlog delayed a scheduled CAT/Komatsu parts shipment ~5 weeks, pulling heavy-equipment stock value down ~18% before recovering by June.',
};
