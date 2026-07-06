import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import config from './config/env.js';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

import leadsRoutes from './routes/leads.routes.js';
import contactRoutes from './routes/contact.routes.js';
import contentRoutes from './routes/content.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// ─── Security & Rate Limiting ──────────────────────────────────
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

// Allowed origins (split by comma if multiple are provided in env)
const allowedOrigins = config.clientUrl.split(',').map(url => url.trim());

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests) 
    // or requests matching our allowed origins
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ─── Logging ───────────────────────────────────────────────────
if (config.env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ─── Body parsing ───────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// ─── Health check ───────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// ─── API Routes ─────────────────────────────────────────────────
app.use('/api/leads', leadsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/auth', authRoutes);

// ─── 404 handler ───────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// ─── Error handler ──────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ──────────────────────────────────────────────
let server;

connectDB().then(() => {
  server = app.listen(config.port, () => {
    console.log(`✅ Parapet server running on port ${config.port} in ${config.env} mode`);
  });
});

// ─── Graceful Shutdown ─────────────────────────────────────────
const shutdown = () => {
  console.log('🛑 Received kill signal, shutting down gracefully');
  if (server) {
    server.close(() => {
      console.log('🛑 Closed out remaining connections');
      mongoose.connection.close(false, () => {
        console.log('🛑 Mongo connection closed');
        process.exit(0);
      });
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
