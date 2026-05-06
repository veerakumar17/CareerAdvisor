# AI-Based Career & Education Advisor - Frontend

A modern, responsive React.js application for career guidance and education planning with AI-powered recommendations.

## 🚀 Features

### Core Pages
- **Home Page**: Attractive landing with features overview
- **Authentication**: Login & Signup with validation
- **Profile Setup**: Multi-step form with progress tracking
- **Career Assessment**: Interactive MCQ questionnaire
- **Results**: Top 3 career recommendations with match percentages
- **Dashboard**: Profile summary and progress tracking
- **Skill Gap Analyzer**: Identify missing skills with recommendations
- **Career Detail**: Comprehensive career information with roadmap
- **Career Comparison**: Side-by-side career comparison

### Extra Features
- 🤖 AI Chatbot (fixed bottom-right)
- 🌙 Dark Mode Toggle
- 📱 Fully Responsive Design
- ✨ Smooth Animations & Transitions
- 🎨 Modern Card-Based UI
- 📊 Progress Bars & Charts
- 🔄 Auto-save Form State

## 📁 Project Structure

```
career-advisor-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Chatbot.js
│   │   │   └── Chatbot.css
│   │   ├── layout/
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── forms/
│   │   └── charts/
│   ├── pages/
│   │   ├── Home.js & Home.css
│   │   ├── Login.js & Signup.js
│   │   ├── Auth.css
│   │   ├── ProfileSetup.js & ProfileSetup.css
│   │   ├── CareerAssessment.js & CareerAssessment.css
│   │   ├── Results.js & Results.css
│   │   ├── Dashboard.js & Dashboard.css
│   │   ├── SkillGapAnalyzer.js & SkillGapAnalyzer.css
│   │   ├── CareerDetail.js & CareerDetail.css
│   │   ├── CareerComparison.js & CareerComparison.css
│   ├── styles/
│   │   └── global.css
│   ├── assets/
│   ├── utils/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. **Navigate to project directory**
```bash
cd "d:\Education Purpose\FSD project\career-advisor-frontend"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

4. **Open browser**
Navigate to `http://localhost:3000`

## 🎨 Design Features

### Color Scheme
- Primary: Blue/Purple Gradient (#667eea → #764ba2)
- Success: Green (#10b981)
- Danger: Red (#ef4444)
- Dark Mode Support

### UI Components
- Reusable button styles
- Card-based layouts
- Interactive form elements
- Animated progress bars
- Circular progress indicators
- Timeline roadmaps
- Responsive navigation

## 📱 Responsive Design

- Mobile-first approach
- Breakpoint: 768px
- Flexible grid layouts
- Touch-friendly interactions

## 🔧 Technologies Used

- **React.js** - Frontend framework
- **React Router** - Navigation
- **CSS3** - Styling with animations
- **LocalStorage** - Form state persistence

## 📄 Available Routes

- `/` - Home Page
- `/login` - Login Page
- `/signup` - Signup Page
- `/profile-setup` - Profile Setup
- `/assessment` - Career Assessment
- `/results` - Assessment Results
- `/dashboard` - User Dashboard
- `/skill-gap` - Skill Gap Analyzer
- `/career/:id` - Career Details
- `/compare` - Career Comparison

## 🎯 Key Features Implementation

### Multi-Step Form
- Progress bar tracking
- Auto-save to localStorage
- Step validation
- Back/Next navigation

### Career Assessment
- MCQ with card-based options
- Progress tracking
- Answer validation
- Smooth transitions

### Skill Gap Analysis
- Circular progress chart
- Skills comparison (has/missing)
- Personalized recommendations
- Career-specific analysis

### Career Roadmap
- Timeline visualization
- Year-by-year breakdown
- Task lists per phase
- Responsive design

### AI Chatbot
- Fixed bottom-right position
- Slide-in animation
- Quick question buttons
- Message history
- Real-time responses

## 🚀 Build for Production

```bash
npm run build
```

Creates optimized production build in `build/` folder.

## 📝 Future Enhancements

- Backend API integration
- Real AI/ML model integration
- Resume upload & parsing
- Advanced filtering options
- User authentication with JWT
- Database integration
- Email notifications
- Social media sharing

## 👨‍💻 Development

This project is built for a Final Year Full Stack Development project presentation.

### Best Practices Followed
- Component reusability
- Clean code structure
- Responsive design
- Accessibility considerations
- Performance optimization
- Modern ES6+ syntax

## 📞 Support

For issues or questions, please refer to the project documentation or contact the development team.

---

**Built with ❤️ for Career Guidance**
