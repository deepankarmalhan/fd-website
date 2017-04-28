import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PendingLogs from './PendingLogs';
import ApprovedLogs from './ApprovedLogs';
import NewLogs from './NewLogs';

export default class LogsLayout extends Component {
  render() {
    var matchRoute = this.props.match.url;
    console.log(`LogsLayout matchRoute: ${matchRoute}`);
    return (
      <div>
        <h1 className="subtitle">LogsLayout rendered</h1>
        <hr />
        <Route path={`${matchRoute}/new`} component={NewLogs} />
        <Route path={`${matchRoute}/pending`} component={PendingLogs} />
        <Route exact path={matchRoute} component={ApprovedLogs} />
      </div>
    );
  }
};
