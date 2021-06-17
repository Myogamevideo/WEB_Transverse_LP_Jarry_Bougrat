import React, { Component } from 'react';

import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { withRouter } from 'react-router-dom';

const GET_USER = gql`
  query User($id: ID!) {
    user(_id: $id) {
      username,
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

function UserSheet() {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: "" }
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const userInfos = data.user;

  return (
    <div>
      <h1>My profil</h1>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <td>{userInfos.username}</td>
          </tr>
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

class ProfilPage extends Component {
  render() {
    return (
      <div className="container">
        <UserSheet />
      </div>
    );
  }
}

export default ProfilPage;