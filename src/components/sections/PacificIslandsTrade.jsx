import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './SectionStyles.css';

const PacificIslandsTrade = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="section-card">No Pacific Islands trade data available</div>;
    }

    const chartData = data.map(item => ({
        name: item.country,
        exports: item.exports,
        imports: item.imports,
        balance: item.balance
    }));

    const totalBalance = data.reduce((sum, item) => sum + item.balance, 0);

    return (
        <div className="section-card">
            <h2 className="section-title">3. Trade Balance of Pacific Islands</h2>
            <p className="section-subtitle">(Excluding Melanesian Islands, Australia and New Zealand)</p>
            <p className="section-subtitle">Total Trade Balance: VT {totalBalance.toLocaleString()} Million</p>
            <p className="section-subtitle" style={{ fontSize: '0.9em', fontStyle: 'italic' }}>
                Driven by exports of Kava to Kiribati (VT 89M) and Frozen Albacore Tuna to American Samoa (VT 12M)
            </p>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="exports" fill="#00BCD4" name="Exports (VT Million)" />
                        <Bar dataKey="imports" fill="#FF9800" name="Imports (VT Million)" />
                        <Bar dataKey="balance" fill="#9C27B0" name="Balance (VT Million)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Exports (VT Million)</th>
                            <th>Imports (VT Million)</th>
                            <th>Balance (VT Million)</th>
                            <th>Major Trade Items</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td><strong>{item.country}</strong></td>
                                <td className="number positive">{item.exports.toLocaleString()}</td>
                                <td className="number negative">{item.imports.toLocaleString()}</td>
                                <td className={`number ${item.balance >= 0 ? 'positive' : 'negative'}`}>
                                    {item.balance.toLocaleString()}
                                </td>
                                <td style={{ fontSize: '0.85em' }}>
                                    {item.major_exports || item.major_imports || 'Various'}
                                </td>
                                <td>{item.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PacificIslandsTrade;
