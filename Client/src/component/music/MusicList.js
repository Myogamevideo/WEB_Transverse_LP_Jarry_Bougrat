import React, {Component} from 'react';
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";
import {Link} from "react-router-dom";

const GET_MUSICS = gql`
  {
    musics {
      _id
      title
      duration
    }
  }
`;

function Musics() {
    const {loading, error, data} = useQuery(GET_MUSICS);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return (
        <ul>
            {data.musics.map(item =>
                <li key={item._id} value={item.title} className="music-list-item">
                    <Link to={"/music/" + item._id}>
                        <h3>
                            {item.title}
                        </h3>

                        <p>
                            - {item.duration} sec
                        </p>
                    </Link>
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
                <Musics/>
            </div>
        );
    }
}

export default MusicList;