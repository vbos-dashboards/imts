import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { CHART_COLORS } from '../../utils/chartConfig';
import './SectionStyles.css';

const MSGTrade = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="section-card">No MSG trade data available</div>;
    }

    // Prepare chart data excluding Grand Total
    const chartData = data.filter(item => item.sitc_description !== 'Grand Total').map(item => ({
        name: item.sitc_description,
        exports: item.fiji_exports,
        imports: item.fiji_imports
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
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: '#cbd5e1', margin: '4px 0' }}>
                            {entry.name}: <strong style={{ color: entry.color }}>{entry.value.toLocaleString()} VT M</strong>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="section-card">
            <h2 className="section-title">
                4. Trade by Trade Agreement - Melanesian Spearhead Group (ECO 1.5.2)
                <span
                    className="info-icon"
                    data-tooltip="Hover over table headers and chart elements for detailed information"
                    title="Hover over table headers and chart elements for detailed information"
                >
                    ℹ
                </span>
            </h2>
            <p className="section-subtitle">Total Trade Value: VT 313 Million</p>
            <p className="section-subtitle">
                Major imports from Fiji: Bread, Cakes, Pastry and Biscuits (VT 163M), Paints (VT 10M)<br />
                Major export to Fiji: Kava (VT 123M) | Major import from PNG: Medicaments (VT 8M)
            </p>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                        <defs>
                            <linearGradient id="colorExports" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#10b981" stopOpacity={0.6} />
                            </linearGradient>
                            <linearGradient id="colorImports" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.6} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
                        <XAxis
                            dataKey="name"
                            angle={-45}
                            textAnchor="end"
                            height={120}
                            tick={{ fill: '#64748b', fontSize: 10 }}
                            axisLine={{ stroke: '#cbd5e1' }}
                        />
                        <YAxis
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            axisLine={{ stroke: '#cbd5e1' }}
                            label={{ value: 'VT Million', angle: -90, position: 'insideLeft', style: { fill: '#64748b' } }}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                        <Legend
                            wrapperStyle={{ paddingTop: '20px' }}
                            iconType="circle"
                        />
                        <Bar dataKey="exports" name="Exports (VT M)" fill="url(#colorExports)" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="imports" name="Imports (VT M)" fill="url(#colorImports)" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="data-table">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th data-tooltip="Standard International Trade Classification categories">SITC Description</th>
                            <th className="text-center" data-tooltip="Vanuatu exports to Fiji (VT Million)">Fiji Exports</th>
                            <th className="text-center" data-tooltip="Vanuatu imports from Fiji (VT Million)">Fiji Imports</th>
                            <th className="text-center" data-tooltip="Vanuatu exports to Papua New Guinea (VT Million)">PNG Exports</th>
                            <th className="text-center" data-tooltip="Vanuatu imports from Papua New Guinea (VT Million)">PNG Imports</th>
                            <th className="text-center" data-tooltip="Vanuatu exports to Solomon Islands (VT Million)">Solomon Exports</th>
                            <th className="text-center" data-tooltip="Vanuatu imports from Solomon Islands (VT Million)">Solomon Imports</th>
                            <th className="text-center" data-tooltip="Total trade value across all MSG partners (VT Million)">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx} style={item.sitc_description === 'Grand Total' ? { fontWeight: 'bold', backgroundColor: '#f1f5f9' } : {}}>
                                <td><strong>{item.sitc_description}</strong></td>
                                <td className="text-center">
                                    {item.fiji_exports > 0 ? <span className="badge bg-success">{item.fiji_exports}</span> : '-'}
                                </td>
                                <td className="text-center">
                                    {item.fiji_imports > 0 ? <span className="badge bg-danger">{item.fiji_imports}</span> : '-'}
                                </td>
                                <td className="text-center">
                                    {item.png_exports > 0 ? <span className="badge bg-success">{item.png_exports}</span> : '-'}
                                </td>
                                <td className="text-center">
                                    {item.png_imports > 0 ? <span className="badge bg-danger">{item.png_imports}</span> : '-'}
                                </td>
                                <td className="text-center">
                                    {item.solomon_exports > 0 ? <span className="badge bg-success">{item.solomon_exports}</span> : '-'}
                                </td>
                                <td className="text-center">
                                    {item.solomon_imports > 0 ? <span className="badge bg-danger">{item.solomon_imports}</span> : '-'}
                                </td>
                                <td className="text-center">
                                    <span className="badge bg-primary" style={{ fontSize: '0.95rem', padding: '6px 12px' }}>
                                        {item.total}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MSGTrade;
