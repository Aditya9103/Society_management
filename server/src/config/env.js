import 'dotenv/config';

const requiredVars = [
  'MONGO_URI',
];

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  mongoUri: process.env.MONGO_URI || process.env.MONGODB_URI,
  adminRegistrationSecret: process.env.ADMIN_REGISTRATION_SECRET || 'parapet_admin_setup_2026',
  
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback_secret_key_123',
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  },
  
  smtp: {
    host: process.env.SMTP_HOST || process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
    port: parseInt(process.env.SMTP_PORT || process.env.BREVO_SMTP_PORT, 10) || 587,
    user: process.env.SMTP_USER || process.env.BREVO_SMTP_USER,
    pass: process.env.SMTP_PASS || process.env.BREVO_SMTP_KEY,
    fromEmail: process.env.FROM_EMAIL || process.env.SENDER_EMAIL || 'noreply@parapet.com',
    fromName: process.env.FROM_NAME || 'Parapet Team',
  },

  notifications: {
    sales: process.env.SALES_NOTIFICATION_EMAIL || 'sales@parapet.com',
    support: process.env.SUPPORT_NOTIFICATION_EMAIL || 'support@parapet.com',
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  }
};

// Validate required variables
const missingVars = requiredVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(`\n❌ ERROR: Missing required environment variables:\n`);
  missingVars.forEach((varName) => console.error(`   - ${varName}`));
  console.error(`\nPlease set these in your .env file before starting the server.\n`);
  process.exit(1);
}

// Additional production security validations
if (config.env === 'production') {
  const prodErrors = [];
  
  if (config.jwt.secret === 'fallback_secret_key_123') {
    prodErrors.push('JWT_SECRET must be explicitly set to a secure string in production.');
  }
  
  if (config.adminRegistrationSecret === 'parapet_admin_setup_2026') {
    prodErrors.push('ADMIN_REGISTRATION_SECRET must be explicitly set to a secure string in production.');
  }

  if (config.clientUrl === 'http://localhost:5173') {
    prodErrors.push('CLIENT_URL must point to your production frontend domain (e.g., https://parapet.com).');
  }

  if (prodErrors.length > 0) {
    console.error(`\n🛑 SECURITY ERROR: Production Environment Check Failed:\n`);
    prodErrors.forEach((err) => console.error(`   - ${err}`));
    console.error(`\nPlease update your production environment variables before starting the server.\n`);
    process.exit(1);
  }
}

export default config;
