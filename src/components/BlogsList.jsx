import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"
// import { fetchBlogs, selectAllBlogs } from "../reducers/blogSlice";
import ReactionButton from "./common/ReactionsButton";
import ShowAuthor from "./common/ShowAuthor";
import ShowTime from "./common/ShowTime";
import { memo, useEffect, useMemo } from "react"
import Spinner from "./common/Spinner";
import { apiSlice } from "../api/apiSlice";
import { useGetBlogsQuery } from "../api/apiSlice"

let Blog = ({ blog }) => {
    return (
        <>
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
        </>
    )
}

const BlogsList = () => {
    const {
        data: blogs = [],
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetBlogsQuery()

    const sortedBlogs = useMemo(() => {
        const sortedBlogs = blogs.slice();
        sortedBlogs.sort((a, b) => b.date.localeCompare(a.date))
        return sortedBlogs;
    }, [blogs])
    // const dispatch = useDispatch();

    // const blogs = useSelector(selectAllBlogs);
    // const blogsStatus = useSelector(state => state.blogs.status)
    
    // useEffect(() => {
    //     if (blogsStatus === "idle")
    //         dispatch(fetchBlogs())
    // }, [blogsStatus, dispatch]);

    let content;
    // const error = useSelector(state => state.blogs.error)

    if (isLoading) {
        <Spinner text="بارگذاری ..." />
    } else if (isSuccess) {
        // const orderedBlogs = blogs.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = sortedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
        ))
    } else if (isError) {
        content = <div>{error}</div>
    }


    const navigate = useNavigate()
    return (
        <section className="blog-list">
            <button className="full-button accent-button" style={{ marginTop: 10 }} onClick={() => navigate("/blogs/create-blog")}>ایجاد پست جدید</button>
            <h1>تمامی پست ها</h1>
            {/* <button className="button" onClick={refetch}>بارگذاری مجدد</button> */}
            {content}
        </section>
    );
}

export default BlogsList;