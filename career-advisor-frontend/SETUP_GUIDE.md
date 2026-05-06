# Setup & Usage Guide

## Quick Start

### 1. Install Dependencies
Open terminal in the project directory and run:
```bash
npm install
```

This will install:
- React & React DOM
- React Router DOM
- All other required dependencies

### 2. Start Development Server
```bash
npm start
```

The application will open at `http://localhost:3000`

## Project Overview

### Pages & Routes

1. **Home (/)** 
   - Landing page with hero section
   - Features overview
   - Call-to-action buttons

2. **Login (/login)**
   - Email & password fields
   - Form validation
   - Password visibility toggle

3. **Signup (/signup)**
   - Registration form
   - Password confirmation
   - Validation messages

4. **Profile Setup (/profile-setup)**
   - Step 1: Education level
   - Step 2: Skills selection
   - Step 3: Subject ratings
   - Step 4: Interests selection
   - Auto-saves to localStorage

5. **Career Assessment (/assessment)**
   - 5 MCQ questions
   - Card-based options
   - Progress bar
   - Answer validation

6. **Results (/results)**
   - Top 3 career matches
   - Match percentages with animated bars
   - Reasons for recommendations
   - Links to detailed pages

7. **Dashboard (/dashboard)**
   - Profile summary
   - Top career matches
   - Skill gap overview
   - Progress tracking
   - Quick action cards

8. **Skill Gap Analyzer (/skill-gap)**
   - Career selector
   - Circular progress chart
   - Skills comparison (has vs missing)
   - Learning recommendations

9. **Career Detail (/career/:id)**
   - Career description
   - Salary & growth stats
   - Required skills
   - Education path
   - Timeline roadmap (4 years)

10. **Career Comparison (/compare)**
    - Side-by-side comparison
    - Salary, growth, education
    - Skills comparison
    - Difficulty & time to learn

### Components

#### Navbar
- Responsive navigation
- Dark mode toggle
- Mobile menu (hamburger)
- Sticky positioning

#### Chatbot
- Fixed bottom-right position
- Slide-in animation
- Quick question buttons
- Message history
- Send messages

## Features Demonstration

### Dark Mode
Click the moon/sun icon in the navbar to toggle between light and dark themes.

### Multi-Step Form
- Navigate through steps using Next/Back buttons
- Progress bar shows current step
- Form data auto-saves to localStorage
- Can resume from where you left off

### Career Assessment
- Select one option per question
- Progress bar updates automatically
- Submit button enabled only when all questions answered

### Skill Gap Analysis
- Select different careers from dropdown
- See circular progress chart
- Green checkmarks for skills you have
- Red crosses for missing skills
- Get personalized learning recommendations

### Career Roadmap
- Timeline visualization
- Year-by-year breakdown
- Tasks for each phase
- Responsive design (vertical on mobile)

### AI Chatbot
- Click chat icon at bottom-right
- Type questions or use quick buttons
- Chatbot responds with demo messages
- Close by clicking X or toggle button

## Customization

### Colors
Edit `src/styles/global.css`:
```css
:root {
  --primary: #6366f1;
  --secondary: #8b5cf6;
  --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Adding New Careers
Edit career data in respective page files:
- `src/pages/Results.js`
- `src/pages/SkillGapAnalyzer.js`
- `src/pages/CareerComparison.js`

### Modifying Questions
Edit `src/pages/CareerAssessment.js`:
```javascript
const questions = [
  {
    id: 1,
    question: 'Your question here?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4']
  }
];
```

## Responsive Design

### Desktop (> 768px)
- Full navigation menu
- Multi-column grids
- Side-by-side layouts
- Large fonts and spacing

### Mobile (< 768px)
- Hamburger menu
- Single column layouts
- Stacked elements
- Touch-friendly buttons
- Smaller fonts

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Performance Tips

1. **Lazy Loading**: Add code splitting for routes
2. **Image Optimization**: Use optimized images
3. **Caching**: Enable service workers
4. **Minification**: Use production build

## Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port
set PORT=3001 && npm start
```

### Module Not Found
```bash
npm install
# or
npm install --force
```

### Styling Issues
- Clear browser cache
- Check dark mode toggle
- Verify CSS imports

## Production Build

```bash
npm run build
```

Creates optimized build in `build/` folder.

### Deploy to Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `build`

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## Testing

### Manual Testing Checklist
- [ ] All routes accessible
- [ ] Forms validate correctly
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] Chatbot opens/closes
- [ ] Navigation works
- [ ] Buttons clickable
- [ ] Data persists (localStorage)

## Next Steps

1. **Backend Integration**
   - Create REST API
   - Connect to database
   - Implement authentication

2. **AI Integration**
   - Connect to AI/ML model
   - Real career recommendations
   - Chatbot with NLP

3. **Additional Features**
   - Resume upload
   - Email notifications
   - Social sharing
   - Advanced filtering

## Support

For issues:
1. Check console for errors (F12)
2. Verify all dependencies installed
3. Check Node.js version (v14+)
4. Review error messages

---

**Happy Coding! 🚀**
