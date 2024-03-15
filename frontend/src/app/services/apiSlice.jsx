import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl:"http://robobg-env.eba-h9x3zzm8.eu-central-1.elasticbeanstalk.com"}),
    endpoints: () => ({})
})