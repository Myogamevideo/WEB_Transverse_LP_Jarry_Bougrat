import React, { Component } from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withRouter } from 'react-router-dom';

const GET_USER = gql`
  query User($id: ID!) {
    user(_id: $id) {
      username,
      password,
      playlists {
        _id,
        name
      },
      musics {
        _id,
        title
      }
    }
  }
`;

function UserSheet({ id }) {


  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id }
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const userInfos = data.user;

  return (
    <div>
      <h1>Profil of {userInfos.username}</h1>
      <table>
        <tbody>
          <tr>
            <th>My musics:</th>
            <td>{userInfos.musics ? userInfos.musics.length : 0}</td>
          </tr>
          <tr>
            <th>My playlists:</th>
            <td>{userInfos.playslists ? userInfos.playslists.length : 0}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

class UserPage extends Component {
  render() {
    return (
      <div className="container">
        <UserSheet id={this.props.match.params.id} />
      </div>
    );
  }
}

export default withRouter(UserPage);