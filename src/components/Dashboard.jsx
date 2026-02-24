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
        { id: 'all', label: 'All Sections', tooltip: 'View all trade statistics sections' },
        { id: 'nsdp', label: 'NSDP Indicators', tooltip: 'National Sustainable Development Plan performance indicators' },
        { id: 'partners', label: 'Trade Balance - Partners', tooltip: 'Trade balance with major partner countries (China, Australia, Singapore, etc.)' },
        { id: 'pacific', label: 'Pacific Islands Trade', tooltip: 'Trade statistics with Pacific Island nations excluding Melanesia' },
        { id: 'msg', label: 'MSG Trade Agreement', tooltip: 'Melanesian Spearhead Group trade data by SITC categories' },
        { id: 'exports', label: 'Principal Exports', tooltip: 'Major export commodities: Kava, Copra, Coconut Oil, etc.' },
        { id: 'newExports', label: 'New Major Exports', tooltip: 'Processed export commodities and growth trends' },
        { id: 'imports', label: 'Principal Imports', tooltip: 'Food imports targeted by Department of Agriculture' },
        { id: 'dietary', label: 'Dietary Risk Imports', tooltip: 'Food products with health risk concerns (high sugar, sodium, etc.)' }
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
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-12 text-center">
                            <h1 className="display-4 fw-bold mb-2">International Merchandise Trade Statistics – Monthly</h1>
                            <p className="lead mb-0">Provisional Highlights</p>
                        </div>
                    </div>
                </div>
            </header>

            <nav className="dashboard-nav">
                <div className="container-fluid">
                    <div className="d-flex flex-wrap gap-2 justify-content-center">
                        {sections.map(section => (
                            <button
                                key={section.id}
                                className={`btn nav-button ${activeSection === section.id ? 'active btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setActiveSection(section.id)}
                                data-tooltip={section.tooltip}
                                title={section.tooltip}
                            >
                                {section.label}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <div className="dashboard-content">
                <div className="container-fluid">
                    <div className="row g-4">
                        <div className="col-12">
                            {renderSection('nsdp')}
                            {renderSection('partners')}
                            {renderSection('pacific')}
                            {renderSection('msg')}
                            {renderSection('exports')}
                            {renderSection('newExports')}
                            {renderSection('imports')}
                            {renderSection('dietary')}
                        </div>
                    </div>
                </div>
            </div>

            <footer className="dashboard-footer bg-dark text-white py-4">
                <div className="container-fluid text-center">
                    <p className="mb-0">&copy; 2026 International Merchandise Trade Statistics. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
