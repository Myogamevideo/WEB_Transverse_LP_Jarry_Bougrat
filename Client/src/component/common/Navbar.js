import React from "react";
import { Fragment } from "react";
import { FaRegUserCircle, FaHome, FaProjectDiagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function GetNav() {
    const sessionToken = sessionStorage.getItem('session_token');

    if (!sessionToken) return (
        <Link to="/login">
            <li>
                <FaRegUserCircle />
                <p>Login</p>
            </li>
        </Link>
    );

    return (
        <Fragment>
            <Link to="/me">
                <li>
                    <FaRegUserCircle />
                    <p>Profile</p>
                </li>
            </Link>
            <Link to="/playlists">
                <li>
                    <FaProjectDiagram />
                    <p>Playlists</p>
                </li>
            </Link>
            <Link to="/musics">
                <li>
                    <FaProjectDiagram />
                    <p>Musics</p>
                </li>
            </Link>
            <Link to="/home" onClick={() => sessionStorage.removeItem('session_token')}>
                <li>
                    <FaProjectDiagram />
                    <p>Logout</p>
                </li>
            </Link>
        </Fragment>
    );
}

class Navbar extends React.Component {

    render() {
        return (
            <nav>
                <ul className="nav-list">
                    <Link to="/home">
                        <li>
                            <FaHome />
                            <p>Home</p>
                        </li>
                    </Link>
                    <GetNav />
                </ul>
            </nav>
        );
    }
}

export default Navbar;