// import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { deleteApiBlog } from "../reducers/blogSlice";
import ReactionButton from "./common/ReactionsButton";
import { useDeleteBlogMutation, useGetBlogQuery } from "../api/apiSlice"
import Spinner from "./common/Spinner";

const SingleBlogPage = () => {
    // const dispatch = useDispatch();
    const { blogId } = useParams();

    const {
        data: blog,
        isSuccess,
        isFetching,
        isError
    } = useGetBlogQuery(blogId)

    const [deleteBlog] = useDeleteBlogMutation()
    const navigate = useNavigate();
    
    if (!blog) {
        return (<h3>پستی که دنبالشی یافت نشد</h3>)
    }
    const handleBlogDelete = async () => {
        if (blog) {
            await deleteBlog(blogId)
        }
        navigate("/")
    }

    let content;

    if (isFetching) {
        content = <Spinner text="درحال بارگذاری ..." />
    } else if (isSuccess) {
        content = (
            <article className="blog-list">
                <h3>{blog.title}</h3>
                <p className="blog-content">{blog.content}</p>
                <ReactionButton blog={blog} />
                <Link to={`/blogs/edit-blog/${blog.id}`} className="button muted-button" >ویرایش پست</Link>
                <button className="button" onClick={handleBlogDelete}>حذف پست</button>
            </article>
        )
    } else if (isError) {
        return (<h3>پستی که دنبالشی یافت نشد</h3>)
    }

    return (
        <section>
            {content}
        </section>
    );
}

export default SingleBlogPage;