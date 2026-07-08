import Post from '../models/Post.js';

export const getPosts = async (req, res, next) => {
  try {
    const filter = { isPublished: true };
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const posts = await Post.find(filter).sort({ createdAt: -1 });
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
export const getAdminPosts = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    next(error);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    // Handle unique slug error specifically if needed
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'Slug already exists. Please choose a different title or slug.' });
    }
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, error: 'Slug already exists. Please choose a different title or slug.' });
    }
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
