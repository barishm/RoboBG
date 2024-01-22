import { apiSlice } from "./apiSlice";

export const robotApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllRobots: builder.query({
            query: () => ({
                url: `v1/robots`,
                method: 'GET',
            }),
            providesTags: ['Robot'],
        }),
        getBestRobots: builder.query({
            query: () => ({
                url: `v1/robots?fields=model,image,bests,links`,
                method: 'GET',
            }),
            providesTags: ['Robot'],
        }),
        getRobotsModel: builder.query({
            query: () => ({
                url: `v1/robots?fields=model`,
                method: 'GET',
            }),
            providesTags: ['Robot'],
        }),
        getRobotsModelImage: builder.query({
            query: () => ({
                url: `v1/robots?fields=model,image`,
                method: 'GET',
            }),
            providesTags: ['Robot'],
        }),
        getRobotsModelImageLinks: builder.query({
            query: () => ({
              url: `v1/robots?fields=model,image,links`,
              method: 'GET',
            }),
            providesTags: ['Robot'],
        }),
        getRobotsModelLinksById: builder.query({
            query: (id) => ({
                url: `v1/robots/${id}?fields=model,links`,
                method: 'GET',
            }),
            providesTags: ['Robot'],
        }),
        getRobotsByIds: builder.query({
            query: (ids) => ({
              url: `v1/robots?id=${ids.join(',')}`,
              method: 'GET',
            }),
            providesTags: ['Robot'],
          }),
        getRobotById: builder.query({
            query: ({id}) => ({
                url: `v1/robots/${id}`,
                method: 'GET',
            }),
            providesTags: ['Robot'],
        }),
        createRobot: builder.mutation({
            query: ({robotBody, accessToken}) => ({
                url: 'v1/admin/robots',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: robotBody,
            }),
            invalidatesTags: ['Robot'],
        }),
        deleteRobot: builder.mutation({
            query: ({id,accessToken}) => ({
                url: `v1/admin/robots/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }),
            invalidatesTags: ['Robot'],
        }),
        updateRobot: builder.mutation({
            query: ({robotBody, accessToken}) => ({
                url: 'v1/admin/robots',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: robotBody,
            }),
            invalidatesTags: ['Robot'],
        }),
    })
})
export const {
    useGetAllRobotsQuery,
    useGetBestRobotsQuery,
    useGetRobotsModelImageQuery,
    useGetRobotsModelImageLinksQuery,
    useGetRobotByIdQuery,
    useLazyGetRobotByIdQuery,
    useLazyGetRobotsModelLinksByIdQuery,
    useGetRobotsByIdsQuery,
    useCreateRobotMutation,
    useDeleteRobotMutation,
    useUpdateRobotMutation,
    useGetRobotsModelQuery,
} = robotApiSlice;