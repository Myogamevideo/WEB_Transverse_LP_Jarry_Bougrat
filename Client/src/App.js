import React from "react";
import './style/App.css';
import {Route, Switch} from "react-router-dom";
import HomePage from "./component/common/Home";
import UserPage from "./component/user/UserPage";
import ProfilPage from "./component/common/ProfilPage";
import PlaylistList from "./component/playlist/PlaylistList";
import PlaylistDetail from "./component/playlist/PlaylistDetail";
import MusicList from "./component/music/MusicList";
import MusicDetail from "./component/music/MusicDetail";
import Header from "./component/common/Header";
import Navbar from "./component/common/Navbar";

function App() {
    return (
        <div className="App">
            <Header/>
            <Navbar/>
            <Switch>
                <Route path="/home">
                    <HomePage/>
                </Route>
                <Route path="/me">
                    <ProfilPage/>
                </Route>
                <Route path="/user/:id">
                    <UserPage/>
                </Route>
                <Route path="/musics">
                    <MusicList/>
                </Route>
                <Route path="/music/:id">
                    <MusicDetail/>
                </Route>
                <Route path="/playlists/">
                    <PlaylistList/>
                </Route>
                <Route path="/playlist/:id">
                    <PlaylistDetail/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
