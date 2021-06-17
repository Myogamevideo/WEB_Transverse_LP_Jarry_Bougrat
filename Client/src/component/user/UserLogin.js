import React, { Component, Fragment } from 'react';
import { useMutation } from "@apollo/react-hooks";
import { withRouter } from 'react-router-dom';
import gql from "graphql-tag";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) { token }
  }
`

function handleLoginSuccess(data) {
  sessionStorage.setItem('session_token', data.login.token);
}

function LoginForm() {
  let username;
  let password;
  let loginFormError;
  const [login, { data }] = useMutation(LOGIN, { onCompleted: handleLoginSuccess, onError: (err) => loginFormError = err.graphQLErrors[0].message, });

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault();
        login({
          variables: { username: username.value, password: password.value },
        });
        username.value = '';
        password.value = '';
      }}>
        <h2>Login</h2>
        {/* FIXME: */}
        <p ref={loginFormError}></p>
        <label htmlFor="username">Username :</label>
        <br />
        <input type="text" id="username" ref={htmlElement => { username = htmlElement; }} />
        <br />
        <label htmlFor="password">Password :</label>
        <br />
        <input type="password" id="password" ref={htmlElement => { password = htmlElement; }} />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

class UserLogin extends Component {
  render() {
    return (
      <Fragment>
        <LoginForm />
      </Fragment>
    );
  }
}

export default withRouter(UserLogin);