import React, { Component, Fragment } from 'react';
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

const GET_PLAYLISTS = gql`
  {
    playlists {
      _id
      name
      description
      creator{
        username
      }
      musics{
        title
      }
    }
  }
`;

const CREATE_PLAYLIST = gql`
  mutation CreatePlaylist($name: String!, $description: String!, $creator: ID!) {
    createPlaylist(name: $name, description: $description, creator: $creator) {
      _id
      name
      description
    }
  }
`;

const DELETE_PLAYLIST = gql`
  mutation DeletePlaylist($_id: ID!) {
    deletePlaylist(_id: $_id)
  }
`;

function AddPlaylist() {
  let name;
  let description;
  const [createPlaylist, { data }] = useMutation(CREATE_PLAYLIST);

  return (
    <form onSubmit={e => {
      e.preventDefault();
      createPlaylist({ variables: { name: name.value, description: description.value, creator: '' } });
      name.value = '';
      description.value = '';
    }}>
      <h2>Create a playlist</h2>
      <input type="text" id="name" ref={htmlElement => { name = htmlElement; }} />
      <input type="text" id="description" ref={htmlElement => { description = htmlElement; }} />
      <input type="submit" value="Add" />
    </form>
  );
}

function Playlists() {
  const { loading, error, data } = useQuery(GET_PLAYLISTS, { pollInterval: 1000 });
  const [deletePlaylist, deletePlayslistResult] = useMutation(DELETE_PLAYLIST);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <ul>
      {data.playlists.map(item =>
        <li key={item._id} value={item.name} className="playlist-list-item">
          <Link to={"/playlist/" + item._id}>
            <h3>
              {item.name}

              {sessionStorage.getItem('session_token') ? (
                <button className="btn btn-danger" onClick={
                  e => {
                    e.preventDefault();
                    deletePlaylist({ variables: { _id: item._id } });
                  }
                } > <FaMinus fontSize="1.5em" /> </button>
              ) : ''}
            </h3>
            <p>
              {item.musics.length} music(s) dans ce projet.
            </p>
          </Link>
        </li>
      )}
    </ul>
  );
}

class PlaylistList extends Component {
  render() {
    return (
      <div className="container">
        {sessionStorage.getItem('session_token') ? (
          <Fragment>
            <AddPlaylist />
            <hr />
          </Fragment>
        ) : ''}
        <h4>List of all playlists.</h4>
        <Playlists />
      </div>
    );
  }
}

export default PlaylistList;