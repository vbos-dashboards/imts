import React, { useState, useEffect } from 'react';
import { initDB, getAllData } from './utils/database';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            await initDB();
            const tradeData = await getAllData();
            setData(tradeData);
            setError(null);
        } catch (err) {
            console.error('Error loading data:', err);
            setError('Failed to load trade data. Please refresh the page.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="app-container">
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading Trade Dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app-container">
                <div className="error">
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button onClick={loadData}>Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <Dashboard data={data} />
        </div>
    );
}

export default App;
