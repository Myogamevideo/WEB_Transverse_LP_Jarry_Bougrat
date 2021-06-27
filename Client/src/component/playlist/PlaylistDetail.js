import React, { Component } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { IoIosClose, IoMdCheckmark } from "react-icons/io";
import { FaPlusSquare, FaMinus } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";

const GET_PLAYLIST = gql`
  query Playlists($id: ID!) {
    playlist(_id: $id) {
      _id
      name
      description
      creator{
        username
      }
      musics{
        _id
        title
      }
    }
  }
`;

const GET_MUSICS = gql`
  {
    musics {
      _id
      title
    }
  }
`;

const ADD_MUSIC = gql`
  mutation AddMusicToPlaylist($_id: ID!, $musicId: ID!) {
    addMusicToPlaylist(_id: $_id, musicId: $musicId) {
      _id
    }
  }
`;

const REMOVE_MUSIC = gql`
  mutation RemoveMusicFromPlaylist($_id: ID!, $musicId: ID!) {
    removeMusicFromPlaylist(_id: $_id, musicId: $musicId) {
      _id
    }
  }
`;

function Playlist({ arg, id }) {
    const { loading, error, data } = useQuery(GET_PLAYLIST, {
        variables: { id },
        pollInterval: 500
    });

    let musicToAdd;
    const musicsQueryResult = useQuery(GET_MUSICS);
    const [addMusic, addMusicResult] = useMutation(ADD_MUSIC);
    const [removeMusic, removeMusicResult] = useMutation(REMOVE_MUSIC);


    if (loading || musicsQueryResult.loading) return "Loading...";
    if (error || musicsQueryResult.error) return `Error! ${error.message !== null ? error.message : ''}  ${musicsQueryResult.error !== null ? musicsQueryResult.error.message : ''}`;

    const playlist = data.playlist;
    return (
        <div>
            <h2>
                {playlist.name}
            </h2>
            <p>
                {playlist.description}
            </p>
            <ul>
                {sessionStorage.getItem('session_token') ? (
                    <li className="playlist-list-item">
                        <div className="playlist-item-detail">
                            <select className="form-control" ref={htmlElement => musicToAdd = htmlElement}>
                                {musicsQueryResult.data.musics.map(m => (
                                    <option value={m._id} key={m._id}>{m.title}</option>
                                ))}
                            </select>
                            <button
                                className="btn btn-primary"
                                onClick={e => {
                                    e.preventDefault();
                                    addMusic({ variables: { _id: id, musicId: musicToAdd.value } });
                                    musicToAdd.value = '';
                                }}
                            >
                                <FaPlusSquare fontSize="1.5em" /> Add music
                            </button>
                        </div>
                    </li>
                ) : ''}
                <li>
                    <h3>Playlist musics :</h3>
                </li>
                {playlist.musics.map(item =>
                    <li key={item._id} value={item._id} className="playlist-list-item" >
                        <div className="playlist-item-detail">
                            <h3>
                                {item.title}
                                {sessionStorage.getItem('session_token') ? (
                                    <button className="btn btn-danger" onClick={
                                        e => {
                                            e.preventDefault();
                                            removeMusic({ variables: { _id: id, musicId: item._id } });
                                        }
                                    } > <FaMinus fontSize="1.5em" /> </button>
                                ) : ''}
                            </h3>
                        </div>
                    </li>
                )}
            </ul>
        </div>
    );
}

function changeRoute(props, route) {
    console.log(props, route);
    props.history.push(route);
}

class PlaylistDetail extends Component {
    render() {
        console.log(this);
        return (
            <div className="container">
                <Playlist id={this.props.match.params.id} />
            </div>
        );
    }
}

export default withRouter(PlaylistDetail);