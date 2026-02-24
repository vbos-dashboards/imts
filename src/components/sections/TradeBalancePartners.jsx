import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './SectionStyles.css';

const TradeBalancePartners = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="section-card">No trade balance data available</div>;
    }

    const chartData = data.map(item => ({
        name: item.country,
        exports: item.exports,
        imports: item.imports,
        balance: item.balance
    }));

    return (
        <div className="section-card">
            <h2 className="section-title">2. Trade Balance by Major Partner Countries</h2>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="exports" fill="#4CAF50" name="Exports (M USD)" />
                        <Bar dataKey="imports" fill="#f44336" name="Imports (M USD)" />
                        <Bar dataKey="balance" fill="#667eea" name="Balance (M USD)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Exports (M USD)</th>
                            <th>Imports (M USD)</th>
                            <th>Balance (M USD)</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td><strong>{item.country}</strong></td>
                                <td className="number positive">{item.exports.toFixed(2)}</td>
                                <td className="number negative">{item.imports.toFixed(2)}</td>
                                <td className={`number ${item.balance >= 0 ? 'positive' : 'negative'}`}>
                                    {item.balance.toFixed(2)}
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

export default TradeBalancePartners;
