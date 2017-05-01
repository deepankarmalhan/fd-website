import React, { Component } from 'react';
import rp from 'request-promise';

export default class LogoutCallback extends Component {
  componentWillMount() {
    var endpoint;
    endpoint = (process.env.NODE_ENV === 'development') ? 'http://localhost:50001/api/auth/logout' : 'https://fd-website.herokuapp.com/api/auth/logout';
    localStorage.removeItem('clientName');
    rp({
      method: 'GET',
      uri: endpoint
    }).then((data) => {
      if(data.error === true) {
        console.log(`Couldn't destroy the session on server-side`);
        return;
      }
      location.reload();
    });
  }

  render() {
    return (
      <div className="title">Successfully logged out, redirecting you to the home page</div>
    );
  }
}
