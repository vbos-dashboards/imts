import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import './SectionStyles.css';

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];

const MSGTrade = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="section-card">No MSG trade data available</div>;
    }

    const chartData = data.map(item => ({
        name: item.country,
        value: item.trade_value
    }));

    return (
        <div className="section-card">
            <h2 className="section-title">4. Trade by Trade Agreement - Melanesian Spearhead Group</h2>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Country</th>
                            <th>Trade Value (M USD)</th>
                            <th>Type</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td><strong>{item.country}</strong></td>
                                <td className="number">{item.trade_value.toFixed(2)}</td>
                                <td className="capitalize">{item.type}</td>
                                <td>{item.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MSGTrade;
