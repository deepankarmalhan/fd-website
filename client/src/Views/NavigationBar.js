import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../bulma.css'
import '../font-awesome/css/font-awesome.min.css';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: this.props.isMobile,
      loggedIn: false
    };
  }

  componentWillMount() {
    if(localStorage.clientName) {
      this.setState({ loggedIn: true });
    }
  }

  render() {
    var userMsg = '';
    var logoutBtn = <div />;
    var initialBtn = <Link className="nav-item" to="/auth">Login | Register</Link>

    if(this.state.loggedIn) {
      userMsg = `Hello, ${localStorage.getItem('clientName')}`;
      logoutBtn = <Link className="nav-item" to="/auth/logoutcallback">Logout</Link>
      initialBtn = <div />
    }

    return (
      <header className="nav has-shadow">
        <div className="nav-left">
          <div className="nav-item">
            <Link className="title" to="/">Food Diary</Link>
          </div>
          <div className="nav-item">
            {userMsg}
          </div>
        </div>

          <span className={ (this.state.isMobile) ? 'nav-toggle is-active' : 'nav-toggle'} onClick={this.toggleMobileNav}>
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div className={ (this.state.isMobile) ? 'nav-right nav-menu is-active' : 'nav-right nav-menu'}>
            {initialBtn}
            {logoutBtn}
            <Link className="nav-item" to="/dashboard">
              Dashboard
            </Link>
            <Link className="nav-item" to="/myaccount">
              My Account
            </Link>
            <span className="nav-item">
              <a className="button is-dark" href="https://github.com/deepankarmalhan/fd-website" target="_blank">
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

  toggleMobileNav = () => {
    this.setState((prevState, props) => {
      return {
        isMobile: !prevState.isMobile
      };
    });
  }
};
