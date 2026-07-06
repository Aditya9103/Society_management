import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import PageWrapper from '../components/layout/PageWrapper';
import { useGetPostBySlugQuery } from '../store/api/contentApi';

export default function BlogPost() {
  const { slug } = useParams();
  const { data: postData, isLoading, isError } = useGetPostBySlugQuery(slug);

  if (isLoading) {
    return (
      <PageWrapper title="Loading... | Parapet">
        <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-tx-secondary font-medium bg-transparent">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p className="font-medium">Loading article...</p>
        </div>
      </PageWrapper>
    );
  }

  if (isError || !postData?.data) {
    return (
      <PageWrapper title="Post Not Found | Parapet">
        <div className="min-h-screen pt-40 pb-24 container text-center">
          <h1 className="text-4xl font-bold text-tx-primary mb-6">Article not found</h1>
          <Link to="/blog" className="inline-flex items-center gap-2 text-[var(--brass)] font-bold hover:underline">
            <ArrowLeft size={18} /> Back to Blog
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const post = postData.data;

  return (
    <PageWrapper 
      title={`${post.title} | Parapet Blog`}
      description={post.excerpt}
    >
      <article className="min-h-screen pt-32 pb-24 bg-bg-app">
        
        {/* Header */}
        <header className="container max-w-4xl mx-auto mb-16 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-tx-secondary font-medium hover:text-[var(--brass)] transition-colors mb-10">
            <ArrowLeft size={16} /> Back to all posts
          </Link>
          
          <div className="mb-6">
            <span className="px-4 py-1.5 rounded-full bg-bd-subtle text-sm font-bold text-tx-primary shadow-sm inline-block">
              {post.category}
            </span>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-tx-primary mb-8 leading-[1.15]"
          >
            {post.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-8 text-sm font-bold text-tx-secondary font-medium uppercase tracking-wider"
          >
            <div className="flex items-center gap-2">
              <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full object-cover bg-bd-subtle" 
                   onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(post.author.name) + '&background=random' }}/>
              <span className="text-tx-primary">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <time dateTime={post.createdAt}>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
          </motion.div>
        </header>

        {/* Cover Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="container max-w-5xl mx-auto mb-20"
        >
          <div className="aspect-[21/9] rounded-[2rem] overflow-hidden bg-bd-subtle shadow-2xl">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';
              }}
            />
          </div>
        </motion.div>

        {/* Article Content */}
        <div className="container max-w-3xl mx-auto">
          {/* Note: In a real app we'd parse markdown here. For now we use basic HTML or plain text styling. */}
          <div className="prose prose-lg prose-slate prose-headings:font-bold prose-headings:text-tx-primary prose-a:text-[var(--brass)] hover:prose-a:text-[#A8742D] max-w-none font-medium leading-relaxed"
               dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
          />
          
          {/* Author Bio Footer */}
          <div className="mt-20 p-8 rounded-3xl bg-bg-surface border border-bd-subtle shadow-sm flex items-center gap-6">
            <img src={post.author.avatar} alt={post.author.name} className="w-20 h-20 rounded-full object-cover bg-bg-subtle" 
                 onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(post.author.name) + '&background=random' }}/>
            <div>
              <p className="text-xs font-bold text-tx-secondary font-medium uppercase tracking-wider mb-1">Written by</p>
              <h3 className="text-xl font-bold text-tx-primary">{post.author.name}</h3>
              <p className="text-tx-secondary font-medium">{post.author.role}</p>
            </div>
          </div>
        </div>

      </article>
    </PageWrapper>
  );
}
