import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectUserById, useUpdateUserMutation } from "../reducers/userSlice";

const EditUserForm = () => {
    const { userId } = useParams();
    const user = useSelector(state => selectUserById(state, userId));
    const [updateUser, { isLoading }] = useUpdateUserMutation();
    // console.log(user);
    const [username, setUserName] = useState(user.fullname)
    // const dispatch = useDispatch();
    const canSave = Boolean(username);
    const navigate = useNavigate();
    const handleFormSubmit = async () => {
        if (canSave) {
            await updateUser({
                id: userId,
                fullname: username
            })
            // dispatch(editUserApi({
            //     id: user.id,
            //     fullname: username
            // })),
            navigate("/users")
        }
    }
    return (
        <section>
            <h2>ویرایش نویسنده</h2>
            <form autoComplete="off">
                <label htmlFor="username">عنوان:</label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUserName(e.target.value)} />
                <button onClick={handleFormSubmit} type="button">ذخیره سازی</button>
            </form>
        </section>
    );
}

export default EditUserForm;