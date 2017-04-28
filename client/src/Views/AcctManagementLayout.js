import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import DeleteAccountBox from './DeleteAccountBox';
import AcctInfoLayout from './AcctInfoLayout';

export default class AcctManagementLayout extends Component {
  render() {
    var matchRoute = this.props.match.url;
    return (
      <div>
        <h1 className="title">Manage your account</h1>
        <hr />
        <Route path={`${matchRoute}/delete`} component={DeleteAccountBox} />
        <Route exact path={matchRoute} component={AcctInfoLayout} />
      </div>
    );
  }
};
