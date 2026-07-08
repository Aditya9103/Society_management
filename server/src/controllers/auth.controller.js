import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import config from '../config/env.js';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

const sendTokenResponse = (admin, statusCode, res) => {
  const token = generateToken(admin._id);

  const isProd = config.env === 'production';
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        token: token,
      }
    });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }

    // Check for user
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    sendTokenResponse(admin, 200, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Register new admin (requires secret key)
// @route   POST /api/auth/register
// @access  Public
export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, secretKey } = req.body;

    // Verify secret key
    if (secretKey !== config.adminRegistrationSecret) {
      return res.status(403).json({ success: false, error: 'Invalid registration secret key' });
    }

    // Check if admin already exists
    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({ success: false, error: 'Admin with this email already exists' });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      role: 'superadmin' // Default to superadmin for now
    });

    sendTokenResponse(admin, 201, res);
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in admin
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Log admin out / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logoutAdmin = async (req, res, next) => {
  try {
    const isProd = config.env === 'production';
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
    });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
