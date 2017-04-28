import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LogsLayout from './LogsLayout';

export default class DashboardMainLayout extends Component {
  render() {
    var matchRoute = this.props.match.url;
    return (
      <div>
        <h1 className="title">Welcome to your Dashboard</h1>
        <hr />
        <Route path={matchRoute} component={LogsLayout} />
      </div>
    );
  }
};
