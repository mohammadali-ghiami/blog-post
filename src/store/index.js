import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import blogSlice from "../reducers/blogSlice";
import userSlice, { extendedApiSlice } from "../reducers/userSlice";


export const store = configureStore({
    reducer: {
        blogs: blogSlice,
        users: userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefalutMiddleware) =>
        getDefalutMiddleware().concat(apiSlice.middleware)
})

console.log(extendedApiSlice.endpoints.getUsers);
store.dispatch(extendedApiSlice.endpoints.getUsers.initiate());