import { apiSlice } from './apiSlice';

export const contactApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitContactMessage: builder.mutation({
      query: (body) => ({ url: '/contact', method: 'POST', body }),
      invalidatesTags: ['ContactMessage'],
    }),
    getContactMessages: builder.query({
      query: ({ status } = {}) => {
        const params = new URLSearchParams();
        if (status) params.set('status', status);
        return `/contact?${params.toString()}`;
      },
      providesTags: ['ContactMessage'],
    }),
    updateContactMessageStatus: builder.mutation({
      query: ({ id, status }) => ({ url: `/contact/${id}`, method: 'PATCH', body: { status } }),
      invalidatesTags: ['ContactMessage'],
    }),
  }),
});

export const { useSubmitContactMessageMutation, useGetContactMessagesQuery, useUpdateContactMessageStatusMutation } = contactApi;
