import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true, // Markdown or HTML
    },
    coverImage: {
      type: String,
      default: '/images/blog-default.jpg',
    },
    author: {
      name: { type: String, required: true },
      role: { type: String, default: 'Parapet Team' },
      avatar: { type: String, default: '/images/avatar-default.jpg' }
    },
    category: {
      type: String,
      enum: ['Guides & Tutorials', 'Best Practices', 'Case Studies', 'Product Updates', 'Industry Insights', 'Company News', 'Customer Stories', 'Technology'],
      default: 'Product Updates',
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    isPublished: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
