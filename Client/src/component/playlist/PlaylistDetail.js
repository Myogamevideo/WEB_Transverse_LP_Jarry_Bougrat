import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import { IoIosClose, IoMdCheckmark } from "react-icons/io";
import { FaPlusSquare } from "react-icons/fa";
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
        title
      }
    }
  }
`;

function Playlist({ arg, id }) {
    const { loading, error, data } = useQuery(GET_PLAYLIST, {
        variables: { id }
    });

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    const playlist = data.playlist;
    console.log("Data received from Project: ", playlist);
    return (
        <div>
            <h2>
                {playlist.name}
            </h2>
            <p>
                {playlist.description}
            </p>
            <ul>
                {playlist.music.map(item =>
                    <li key={item._id} value={item.title} className="playlist-list-item">
                        <div className="playlist-item-detail">
                            <h3>
                                {item.title}
                            </h3>
                        </div>
                        <div className="playlist-item-action">
                            <IoIosClose
                                fontSize="1.75em"
                                color="tomato"
                                onClick={callMutationToCancelTask}
                            />
                            <IoMdCheckmark
                                fontSize="1.75em"
                                color="lightseagreen"
                                onClick={callMutationToValidateTask}
                            />
                        </div>
                    </li>
                )}
                <li className="playlist-list-item" onClick={callMutation}>
                    <div
                        className="playlist-item-action"
                        style={{
                            padding: "1em"
                        }}
                    >
                        <FaPlusSquare fontSize="1.5em" />
                    </div>
                    <div className="playlist-item-detail">
                        <h3>Add new music</h3>
                    </div>
                </li>
            </ul>
        </div>
    );
}

function callMutationToValidateTask() {
    alert("Development information: \n Call a mutation to validate this task");
}
function callMutationToCancelTask() {
    alert("Development information: \n Call a mutation to cancel this task");
}
function callMutation() {
    alert("Development information: \n Call a mutation to add a new task");
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