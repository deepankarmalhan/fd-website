import React, { Component } from 'react';

export default class ImgurCallback extends Component {
  componentWillMount() {
    var params = {}, queryString = location.hash.substring(1),
    regex = /([^&=]+)=([^&]*)/g, m;

    while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }
    this.props.history.push({
      pathname: `/auth/register`,
      state: {
        imgurInfo: params,
        lastPath: 'ImgurCallback'
      }
    });
  }

  render() {
    return (
      <div className="title">Imgur tokens recieved, extracting them and redirecting you to Registration</div>
    );
  }
};
