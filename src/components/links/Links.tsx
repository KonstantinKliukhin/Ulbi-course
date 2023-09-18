import {Link, Outlet} from "react-router-dom";

export const Links = () => (
    <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Outlet/>
    </div>
);