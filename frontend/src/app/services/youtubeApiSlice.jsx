import { apiSlice } from "./apiSlice";

export const youtubeApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLatestVideos: builder.query({
            query: () => ({
                url: `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UC3xawMeIwl1Hekh9j62O4hA&maxResults=4&order=date&type=video&key=AIzaSyCw-jXUcJV2nXst-pbkVJV16eNHE8yc6IA`,
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