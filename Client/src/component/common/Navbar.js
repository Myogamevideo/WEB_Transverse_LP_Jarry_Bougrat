import React from "react";
import { Fragment } from "react";
import { FaRegUserCircle, FaHome, FaProjectDiagram } from "react-icons/fa";
import { Link } from "react-router-dom";

function GetNav() {
    const sessionToken = sessionStorage.getItem('session_token');
    return (
        <Fragment>
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
            {!sessionToken ? (
                <Link to="/login">
                    <li>
                        <FaRegUserCircle />
                        <p>Login</p>
                    </li>
                </Link>
            ) : (
                <Fragment>
                    <Link to="/me">
                        <li>
                            <FaRegUserCircle />
                            <p>Profile</p>
                        </li>
                    </Link >
                    <Link to="/home" onClick={() => sessionStorage.removeItem('session_token')}>
                        <li>
                            <FaProjectDiagram />
                            <p>Logout</p>
                        </li>
                    </Link>
                </Fragment>
            )}
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