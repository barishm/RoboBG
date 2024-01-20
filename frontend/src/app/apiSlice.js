import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:8000/"}),
    endpoints: (builder) => ({

        //Auth
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/authenticate',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
        reauth: builder.mutation({
            query: (refreshToken) => ({
                url: '/auth/refresh-token',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + refreshToken,
                  },
            }), 
        }),

        //QnA
        getQna: builder.query({
            query: (id) => ({
                url: `v1/robots/${id}/questions`,
                method: 'GET',
            }),
            providesTags: ['Question'],
        }),
        answerQuestion: builder.mutation({
            query: ({answerBody, accessToken}) => ({
                url: 'v1/user/answers',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: answerBody,
            }),
            invalidatesTags: ['Question'],
        }),
        askQuestion: builder.mutation({
            query: ({questionBody, accessToken}) => ({
                url: 'v1/user/questions',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: questionBody,
            }),
            invalidatesTags: ['Question'],
        }),
        deleteQuestion: builder.mutation({
            query: ({id,accessToken}) => ({
                url: `v1/user/questions/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }),
            invalidatesTags: ['Question'],
        }),
        deleteAnswer: builder.mutation({
            query: ({id,accessToken}) => ({
                url: `v1/user/answers/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }),
            invalidatesTags: ['Question'],
        }),

        //robots
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
        getRobotsByIds: builder.query({
            query: (ids) => ({
                url: `v1/robots?id=${ids}`,
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
            query: (json,token) => ({
                url: 'v1/admin/robots',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: {json},
            }),
            invalidatesTags: ['Robot'],
        }),

        //Users
        getAllUsersnamesRoles: builder.query({
            query: (token) => ({
                url: 'v1/admin/users',
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${token}`
                },
            })
        }),
        updateUsersRole: builder.mutation({
            query: (json,token) => ({
                url: 'v1/admin/users',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: {json},
            })
        }),

        //Links
        createLink: builder.mutation({
            query: (json,accessToken) => ({
                url: 'v1/admin/links',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: {json},
            })
        }),
        deleteLink: builder.mutation({
            query: (id,token) => ({
                url: `v1/admin/links/${id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
        }),
    })
})

export const {
    useLoginMutation,
    useReauthMutation,
    useGetQnaQuery,
    useAnswerQuestionMutation,
    useAskQuestionMutation,
    useDeleteQuestionMutation,
    useDeleteAnswerMutation,
    useGetAllRobotsQuery,
    useGetBestRobotsQuery,
    useGetRobotsModelImageQuery,
    useGetRobotsModelImageLinksQuery,
    useGetRobotByIdQuery,
    useGetRobotsByIdsQuery,
    useCreateRobotMutation,
    useDeleteRobotMutation,
    useUpdateRobotMutation,
    useGetAllUsersnamesRolesQuery,
    useUpdateUsersRoleMutation,
    useGetRobotsModelQuery,

} = apiSlice