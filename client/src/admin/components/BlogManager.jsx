import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Edit, Trash2, Plus } from 'lucide-react';
import { useGetAdminPostsQuery, useDeletePostMutation } from '../../store/api/contentApi';
import BlogEditor from './BlogEditor';

export default function BlogManager() {
  const { data: postsData, isLoading } = useGetAdminPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const [editingPost, setEditingPost] = useState(null);
  const [isCreating, setIsCreating] = useState(() => {
    return sessionStorage.getItem('blog_is_creating') === 'true';
  });

  useEffect(() => {
    sessionStorage.setItem('blog_is_creating', isCreating);
  }, [isCreating]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id).unwrap();
      } catch (err) {
        alert('Failed to delete post: ' + err.message);
      }
    }
  };

  if (isCreating || editingPost) {
    return (
      <BlogEditor
        post={editingPost}
        onClose={() => {
          setIsCreating(false);
          setEditingPost(null);
        }}
      />
    );
  }

  return (
    <div className="bg-white border border-[var(--line-on-light)] rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-[var(--line-on-light)] flex justify-between items-center bg-[var(--surface-light)]">
        <h2 className="text-lg font-bold text-[var(--text-on-light)]">Manage Posts</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-[var(--navy-950)] font-bold rounded-lg hover:shadow-md transition-all"
        >
          <Plus size={18} /> New Post
        </button>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-[var(--text-on-light-faint)]">Loading posts...</div>
      ) : postsData?.data?.length === 0 ? (
        <div className="p-12 text-center text-[var(--text-on-light-faint)] font-medium">No posts found. Create your first post!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--surface-light)] border-b border-[var(--line-on-light)]">
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-on-light-faint)] uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-on-light-faint)] uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-on-light-faint)] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-on-light-faint)] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-[var(--text-on-light-faint)] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {postsData?.data?.map((post) => (
                <tr key={post._id} className="hover:bg-[var(--surface-light)]/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-[var(--text-on-light)]">{post.title}</p>
                    <p className="text-xs text-[var(--text-on-light-faint)] mt-0.5">/{post.slug}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-on-light-muted)]">
                    {post.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded uppercase tracking-wide ${post.isPublished ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {post.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-on-light-muted)]">
                    {format(new Date(post.createdAt), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => setEditingPost(post)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mr-2 inline-flex"
                      title="Edit Post"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors inline-flex"
                      title="Delete Post"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
