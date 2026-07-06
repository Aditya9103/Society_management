import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../utils/cn';
import PageWrapper from '../components/layout/PageWrapper';
import CTASection from '../components/sections/CTASection';
import { useGetPostsQuery } from '../store/api/contentApi';

export default function Blog() {
  const [category, setCategory] = useState('');
  const { data: postsData, isLoading } = useGetPostsQuery(category ? { category } : undefined);
  
  const categories = ['All', 'Product Updates', 'Best Practices', 'Company News', 'Case Studies'];

  return (
    <PageWrapper 
      title="Blog | Parapet"
      description="Insights, updates, and best practices for modern society management."
    >
      <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
        <div className="container">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
            >
              The Parapet <span className="text-[var(--brass)]">Journal</span>.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-slate-600 leading-relaxed font-medium"
            >
              Latest news, product updates, and deep-dives into modern real estate management.
            </motion.p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat === 'All' ? '' : cat)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-bold transition-all",
                  (category === cat || (!category && cat === 'All'))
                    ? "bg-[var(--ink)] text-white shadow-lg"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin mb-4" />
              <p className="font-medium">Loading posts...</p>
            </div>
          ) : postsData?.data?.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-xl text-slate-500 font-medium">No posts found for this category.</p>
              <button onClick={() => setCategory('')} className="mt-4 text-[var(--brass)] font-bold hover:underline">
                View all posts
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {postsData?.data?.map((post, idx) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <Link to={`/blog/${post.slug}`} className="block relative h-56 overflow-hidden bg-slate-100">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-slate-900 shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </Link>
                  
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                      <time dateTime={post.createdAt}>{format(new Date(post.createdAt), 'MMM d, yyyy')}</time>
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
                    </div>
                    
                    <Link to={`/blog/${post.slug}`}>
                      <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-[var(--brass)] transition-colors leading-tight">
                        {post.title}
                      </h2>
                    </Link>
                    
                    <p className="text-slate-600 leading-relaxed font-medium mb-8 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-100">
                      <div className="flex items-center gap-3">
                        <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full object-cover bg-slate-200" 
                             onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(post.author.name) + '&background=random' }}/>
                        <span className="text-sm font-bold text-slate-900">{post.author.name}</span>
                      </div>
                      <Link to={`/blog/${post.slug}`} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[var(--brass)] group-hover:text-white transition-colors">
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <CTASection />
    </PageWrapper>
  );
}
