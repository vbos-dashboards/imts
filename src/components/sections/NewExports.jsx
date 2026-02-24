import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './SectionStyles.css';

const NewExports = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="section-card">No new exports data available</div>;
    }

    const chartData = data.map(item => ({
        name: item.product,
        value: item.value,
        growth: item.growth_rate
    }));

    return (
        <div className="section-card">
            <h2 className="section-title">6. Top 5 New Major Exports</h2>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="value" fill="#667eea" name="Value (M USD)" />
                        <Bar yAxisId="right" dataKey="growth" fill="#4CAF50" name="Growth Rate (%)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Value (M USD)</th>
                            <th>Growth Rate (%)</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td><strong>{item.product}</strong></td>
                                <td className="number">{item.value.toFixed(2)}</td>
                                <td className="number positive">
                                    <span className="growth-badge">+{item.growth_rate.toFixed(1)}%</span>
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

export default NewExports;
