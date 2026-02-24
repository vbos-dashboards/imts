// Professional color schemes for charts
export const CHART_COLORS = {
    primary: ['#3b82f6', '#06b6d4', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'],
    gradient: {
        blue: '#3b82f6',
        cyan: '#06b6d4',
        green: '#10b981',
        purple: '#8b5cf6',
        orange: '#f59e0b',
        red: '#ef4444',
        indigo: '#6366f1',
        pink: '#ec4899',
        teal: '#14b8a6',
        lime: '#84cc16'
    },
    positive: '#10b981',
    negative: '#ef4444',
    neutral: '#64748b',
    background: '#f8fafc',
    grid: '#e2e8f0'
};

// Chart configuration defaults
export const CHART_CONFIG = {
    margin: { top: 20, right: 30, left: 20, bottom: 60 },
    fontSize: 12,
    fontFamily: "'Inter', 'Segoe UI', 'Arial', sans-serif",
    strokeWidth: 2,
    dotSize: 6,
    animationDuration: 800,
    animationEasing: 'ease-in-out'
};

// Custom tooltip styling
export const CUSTOM_TOOLTIP_STYLE = {
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    border: 'none',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(10px)'
};

export const CUSTOM_TOOLTIP_LABEL_STYLE = {
    color: '#f1f5f9',
    fontWeight: 600,
    fontSize: '14px',
    marginBottom: '8px'
};

export const CUSTOM_TOOLTIP_ITEM_STYLE = {
    color: '#cbd5e1',
    fontSize: '13px',
    padding: '4px 0'
};

// Gradient definitions for charts
export const createGradient = (ctx, color1, color2) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
};
