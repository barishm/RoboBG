import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllUsers: builder.query({
            query: (accessToken) => ({
                url: `v1/admin/users`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }),
            providesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: ({Userbody, accessToken}) => ({
                url:`v1/admin/users`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: Userbody,
            }),
            invalidatesTags: ['User'],
        })
    })
})
export const {
    useGetAllUsersQuery,
    useUpdateUserMutation
} = userApiSlice;