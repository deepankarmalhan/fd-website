import React, { Component } from 'react';
import rp from 'request-promise';

export default class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state= {
      error: false,
      message: ''
    };
  }

  loginClick = (e) => {
    e.preventDefault();
    var endpoint;
    endpoint = (process.env.NODE_ENV === 'development') ? 'http://localhost:50001/api/auth/login' : 'https://fd-website.herokuapp.com/api/auth/login';
    rp({
      method: 'POST',
      uri: endpoint,
      body: {
        usernamelogin: document.getElementById('usernamelogin').value,
        passwdlogin: document.getElementById('passwdlogin').value
      },
      json: true
    }).then((data) => {
      if(data.authenticated) {
        sessionStorage.setItem('clientName', document.getElementById('usernamelogin'));
        this.props.history.push(`/dashboard`);
        return;
      }
      console.log(`Authentication failed, ${JSON.stringify(data)}`);
      this.setState(data);
      // Show an error of not having proper login ID
    }).catch((err) => {
      console.log(`Could not talk to server, ${JSON.stringify(err)}`);
    });
  }

  clearForm = (e) => {
    e.preventDefault();
    document.getElementById('loginForm').reset();
  }

  closeErrorMsg = (e) => {
    e.preventDefault();
    this.setState({ error: false });
  }

  render() {
    var errorMsg = <div></div>;
    if(this.state.error) {
      errorMsg = (
        <div className="notification is-danger">
          <button className="delete is-small" onClick={this.closeErrorMsg}></button>
          Authentication failed, please check your username/password and try again
        </div>
      );
    }
    return (
      <form id="loginForm">
        {errorMsg}
        <div className="field">
          <label className="label">Username</label>
          <p className="control has-icons-left">
            <input id="usernamelogin" className="input" type="text" placeholder="Enter your username here" />
            <span className="icon is-small is-left">
              <i className="fa fa-user"></i>
            </span>
          </p>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <p className="control">
            <input id="passwdlogin" className="input" type="password" />
          </p>
        </div>

        <div className="field is-grouped">
          <p className="control">
            <button className="button is-info" onClick={this.loginClick}>Login</button>
          </p>
          <p className="control">
            <button className="button is-link" onClick={this.clearForm}>Reset Form</button>
          </p>
        </div>
      </form>
    );
  }
};
