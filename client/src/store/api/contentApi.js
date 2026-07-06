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
  }),
});

export const {
  useGetTestimonialsQuery,
  useGetPricingPlansQuery,
  useGetPostsQuery,
  useGetPostBySlugQuery,
} = contentApi;
