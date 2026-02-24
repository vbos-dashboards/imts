import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './SectionStyles.css';

const TradeBalancePartners = ({ data }) => {
    const [hoveredCountry, setHoveredCountry] = useState(null);

    if (!data || data.length === 0) {
        return <div className="section-card">No trade balance data available</div>;
    }

    const chartData = data.map(item => ({
        name: item.country,
        balance: item.balance
    }));

    // Note about the data representing 83% of total balance
    const topFiveBalance = data.slice(0, 5).reduce((sum, item) => sum + item.balance, 0);

    // Country coordinates (x, y as percentages of map width/height)
    const countryPositions = {
        'China': { x: 72, y: 35, data: data.find(d => d.country === 'China') },
        'Australia': { x: 78, y: 75, data: data.find(d => d.country === 'Australia') },
        'Singapore': { x: 68, y: 52, data: data.find(d => d.country === 'Singapore') },
        'New Zealand': { x: 88, y: 82, data: data.find(d => d.country === 'New Zealand') },
        'Hong Kong': { x: 73, y: 38, data: data.find(d => d.country === 'Hong Kong') }
    };

    // Color scale function
    const getColor = (balance) => {
        if (balance >= 0) return '#10b981'; // green for positive
        const intensity = Math.min(Math.abs(balance) / 1100, 1);
        // Blue scale for negative balances
        const blueShades = ['#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8'];
        const index = Math.floor(intensity * (blueShades.length - 1));
        return blueShades[index];
    };

    // Get circle size based on absolute balance value
    const getCircleSize = (balance) => {
        const baseSize = 8;
        const scale = Math.abs(balance) / 200;
        return Math.min(baseSize + scale, 25);
    };

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

            {/* World Map Visualization */}
            <div className="map-container" style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1em', marginBottom: '1rem', color: '#1e3a8a' }}>Balance of Trade (millions)</h3>
                <svg viewBox="0 0 100 50" style={{ width: '100%', height: 'auto', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    {/* Simple world map background shapes */}
                    <path d="M 15 20 Q 20 15, 30 20 L 35 25 L 30 30 Q 25 32, 20 30 Z" fill="#cbd5e1" opacity="0.3" />
                    <path d="M 75 35 Q 80 32, 85 35 L 88 40 L 85 45 Q 80 47, 75 45 Z" fill="#cbd5e1" opacity="0.3" />
                    <path d="M 10 28 L 40 28 L 42 45 L 8 45 Z" fill="#cbd5e1" opacity="0.2" />
                    <path d="M 50 15 Q 70 12, 85 18 L 88 30 L 82 32 Q 65 35, 52 28 Z" fill="#cbd5e1" opacity="0.3" />
                    <path d="M 78 50 Q 82 48, 86 52 L 88 60 L 82 62 Q 78 60, 76 56 Z" fill="#cbd5e1" opacity="0.3" />
                    
                    {/* Vanuatu location (reference point) */}
                    <circle cx="87" cy="48" r="2" fill="#ef4444" stroke="#fff" strokeWidth="0.3" />
                    <text x="87" y="46" fontSize="2" fill="#ef4444" textAnchor="middle" fontWeight="bold">Vanuatu</text>

                    {/* Partner country markers */}
                    {Object.entries(countryPositions).map(([country, pos]) => {
                        const countryData = pos.data;
                        if (!countryData) return null;
                        
                        const color = getColor(countryData.balance);
                        const size = getCircleSize(countryData.balance);
                        const isHovered = hoveredCountry === country;

                        return (
                            <g key={country}>
                                {/* Connection line from Vanuatu */}
                                <line 
                                    x1="87" y1="48" 
                                    x2={pos.x} y2={pos.y} 
                                    stroke={color} 
                                    strokeWidth="0.2" 
                                    strokeDasharray="0.5,0.5"
                                    opacity="0.4"
                                />
                                
                                {/* Country marker circle */}
                                <circle 
                                    cx={pos.x} 
                                    cy={pos.y} 
                                    r={size / 4} 
                                    fill={color} 
                                    stroke="#fff" 
                                    strokeWidth="0.5"
                                    style={{ 
                                        cursor: 'pointer',
                                        filter: isHovered ? 'brightness(1.2)' : 'none',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={() => setHoveredCountry(country)}
                                    onMouseLeave={() => setHoveredCountry(null)}
                                />
                                
                                {/* Country label */}
                                <text 
                                    x={pos.x} 
                                    y={pos.y - (size / 4) - 1.5} 
                                    fontSize="2.2" 
                                    fill="#1e293b" 
                                    textAnchor="middle"
                                    fontWeight={isHovered ? "bold" : "normal"}
                                    style={{ pointerEvents: 'none' }}
                                >
                                    {country}
                                </text>
                                
                                {/* Balance value */}
                                <text 
                                    x={pos.x} 
                                    y={pos.y + (size / 4) + 2.5} 
                                    fontSize="1.8" 
                                    fill={color} 
                                    textAnchor="middle"
                                    fontWeight="bold"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    {countryData.balance.toLocaleString()}
                                </text>
                            </g>
                        );
                    })}
                </svg>

                {/* Color Legend */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '80px', height: '12px', background: 'linear-gradient(to right, #bfdbfe, #1d4ed8)', borderRadius: '4px' }}></div>
                        <span style={{ fontSize: '0.85em', color: '#64748b' }}>-1000 to 0</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '20px', height: '12px', background: '#10b981', borderRadius: '4px' }}></div>
                        <span style={{ fontSize: '0.85em', color: '#64748b' }}>Positive</span>
                    </div>
                    <div style={{ fontSize: '0.8em', color: '#64748b', fontStyle: 'italic' }}>
                        *Circle size represents trade volume magnitude
                    </div>
                </div>
            </div>

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
