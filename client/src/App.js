import React, { Component } from 'react';
import './bulma.css'
import './font-awesome/css/font-awesome.min.css';
import NavigationBar from './Views/NavigationBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }

  componentWillMount() {
    // Try to auto-login
    // If logged in, remove login button
  }

  render() {
    return (
      <section className="hero is-light is-fullheight is-bold">
        <div className="hero-head">
          <NavigationBar loggedIn={this.state.loggedIn}/>
        </div>

  <div className="hero-body">
    <div className="container has-text-centered">
      <h1 className="title">
        Title
      </h1>
      <h2 className="subtitle">
        Subtitle
      </h2>
    </div>
  </div>

  <div className="hero-foot">
    <nav className="tabs is-boxed">
        <ul>
          <li><a href="mailto:deepankar.malhan@my.ccsu.edu">Report a bug</a></li>
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
  </div>
</section>
    );
  }
}

export default App;
