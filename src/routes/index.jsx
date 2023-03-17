import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App"
import CreateBlog from "../components/CreateBlog";
import EditBlog from "../components/EditBlog";
import EditUserForm from "../components/EditUserForm";
import MainLayoutV2 from "../components/NavBar";
import SingleBlogPage from "../components/SingleBlogPage";
import SingleUserPage from "../components/SingleUserPage";
import UsersList from "../components/UsersList";
import MainLayout from "../layout/MainLayout";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: (<div>nothing to show</div>),
        children: [
            {
                path: "/",
                element: <App />
            }
        ]
    }
])

export const routerV2 = createBrowserRouter((
    createRoutesFromElements(
        <Route path="/" element={<MainLayoutV2 />} errorElement={<div>nothing more</div>}>
            <Route index element={<App />} />
            <Route path="about" element={<h1>about</h1>} />
            <Route path="/blogs/:blogId" element={<SingleBlogPage />} />
            <Route path="/blogs/create-blog" element={<CreateBlog />} />
            <Route path="/blogs/edit-blog/:blogId" element={<EditBlog />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:userId" element={<SingleUserPage />} />
            <Route path="/users/edit-user/:userId" element={<EditUserForm />} />
        </Route>
    )
))