import { v2 as cloudinary } from 'cloudinary';
import config from './env.js';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName || 'demo',
  api_key: config.cloudinary.apiKey || 'demo',
  api_secret: config.cloudinary.apiSecret || 'demo',
});

export default cloudinary;
