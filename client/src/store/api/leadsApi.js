import { apiSlice } from './apiSlice';

export const leadsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    submitLead: builder.mutation({
      query: (body) => ({ url: '/leads', method: 'POST', body }),
      invalidatesTags: ['Lead'],
    }),
    getLeads: builder.query({
      query: ({ source, status } = {}) => {
        const params = new URLSearchParams();
        if (source) params.set('source', source);
        if (status) params.set('status', status);
        return `/leads?${params.toString()}`;
      },
      providesTags: ['Lead'],
    }),
    updateLeadStatus: builder.mutation({
      query: ({ id, status }) => ({ url: `/leads/${id}`, method: 'PATCH', body: { status } }),
      invalidatesTags: ['Lead'],
    }),
  }),
});

export const { useSubmitLeadMutation, useGetLeadsQuery, useUpdateLeadStatusMutation } = leadsApi;
