import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import { IoIosClose, IoMdCheckmark } from "react-icons/io";
import { FaPlusSquare } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";

const GET_MUSIC = gql`
  query Musics($id: ID!) {
    music(_id: $id) {
      _id
      name
    }
  }
`;

function Music({ arg, id }) {
    const { loading, error, data } = useQuery(GET_MUSIC, {
        variables: { id }
    });

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    const music = data.music;
    console.log("Data received from Project: ", music);
    return (
        <div>
            <h2>
                {music.name}
            </h2>
        </div>
    );
}


class MusicDetail extends Component {
    render() {
        console.log(this);
        return (
            <div className="container">
                <Music id={this.props.match.params.id} />
            </div>
        );
    }
}

export default withRouter(MusicDetail);