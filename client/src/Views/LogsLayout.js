import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PendingLogs from './PendingLogs';
import ApprovedLogs from './ApprovedLogs';
import NewLogs from './NewLogs';

export default class LogsLayout extends Component {

  switchToCurrent = (e) => {
    e.preventDefault();
    this.props.history.push(`${this.props.match.url}`);
  }

  switchToPending = (e) => {
    e.preventDefault();
    this.props.history.push(`${this.props.match.url}/pending`);
  }

  render() {
    var matchRoute = this.props.match.url;
    return (
      <div>
        <div className="field has-addons has-addons-right">
          <p className="control">
            <button className="button" onClick={this.switchToCurrent}>Current Logs</button>
          </p>
          <p className="control">
            <button className="button" onClick={this.switchToPending}>Pending Logs</button>
          </p>
        </div>

        <div className="box">
          <Route path={`${matchRoute}/new`} component={NewLogs} />
          <Route path={`${matchRoute}/pending`} component={PendingLogs} />
          <Route exact path={matchRoute} component={ApprovedLogs} />
        </div>
      </div>
    );
  }
};
