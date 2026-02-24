// In-memory data store (no SQLite needed)
let dataStore = null;

const getSampleData = () => {
    return {
        nsdpIndicators: [
            { id: 1, indicator_name: 'ENV 1.3.1 - Total annual Value of imports of food products targeted by DARD', value: 9, year: 2025, unit: 'VT Million' },
            { id: 2, indicator_name: 'ECO 1.5.2 - Trade by major partner agreement (MSG)', value: 313, year: 2025, unit: 'VT Million' },
            { id: 3, indicator_name: 'ECO 1.5.3 - Balance of trade by major partner countries', value: -3271, year: 2025, unit: 'VT Million' },
            { id: 4, indicator_name: 'ECO 1.7.1 - Level of production of major commodities', value: 699, year: 2025, unit: 'VT Million' },
            { id: 5, indicator_name: 'ECO 4.3.2 - Ratio of processed export commodities', value: 2, year: 2025, unit: 'Ratio' }
        ],

        tradeBalancePartners: [
            { id: 1, country: 'China', balance: -1097, year: 2025, major_imports: 'Machinery & Electrical Appliances (VT 477M), Vehicles & Transport Equipment (VT 343M)' },
            { id: 2, country: 'Australia', balance: -606, year: 2025, major_imports: 'Machinery & Electrical Appliances (VT 172M), Prepared Foodstuffs, Beverages, Alcohol & Tobacco (VT 78M)' },
            { id: 3, country: 'Singapore', balance: -443, year: 2025, major_imports: 'Mineral Products (VT 402M), Prepared Foodstuffs, Beverages, Alcohol & Tobacco (VT 27M)' },
            { id: 4, country: 'New Zealand', balance: -311, year: 2025, major_imports: 'Wood, Cork & Plaiting Materials (VT 93M), Machinery & Electrical Appliances (VT 90M)' },
            { id: 5, country: 'Hong Kong', balance: -256, year: 2025, major_imports: 'Machinery & Electrical Appliances (VT 202M), Base Metals & articles thereof (VT 90M)' },
            { id: 6, country: 'Others', balance: -558, year: 2025, major_imports: 'Various products representing remaining trade balance' }
        ],

        pacificIslandsTrade: [
            { id: 1, country: 'Kiribati', exports: 89, imports: 1, balance: 88, year: 2025, major_exports: 'Kava (VT 89M)' },
            { id: 2, country: 'American Samoa', exports: 12, imports: 1, balance: 11, year: 2025, major_exports: 'Frozen Albacore Tuna (VT 12M)' },
            { id: 3, country: 'Samoa', exports: 2, imports: 3, balance: -1, year: 2025, major_imports: 'Pharmaceuticals' },
            { id: 4, country: 'Nauru', exports: 2, imports: 0, balance: 2, year: 2025, major_exports: 'Various goods' },
            { id: 5, country: 'Other Pacific Islands', exports: 4, imports: 2, balance: 2, year: 2025, major_exports: 'Various trade' }
        ],

        msgTrade: [
            { id: 1, sitc_description: 'Basic Manufactured Products', fiji_exports: 12, fiji_imports: 0, png_exports: 0, png_imports: 0, solomon_exports: 0, solomon_imports: 0, total: 12 },
            { id: 2, sitc_description: 'Beverages & Tobacco', fiji_exports: 10, fiji_imports: 0, png_exports: 0, png_imports: 0, solomon_exports: 0, solomon_imports: 1, total: 11 },
            { id: 3, sitc_description: 'Chemical Products', fiji_exports: 9, fiji_imports: 41, png_exports: 0, png_imports: 0, solomon_exports: 0, solomon_imports: 0, total: 50 },
            { id: 4, sitc_description: 'Crude Materials', fiji_exports: 133, fiji_imports: 0, png_exports: 0, png_imports: 0, solomon_exports: 0, solomon_imports: 0, total: 133 },
            { id: 5, sitc_description: 'Energy', fiji_exports: 0, fiji_imports: 104, png_exports: 0, png_imports: 0, solomon_exports: 0, solomon_imports: 0, total: 104 },
            { id: 6, sitc_description: 'Machinery & Transport Equipment', fiji_exports: 4, fiji_imports: 5, png_exports: 0, png_imports: 0, solomon_exports: 0, solomon_imports: 0, total: 9 },
            { id: 7, sitc_description: 'Miscellaneous Manufactured', fiji_exports: 1, fiji_imports: 2, png_exports: 0, png_imports: 0, solomon_exports: 0, solomon_imports: 0, total: 3 },
            { id: 8, sitc_description: 'Oils, Fats & Waxes', fiji_exports: 3, fiji_imports: 6, png_exports: 0, png_imports: 0, solomon_exports: 0, solomon_imports: 0, total: 9 },
            { id: 9, sitc_description: 'Grand Total', fiji_exports: 138, fiji_imports: 174, png_exports: 0, png_imports: 0, solomon_exports: 0, solomon_imports: 1, total: 313 }
        ],

        msgTradeNotes: {
            fiji_major_imports: 'Bread, Cakes, Pastry and Biscuits (VT 163M), Paints (VT 10M)',
            png_major_import: 'Medicaments (VT 8M)',
            fiji_major_export: 'Kava (VT 123M)',
            solomon_major_import: 'Prepared foodstuff and beverages (VT 1M)'
        },

        principalExports: [
            { id: 1, product: 'Kava', value: 654, percentage: 93.6, year: 2025 },
            { id: 2, product: 'Copra', value: 200, percentage: 28.6, year: 2025 },
            { id: 3, product: 'Coconut Oil', value: 35, percentage: 5.0, year: 2025 },
            { id: 4, product: 'Cocoa', value: 7, percentage: 1.0, year: 2025 },
            { id: 5, product: 'Coffee', value: 0, percentage: 0, year: 2025 },
            { id: 6, product: 'Wood', value: 0, percentage: 0, year: 2025 }
        ],

        newExports: [
            { id: 1, product: 'Processed Coconut Products', value: 35, growth_rate: 0, year: 2025 },
            { id: 2, product: 'Processed Kava Products', value: 327, growth_rate: 0, year: 2025 },
            { id: 3, product: 'Processed Cocoa Products', value: 3.5, growth_rate: 0, year: 2025 },
            { id: 4, product: 'Processed Coffee Products', value: 0, growth_rate: 0, year: 2025 },
            { id: 5, product: 'Other Processed Exports', value: 106.5, growth_rate: 0, year: 2025 }
        ],

        principalImports: [
            { id: 1, product: 'Potatoes', value: 1, percentage: 11.1, year: 2025 },
            { id: 2, product: 'Onions and Shallots', value: 1, percentage: 11.1, year: 2025 },
            { id: 3, product: 'Cauliflower and Broccoli', value: 0.4, percentage: 4.4, year: 2025 },
            { id: 4, product: 'Carrots and Turnips', value: 2, percentage: 22.2, year: 2025 },
            { id: 5, product: 'Oranges', value: 4, percentage: 44.4, year: 2025 },
            { id: 6, product: 'Other Food Products (DARD targeted)', value: 0.6, percentage: 6.7, year: 2025 }
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
