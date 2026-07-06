import Post from '../models/Post.js';

export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ isPublished: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    next(error);
  }
};

export const getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug, isPublished: true });
    
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// Admin endpoints
export const createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};
