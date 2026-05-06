import Career from '../models/Career.js';

// Get all careers with search, filter, and pagination
export const getCareers = async (req, res) => {
  try {
    const { search, skill, growth, page = 1, limit = 10 } = req.query;
    
    // Build query
    let query = {};
    
    // Search by title
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    // Filter by skill
    if (skill) {
      query.requiredSkills = { $in: [new RegExp(skill, 'i')] };
    }
    
    // Filter by growth rate
    if (growth) {
      query.growthRate = { $regex: growth, $options: 'i' };
    }
    
    // Pagination
    const skip = (page - 1) * limit;
    const total = await Career.countDocuments(query);
    const careers = await Career.find(query).limit(parseInt(limit)).skip(skip);
    
    res.status(200).json({
      success: true,
      count: careers.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: careers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single career
export const getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }

    res.status(200).json({
      success: true,
      data: career
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.status(500).json({ message: error.message });
  }
};

// Match careers with user skills
export const matchCareers = async (req, res) => {
  try {
    const { userSkills } = req.body;
    
    if (!userSkills || !Array.isArray(userSkills)) {
      return res.status(400).json({ message: 'userSkills array is required' });
    }
    
    const careers = await Career.find();
    
    const matchedCareers = careers.map(career => {
      const requiredSkills = career.requiredSkills || [];
      
      // Calculate matching skills
      const matchingSkills = userSkills.filter(userSkill =>
        requiredSkills.some(reqSkill =>
          reqSkill.toLowerCase().includes(userSkill.toLowerCase()) ||
          userSkill.toLowerCase().includes(reqSkill.toLowerCase())
        )
      );
      
      // Calculate missing skills
      const missingSkills = requiredSkills.filter(reqSkill =>
        !userSkills.some(userSkill =>
          reqSkill.toLowerCase().includes(userSkill.toLowerCase()) ||
          userSkill.toLowerCase().includes(reqSkill.toLowerCase())
        )
      );
      
      // Calculate match percentage
      const matchPercentage = requiredSkills.length > 0
        ? Math.round((matchingSkills.length / requiredSkills.length) * 100)
        : 0;
      
      return {
        career: {
          _id: career._id,
          title: career.title,
          description: career.description,
          requiredSkills: career.requiredSkills,
          averageSalary: career.averageSalary,
          growthRate: career.growthRate,
          workType: career.workType,
          education: career.education
        },
        matchPercentage,
        matchingSkills,
        missingSkills
      };
    });
    
    // Sort by match percentage (highest first)
    matchedCareers.sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    res.status(200).json({
      success: true,
      count: matchedCareers.length,
      data: matchedCareers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create career (for seeding)
export const createCareer = async (req, res) => {
  try {
    const career = await Career.create(req.body);
    res.status(201).json({
      success: true,
      data: career
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
