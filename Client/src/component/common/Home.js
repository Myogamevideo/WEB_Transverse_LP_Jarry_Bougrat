import React, { Component } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const GET_GRAPHQL_INFO = gql`
  {
    userSchemaAssert
  }
`;

function CheckConfig() {
  const { loading, error, data, networkStatus } = useQuery(GET_GRAPHQL_INFO);

  if (loading) return <span className="status-warning">LOADING</span>;
  if (error) return <span className="status-error">ERROR</span>;
  return <span className="status-ok">OK</span>;
}

class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <h3>HomePage</h3>
        <p>Now we have:</p>
        <ul>
          <li>A server with GraphQL enable</li>
          <li>A client that wait to get data</li>
        </ul>
        <p>Next step, will be to add graphql on the client side.</p>
        <p>
          GraphQL status: <CheckConfig />
        </p>
        <p>We gonna build some queries, that will be sent to the server</p>
        <p>Queries:</p>
        <ul>
          <li>
            <strong>GetUserInformation</strong>: get user datas by id
          </li>
          <li>
            <strong>GetPlaylistsList</strong>: get all the playlists (by user)
          </li>
          <li>
            <strong>GetPlaylist</strong>: get a playlist by id
          </li>
          <li>
            <strong>GetMusicsList</strong>: get all the musics by playlists
          </li>
          <li>
            <strong>GetMusic</strong>: get a music by id
          </li>
        </ul>
      </div>
    );
  }
}

export default HomePage;