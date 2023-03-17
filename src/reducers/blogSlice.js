import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, current, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns-jalali"
import { createBlog, deleteBlog, getAllBlogs, updateBlog } from "../../public/services/blogServices";
import { apiSlice } from "../api/apiSlice";

export const fetchBlogs = createAsyncThunk("/blogs/fetchBlogs", async () => {
    const response = await getAllBlogs();
    return response.data;
})

export const addNewBlog = createAsyncThunk("/blogs/addNewBlog", async initialBlog => {
    const response = await createBlog(initialBlog);
    return response.data;
})

export const updateApiBlog = createAsyncThunk(
    "/blogs/updateApiBlog",
    async (initialBlog) => {
        const response = await updateBlog(initialBlog, initialBlog.id);
        return response.data;
    }
);

export const deleteApiBlog = createAsyncThunk("/blog/deleteApiBlog", async initialBlogId => {
    await deleteBlog(initialBlogId)
    return initialBlogId;
})

// const initialState = {
//     blogs: [],
//     status: "idle",
//     error: null,
// }

const blogAdaptor = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.Date),
})



const initialState = blogAdaptor.getInitialState({
    status: "idle",
    error: null
})

const blogSlice = createSlice({
    name: "blogs",
    initialState: initialState,
    reducers: {
        blogAdded: {
            reducer: (state, action) => {
                state.blogs.push(action.payload);
            },
            prepare: (title, content, author) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        user: author,
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0,
                        }
                    }
                }
            }
        },
        blogUpdated: (state, action) => {
            const { id, title, content } = action.payload;
            const existingBlog = state.blogs.find(blog => blog.id === id);
            if (existingBlog) {
                existingBlog.title = title;
                existingBlog.content = content;
            }
        },
        blogDeleted: (state, action) => {
            const { id } = action.payload;
            const existingBlog = state.blogs.filter(blog => blog.id !== id);
            state.blogs = existingBlog;
        },
        reactionAdded: (state, action) => {
            const { blogId, reaction } = action.payload;
            const blog = state.entities[blogId]
            const existingBlog = state.blogs.find(blog => blog.id === blogId);
            if (existingBlog) {
                existingBlog.reactions[reaction]++;
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchBlogs.pending, (state, _) => {
                state.status = "loading";
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = "compeleted";
                blogAdaptor.upsertMany(state, action.payload)
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewBlog.fulfilled, (state, action) => {
                // state.blogs.push(action.payload);
                blogAdaptor.addOne(state, action.payload)
            })
            .addCase(deleteApiBlog.fulfilled, (state, action) => {
                console.log(current(state.blogs))
                // state.blogs = state.blogs.filter(b => b.id !== action.payload);
                blogAdaptor.removeOne(action.payload)
            })
            .addCase(updateApiBlog.fulfilled, blogAdaptor.updateOne);
    }
})

// export const selectAllBlogs = state => state.blogs.blogs;
// export const selectBlogById = (state, blogId) => state.blogs.blogs.find(blog => blog.id === blogId)

// export const selectBlogsByUserId = (state, userId) =>
//     state.blogs.find(blog => blog.user === userId);

// const selectAllBlogs = apiSlice.endpoints.getBlogs.select();


export const {
    selectAll: selectAllBlogs,
    selectById: selectBlogById,
    selectIds: selectBlogIds
} = blogAdaptor.getSelectors(state => state.blogs)

export const selectBlogsByUserId = createSelector(
    [selectAllBlogs, (_, userId) => userId],
    (blogs, userId) => {
        return blogs.filter((blog) => blog.user === userId) 
    }
);
export default blogSlice.reducer;
export const { blogAdded, blogUpdated, blogDeleted, reactionAdded } = blogSlice.actions;