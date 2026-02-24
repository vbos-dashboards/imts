import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './SectionStyles.css';

const NSDPIndicators = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="section-card">No NSDP data available</div>;
    }

    const chartData = data.map(item => ({
        name: item.indicator_name,
        value: item.value
    }));

    return (
        <div className="section-card">
            <h2 className="section-title">1. National Sustainable Development Plan Indicators (NSDP)</h2>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#667eea" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>Indicator</th>
                            <th>Value</th>
                            <th>Unit</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.indicator_name}</td>
                                <td className="number">{item.value.toFixed(2)}</td>
                                <td>{item.unit}</td>
                                <td>{item.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NSDPIndicators;
