import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './SectionStyles.css';

const TradeBalancePartners = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="section-card">No trade balance data available</div>;
    }

    const chartData = data.map(item => ({
        name: item.country,
        balance: item.balance
    }));

    // Note about the data representing 83% of total balance
    const topFiveBalance = data.slice(0, 5).reduce((sum, item) => sum + item.balance, 0);

    return (
        <div className="section-card">
            <h2 className="section-title">
                2. Trade Balance by Major Partner Countries (ECO 1.5.3)
                <span className="info-icon" data-tooltip="Shows trade balance (exports - imports) with major trading partners">ℹ</span>
            </h2>
            <p className="section-subtitle">Total Trade Balance: VT -3,271 Million</p>
            <p className="section-subtitle" style={{ fontSize: '0.9em', fontStyle: 'italic' }}>
                Top 5 countries (China, Australia, Singapore, New Zealand, Hong Kong) represent 83% of total balance (VT {topFiveBalance.toLocaleString()} million)
            </p>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="balance" fill="#667eea" name="Trade Balance (VT Million)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Balance (VT Million)</th>
                            <th>Major Imports</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td><strong>{item.country}</strong></td>
                                <td className={`number ${item.balance >= 0 ? 'positive' : 'negative'}`}>
                                    {item.balance.toLocaleString()}
                                </td>
                                <td style={{ fontSize: '0.85em' }}>{item.major_imports || 'N/A'}</td>
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
