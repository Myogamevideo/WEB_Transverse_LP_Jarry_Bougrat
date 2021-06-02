import React from "react";
import logo from './logo.svg';
import './style/App.css';
import { Switch, Route, Link } from "react-router-dom";
import HomePage from "./component/common/Home";
import UserPage from "./component/user/UserPage";
import ProfilPage from "./component/common/ProfilPage";
import PlaylistList from "./component/playlist/PlaylistList";
import PlaylistDetail from "./component/playlist/PlaylistDetail";
import MusicList from "./component/music/MusicList";
import MusicDetail from "./component/music/MusicDetail";
import Header from "./component/common/Header";

function App() {
  return (
    <div className="App">
    <Header />   
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/me">Profile</Link>
          </li>
          <li>
            <Link to="/musics">Musics</Link>
          </li>
          <li>
            <Link to="/playlists">Playlists</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/me">
          <ProfilPage />
        </Route>
        <Route path="/user/:id">
          <UserPage />
        </Route>
        <Route path="/musics">
          <MusicList />
        </Route>
        <Route path="/music/:id">
          <MusicDetail />
        </Route>
        <Route path="/playlists/">
          <PlaylistList />
        </Route>
        <Route path="/playlist/:id">
          <PlaylistDetail />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
