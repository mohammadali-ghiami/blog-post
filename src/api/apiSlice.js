import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000" }),
    tagTypes: ["BLOG", "USER"],
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => "/blogs",
            providesTags: (result = [], error, arg) => [
                "BLOG",
                ...result.map(({ id }) => ({ type: "BLOG", id }))
            ]
        }),
        getBlog: builder.query({
            query: (initialBlogId) => `/blogs/${initialBlogId}`,
            providesTags: (result, error, arg) => [{ type: "BLOG", id: arg }]
        }),
        addNewBlog: builder.mutation({
            query: (initialBlog) => ({
                url: "/blogs",
                method: "POST",
                body: initialBlog
            }),
            invalidatesTags: ["BLOG"]
        }),
        updateBlog: builder.mutation({
            query: (blog) => ({
                url: `/blogs/${blog.id}`,
                method: "PUT",
                body: blog
            }),
            invalidatesTags: (result, error, arg) => [{ type: "BLOG", id: arg.id }]
        }),
        deleteBlog: builder.mutation({
            query: (blogId) => ({
                url: `/blogs/${blogId}`,
                method: "DELETE",
                invalidatesTags: ["USER"]
            }),
            invalidatesTags: ["BLOG"]
        }),
        reactionBLog: builder.mutation({
            query: ({blogId, reactions}) => ({
                url: `blogs/${blogId}/reactions`,
                method: "POST",
                body: {reactions}
            })
        })
    })
})

export const { useGetBlogsQuery, useGetBlogQuery, useAddNewBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation, useReactionBLogMutation } = apiSlice;