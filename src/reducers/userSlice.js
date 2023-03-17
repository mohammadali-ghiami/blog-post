import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, nanoid } from "@reduxjs/toolkit"
import { createUser, deleteUser, editUser, getAllUsers } from "../../public/services/blogServices"
// import { selectAllBlogs } from "./blogSlice";
import { apiSlice } from "../api/apiSlice";



const userAdaptor = createEntityAdapter();
const initialState = userAdaptor.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => "/users",
            providesTags: ["USER"],
            // providesTags: (result = [], error, arg) => [
            //     "USER",
            //     ...result.map(({ id }) => ({ type: "BLOG", id }))
            // ],
            transformResponse: (responseData) => {
                return userAdaptor.setAll(initialState, responseData);
            }
        }),
        addNewUser: builder.mutation({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["USER"]
        }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: "PUT",
                body: user
            }),
            invalidatesTags: ["USER"]
        }),
        deletedUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["USER"]
        })
    })
})


// export const selectAllUsers = createSelector(
//     selectUsersResult,
//     (userResults) => userResults?.data ?? emptyUsers
// )

// export const selectUserById = createSelector(
//     [selectAllUsers,
//         (state, userId) => userId],
//     (users, userId) => users.find(u => u.id === userId)
// )


export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    // extraReducers(builder) {
    //     builder
    //         .addCase(fetchUsers.fulfilled, userAdaptor.setAll)
    //         .addCase(createUserApi.fulfilled, userAdaptor.addOne)
    //         .addCase(deleteUserApi.fulfilled, userAdaptor.removeOne)
    //         .addCase(editUserApi.fulfilled, userAdaptor.updateOne)
    // }
})
export const { useGetUsersQuery, useAddNewUserMutation, useUpdateUserMutation, useDeletedUserMutation } = extendedApiSlice;

// export const selectAllUser = (state) => state.users;
// export const selectUserById = (state, userId) =>
//     state.users.find(user => user.id === userId);

const selectUsersData = createSelector(selectUsersResult, usersResult => usersResult.data)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
} = userAdaptor.getSelectors((state) => selectUsersData(state) ?? initialState)

// export const selectBlogByUser = createSelector(
//     [selectAllBlogs, (state, userId) => userId],
//     (blogs, userId) => {
//         return blogs.filter(blog => blog.user === userId);
//     }
// )

// export const selectBlogsByUserId = (state, userId) => 
//     state.blogs.find(blog => blog.id === userId)

export default userSlice.reducer;