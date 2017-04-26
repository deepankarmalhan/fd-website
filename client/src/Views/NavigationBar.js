import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import '../bulma.css'
import '../font-awesome/css/font-awesome.min.css';

export default class NavigationBar extends Component {
  render() {
    var navItem
    var loginButton = <div>Home</div>;
    if(this.props.loggedIn == false) {
      loginButton = <div>Login | Register</div>;
    }
    return (
      <header className="nav has-shadow">
          <div className="nav-left">
            <a className="nav-item">
              <Link className="title" to="/">Food Diary</Link>
            </a>
          </div>

          <span class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div className="nav-right nav-menu">
          <Link className="nav-item is-active" to="/">
            {loginButton}
          </Link>
            <Link className="nav-item" to="/dashboard">
              Dashboard
            </Link>
            <Link className="nav-item" to="/account">
              My Account
            </Link>
            <span className="nav-item">
              <a className="button is-dark" href="https://github.com/deepankarmalhan/fd-website">
                <span className="icon">
                  <i className="fa fa-github"></i>
                </span>
                <span>Github Repository</span>
              </a>
            </span>
          </div>
      </header>
    );
  }
};
