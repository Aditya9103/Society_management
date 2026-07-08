import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import PageWrapper from '../components/layout/PageWrapper';
import { useGetPostBySlugQuery } from '../store/api/contentApi';
import DOMPurify from 'dompurify';

export default function BlogPost() {
  const { slug } = useParams();
  const { data: postData, isLoading, isError } = useGetPostBySlugQuery(slug);

  if (isLoading) {
    return (
      <PageWrapper title="Loading... | Parapet">
        <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-surface-light text-text-primary-on-light">
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
          <h1 className="text-4xl font-bold text-[var(--text-on-light)] mb-6">Article not found</h1>
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
      title={`${post.title}`}
      description={post.excerpt}
      ogImage={post.coverImage}
    >
      <article className="min-h-screen pt-32 pb-24 bg-[var(--paper-200)] text-[var(--navy-950)] relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--navy-950) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        {/* Header */}
        <header className="container max-w-4xl mx-auto mb-16 relative z-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-on-light-muted)] hover:text-[var(--brass)] transition-colors mb-12">
            <ArrowLeft size={16} /> Back to all posts
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              <div className="mb-6 flex items-center gap-3">
                <span className="px-3 py-1 rounded-md bg-[var(--brass-300)]/10 text-[var(--brass-600)] text-xs font-bold uppercase tracking-wider border border-[var(--brass-300)]/20">
                  {post.category}
                </span>
                <span className="text-[var(--text-on-light-faint)] text-sm font-medium flex items-center gap-1.5">
                  <Clock size={14} /> {post.readTime} read
                </span>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--navy-950)] mb-8 leading-[1.15] tracking-tight"
              >
                {post.title}
              </motion.h1>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 pt-8 border-t border-[var(--line-on-light)]"
          >
            <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-white" 
                 onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(post.author.name) + '&background=random' }}/>
            <div>
              <p className="text-[var(--navy-950)] font-bold">{post.author.name}</p>
              <div className="flex items-center gap-2 text-sm text-[var(--text-on-light-muted)]">
                <span>{post.author.role || 'Author'}</span>
                <span>•</span>
                <time dateTime={post.createdAt}>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</time>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Cover Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="container max-w-5xl mx-auto mb-20 relative px-4 md:px-8"
        >
          <div className="aspect-video md:aspect-[21/9] max-h-[600px] rounded-[2rem] overflow-hidden bg-[var(--navy-950)] shadow-2xl relative z-10 border border-[var(--line-on-light)] group">
            {/* Blurred backdrop layer */}
            <div className="absolute inset-0 bg-cover bg-center blur-3xl opacity-60 scale-125" style={{ backgroundImage: `url(${post.coverImage || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab'})` }}></div>
            
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-full object-contain object-center relative z-10 transition-transform duration-1000 group-hover:scale-[1.03] drop-shadow-2xl"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';
              }}
            />
          </div>
          {/* Decorative background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--brass-500)] to-[var(--navy-700)] opacity-20 blur-3xl -z-10 rounded-[3rem] transform scale-95 translate-y-8"></div>
        </motion.div>

        {/* Article Content */}
        <div className="container max-w-4xl mx-auto flex flex-col items-center relative">
          
          {/* Social Share / Floating Sidebar (Desktop Only) */}
          <div className="hidden xl:flex flex-col gap-4 absolute -left-16 top-24 text-[var(--text-on-light-muted)]">
             <div className="w-10 h-10 rounded-full border border-[var(--line-on-light)] flex items-center justify-center hover:bg-white hover:text-[var(--brass)] hover:border-[var(--brass)] hover:shadow-md transition-all cursor-pointer bg-[var(--paper-200)] relative z-10 group" title="Share on Twitter">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
             </div>
             <div className="w-10 h-10 rounded-full border border-[var(--line-on-light)] flex items-center justify-center hover:bg-white hover:text-[var(--brass)] hover:border-[var(--brass)] hover:shadow-md transition-all cursor-pointer bg-[var(--paper-200)] relative z-10 group" title="Share on LinkedIn">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
             </div>
             <div className="w-px h-12 bg-[var(--line-on-light)] mx-auto mt-2"></div>
          </div>
          
          <div 
            className="prose prose-lg md:prose-xl prose-slate w-full max-w-[65ch] overflow-hidden
            
            /* Magazine Drop Cap for first paragraph */
            prose-p:first-of-type:first-letter:text-7xl prose-p:first-of-type:first-letter:font-bold prose-p:first-of-type:first-letter:text-[var(--brass)] prose-p:first-of-type:first-letter:mr-3 prose-p:first-of-type:first-letter:float-left prose-p:first-of-type:first-letter:leading-[0.8] prose-p:first-of-type:first-letter:mt-2
            
            /* Premium Headings */
            prose-headings:font-bold prose-headings:text-[var(--text-on-light)] prose-headings:tracking-tight
            prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:leading-tight
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
            
            /* Paragraphs - Premium Reading Experience */
            prose-p:text-[var(--text-on-light-muted)] prose-p:leading-[1.8] prose-p:mb-8 prose-p:text-[1.125rem] md:prose-p:text-[1.25rem] prose-p:font-medium
            
            /* Links */
            prose-a:text-[var(--brass-500)] prose-a:font-semibold prose-a:no-underline prose-a:border-b-2 prose-a:border-[var(--brass-300)] hover:prose-a:border-[var(--brass-500)] hover:prose-a:bg-[var(--brass-tint-10)] prose-a:transition-all
            
            /* Editorial Blockquotes */
            prose-blockquote:border-none prose-blockquote:pl-0 prose-blockquote:my-16 prose-blockquote:relative prose-blockquote:not-italic
            prose-blockquote:before:content-['\201C'] prose-blockquote:before:absolute prose-blockquote:before:-left-12 prose-blockquote:before:-top-8 prose-blockquote:before:text-[6rem] prose-blockquote:before:text-[var(--brass-300)] prose-blockquote:before:opacity-30 prose-blockquote:before:font-serif
            prose-blockquote:text-3xl prose-blockquote:leading-snug prose-blockquote:font-bold prose-blockquote:text-[var(--navy-900)]
            
            /* Bold Text */
            prose-strong:text-[var(--text-on-light)] prose-strong:font-extrabold
            
            /* Responsive Full-Bleed Images (Magazine Style) */
            prose-img:rounded-2xl md:prose-img:rounded-3xl prose-img:shadow-xl md:prose-img:shadow-2xl prose-img:my-10 md:prose-img:my-16 prose-img:w-full md:prose-img:w-[115%] md:prose-img:-ml-[7.5%] prose-img:border prose-img:border-[var(--line-on-light)] prose-img:max-w-none
            
            /* Lists */
            prose-ul:list-none prose-ul:pl-0 prose-li:relative prose-li:pl-8 prose-li:mb-4
            prose-ul>li:before:content-[''] prose-ul>li:before:absolute prose-ul>li:before:left-0 prose-ul>li:before:top-[12px] prose-ul>li:before:w-2.5 prose-ul>li:before:h-2.5 prose-ul>li:before:rounded-full prose-ul>li:before:bg-[var(--brass-500)]
            prose-ol:list-decimal prose-ol:pl-6 prose-li:text-[var(--text-on-light-muted)] prose-li:text-[1.125rem] md:prose-li:text-[1.25rem] prose-li:leading-[1.8]
            
            /* Code Blocks */
            prose-code:text-[var(--text-on-light)] prose-code:bg-[var(--surface-light-alt)] prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:font-mono prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none prose-code:border prose-code:border-[var(--line-on-light)]
            prose-pre:bg-[var(--surface-dark-deepest)] prose-pre:text-[var(--text-on-dark)] prose-pre:rounded-3xl prose-pre:shadow-2xl prose-pre:p-8 prose-pre:my-12 prose-pre:border prose-pre:border-[var(--line-on-dark)]"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content ? post.content.replace(/&nbsp;/g, ' ') : '') }}
          />
          
          {/* Author Bio Footer */}
          <div className="mt-24 w-full max-w-[70ch] p-8 md:p-10 rounded-3xl bg-[var(--surface-light-card)] border border-[var(--line-on-light)] shadow-xl shadow-[var(--line-on-light)] flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 relative overflow-hidden group">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--brass-300)] to-transparent opacity-10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-500"></div>
            
            <img src={post.author.avatar} alt={post.author.name} className="w-24 h-24 rounded-full object-cover shadow-md ring-4 ring-white" 
                 onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(post.author.name) + '&background=random' }}/>
            <div className="flex-1 relative z-10">
              <p className="text-xs font-bold text-[var(--brass-600)] uppercase tracking-widest mb-2">Written by</p>
              <h3 className="text-2xl font-bold text-[var(--text-on-light)] mb-1">{post.author.name}</h3>
              <p className="text-[var(--text-on-light-faint)] font-medium mb-4">{post.author.role}</p>
              <p className="text-sm text-[var(--text-on-light-muted)] leading-relaxed">
                Expert contributor for the Parapet Community. Dedicated to sharing insights, best practices, and guides on modernizing housing society management.
              </p>
            </div>
          </div>
        </div>

      </article>
    </PageWrapper>
  );
}
