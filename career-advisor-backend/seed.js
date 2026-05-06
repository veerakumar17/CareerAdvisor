import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Career from './models/Career.js';

dotenv.config();

const careers = [
  {
    title: 'Full Stack Developer',
    description: 'Design and develop both frontend and backend of web applications using modern frameworks and technologies.',
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'HTML', 'CSS', 'REST API'],
    averageSalary: '$85,000 - $130,000',
    growthRate: '22%',
    workType: 'Hybrid',
    education: "Bachelor's degree in Computer Science"
  },
  {
    title: 'Data Scientist',
    description: 'Analyze complex data sets using statistical methods and machine learning to drive business decisions.',
    requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'TensorFlow', 'Pandas', 'Data Visualization'],
    averageSalary: '$95,000 - $150,000',
    growthRate: '36%',
    workType: 'Remote',
    education: "Master's degree in Data Science or related field"
  },
  {
    title: 'Cloud Architect',
    description: 'Design and implement cloud infrastructure solutions using AWS, Azure, or Google Cloud Platform.',
    requiredSkills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'Linux', 'Networking', 'Security'],
    averageSalary: '$120,000 - $180,000',
    growthRate: '28%',
    workType: 'Hybrid',
    education: "Bachelor's degree with cloud certifications"
  },
  {
    title: 'UI/UX Designer',
    description: 'Create intuitive and visually appealing user interfaces and experiences for digital products.',
    requiredSkills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research', 'Wireframing', 'HTML', 'CSS'],
    averageSalary: '$70,000 - $110,000',
    growthRate: '18%',
    workType: 'Hybrid',
    education: "Bachelor's degree in Design or related field"
  },
  {
    title: 'DevOps Engineer',
    description: 'Automate and streamline software development and deployment processes using CI/CD pipelines.',
    requiredSkills: ['Jenkins', 'Docker', 'Kubernetes', 'Git', 'Linux', 'Python', 'AWS', 'Monitoring'],
    averageSalary: '$95,000 - $145,000',
    growthRate: '25%',
    workType: 'Remote',
    education: "Bachelor's degree in Computer Science"
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Protect organizational systems and networks from cyber threats and security breaches.',
    requiredSkills: ['Network Security', 'Penetration Testing', 'Firewall', 'SIEM', 'Incident Response', 'Python', 'Linux'],
    averageSalary: '$80,000 - $130,000',
    growthRate: '33%',
    workType: 'On-site',
    education: "Bachelor's degree with security certifications"
  },
  {
    title: 'Mobile App Developer',
    description: 'Build native and cross-platform mobile applications for iOS and Android devices.',
    requiredSkills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'REST API', 'Mobile UI'],
    averageSalary: '$80,000 - $125,000',
    growthRate: '21%',
    workType: 'Hybrid',
    education: "Bachelor's degree in Computer Science"
  },
  {
    title: 'AI/ML Engineer',
    description: 'Develop and deploy artificial intelligence and machine learning models for real-world applications.',
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP', 'Computer Vision', 'Mathematics'],
    averageSalary: '$110,000 - $170,000',
    growthRate: '40%',
    workType: 'Remote',
    education: "Master's degree in AI/ML or related field"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing careers
    await Career.deleteMany({});
    console.log('🗑️  Cleared existing careers');

    // Insert new careers
    const insertedCareers = await Career.insertMany(careers);
    console.log(`✅ Successfully inserted ${insertedCareers.length} careers`);

    console.log('\n📊 Careers added:');
    insertedCareers.forEach((career, index) => {
      console.log(`${index + 1}. ${career.title} - ${career.growthRate} growth`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
