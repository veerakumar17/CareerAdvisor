import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

// Register user
export const register = async (req, res) => {
  try {
    const { name, email, password, skills, interests, education } = req.body;

    // Debug logging
    console.log('📝 Registration Request Body:', req.body);
    console.log('✅ Extracted Skills:', skills);
    console.log('✅ Extracted Interests:', interests);
    console.log('✅ Extracted Education:', education);

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user with all fields
    const user = await User.create({ 
      name, 
      email, 
      password,
      skills: skills || [],
      interests: interests || [],
      education: education || 'undergraduate'
    });

    console.log('💾 User Created in DB:', {
      id: user._id,
      skills: user.skills,
      interests: user.interests,
      education: user.education
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        skills: user.skills || [],
        interests: user.interests || [],
        education: user.education
      },
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        skills: user.skills || [],
        interests: user.interests || [],
        education: user.education
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};
