import { nanoid } from "@reduxjs/toolkit";
import { useState } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAddNewBlogMutation } from "../api/apiSlice";
// import { addNewBlog, blogAdded } from "../reducers/blogSlice";
import { selectAllUsers } from "../reducers/userSlice";

const CreateBlog = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [author, setAuthor] = useState("");

    const navigate = useNavigate()

    const [addNewBlog, { isLoading }] = useAddNewBlogMutation()

    const users = useSelector(selectAllUsers)
    const canSave = [title, content, author].every(Boolean) && !isLoading


    const handleFormSubmit = async () => {
        if (canSave) {
            try {
                await addNewBlog({
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
                }).unwrap();
                setTitle("")
                setContent("")
                setAuthor("")
                navigate("/")
            } catch (error) {
                console.error("مشکلی در ذخیره پست پیش آمده", error)
            }
        }
    }

    return (
        <section>
            <h2>ساخت پست جدید</h2>
            <form autoComplete="off">
                <label htmlFor="blogTitle">عنوان:</label>
                <input type="text" id="blogTitle" name="blogTitle" value={title} onChange={(e) => setTitle(e.target.value)} />
                <label htmlFor="blogAuthor">نویسنده:</label>
                <select name="blogAuthor" id="blogAuthor" value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="">انتخاب نویسنده</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.fullname}
                        </option>
                    ))}
                </select>
                <label htmlFor="blogContent">متن:</label>
                <input type="text" id="blogContent" name="blogContent" value={content} onChange={(e) => setContent(e.target.value)} />
                <button onClick={handleFormSubmit} disabled={!canSave} type="submit">ذخیره سازی</button>
            </form>
        </section>
    );
}

export default CreateBlog;