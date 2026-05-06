import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Career from '../models/Career.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const careers = [
  {
    title: 'Software Engineer',
    description: 'Design, develop, and maintain software applications and systems',
    requiredSkills: ['JavaScript', 'Python', 'React', 'Node.js', 'Git', 'SQL'],
    averageSalary: '$80,000 - $150,000',
    growthRate: '22%',
    workType: 'Remote/Hybrid',
    education: 'Bachelor\'s in Computer Science'
  },
  {
    title: 'Data Scientist',
    description: 'Analyze complex data to help companies make better decisions',
    requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'TensorFlow', 'Data Visualization'],
    averageSalary: '$90,000 - $160,000',
    growthRate: '31%',
    workType: 'Hybrid/Office',
    education: 'Bachelor\'s/Master\'s in Data Science'
  },
  {
    title: 'UX/UI Designer',
    description: 'Create user-friendly and visually appealing interfaces',
    requiredSkills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'HTML/CSS', 'Design Systems'],
    averageSalary: '$60,000 - $120,000',
    growthRate: '13%',
    workType: 'Remote/Hybrid',
    education: 'Bachelor\'s in Design'
  },
  {
    title: 'Product Manager',
    description: 'Lead product development and strategy',
    requiredSkills: ['Strategy', 'Communication', 'Analytics', 'Leadership', 'Agile', 'Market Research'],
    averageSalary: '$100,000 - $180,000',
    growthRate: '18%',
    workType: 'Hybrid/Office',
    education: 'Bachelor\'s/MBA'
  },
  {
    title: 'DevOps Engineer',
    description: 'Manage infrastructure and deployment pipelines',
    requiredSkills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux', 'Python'],
    averageSalary: '$90,000 - $160,000',
    growthRate: '25%',
    workType: 'Remote/Hybrid',
    education: 'Bachelor\'s in Computer Science'
  }
];

const seedCareers = async () => {
  try {
    await Career.deleteMany();
    await Career.insertMany(careers);
    console.log('✅ Careers seeded successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding careers:', error);
    process.exit(1);
  }
};

seedCareers();
