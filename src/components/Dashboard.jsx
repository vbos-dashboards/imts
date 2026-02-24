import React, { useState } from 'react';
import NSDPIndicators from './sections/NSDPIndicators';
import TradeBalancePartners from './sections/TradeBalancePartners';
import PacificIslandsTrade from './sections/PacificIslandsTrade';
import MSGTrade from './sections/MSGTrade';
import PrincipalExports from './sections/PrincipalExports';
import NewExports from './sections/NewExports';
import PrincipalImports from './sections/PrincipalImports';
import DietaryRiskImports from './sections/DietaryRiskImports';
import './Dashboard.css';

const Dashboard = ({ data }) => {
    const [activeSection, setActiveSection] = useState('all');

    const sections = [
        { id: 'all', label: 'All Sections' },
        { id: 'nsdp', label: 'NSDP Indicators' },
        { id: 'partners', label: 'Trade Balance - Partners' },
        { id: 'pacific', label: 'Pacific Islands Trade' },
        { id: 'msg', label: 'MSG Trade Agreement' },
        { id: 'exports', label: 'Principal Exports' },
        { id: 'newExports', label: 'New Major Exports' },
        { id: 'imports', label: 'Principal Imports' },
        { id: 'dietary', label: 'Dietary Risk Imports' }
    ];

    const renderSection = (id) => {
        if (activeSection !== 'all' && activeSection !== id) return null;

        switch (id) {
            case 'nsdp':
                return <NSDPIndicators data={data.nsdpIndicators} />;
            case 'partners':
                return <TradeBalancePartners data={data.tradeBalancePartners} />;
            case 'pacific':
                return <PacificIslandsTrade data={data.pacificIslandsTrade} />;
            case 'msg':
                return <MSGTrade data={data.msgTrade} />;
            case 'exports':
                return <PrincipalExports data={data.principalExports} />;
            case 'newExports':
                return <NewExports data={data.newExports} />;
            case 'imports':
                return <PrincipalImports data={data.principalImports} />;
            case 'dietary':
                return <DietaryRiskImports data={data.dietaryRiskImports} />;
            default:
                return null;
        }
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Pacific Islands Trade Dashboard</h1>
                <p>Comprehensive Trade Data and Analytics</p>
            </header>

            <nav className="dashboard-nav">
                {sections.map(section => (
                    <button
                        key={section.id}
                        className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => setActiveSection(section.id)}
                    >
                        {section.label}
                    </button>
                ))}
            </nav>

            <div className="dashboard-content">
                {renderSection('nsdp')}
                {renderSection('partners')}
                {renderSection('pacific')}
                {renderSection('msg')}
                {renderSection('exports')}
                {renderSection('newExports')}
                {renderSection('imports')}
                {renderSection('dietary')}
            </div>

            <footer className="dashboard-footer">
                <p>&copy; 2026 Pacific Islands Trade Dashboard. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Dashboard;
