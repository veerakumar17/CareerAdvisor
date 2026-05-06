import Career from '../models/Career.js';

// Get career recommendations based on user skills
export const getRecommendations = async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || skills.length === 0) {
      return res.status(400).json({ message: 'Skills are required' });
    }

    // Get all careers
    const careers = await Career.find();

    // Calculate match percentage for each career
    const recommendations = careers.map(career => {
      const requiredSkills = career.requiredSkills || [];
      const matchingSkills = skills.filter(skill => 
        requiredSkills.some(reqSkill => 
          reqSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(reqSkill.toLowerCase())
        )
      );

      const matchPercentage = requiredSkills.length > 0
        ? Math.round((matchingSkills.length / requiredSkills.length) * 100)
        : 0;

      return {
        career: {
          id: career._id,
          title: career.title,
          description: career.description,
          requiredSkills: career.requiredSkills,
          averageSalary: career.averageSalary,
          growthRate: career.growthRate
        },
        matchPercentage,
        matchingSkills,
        missingSkills: requiredSkills.filter(skill => !matchingSkills.includes(skill))
      };
    });

    // Sort by match percentage
    recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);

    // Return top 5 recommendations
    res.status(200).json({
      success: true,
      count: recommendations.length,
      data: recommendations.slice(0, 5)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
