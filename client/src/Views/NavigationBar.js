import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../bulma.css'
import '../font-awesome/css/font-awesome.min.css';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: this.props.isMobile
    };
  }

  render() {
    return (
      <header className="nav has-shadow">
          <div className="nav-left">
            <Link className="title" to="/">Food Diary</Link>
          </div>

          <span className={ (this.state.isMobile) ? 'nav-toggle is-active' : 'nav-toggle'} onClick={this.toggleMobileNav}>
            <span></span>
            <span></span>
            <span></span>
          </span>

          <div className={ (this.state.isMobile) ? 'nav-right nav-menu is-active' : 'nav-right nav-menu'}>
            <Link className={(this.props.currentActivePage === 'Login')? "nav-item is-active" : "nav-item"} to="/auth">
              {(this.props.loggedIn) ? 'Home' : 'Login | Register'}
            </Link>
            <Link className={(this.props.currentActivePage === 'Dashboard')? "nav-item is-active" : "nav-item"} to="/dashboard">
              Dashboard
            </Link>
            <Link className={(this.props.currentActivePage === 'Account')? "nav-item is-active" : "nav-item"} to="/myaccount">
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
