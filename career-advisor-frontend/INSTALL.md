# ⚡ Quick Installation Instructions

## Step 1: Install Dependencies

Open Command Prompt or PowerShell in this folder and run:

```bash
npm install
```

This will install:
- react
- react-dom
- react-router-dom
- react-scripts

Wait for installation to complete (may take 2-3 minutes).

## Step 2: Start the Application

```bash
npm start
```

The application will automatically open in your browser at:
**http://localhost:3000**

## Alternative: Use the Batch File

Simply double-click **start.bat** file in this folder.

## Troubleshooting

### If you get "npm not found" error:
1. Install Node.js from https://nodejs.org/
2. Restart your computer
3. Try again

### If port 3000 is already in use:
```bash
# Kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use a different port
set PORT=3001 && npm start
```

### If installation fails:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rmdir /s /q node_modules
del package-lock.json

# Reinstall
npm install
```

## That's It!

Once the server starts, you'll see:
```
Compiled successfully!

You can now view career-advisor-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

Open the browser and start exploring! 🚀

## First Time Setup Checklist

- [ ] Node.js installed (v14 or higher)
- [ ] Opened terminal in project folder
- [ ] Ran `npm install`
- [ ] Ran `npm start`
- [ ] Browser opened at localhost:3000
- [ ] Application loaded successfully

## Need More Help?

Check these files:
- **README.md** - Full documentation
- **SETUP_GUIDE.md** - Detailed guide
- **PROJECT_SUMMARY.md** - Project overview

---

**Happy Coding! 🎉**
