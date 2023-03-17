import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBlogQuery, useUpdateBlogMutation } from "../api/apiSlice";
// import { blogUpdated, selectBlogById, updateApiBlog } from "../reducers/blogSlice";

const EditBlog = () => {
    const { blogId } = useParams();

    // const blog = useSelector((state) => selectBlogById(state, blogId));
    const { data: blog = [] } = useGetBlogQuery(blogId)
    const [updatedBlog, { isLoading }] = useUpdateBlogMutation();

    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const canSave = [title, content].every(Boolean)
    const handleFormSubmit = async () => {
        const editedBlog = {
            id: blogId,
            date: blog.date,
            title,
            content,
            user: blog.user,
            reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0,
            },
        }
        if (canSave) {
            await updatedBlog({ ...editedBlog })
            navigate(`/blogs/${blogId}`);
        }
    };

    if (!blog) {
        return (<h2>چیزی پیدا نشد</h2>)
    }

    return (
        <section>
            <h2>ویرایش پست جدید</h2>
            <form autoComplete="off">
                <label htmlFor="blogTitle">عنوان:</label>
                <input type="text" id="blogTitle" name="blogTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor="blogContent">محتوای اصلی :</label>
                <textarea
                    id="blogContent"
                    name="blogContent"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button onClick={handleFormSubmit} type="button">ذخیره سازی</button>
            </form>
        </section>
    );
}

export default EditBlog;