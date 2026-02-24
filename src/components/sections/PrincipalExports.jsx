import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './SectionStyles.css';

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

const PrincipalExports = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="section-card">No principal exports data available</div>;
    }

    const chartData = data.map(item => ({
        name: item.product,
        value: item.value,
        percentage: item.percentage
    }));

    return (
        <div className="section-card">
            <h2 className="section-title">5. Principal Exports - Major Commodities (ECO 1.7.1)</h2>
            <p className="section-subtitle">Total Production Value: VT 699 Million</p>

            <div className="charts-grid">
                <div className="chart-container">
                    <h3 className="chart-subtitle">Export Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percentage }) => `${name.substring(0, 15)}... (${percentage.toFixed(1)}%)`}
                                outerRadius={90}
                                fill="#8884d8"
                                dataKey="percentage"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="chart-container">
                    <h3 className="chart-subtitle">Export Values</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#667eea" name="Value (M USD)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Value (M USD)</th>
                            <th>Percentage</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td><strong>{item.product}</strong></td>
                                <td className="number">{item.value.toFixed(2)}</td>
                                <td className="number">{item.percentage.toFixed(1)}%</td>
                                <td>{item.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PrincipalExports;
