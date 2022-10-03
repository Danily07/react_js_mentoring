/* React-specific entry point that automatically generates
         hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface MoviesResponse {
    data: MovieResponseItem[]
    limit: number
    offset: number
    totalAmount: number
}

export interface MovieResponseItem {
    budget: number
    id: number
    overview: string
    poster_path: string
    release_date: string
    revenue: number
    runtime: number
    tagline: string
    vote_average: number
    vote_count: number
    genres: string[]
    title: string
}

export interface MovieInput {
    budget: number
    overview: string
    poster_path: string
    release_date: string
    revenue: number
    runtime: number
    tagline: string
    vote_average: number
    vote_count: number
    genres: string[]
    title: string
    id?: number
}

export const movieApi = createApi({
    reducerPath: "movieApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/"
    }),
    tagTypes: ['MoviesData'],
    endpoints: (builder) => ({
        movies: builder.query<MoviesResponse, void>({
            query: () => {
                const limit = 20;
                return {
                    url: "/movies",
                    params: {limit}                   
                }
            },
            providesTags: [ 'MoviesData' ]
        }),
        addMovie: builder.mutation<MovieResponseItem, Omit<MovieInput, "budget" | "revenue" | "tagline" | "vote_count">>({
            query: (movie) => ({
              url: "/movies",
              method: "POST",
              body: transformRequestBody(movie),
            })
          }),
        editMovie: builder.mutation<MovieResponseItem, Omit<MovieInput, "budget" | "revenue" | "tagline" | "vote_count">>({
            query: (movie) => ({
              url: "/movies",
              method: "PUT",
              body: transformRequestBody(movie),
            })
          }),
    })
})

export const {
    useMoviesQuery,
    useAddMovieMutation,
    useEditMovieMutation
} = movieApi

const transformRequestBody = (movieInput: Omit<MovieInput, "budget" | "revenue" | "tagline" | "vote_count">) => {
    const body: MovieInput= {
        ...movieInput,
        budget: 1000,
        revenue: 1500,
        tagline: "test",
        vote_count: 1
    }

    if (body.id === null)
    {
        const  {id, ...bodyWithoutId} = body;
        return bodyWithoutId;
    }

    return body;
}
