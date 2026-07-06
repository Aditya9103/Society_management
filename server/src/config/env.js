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

// Additional validations
if (config.env === 'production' && config.jwt.secret === 'fallback_secret_key_123') {
  console.warn(`\n⚠️ WARNING: You are running in PRODUCTION using the fallback JWT_SECRET.`);
  console.warn(`   Please set a strong JWT_SECRET in your .env file.\n`);
}

export default config;
