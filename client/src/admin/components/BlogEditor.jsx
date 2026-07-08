import { useState, useRef, useMemo, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { ArrowLeft, Upload, Save, Loader2, Image as ImageIcon } from 'lucide-react';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
  useUploadImageMutation
} from '../../store/api/contentApi';

const DRAFT_KEY = 'parapet_blog_draft';

export default function BlogEditor({ post, onClose }) {
  const [createPost, { isLoading: isCreating }] = useCreatePostMutation();
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();

  const [formData, setFormData] = useState(() => {
    if (post) {
      return {
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        coverImage: post.coverImage || '',
        category: post.category || 'Product Updates',
        readTime: post.readTime || '5 min read',
        isPublished: post.isPublished || false,
        authorName: post.author?.name || 'Admin',
        authorRole: post.author?.role || 'Parapet Team'
      };
    }

    // Load from local storage if creating a new post
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        return JSON.parse(savedDraft);
      } catch (e) {
        console.error('Failed to parse draft', e);
      }
    }

    return {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '',
      category: 'Product Updates',
      readTime: '5 min read',
      isPublished: false,
      authorName: 'Admin',
      authorRole: 'Parapet Team'
    };
  });

  // Auto-save draft to local storage
  useEffect(() => {
    if (!post) {
      const timeoutId = setTimeout(() => {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
      }, 1000); // Debounce save by 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [formData, post]);

  const [editorMode, setEditorMode] = useState('visual'); // 'visual' | 'html'
  const [error, setError] = useState('');

  const quillRef = useRef(null);

  // Custom image handler for ReactQuill
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        try {
          const res = await uploadImage(formData).unwrap();
          if (res.success) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', res.url);
          }
        } catch (err) {
          alert('Image upload failed');
        }
      }
    };
  };

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    try {
      const res = await uploadImage(data).unwrap();
      if (res.success) {
        setFormData(prev => ({ ...prev, coverImage: res.url }));
      }
    } catch (err) {
      alert('Cover image upload failed');
    }
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: type === 'checkbox' ? checked : value };
      if (name === 'title' && !post) {
        newData.slug = generateSlug(value);
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      content: formData.content,
      coverImage: formData.coverImage || '/images/blog-default.jpg',
      category: formData.category,
      readTime: formData.readTime,
      isPublished: formData.isPublished,
      author: {
        name: formData.authorName,
        role: formData.authorRole
      }
    };

    try {
      if (post) {
        await updatePost({ id: post._id, ...payload }).unwrap();
      } else {
        await createPost(payload).unwrap();
        // Clear draft on successful creation
        localStorage.removeItem(DRAFT_KEY);
      }
      onClose();
    } catch (err) {
      setError(err.data?.error || 'An error occurred while saving.');
    }
  };

  return (
    <div className="bg-white border border-[var(--line-on-light)] rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-[var(--line-on-light)] flex justify-between items-center bg-[var(--surface-light)]">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-[var(--text-on-light-muted)]">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-bold text-[var(--text-on-light)]">
              {post ? 'Edit Post' : 'Create New Post'}
            </h2>
            {!post && (
              <p className="text-xs text-[var(--text-on-light-faint)] font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Auto-saving draft
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isCreating || isUpdating}
          className="flex items-center gap-2 px-6 py-2 bg-[var(--accent)] text-[var(--navy-950)] font-bold rounded-lg hover:shadow-md transition-all disabled:opacity-50"
        >
          {isCreating || isUpdating ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {post ? 'Update' : 'Publish'}
        </button>
      </div>

      <div className="p-8 overflow-y-auto max-h-[calc(100vh-200px)]">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-bold text-[var(--text-on-light)] mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-[var(--line-on-light)] rounded-xl outline-none focus:border-[var(--brass)] text-[var(--text-on-light)] font-medium text-lg"
                placeholder="Post Title"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[var(--text-on-light)] mb-2">Excerpt (Summary)</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 border border-[var(--line-on-light)] rounded-xl outline-none focus:border-[var(--brass)] text-[var(--text-on-light)] resize-none"
                placeholder="A brief summary of the post..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-[var(--text-on-light)]">Content</label>
                <div className="flex bg-[var(--surface-light-alt)] rounded-lg p-1 border border-[var(--line-on-light)]">
                  <button
                    type="button"
                    onClick={() => setEditorMode('visual')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${editorMode === 'visual' ? 'bg-white text-[var(--navy-950)] shadow-sm' : 'text-[var(--text-on-light-muted)] hover:text-[var(--text-on-light)]'}`}
                  >
                    Visual Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorMode('html')}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-colors ${editorMode === 'html' ? 'bg-white text-[var(--navy-950)] shadow-sm' : 'text-[var(--text-on-light-muted)] hover:text-[var(--text-on-light)]'}`}
                  >
                    Split HTML
                  </button>
                </div>
              </div>

              {editorMode === 'visual' ? (
                <div className="border border-[var(--line-on-light)] rounded-xl overflow-hidden h-[500px] flex flex-col">
                  <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={formData.content}
                    onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                    modules={modules}
                    className="flex-1 overflow-y-auto"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 border border-[var(--line-on-light)] rounded-xl overflow-hidden h-[500px] bg-white">
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    className="w-full h-full p-4 font-mono text-sm resize-none outline-none border-r border-[var(--line-on-light)] bg-slate-50 text-slate-800"
                    placeholder="<h2>Write your raw HTML here...</h2>"
                  />
                  <div 
                    className="w-full h-full p-4 overflow-y-auto prose prose-sm prose-slate max-w-none break-words"
                    dangerouslySetInnerHTML={{ __html: formData.content }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="col-span-1 space-y-6">
            <div className="p-6 bg-[var(--surface-light)] rounded-xl border border-[var(--line-on-light)]">
              <h3 className="font-bold text-[var(--text-on-light)] mb-4 border-b border-[var(--line-on-light)] pb-2">Publishing Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[var(--text-on-light)]">Is Published?</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[var(--text-on-light)] mb-1">Slug (URL)</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[var(--line-on-light)] rounded-lg outline-none focus:border-[var(--brass)] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[var(--text-on-light)] mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[var(--line-on-light)] rounded-lg outline-none focus:border-[var(--brass)] text-sm"
                  >
                    <option value="Guides & Tutorials">Guides & Tutorials</option>
                    <option value="Best Practices">Best Practices</option>
                    <option value="Case Studies">Case Studies</option>
                    <option value="Product Updates">Product Updates</option>
                    <option value="Industry Insights">Industry Insights</option>
                    <option value="Company News">Company News</option>
                    <option value="Customer Stories">Customer Stories</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[var(--text-on-light)] mb-1">Read Time</label>
                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[var(--line-on-light)] rounded-lg outline-none focus:border-[var(--brass)] text-sm"
                    placeholder="e.g. 5 min read"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-[var(--surface-light)] rounded-xl border border-[var(--line-on-light)]">
              <h3 className="font-bold text-[var(--text-on-light)] mb-4 border-b border-[var(--line-on-light)] pb-2">Cover Image</h3>

              {formData.coverImage && (
                <img src={formData.coverImage} alt="Cover" className="w-full h-32 object-cover rounded-lg mb-4 border border-[var(--line-on-light)]" />
              )}

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-full px-4 py-4 bg-white border border-dashed border-slate-300 rounded-lg text-center flex flex-col items-center justify-center text-[var(--text-on-light-muted)] hover:bg-slate-50 transition-colors">
                  {isUploading ? <Loader2 className="animate-spin mb-1" size={20} /> : <ImageIcon className="mb-1" size={20} />}
                  <span className="text-sm font-medium">{isUploading ? 'Uploading...' : 'Click to upload image'}</span>
                  <span className="text-xs text-[var(--text-on-light-faint)] mt-1 font-medium">(Recommended: 16:9 aspect ratio)</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[var(--surface-light)] rounded-xl border border-[var(--line-on-light)]">
              <h3 className="font-bold text-[var(--text-on-light)] mb-4 border-b border-[var(--line-on-light)] pb-2">Author Info</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[var(--text-on-light)] mb-1">Author Name</label>
                  <input
                    type="text"
                    name="authorName"
                    value={formData.authorName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[var(--line-on-light)] rounded-lg outline-none focus:border-[var(--brass)] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[var(--text-on-light)] mb-1">Author Role</label>
                  <input
                    type="text"
                    name="authorRole"
                    value={formData.authorRole}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[var(--line-on-light)] rounded-lg outline-none focus:border-[var(--brass)] text-sm"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
