import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import '../bulma.css';
import LoginBox from './LoginBox';
import RegisterBox from './RegisterBox';

export default class AuthenticationBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authModeLogin: true,
      formData: {}
    };
  }

  render() {
    var matchRoute = this.props.match.url;
    return (
      <div>
        <h1 className="title">AuthenticationBox rendered</h1>
        <hr />
        <Route path={`${matchRoute}/login`} component={LoginBox} />
        <Route path={`${matchRoute}/register`} component={RegisterBox} />
      </div>
    );
  }
};
