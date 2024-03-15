import { apiSlice } from "./apiSlice";

export const youtubeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLatestVideos: builder.query({
            query: () => ({
                url: `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${import.meta.env.VITE_YOUTUBEDATAPI_KEY_ROBOBG_UPLOADS_ID}&key=${import.meta.env.VITE_YOUTUBEDATAPI_KEY}&part=snippet&maxResults=4`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }),
        })
    })
})
export const {
    useGetLatestVideosQuery
} = youtubeApiSlice;