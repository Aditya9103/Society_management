import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    workEmail: {
      type: String,
      required: [true, 'Work Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone Number is required'],
      match: [/^\d{10}$/, 'Please fill a valid phone number'],
      trim: true,
    },
    societyName: {
      type: String,
      required: [true, 'Society Name is required'],
      trim: true,
    },
    unitCount: {
      type: Number,
      min: [1, 'Unit count must be at least 1'],
    },
    preferredDate: {
      type: Date,
    },
    source: {
      type: String,
      enum: ['book-demo', 'pricing-cta', 'home-cta', 'features-cta'],
      default: 'book-demo',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'converted', 'lost'],
      default: 'new',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
