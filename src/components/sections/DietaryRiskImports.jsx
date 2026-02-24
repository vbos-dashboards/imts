import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './SectionStyles.css';

const RISK_COLORS = {
    'High Sugar': '#e74c3c',
    'High Sodium': '#f39c12',
    'Low Fiber': '#3498db',
    'Unhealthy Fats': '#9b59b6'
};

const DietaryRiskImports = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="section-card">No dietary risk imports data available</div>;
    }

    const chartData = data.map(item => ({
        name: item.product,
        value: item.value,
        category: item.risk_category
    }));

    // Group by category
    const categoryData = data.reduce((acc, item) => {
        const existing = acc.find(x => x.name === item.risk_category);
        if (existing) {
            existing.value += item.value;
        } else {
            acc.push({ name: item.risk_category, value: item.value });
        }
        return acc;
    }, []);

    return (
        <div className="section-card">
            <h2 className="section-title">8. Imports of Dietary Risk Factors for Noncommunicable Diseases</h2>

            <div className="charts-grid">
                <div className="chart-container">
                    <h3 className="chart-subtitle">Products by Value</h3>
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

                <div className="chart-container">
                    <h3 className="chart-subtitle">Risk Category Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value.toFixed(1)}M`}
                                outerRadius={90}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={RISK_COLORS[entry.name] || '#95a5a6'} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Value (M USD)</th>
                            <th>Risk Category</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td><strong>{item.product}</strong></td>
                                <td className="number">{item.value.toFixed(2)}</td>
                                <td>
                                    <span className="risk-badge" style={{
                                        backgroundColor: RISK_COLORS[item.risk_category] || '#95a5a6',
                                        color: 'white',
                                        padding: '4px 12px',
                                        borderRadius: '12px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}>
                                        {item.risk_category}
                                    </span>
                                </td>
                                <td>{item.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="health-warning">
                <p><strong>⚠️ Health Advisory:</strong> These imports represent products associated with increased risk of noncommunicable diseases (NCDs) such as diabetes, cardiovascular disease, and obesity.</p>
            </div>
        </div>
    );
};

export default DietaryRiskImports;
