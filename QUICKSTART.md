# 🚀 Quick Start Guide

## Step 1: Install Dependencies (Already Done ✓)

The dependencies have been installed successfully!

## Step 2: Run Development Server

To view the dashboard locally:

```bash
npm run dev
```

Then open your browser to `http://localhost:5173`

## Step 3: Deploy to GitHub Pages

### A. Update Configuration

1. Edit `package.json` line 5:
   ```json
   "homepage": "https://YOUR_GITHUB_USERNAME.github.io/trade-dashboard"
   ```

2. Edit `vite.config.js` line 5:
   ```javascript
   base: '/trade-dashboard/',
   ```

   Replace with your actual repository name if different.

### B. Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Trade Dashboard"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/trade-dashboard.git
git branch -M main
git push -u origin main
```

### C. Deploy

```bash
npm run deploy
```

### D. Enable GitHub Pages

1. Go to repository **Settings** → **Pages**
2. Select branch: `gh-pages`
3. Click **Save**

Your dashboard will be live at: `https://YOUR_USERNAME.github.io/trade-dashboard`

## Step 4: Embed in Joomla

### Simple Method:

1. Copy this code:

```html
<iframe 
  src="https://YOUR_USERNAME.github.io/trade-dashboard" 
  width="100%" 
  height="800px" 
  frameborder="0"
  style="border-radius: 8px;"
  title="Trade Dashboard">
</iframe>
```

2. In Joomla:
   - Create/edit an article
   - Switch to HTML/Code editor
   - Paste the iframe code
   - Replace `YOUR_USERNAME` with your GitHub username
   - Save and publish

### Responsive Method:

Use the code from `joomla-embed-example.html` for better mobile support.

## 📊 Data Sections Included

1. ✅ National Sustainable Development Plan Indicators (NSDP)
2. ✅ Trade Balance by Major Partner Countries
3. ✅ Trade Balance of Pacific Islands
4. ✅ Trade by Trade Agreement - Melanesian Spearhead Group
5. ✅ Principal Exports
6. ✅ Top 5 New Major Exports
7. ✅ Principal Imports
8. ✅ Imports of Dietary Risk Factors for NCDs

## 🎨 Features

- Interactive charts (Bar, Pie, Line)
- Responsive design (Desktop, Tablet, Mobile)
- SQLite database (runs in browser)
- Filterable sections
- Print-friendly
- Fast loading

## 📝 Updating Data

Edit `src/utils/database.js` and modify the data in the `insertSampleData()` function, then redeploy:

```bash
npm run deploy
```

## 🆘 Need Help?

Check [README.md](README.md) for detailed documentation  
See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment troubleshooting

## 📂 Project Structure

```
Trade_dashboard/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Main dashboard
│   │   ├── Dashboard.css
│   │   └── sections/              # All 8 data sections
│   ├── utils/
│   │   └── database.js            # SQLite setup & data
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
└── index.html
```

## ✅ Build Status

✓ Dependencies installed  
✓ Build successful (604.54 kB)  
✓ No errors found  
✓ Ready for deployment
