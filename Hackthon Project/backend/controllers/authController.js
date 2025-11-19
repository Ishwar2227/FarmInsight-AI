const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

/**
 * Handles user registration with validation and hashing.
 */
const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { name, email, password, location, cropsGrown = [] } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      location,
      cropsGrown,
    });

    return res.status(201).json({
      success: true,
      data: {
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          location: user.location,
          cropsGrown: user.cropsGrown,
          createdAt: user.createdAt,
        },
      },
      message: 'Registration successful',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles user login, returning a JWT when credentials match.
 */
const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    return res.json({
      success: true,
      data: {
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          location: user.location,
          cropsGrown: user.cropsGrown,
          createdAt: user.createdAt,
        },
      },
      message: 'Login successful',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Returns the authenticated user's profile.
 */
const getProfile = async (req, res) => {
  res.json({ success: true, data: req.user });
};

module.exports = { registerUser, loginUser, getProfile };

