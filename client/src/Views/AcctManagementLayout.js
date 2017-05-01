import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import DeleteAccountBox from './DeleteAccountBox';
import AcctInfoLayout from './AcctInfoLayout';

export default class AcctManagementLayout extends Component {

  componentWillMount() {
    if(!localStorage.clientName) {
      this.props.history.push(`/auth`);
    }
  }

  render() {
    var matchRoute = this.props.match.url;
    return (
      <div>
        <div className="columns">
          <div className="column is-6 is-offset-3">
            <h1 className="title">Manage your account</h1>
            <hr />
            <Route path={`${matchRoute}/delete`} component={DeleteAccountBox} />
            <Route exact path={matchRoute} component={AcctInfoLayout} />
          </div>
        </div>
      </div>
    );
  }
};
