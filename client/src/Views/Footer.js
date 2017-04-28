import React, { Component } from 'react';
import '../bulma.css';

export default class Footer extends Component {
  render() {
    return (
      <nav className="tabs is-boxed">
        <ul>
          <li>
            <a href="mailto:deepankar.malhan@my.ccsu.edu">Report a bug</a>
          </li>
          <li>
            <div className="fb-share-button" data-href="https://fd-website.herokuapp.com/" data-layout="button" data-size="large" data-mobile-iframe="true">
              <a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ffd-website.herokuapp.com%2F&amp;src=sdkpreparse">
                Share Website
              </a>
            </div>
          </li>
          <li>
            <div className="container has-text-centered">
              <h2 className="subtitle">Created by Deepankar Malhan & Austin Miller</h2>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
};
