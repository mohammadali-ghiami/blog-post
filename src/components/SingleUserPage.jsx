import { useSelector } from "react-redux"
import { selectUserById } from "../reducers/userSlice";
import { useParams, Link, NavLink } from "react-router-dom"
// import { selectAllBlogs, selectBlogsByUserId } from "../reducers/blogSlice";
import ReactionButton from "./common/ReactionsButton";
import ShowTime from "./common/ShowTime";
import ShowAuthor from "./common/ShowAuthor";
import { useGetBlogsQuery } from "../api/apiSlice";
import { selectBlogsByUserId } from "../reducers/blogSlice";
import { useMemo } from "react";
import { createSelector } from "@reduxjs/toolkit";
const Blogs = ({ blogs }) => {

    const orderedBlogs = blogs.slice().sort((a, b) => b.date.localeCompare(a.date));
    return (
        <>
            {
                orderedBlogs.map((blog) => (
                    <article key={blog.id} className="blog-excerpt" style={{ textAlign: "center" }}>
                        <h3>{blog.title}</h3>
                        <div style={{ marginTop: "10px" }}>
                            <ShowTime timestamp={blog.date} />
                            <ShowAuthor userId={blog.user} />
                        </div>
                        <p className="blog-content">{blog.content.substring(0, 100)}</p>
                        <ReactionButton blog={blog} />
                        <Link to={`/blogs/${blog.id}`} className="button muted-button" >مشاهده کامل پست</Link>
                    </article>
                ))
            }
        </>
    )
}
const SingleUserPage = () => {
    const { userId } = useParams();
    // const {data: blog} = useGetBlogsQuery()
    const user = useSelector((state) => selectUserById(state, userId))
    // const userBlog = useSelector((state) => selectBlogsByUserId(state, userId));
    const selectUserBlog = useMemo(() => {
        const emptyArray = [];
        return createSelector(
            (res) => res.data, (res, userId) => userId,
            (data, userId) =>
                data?.filter((blog) => blog.user === userId) ?? emptyArray  
        )
    })

    const { userBlog } = useGetBlogsQuery(undefined, {
        selectFromResult: (result) => ({
            ...result,
            userBlog: selectUserBlog(result, userId)
        })
    })
    // const userBlog = useSelector()
    // console.log(blog);
    return (
        <section>
            <h4>تمامی پست های {user.fullname}</h4>
            <div className="navLinks">
                <NavLink style={{ listStyleType: "none", textDecoration: "none" }} className="" to={`/users/edit-user/${user.id}`}>ویرایش نویسنده</NavLink>
            </div>
            {
                userBlog.length > 0 ? <Blogs blogs={userBlog} /> : <li style={{ listStyleType: "none" }}>این نویسنده تاحالا پستی ثبت نکرده</li>
            }
        </section>
    );
}

export default SingleUserPage;