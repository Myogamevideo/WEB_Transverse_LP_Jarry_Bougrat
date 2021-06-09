import React, { Component } from 'react';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";


const GET_MUSICS = gql`
  {
    musics {
      _id
      name
    }
  }
`;

function Musics() {
    const { loading, error, data } = useQuery(GET_MUSICS);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <ul>
            {data.musics.map(item =>
                <li key={item._id} value={item.name} className="music-list-item">
                    <h3>
                        {item.name}
                    </h3>
                </li>
            )}
        </ul>
    );
}

class MusicList extends Component {
    render() {
        return (
            <div className="container">
                <h4>List of all musics.</h4>
                <Musics />
            </div>
        );
    }
}

export default MusicList;