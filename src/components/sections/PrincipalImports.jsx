import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './SectionStyles.css';

const COLORS = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#34495e'];

const PrincipalImports = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="section-card">No principal imports data available</div>;
    }

    const chartData = data.map(item => ({
        name: item.product,
        value: item.value,
        percentage: item.percentage
    }));

    return (
        <div className="section-card">
            <h2 className="section-title">7. Principal Imports</h2>

            <div className="charts-grid">
                <div className="chart-container">
                    <h3 className="chart-subtitle">Import Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percentage }) => `${name.substring(0, 12)}... (${percentage.toFixed(1)}%)`}
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
                    <h3 className="chart-subtitle">Import Values</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#e74c3c" name="Value (M USD)" />
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

export default PrincipalImports;
