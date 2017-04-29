import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../bulma.css';
import LoginBox from './LoginBox';
import RegisterBox from './RegisterBox';

export default class AuthenticationBox extends Component {

  switchLogin = () => {
    this.props.history.push(`${this.props.match.url}`);
  }

  switchRegister = () => {
    this.props.history.push(`${this.props.match.url}/register`);
  }

  render() {
    var matchRoute = this.props.match.url;
    return (
      <div>
        <h1 className="title">Login | Register</h1>
        <hr />
        <div className="columns">
          <div className="column is-half">
            <article className="message">
              <div className="message-body">
                Please remember to use a dummy password! We did not buy a certificate to enable SSL
                (thus making the backend server secure) because this is a demo website. Your password
                is properly <a href="https://security.stackexchange.com/a/36838" target="_blamk">hashed and salted</a> in the backend to
                prevent hackers from stealing your password. HOWEVER, we have not implemented end-to-end protection, which means
                anyone listening in on your internet traffic can extract your password for this website while you login or register.
              </div>
            </article>
          </div>

          <div className="column is-half">
            <div className="box">
              <div className="field has-addons has-addons-centered">
                <p className="control">
                  <a className="button" onClick={this.switchLogin}>
                    Login
                  </a>
                </p>
                <p className="control">
                  <a className="button" onClick={this.switchRegister}>
                    Register
                  </a>
                </p>
              </div>
              <hr />
              <Route path={`${matchRoute}/register`} component={RegisterBox} />
              <Route exact path={matchRoute} component={LoginBox} />
            </div>
          </div>
        </div>
      </div>
    );
  }
};
