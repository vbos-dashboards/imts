# Deployment Guide

## Quick Deploy to GitHub Pages

### 1. Initial Setup

```bash
# Install dependencies
npm install

# Test locally
npm run dev
```

### 2. Update Configuration

Edit `package.json` and update the homepage:
```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPO_NAME"
```

Edit `vite.config.js` and update the base:
```javascript
base: '/YOUR_REPO_NAME/'
```

### 3. Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: Trade Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### 4. Deploy

```bash
npm run deploy
```

This command will:
- Build your application
- Create/update the `gh-pages` branch
- Push the built files to GitHub

### 5. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** section
4. Under **Source**, select `gh-pages` branch
5. Click **Save**

Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## Embedding in Joomla

### Basic Embed Code

```html
<iframe 
  src="https://YOUR_USERNAME.github.io/YOUR_REPO_NAME" 
  width="100%" 
  height="800px" 
  frameborder="0"
  title="Trade Dashboard">
</iframe>
```

### Responsive Embed

```html
<div class="responsive-iframe-container">
  <iframe 
    src="https://YOUR_USERNAME.github.io/YOUR_REPO_NAME" 
    frameborder="0"
    title="Trade Dashboard">
  </iframe>
</div>

<style>
.responsive-iframe-container {
  position: relative;
  width: 100%;
  padding-bottom: 75%; /* 4:3 Aspect Ratio */
  height: 0;
  overflow: hidden;
}

.responsive-iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
```

### Joomla Article Integration

1. Create or edit a Joomla article
2. Switch to **HTML** or **Code** editor
3. Paste the iframe code
4. Save and publish

### Joomla Custom Module

1. Extensions → Modules → New
2. Select "Custom HTML"
3. Enter module title
4. Paste iframe code in the editor
5. Set module position
6. Assign to menu items
7. Save

## Updating Data

To update dashboard data:

1. Edit `src/utils/database.js`
2. Modify the data in `insertSampleData()` function
3. Run `npm run deploy` to rebuild and redeploy

## Troubleshooting

### 404 Error on GitHub Pages

- Make sure the `base` in `vite.config.js` matches your repository name
- Verify GitHub Pages is enabled in repository settings
- Check that the `gh-pages` branch exists

### Blank Page After Deploy

- Clear browser cache
- Check console for errors
- Verify the `homepage` in `package.json` is correct

### Database Not Loading

- Check browser console for errors
- Verify sql.js CDN is accessible
- Check network tab for failed requests

### Charts Not Displaying

- Ensure recharts is installed: `npm install recharts`
- Check data format matches expected structure
- Verify component imports are correct

## Performance Tips

1. **Optimize Images**: Compress any images before adding
2. **Lazy Loading**: Implement lazy loading for heavy components
3. **Code Splitting**: Use React.lazy() for route-based splitting
4. **Caching**: GitHub Pages automatically caches static assets

## Security Notes

- GitHub Pages serves content over HTTPS by default
- No sensitive data should be stored in the frontend
- Consider implementing CORS headers if needed
- Use environment variables for API keys (not included in build)
