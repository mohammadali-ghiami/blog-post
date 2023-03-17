import { Outlet, NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <section>
                <h1>وبلاگ ریداکسی</h1>
                <div className="navContent">
                    <div className="navLinks">
                    <NavLink style={{ textDecoration: "none" }} to="/">وبلاگ</NavLink>
                    <NavLink style={{ textDecoration: "none", marginRight: 10 }} to="/users">نویسندگان</NavLink>
                    </div>
                </div>
            </section>
        </nav>
    );
}

const MainLayoutV2 = () => {
    return (
        <>
            <Navbar />
            <div>
                <Outlet />
            </div>
        </>
    );
}

export default MainLayoutV2;