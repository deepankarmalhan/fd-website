import React, { Component } from 'react';
import '../bulma.css';

export default class Footer extends Component {
  render() {
    return (
      <div className="columns">
        <div className="column is-half">
          <div className="nav">
            <div className="nav-left">
              <div className="nav-item">
                <a href="mailto:deepankar.malhan@my.ccsu.edu">Report a bug</a>
              </div>
              <div className="nav-item">
                <div className="fb-share-button" data-href="https://fd-website.herokuapp.com/" data-layout="button" data-size="large" data-mobile-iframe="true">
                  <a className="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ffd-website.herokuapp.com%2F&amp;src=sdkpreparse">
                    Share Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="column is-half">
          <div className="content">
            <h4>Created by Deepankar Malhan & Austin Miller</h4>
          </div>
        </div>
      </div>
    );
  }
};
