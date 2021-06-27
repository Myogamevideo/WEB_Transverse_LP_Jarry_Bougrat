import React, { Component, Fragment } from 'react';
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

const GET_MUSICS = gql`
  {
    musics {
      _id
      title
      duration
    }
  }
`;

const CREATE_MUSIC = gql`
  mutation CreateMusic($title: String!, $author: ID!) {
    createMusic(title: $title, author: $author) {
      _id
      title
    }
  }
`;

function AddMusic() {
    let title;
    const [createMusic, { data }] = useMutation(CREATE_MUSIC);

    return (
        <form onSubmit={e => {
            e.preventDefault();
            createMusic({ variables: { title: title.value, author: '' } });
            title.value = '';
        }}>
            <h2>Create a music</h2>
            <input type="text" id="title" className="form-control" ref={htmlElement => { title = htmlElement; }} />
            <input type="submit" value="Add" />
        </form>
    );
}

function Musics() {
    const { loading, error, data } = useQuery(GET_MUSICS);

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
                {sessionStorage.getItem('session_token') ? (
                    <Fragment>
                        <AddMusic />
                        <hr />
                    </Fragment>
                ) : ''}
                <h4>List of all musics.</h4>
                <Musics />
            </div>
        );
    }
}

export default MusicList;