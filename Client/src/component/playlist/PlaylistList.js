import React, {Component} from 'react';
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";


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

function Playlists() {
    const {loading, error, data} = useQuery(GET_PLAYLISTS);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <ul>
            {data.playlists.map(item =>
                <li key={item._id} value={item.name} className="playlist-list-item">
                    <h3>
                        {item.name}
                    </h3>
                    <p>
                        {item.musics.length} music(s) dans ce projet.
                    </p>
                </li>
            )}
        </ul>
    );
}

class PlaylistList extends Component {
    render() {
        return (
            <div className="container">
                <h4>List of all playlists.</h4>
                <Playlists/>
            </div>
        );
    }
}

export default PlaylistList;