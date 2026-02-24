// In-memory data store (no SQLite needed)
let dataStore = null;

const getSampleData = () => {
  return {
    nsdpIndicators: [
      { id: 1, indicator_name: 'GDP Growth Rate', value: 3.5, year: 2025, unit: '%' },
      { id: 2, indicator_name: 'Trade Openness', value: 45.2, year: 2025, unit: '%' },
      { id: 3, indicator_name: 'Export Diversity Index', value: 0.65, year: 2025, unit: 'index' },
      { id: 4, indicator_name: 'Import Dependency', value: 72.3, year: 2025, unit: '%' },
      { id: 5, indicator_name: 'Trade-to-GDP Ratio', value: 89.7, year: 2025, unit: '%' }
    ],

    tradeBalancePartners: [
      { id: 1, country: 'China', exports: 250.5, imports: 450.2, balance: -199.7, year: 2025 },
      { id: 2, country: 'Australia', exports: 180.3, imports: 320.1, balance: -139.8, year: 2025 },
      { id: 3, country: 'New Zealand', exports: 120.7, imports: 210.5, balance: -89.8, year: 2025 },
      { id: 4, country: 'Japan', exports: 95.2, imports: 150.3, balance: -55.1, year: 2025 },
      { id: 5, country: 'United States', exports: 110.8, imports: 180.6, balance: -69.8, year: 2025 },
      { id: 6, country: 'Singapore', exports: 85.4, imports: 140.2, balance: -54.8, year: 2025 }
    ],

    pacificIslandsTrade: [
      { id: 1, country: 'Fiji', exports: 45.2, imports: 78.5, balance: -33.3, year: 2025 },
      { id: 2, country: 'Tonga', exports: 12.3, imports: 25.6, balance: -13.3, year: 2025 },
      { id: 3, country: 'Samoa', exports: 18.7, imports: 32.4, balance: -13.7, year: 2025 },
      { id: 4, country: 'Kiribati', exports: 5.2, imports: 15.8, balance: -10.6, year: 2025 },
      { id: 5, country: 'Tuvalu', exports: 2.1, imports: 8.3, balance: -6.2, year: 2025 },
      { id: 6, country: 'Cook Islands', exports: 8.5, imports: 18.2, balance: -9.7, year: 2025 }
    ],

    msgTrade: [
      { id: 1, country: 'Papua New Guinea', trade_value: 125.5, year: 2025, type: 'export' },
      { id: 2, country: 'Fiji', trade_value: 65.3, year: 2025, type: 'export' },
      { id: 3, country: 'Solomon Islands', trade_value: 42.1, year: 2025, type: 'export' },
      { id: 4, country: 'Vanuatu', trade_value: 28.7, year: 2025, type: 'export' }
    ],

    principalExports: [
      { id: 1, product: 'Fish and Seafood', value: 180.5, percentage: 28.5, year: 2025 },
      { id: 2, product: 'Coconut Products', value: 95.2, percentage: 15.0, year: 2025 },
      { id: 3, product: 'Palm Oil', value: 85.7, percentage: 13.5, year: 2025 },
      { id: 4, product: 'Timber', value: 72.3, percentage: 11.4, year: 2025 },
      { id: 5, product: 'Minerals', value: 120.8, percentage: 19.1, year: 2025 },
      { id: 6, product: 'Agricultural Products', value: 78.6, percentage: 12.5, year: 2025 }
    ],

    newExports: [
      { id: 1, product: 'Organic Coffee', value: 15.2, growth_rate: 125.5, year: 2025 },
      { id: 2, product: 'Seaweed Products', value: 12.8, growth_rate: 98.3, year: 2025 },
      { id: 3, product: 'Essential Oils', value: 9.5, growth_rate: 87.2, year: 2025 },
      { id: 4, product: 'Handicrafts', value: 7.3, growth_rate: 65.8, year: 2025 },
      { id: 5, product: 'Vanilla', value: 18.6, growth_rate: 142.7, year: 2025 }
    ],

    principalImports: [
      { id: 1, product: 'Fuel and Energy', value: 280.5, percentage: 22.5, year: 2025 },
      { id: 2, product: 'Machinery and Equipment', value: 195.3, percentage: 15.7, year: 2025 },
      { id: 3, product: 'Food Products', value: 165.8, percentage: 13.3, year: 2025 },
      { id: 4, product: 'Vehicles', value: 142.6, percentage: 11.5, year: 2025 },
      { id: 5, product: 'Manufactured Goods', value: 178.4, percentage: 14.3, year: 2025 },
      { id: 6, product: 'Chemicals', value: 95.7, percentage: 7.7, year: 2025 },
      { id: 7, product: 'Textiles', value: 85.2, percentage: 6.8, year: 2025 }
    ],

    dietaryRiskImports: [
      { id: 1, product: 'Sugary Beverages', value: 45.3, year: 2025, risk_category: 'High Sugar' },
      { id: 2, product: 'Processed Meats', value: 32.7, year: 2025, risk_category: 'High Sodium' },
      { id: 3, product: 'Refined Grains', value: 28.5, year: 2025, risk_category: 'Low Fiber' },
      { id: 4, product: 'Trans Fat Products', value: 15.2, year: 2025, risk_category: 'Unhealthy Fats' },
      { id: 5, product: 'High-Sodium Snacks', value: 38.6, year: 2025, risk_category: 'High Sodium' },
      { id: 6, product: 'Confectionery', value: 22.4, year: 2025, risk_category: 'High Sugar' }
    ]
  };
};

export const initDB = async () => {
  if (dataStore) return dataStore;

  try {
    // Initialize data store with sample data
    dataStore = getSampleData();
    return dataStore;
  } catch (error) {
    console.error('Failed to initialize data:', error);
    throw new Error('Database initialization failed');
  }
};

export const getAllData = async () => {
  if (!dataStore) await initDB();
  return dataStore;
};

export const executeQuery = async (query) => {
  // This function is kept for compatibility but not used with plain JS data
  console.warn('executeQuery is deprecated when using in-memory data store');
  return [];
};
