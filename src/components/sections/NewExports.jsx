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
            <h2 className="section-title">6. Processed Export Commodities (ECO 4.3.2)</h2>
            <p className="section-subtitle">Total Value of Processed Exports: VT 472 Million (Ratio: 2)</p>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#667eea" name="Value (VT Million)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Value (VT Million)</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td><strong>{item.product}</strong></td>
                                <td className="number">{item.value.toFixed(2)}</td>
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
