import User from '../models/User.js';

// Save career to user profile
export const saveCareer = async (req, res) => {
  try {
    const { careerId } = req.params;
    const userId = req.user.id; // From JWT middleware
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if already saved
    if (user.savedCareers && user.savedCareers.includes(careerId)) {
      return res.status(400).json({ message: 'Career already saved' });
    }
    
    // Add to saved careers
    user.savedCareers = user.savedCareers || [];
    user.savedCareers.push(careerId);
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Career saved successfully',
      savedCareers: user.savedCareers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove saved career
export const unsaveCareer = async (req, res) => {
  try {
    const { careerId } = req.params;
    const userId = req.user.id;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.savedCareers = user.savedCareers.filter(id => id.toString() !== careerId);
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Career removed from saved',
      savedCareers: user.savedCareers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get saved careers
export const getSavedCareers = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const user = await User.findById(userId).populate('savedCareers');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      success: true,
      count: user.savedCareers?.length || 0,
      data: user.savedCareers || []
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
