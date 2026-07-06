import { apiSlice } from './apiSlice';

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitContactMessage: builder.mutation({
      query: (body) => ({ url: '/contact', method: 'POST', body }),
      invalidatesTags: ['ContactMessage'],
    }),
    getContactMessages: builder.query({
      query: () => '/contact',
      providesTags: ['ContactMessage'],
    }),
  }),
});

export const { useSubmitContactMessageMutation, useGetContactMessagesQuery } = contactApi;
