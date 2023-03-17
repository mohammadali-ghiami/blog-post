import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAllUsers, useAddNewUserMutation, useDeletedUserMutation } from "../reducers/userSlice";
import { Link, useNavigate } from "react-router-dom"
// import { deleteUser } from "../../public/services/blogServices";
import { nanoid } from "@reduxjs/toolkit";
// import { useAddNewUserMutation } from "../api/apiSlice";
const UsersList = () => {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchUsers())
    // }, [dispatch])
    const navigate = useNavigate()
    const [deletedUser] = useDeletedUserMutation();

    const [user, setUser] = useState("")
    const [addNewUser, { isLoading }] = useAddNewUserMutation()

    const handleDelete = async (userId) => {
        await deletedUser(userId);
    }

    const canSave = Boolean(user)
    const handleFormSubmit = () => {
        if (canSave) {
            try {
                addNewUser({ id: nanoid(), fullname: user }).unwrap()
            } catch (error) {
                console.log(error.message);
            }
            setUser("");
        }
    }

    const users = useSelector(selectAllUsers)
    // console.log(users);

    const renderedUsers = users.map(user => (
        <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.fullname}</Link>
            <Link onClick={() => handleDelete(user.id)} style={{ marginRight: "10px", color: "tomato" }}>&otimes;</Link>
        </li>
    ))
    return (
        <section>
            <h2>تمامی نویسندگان</h2>
            <section>
                <form autoComplete="off">
                    <label htmlFor="user">نام نویسنده :</label>
                    <input
                        type="text"
                        id="user"
                        name="user"
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <button type="button" onClick={handleFormSubmit} disabled={!canSave}>ساخت نویسنده</button>
                </form>
            </section>
            <ul>
                {renderedUsers}
            </ul>
        </section>
    );
}

export default UsersList;