import React from "react";
import { FaRegUserCircle, FaHome, FaProjectDiagram } from "react-icons/fa";
import {Link} from "react-router-dom";

class Navbar extends React.Component {

    render() {
        return (
            <nav>
                <ul className="nav-list">
                    <Link to="/home">
                        <li>
                            <FaHome/>
                            <p>Home</p>
                        </li>
                    </Link>
                    <Link to="/me">
                        <li>
                            <FaRegUserCircle/>
                            <p>Profile</p>
                        </li>
                    </Link>
                    <Link to="/playlists">
                        <li>
                            <FaProjectDiagram/>
                            <p>Playlists</p>
                        </li>
                    </Link>
                    <Link to="/musics">
                        <li>
                            <FaProjectDiagram/>
                            <p>Musics</p>
                        </li>
                    </Link>
                </ul>
            </nav>
        );
    }
}

export default Navbar;