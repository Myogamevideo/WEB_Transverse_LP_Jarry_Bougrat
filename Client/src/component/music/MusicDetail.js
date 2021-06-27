import React, { Component } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { IoIosClose, IoMdCheckmark } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";

const GET_MUSIC = gql`
  query Musics($id: ID!) {
    music(_id: $id) {
      _id
      title
    }
  }
`;

const DELETE_MUSIC = gql`
  mutation DeleteMusic($_id: ID!) {
    deleteMusic(_id: $_id)
  }
`;

function Music({ arg, id, history }) {
    const { loading, error, data } = useQuery(GET_MUSIC, {
        variables: { id }
    });
    const [deleteMusic, deleteMusicResult] = useMutation(DELETE_MUSIC);

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    const music = data.music;
    console.log("Data received from Music: ", music);
    return (
        <div>
            <h2>
                {music.title}
                {sessionStorage.getItem('session_token') ? (
                    <button className="btn btn-danger" onClick={
                        e => {
                            e.preventDefault();
                            deleteMusic({ variables: { _id: id } });
                            history.push('/musics');
                        }
                    } > <FaMinus fontSize="1.5em" /> </button>
                ) : ''}
            </h2>
        </div>
    );
}


class MusicDetail extends Component {
    render() {
        console.log(this);
        return (
            <div className="container">
                <Music id={this.props.match.params.id} history={this.props.history} />
            </div>
        );
    }
}

export default withRouter(MusicDetail);