# Trade Dashboard

A comprehensive React-based trade dashboard for Pacific Islands data visualization, built with SQLite (sql.js) and Recharts. This dashboard displays various trade indicators including NSDP, trade balances, exports, imports, and dietary risk factors.

## 🌟 Features

- **National Sustainable Development Plan Indicators (NSDP)** - Key economic indicators
- **Trade Balance by Major Partner Countries** - Track trade with major partners
- **Pacific Islands Trade Balance** - Focused on Pacific Island nations
- **Melanesian Spearhead Group Trade** - MSG trade agreement data
- **Principal Exports & Imports** - Main trade products
- **Top 5 New Major Exports** - Emerging export products
- **Dietary Risk Imports** - Health-related import tracking

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/trade-dashboard.git
cd trade-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Building for Production

Build the application for production:

```bash
npm run build
```

The build output will be in the `dist` folder.

## 🌐 GitHub Pages Deployment

### Step 1: Update package.json

Update the `homepage` field in `package.json` with your GitHub username and repository name:

```json
"homepage": "https://yourusername.github.io/trade-dashboard"
```

### Step 2: Deploy to GitHub Pages

```bash
npm run deploy
```

This will build the project and push the `dist` folder to the `gh-pages` branch.

### Step 3: Configure GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select the `gh-pages` branch
4. Click **Save**

Your dashboard will be available at: `https://yourusername.github.io/trade-dashboard`

## 🔗 Embedding in Joomla

To embed this dashboard in your Joomla website:

### Method 1: Using iframe (Recommended)

Add this code to your Joomla article or custom HTML module:

```html
<iframe 
  src="https://yourusername.github.io/trade-dashboard" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);"
  title="Trade Dashboard">
</iframe>
```

### Method 2: Using Joomla Custom HTML Module

1. Go to **Extensions** → **Modules** → **New**
2. Select **Custom HTML**
3. Paste the iframe code above
4. Configure module position and publish settings
5. Save and assign to desired pages

### Method 3: Responsive Embed Code

For better mobile responsiveness:

```html
<div style="position: relative; padding-bottom: 75%; height: 0; overflow: hidden; max-width: 100%;">
  <iframe 
    src="https://yourusername.github.io/trade-dashboard" 
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
    title="Trade Dashboard">
  </iframe>
</div>
```

## 📊 Data Management

The dashboard uses SQLite (via sql.js) running entirely in the browser. Sample data is included in the `src/utils/database.js` file.

### Updating Data

To update the dashboard data:

1. Open `src/utils/database.js`
2. Modify the data in the `insertSampleData()` function
3. Rebuild and redeploy the application

### Using Custom Data

You can also load data from external sources by modifying the database initialization:

```javascript
// Example: Load data from JSON file
const loadExternalData = async () => {
  const response = await fetch('/path/to/data.json');
  const data = await response.json();
  // Insert data into database
};
```

## 🎨 Customization

### Updating Colors

The dashboard uses a color scheme defined in the CSS files. To change colors:

1. **Main gradient**: Edit `.dashboard-header` in `src/components/Dashboard.css`
2. **Chart colors**: Modify color arrays in individual section components
3. **Theme colors**: Update CSS variables in `src/index.css`

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Add corresponding table in `src/utils/database.js`
3. Import and add to `Dashboard.jsx`

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🛠 Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **sql.js** - SQLite in the browser
- **Recharts** - Data visualization
- **CSS3** - Styling and animations

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

## 🔄 Version History

- **1.0.0** (2026-02-24)
  - Initial release
  - All 8 trade data sections
  - GitHub Pages deployment ready
  - Joomla embedding support
