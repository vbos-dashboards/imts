import initSqlJs from 'sql.js';

let db = null;

export const initDB = async () => {
    if (db) return db;

    try {
        const SQL = await initSqlJs({
            locateFile: file => `/trade_dashboard/${file}`
        });

        db = new SQL.Database();
    } catch (error) {
        console.error('Failed to initialize SQL.js:', error);
        throw new Error('Database initialization failed');
    }

    // Create tables
    createTables();

    // Insert sample data
    insertSampleData();

    return db;
};

const createTables = () => {
    // NSDP Indicators
    db.run(`
    CREATE TABLE IF NOT EXISTS nsdp_indicators (
      id INTEGER PRIMARY KEY,
      indicator_name TEXT,
      value REAL,
      year INTEGER,
      unit TEXT
    )
  `);

    // Trade Balance by Partner Countries
    db.run(`
    CREATE TABLE IF NOT EXISTS trade_balance_partners (
      id INTEGER PRIMARY KEY,
      country TEXT,
      exports REAL,
      imports REAL,
      balance REAL,
      year INTEGER
    )
  `);

    // Pacific Islands Trade Balance
    db.run(`
    CREATE TABLE IF NOT EXISTS pacific_islands_trade (
      id INTEGER PRIMARY KEY,
      country TEXT,
      exports REAL,
      imports REAL,
      balance REAL,
      year INTEGER
    )
  `);

    // MSG Trade Agreement
    db.run(`
    CREATE TABLE IF NOT EXISTS msg_trade (
      id INTEGER PRIMARY KEY,
      country TEXT,
      trade_value REAL,
      year INTEGER,
      type TEXT
    )
  `);

    // Principal Exports
    db.run(`
    CREATE TABLE IF NOT EXISTS principal_exports (
      id INTEGER PRIMARY KEY,
      product TEXT,
      value REAL,
      percentage REAL,
      year INTEGER
    )
  `);

    // Top 5 New Major Exports
    db.run(`
    CREATE TABLE IF NOT EXISTS new_exports (
      id INTEGER PRIMARY KEY,
      product TEXT,
      value REAL,
      growth_rate REAL,
      year INTEGER
    )
  `);

    // Principal Imports
    db.run(`
    CREATE TABLE IF NOT EXISTS principal_imports (
      id INTEGER PRIMARY KEY,
      product TEXT,
      value REAL,
      percentage REAL,
      year INTEGER
    )
  `);

    // Dietary Risk Imports
    db.run(`
    CREATE TABLE IF NOT EXISTS dietary_risk_imports (
      id INTEGER PRIMARY KEY,
      product TEXT,
      value REAL,
      year INTEGER,
      risk_category TEXT
    )
  `);
};

const insertSampleData = () => {
    // NSDP Indicators
    const nsdpData = [
        ['GDP Growth Rate', 3.5, 2025, '%'],
        ['Trade Openness', 45.2, 2025, '%'],
        ['Export Diversity Index', 0.65, 2025, 'index'],
        ['Import Dependency', 72.3, 2025, '%'],
        ['Trade-to-GDP Ratio', 89.7, 2025, '%']
    ];

    nsdpData.forEach(([name, value, year, unit]) => {
        db.run(`INSERT INTO nsdp_indicators (indicator_name, value, year, unit) VALUES (?, ?, ?, ?)`,
            [name, value, year, unit]);
    });

    // Trade Balance by Partners
    const partnersData = [
        ['China', 250.5, 450.2, -199.7, 2025],
        ['Australia', 180.3, 320.1, -139.8, 2025],
        ['New Zealand', 120.7, 210.5, -89.8, 2025],
        ['Japan', 95.2, 150.3, -55.1, 2025],
        ['United States', 110.8, 180.6, -69.8, 2025],
        ['Singapore', 85.4, 140.2, -54.8, 2025]
    ];

    partnersData.forEach(([country, exports, imports, balance, year]) => {
        db.run(`INSERT INTO trade_balance_partners (country, exports, imports, balance, year) VALUES (?, ?, ?, ?, ?)`,
            [country, exports, imports, balance, year]);
    });

    // Pacific Islands Trade
    const pacificData = [
        ['Fiji', 45.2, 78.5, -33.3, 2025],
        ['Tonga', 12.3, 25.6, -13.3, 2025],
        ['Samoa', 18.7, 32.4, -13.7, 2025],
        ['Kiribati', 5.2, 15.8, -10.6, 2025],
        ['Tuvalu', 2.1, 8.3, -6.2, 2025],
        ['Cook Islands', 8.5, 18.2, -9.7, 2025]
    ];

    pacificData.forEach(([country, exports, imports, balance, year]) => {
        db.run(`INSERT INTO pacific_islands_trade (country, exports, imports, balance, year) VALUES (?, ?, ?, ?, ?)`,
            [country, exports, imports, balance, year]);
    });

    // MSG Trade
    const msgData = [
        ['Papua New Guinea', 125.5, 2025, 'export'],
        ['Fiji', 65.3, 2025, 'export'],
        ['Solomon Islands', 42.1, 2025, 'export'],
        ['Vanuatu', 28.7, 2025, 'export']
    ];

    msgData.forEach(([country, value, year, type]) => {
        db.run(`INSERT INTO msg_trade (country, trade_value, year, type) VALUES (?, ?, ?, ?)`,
            [country, value, year, type]);
    });

    // Principal Exports
    const exportsData = [
        ['Fish and Seafood', 180.5, 28.5, 2025],
        ['Coconut Products', 95.2, 15.0, 2025],
        ['Palm Oil', 85.7, 13.5, 2025],
        ['Timber', 72.3, 11.4, 2025],
        ['Minerals', 120.8, 19.1, 2025],
        ['Agricultural Products', 78.6, 12.5, 2025]
    ];

    exportsData.forEach(([product, value, percentage, year]) => {
        db.run(`INSERT INTO principal_exports (product, value, percentage, year) VALUES (?, ?, ?, ?)`,
            [product, value, percentage, year]);
    });

    // New Major Exports
    const newExportsData = [
        ['Organic Coffee', 15.2, 125.5, 2025],
        ['Seaweed Products', 12.8, 98.3, 2025],
        ['Essential Oils', 9.5, 87.2, 2025],
        ['Handicrafts', 7.3, 65.8, 2025],
        ['Vanilla', 18.6, 142.7, 2025]
    ];

    newExportsData.forEach(([product, value, growth, year]) => {
        db.run(`INSERT INTO new_exports (product, value, growth_rate, year) VALUES (?, ?, ?, ?)`,
            [product, value, growth, year]);
    });

    // Principal Imports
    const importsData = [
        ['Fuel and Energy', 280.5, 22.5, 2025],
        ['Machinery and Equipment', 195.3, 15.7, 2025],
        ['Food Products', 165.8, 13.3, 2025],
        ['Vehicles', 142.6, 11.5, 2025],
        ['Manufactured Goods', 178.4, 14.3, 2025],
        ['Chemicals', 95.7, 7.7, 2025],
        ['Textiles', 85.2, 6.8, 2025]
    ];

    importsData.forEach(([product, value, percentage, year]) => {
        db.run(`INSERT INTO principal_imports (product, value, percentage, year) VALUES (?, ?, ?, ?)`,
            [product, value, percentage, year]);
    });

    // Dietary Risk Imports
    const dietaryData = [
        ['Sugary Beverages', 45.3, 2025, 'High Sugar'],
        ['Processed Meats', 32.7, 2025, 'High Sodium'],
        ['Refined Grains', 28.5, 2025, 'Low Fiber'],
        ['Trans Fat Products', 15.2, 2025, 'Unhealthy Fats'],
        ['High-Sodium Snacks', 38.6, 2025, 'High Sodium'],
        ['Confectionery', 22.4, 2025, 'High Sugar']
    ];

    dietaryData.forEach(([product, value, year, category]) => {
        db.run(`INSERT INTO dietary_risk_imports (product, value, year, risk_category) VALUES (?, ?, ?, ?)`,
            [product, value, year, category]);
    });
};

export const getAllData = async () => {
    if (!db) await initDB();

    const getData = (query) => {
        const result = db.exec(query);
        if (result.length === 0) return [];
        const columns = result[0].columns;
        return result[0].values.map(row => {
            const obj = {};
            columns.forEach((col, idx) => {
                obj[col] = row[idx];
            });
            return obj;
        });
    };

    return {
        nsdpIndicators: getData('SELECT * FROM nsdp_indicators'),
        tradeBalancePartners: getData('SELECT * FROM trade_balance_partners'),
        pacificIslandsTrade: getData('SELECT * FROM pacific_islands_trade'),
        msgTrade: getData('SELECT * FROM msg_trade'),
        principalExports: getData('SELECT * FROM principal_exports'),
        newExports: getData('SELECT * FROM new_exports'),
        principalImports: getData('SELECT * FROM principal_imports'),
        dietaryRiskImports: getData('SELECT * FROM dietary_risk_imports')
    };
};

export const executeQuery = async (query) => {
    if (!db) await initDB();

    try {
        const result = db.exec(query);
        if (result.length === 0) return [];

        const columns = result[0].columns;
        return result[0].values.map(row => {
            const obj = {};
            columns.forEach((col, idx) => {
                obj[col] = row[idx];
            });
            return obj;
        });
    } catch (error) {
        console.error('Query error:', error);
        throw error;
    }
};
