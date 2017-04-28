import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  IndexRoute
} from 'react-router-dom';
import App from './App';
import Home from './Views/Home';
import AuthenticationBox from './Views/AuthenticationBox';
import LoginBox from './Views/LoginBox';
import RegisterBox from './Views/RegisterBox';
import DashboardMainLayout from './Views/DashboardMainLayout';
import LogsLayout from './Views/LogsLayout';
import PendingLogs from './Views/PendingLogs';
import ApprovedLogs from './Views/ApprovedLogs';
import NewLogs from './Views/NewLogs';
import AcctManagementLayout from './Views/AcctManagementLayout';
import AcctInfoLayout from './Views/AcctInfoLayout';
import DeleteAccountBox from './Views/DeleteAccountBox';

ReactDOM.render(
  <Router>
    <Route path="/" component={ App } >
      <IndexRoute component={Home} />
      <Route path="auth" component={AuthenticationBox}>
        <Route path="login" component={LoginBox} />
        <Route path="register" component={RegisterBox} />
      </Route>
      <Route path="dashboard" component={DashboardMainLayout}>
        <Route path="logs" component={LogsLayout}>
          <Route path="pending" component={PendingLogs} />
          <Route path="approved" component={ApprovedLogs} />
          <Route path="new" component={NewLogs} />
        </Route>
      </Route>
      <Route path="myaccount" component={AcctManagementLayout}>
        <IndexRoute component={AcctInfoLayout} />
        <Route path="delete" component={DeleteAccountBox} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
