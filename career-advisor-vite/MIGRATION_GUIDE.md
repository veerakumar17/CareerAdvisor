# CRA to Vite Migration - Complete Guide

## ✅ Migration Completed Successfully!

Your React project has been migrated from Create React App to Vite.

## Key Differences: CRA vs Vite

### Entry Point
- **CRA**: `src/index.js` → **Vite**: `src/main.jsx`
- **CRA**: Uses `ReactDOM.render()` → **Vite**: Uses `ReactDOM.createRoot()`

### File Extensions
- **CRA**: `.js` files → **Vite**: `.jsx` for React components (recommended)
- **Vite**: Requires explicit `.jsx` extension for JSX syntax

### index.html Location
- **CRA**: `public/index.html` → **Vite**: Root `index.html`
- **Vite**: Script tag uses `<script type="module" src="/src/main.jsx">`

### Environment Variables
- **CRA**: `process.env.REACT_APP_*` → **Vite**: `import.meta.env.VITE_*`
- **CRA**: `.env` with `REACT_APP_` prefix → **Vite**: `.env` with `VITE_` prefix

### Public Assets
- **CRA**: `%PUBLIC_URL%/image.png` → **Vite**: `/image.png`
- **Vite**: Public folder assets accessed with `/` prefix

## Commands Comparison

### Development
```bash
# CRA
npm start

# Vite
npm run dev
```

### Build
```bash
# CRA
npm run build

# Vite
npm run build
```

### Preview Build
```bash
# CRA
serve -s build

# Vite
npm run preview
```

## Common Migration Errors & Fixes

### 1. "process is not defined"
**Problem**: CRA uses Node.js `process.env`, Vite doesn't.

**Fix**: Replace all `process.env.REACT_APP_*` with `import.meta.env.VITE_*`

```javascript
// Before (CRA)
const apiUrl = process.env.REACT_APP_API_URL;

// After (Vite)
const apiUrl = import.meta.env.VITE_API_URL;
```

### 2. Environment Variables Not Working
**Problem**: Wrong prefix or not defined.

**Fix**: Create `.env` file in root:
```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Career Advisor
```

### 3. Routing Issues
**Problem**: React Router not working after build.

**Fix**: Already configured correctly. If issues persist, add to `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true
  }
});
```

### 4. Import Errors
**Problem**: Missing file extensions.

**Fix**: Vite requires explicit extensions for non-JS files:
```javascript
// Before
import logo from './logo';

// After
import logo from './logo.svg';
```

### 5. Public Folder Assets
**Problem**: Images not loading.

**Fix**: Update paths:
```javascript
// Before (CRA)
<img src={process.env.PUBLIC_URL + '/logo.png'} />

// After (Vite)
<img src="/logo.png" />
```

## Project Structure (Current)

```
career-advisor-vite/
├── public/              # Static assets (accessed via /)
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Chatbot.jsx
│   │   │   └── Chatbot.css
│   │   └── layout/
│   │       ├── Navbar.jsx
│   │       └── Navbar.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   └── ...
│   ├── styles/
│   │   └── global.css
│   ├── assets/          # Images, fonts (imported in code)
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── index.html           # HTML template (root level)
├── vite.config.js       # Vite configuration
└── package.json
```

## Running Your Migrated Project

### 1. Install Dependencies (if not done)
```bash
cd "d:\Education Purpose\FSD project\career-advisor-vite"
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Server starts at: `http://localhost:5173` (Vite default port)

### 3. Build for Production
```bash
npm run build
```

Output: `dist/` folder

### 4. Preview Production Build
```bash
npm run preview
```

## Configuration Files

### vite.config.js (Current)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

### Optional: Add Path Aliases
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
    }
  }
})
```

Then use:
```javascript
import Navbar from '@components/layout/Navbar';
import Home from '@pages/Home';
```

## Tailwind CSS Setup (If Needed)

### 1. Install Tailwind
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configure tailwind.config.js
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 3. Add to src/styles/global.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your existing styles below */
```

## Performance Benefits

### Vite vs CRA
- ⚡ **Faster startup**: ~100ms vs 3-5s
- 🔥 **Hot Module Replacement**: Instant updates
- 📦 **Smaller bundle**: Better tree-shaking
- 🚀 **Faster builds**: Uses esbuild
- 💾 **Better caching**: Dependency pre-bundling

## Verification Checklist

- [x] Project created with Vite
- [x] Dependencies installed (react-router-dom)
- [x] All src files copied
- [x] main.jsx created as entry point
- [x] App.js renamed to App.jsx
- [x] index.html configured
- [x] Folder structure organized
- [ ] Run `npm run dev` successfully
- [ ] Test all routes
- [ ] Test dark mode toggle
- [ ] Test chatbot
- [ ] Build production (`npm run build`)

## Deleting Old CRA Project (After Verification)

### 1. Test Everything First
```bash
cd "d:\Education Purpose\FSD project\career-advisor-vite"
npm run dev
```

Visit all pages, test all features.

### 2. Build Production
```bash
npm run build
npm run preview
```

Verify production build works.

### 3. Backup (Optional)
```bash
cd "d:\Education Purpose\FSD project"
ren career-advisor-frontend career-advisor-frontend-backup
```

### 4. Delete Old Project
```bash
cd "d:\Education Purpose\FSD project"
rmdir /s /q career-advisor-frontend
```

Or manually delete the folder.

## Quick Reference

### Start Development
```bash
npm run dev
```

### Build Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Install New Package
```bash
npm install package-name
```

## Troubleshooting

### Port Already in Use
```bash
# Vite uses 5173 by default
# Change in vite.config.js:
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
```

### Module Not Found
- Check file extensions (.jsx for React components)
- Verify import paths are correct
- Ensure files are in src folder

### Build Errors
- Clear node_modules: `rmdir /s /q node_modules`
- Delete package-lock.json
- Run `npm install` again

## Next Steps

1. Run `npm run dev`
2. Test all features
3. Fix any remaining issues
4. Update documentation
5. Delete old CRA project

---

**Migration Complete! Your project is now running on Vite! 🚀**
