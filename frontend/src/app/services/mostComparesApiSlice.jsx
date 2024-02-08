import { apiSlice } from "./apiSlice";

export const mostComparesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllMostCompares: builder.query({
            query: () => ({
                url: `v1/most-compares`,
                method: 'GET',
            }),
            providesTags: ['MostCompares'],
        }),
        updateMostCompares: builder.mutation({
            query: ({jsonBody, accessToken}) => ({
                url:`v1/admin/users`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: jsonBody,
            }),
            invalidatesTags: ['MostCompares'],
        }),
        createMostCompares: builder.mutation({
            query: ({jsonBody, accessToken}) => ({
                url:`v1/admin/users`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: jsonBody,
            }),
            invalidatesTags: ['MostCompares'],
        }),
        deleteMostCompares: builder.mutation({
            query: ({id, accessToken}) => ({
                url:`v1/admin/users/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }),
            invalidatesTags: ['MostCompares'],
        }),
        
    })

})
export const {
   useGetAllMostComparesQuery,
   useUpdateMostComparesMutation,
   useCreateMostComparesMutation,
   useDeleteMostComparesMutation,
} = mostComparesApiSlice;