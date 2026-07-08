import { apiSlice } from './apiSlice';

export const contentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: ({ tag } = {}) => tag ? `/content/testimonials?tag=${tag}` : '/content/testimonials',
      providesTags: ['Testimonial'],
    }),
    getPricingPlans: builder.query({
      query: () => '/content/pricing',
      providesTags: ['PricingPlan'],
    }),
    getPosts: builder.query({
      query: ({ page = 1, category } = {}) => {
        const params = new URLSearchParams({ page });
        if (category) params.set('category', category);
        return `/content/posts?${params.toString()}`;
      },
      providesTags: ['Post'],
    }),
    getPostBySlug: builder.query({
      query: (slug) => `/content/posts/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Post', id: slug }],
    }),
    getAdminPosts: builder.query({
      query: () => '/content/admin/posts',
      providesTags: ['Post'],
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: '/content/posts',
        method: 'POST',
        body: postData,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...postData }) => ({
        url: `/content/posts/${id}`,
        method: 'PUT',
        body: postData,
      }),
      invalidatesTags: ['Post', (result, error, { id }) => ({ type: 'Post', id })],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/content/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetTestimonialsQuery,
  useGetPricingPlansQuery,
  useGetPostsQuery,
  useGetPostBySlugQuery,
  useGetAdminPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useUploadImageMutation,
} = contentApi;
