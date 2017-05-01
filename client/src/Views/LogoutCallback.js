import React, { Component } from 'react';

export default class LogoutCallback extends Component {
  componentWillMount() {
    localStorage.removeItem('clientName');
    location.reload();
  }

  render() {
    return (
      <div className="title">Successfully logged out, redirecting you to the home page</div>
    );
  }
}
