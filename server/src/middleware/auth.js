import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import config from '../config/env.js';

export const protect = async (req, res, next) => {
  let token;

  // Check if token exists in cookies
  if (req.cookies && req.cookies.token && req.cookies.token !== 'none') {
    token = req.cookies.token;
  }
  // Fallback to Bearer token for mobile clients or tools if needed
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = await Admin.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Not authorized, token failed' });
  }
};
