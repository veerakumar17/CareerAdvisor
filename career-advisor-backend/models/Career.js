import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Career title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  requiredSkills: [{
    type: String,
    trim: true
  }],
  averageSalary: {
    type: String,
    default: 'Not specified'
  },
  growthRate: {
    type: String,
    default: 'Not specified'
  },
  workType: {
    type: String,
    default: 'Hybrid'
  },
  education: {
    type: String,
    default: 'Bachelor\'s degree'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Career = mongoose.model('Career', careerSchema);

export default Career;
