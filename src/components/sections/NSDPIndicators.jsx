import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { CHART_COLORS } from '../../utils/chartConfig';
import './SectionStyles.css';

const NSDPIndicators = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="section-card">No NSDP data available</div>;
    }

    const chartData = data.map(item => ({
        name: item.indicator_name,
        value: item.value
    }));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    padding: '16px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <p style={{ color: '#f1f5f9', fontWeight: 600, margin: '0 0 8px 0' }}>
                        {payload[0].payload.name}
                    </p>
                    <p style={{ color: '#cbd5e1', margin: 0 }}>
                        Value: <strong style={{ color: '#3b82f6' }}>{payload[0].value.toLocaleString()}</strong>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="section-card">
            <h2 className="section-title">
                1. National Sustainable Development Plan Indicators (NSDP)
                <span
                    className="info-icon"
                    data-tooltip="Hover over table headers for detailed information"
                    title="Hover over table headers for detailed information"
                >
                    ℹ
                </span>
            </h2>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                        <defs>
                            {CHART_COLORS.primary.map((color, index) => (
                                <linearGradient key={index} id={`colorGradient${index}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                                    <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
                        <XAxis
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            height={120}
                            tick={{ fill: '#64748b', fontSize: 11 }}
                            axisLine={{ stroke: '#cbd5e1' }}
                        />
                        <YAxis
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            axisLine={{ stroke: '#cbd5e1' }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            iconType="circle"
                        />
                        <Bar dataKey="value" name="Indicator Value" radius={[8, 8, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={`url(#colorGradient${index % 6})`} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="data-table">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th data-tooltip="National Sustainable Development Plan performance indicators">Indicator</th>
                            <th data-tooltip="Measured value for the indicator period">Value</th>
                            <th data-tooltip="Unit of measurement (VT Million, Ratio, etc.)">Unit</th>
                            <th data-tooltip="Reporting period">Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td><strong>{item.indicator_name}</strong></td>
                                <td className="number">
                                    <span className="badge bg-primary" style={{ fontSize: '1rem', padding: '8px 16px' }}>
                                        {item.value.toLocaleString()}
                                    </span>
                                </td>
                                <td>{item.unit}</td>
                                <td>
                                    <span className="badge bg-secondary">{item.year}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NSDPIndicators;
