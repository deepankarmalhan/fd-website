import React, { Component } from 'react';
import rp from 'request-promise';

export default class AcctInfoLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        userName: '',
        passwd: '',
        userEmail: '',
        imgurUserAccessToken: '',
        imgurUserRefreshToken: ''
      },
      err: false,
      reqError: false,
      msg: 'Error getting user info'
    };
  }

  componentWillMount() {
    var endpoint;
    endpoint = (process.env.NODE_ENV === 'development') ? 'http://localhost:50001/api/accmanage/getacctinfo' : 'https://fd-website.herokuapp.com/api/accmanage/getacctinfo';
    rp({
      method: 'POST',
      uri: endpoint,
      body: {
        username: localStorage.getItem('clientName')
      },
      json: true
    }).then((data) => {
      if(data.error === true) {
        this.setState({ err: true });
        return;
      }
      this.setState({ user: data._doc });
    }).catch((err)=> {
      console.log(`Error occured while trying to fetch user info`);
    });
  }

  updateAcc = (e) => {
    e.preventDefault();
    if(
      !document.getElementById('usernameupdate').value ||
      !document.getElementById('useremailupdate').value ||
      !document.getElementById('passwdupdate').value
    ) {
      this.setState({ reqError: true });
      return;
    }

    var endpoint;
    endpoint = (process.env.NODE_ENV === 'development') ? 'http://localhost:50001/api/accmanage/updateacc' : 'https://fd-website.herokuapp.com/api/accmanage/updateacc';
    var updateUser = {
      firstnameupdate: document.getElementById('firstnameupdate').value,
      lastnameupdate: document.getElementById('lastnameupdate').value,
      usernameupdate: document.getElementById('usernameupdate').value,
      useremailupdate: document.getElementById('useremailupdate').value,
    }
    if(document.getElementById('passwdupdate').value) {
      updateUser.passwdupdate = document.getElementById('passwdupdate').value;
    }
    // Update account
    rp({
      method: 'POST',
      uri: endpoint,
      body: updateUser,
      json: true
    }).then((data) => {
      if(data.error) {
        console.log(`Send req, got an error response from the backend server, data is: ${JSON.stringify(data)}`);
        this.setState({ err: true, msg: data.msg });
        return;
      }
      console.log(`Send req, got res, worked`);
      this.props.history.push(`/dashboard`);
    }).catch((err) => {
      console.log(`Couldn't update account`);
      this.setState({ err: true });
    });
  }

  hideError = (e) => {
    e.preventDefault();
    this.setState({ err:false });
  }

  render() {
    var errorMsg = <div />
    if(this.state.err) {
      errorMsg = (
        <div className="notification is-danger">
          <button className="delete is-small" onClick={this.hideError}></button>
          {this.state.msg}
        </div>
      );
    }

    var reqMsg = <div></div>;
    if(this.state.reqError) {
      reqMsg = (<p className="help is-danger">Required field</p>);
    }

    var user = this.state.user;
    
    return (
      <div>
        <h1 className="subtitle">Please review and update your account info below<p className="help is-primary">Fill out all the fields with the old value if you don't want to update a particular field.</p></h1>
        <form id="updateForm">
          {errorMsg}

          <div className="field">
            <label className="label">Imgur User Access Token<p className="help is-info">Cannot be updated</p></label>
            <p className="control">
              <input id="useraccesstoken" className="input" type="text" value={this.state.user.imgurUserAccessToken} readOnly disabled />
            </p>
          </div>

          <div className="field">
            <label className="label">Imgur User Refresh Token<p className="help is-info">Cannot be updated</p></label>
            <p className="control">
              <input id="userrefreshtoken" className="input" type="text" value={this.state.user.imgurUserRefreshToken} readOnly disabled/>
            </p>
          </div>

          <div className="field">
            <label className="label">First Name</label>
            <p className="control">
              <input id="firstnameupdate" className="input" type="text" defaultValue={user.firstName} placeholder="Enter your first name here"/>
            </p>
          </div>

          <div className="field">
            <label className="label">Last Name</label>
            <p className="control">
              <input id="lastnameupdate" className="input" type="text" defaultValue={user.lastName} placeholder="Enter your last name here" />
            </p>
          </div>

          <div className="field">
            <label className="label">Username</label>
            <p className="control has-icons-left">
              <input id="usernameupdate" className="input" type="text" defaultValue={user.userName} placeholder="Enter your username here"/>
              <span className="icon is-small is-left">
                <i className="fa fa-user"></i>
              </span>
            </p>
            {reqMsg}
          </div>

          <div className="field">
            <label className="label">Email <p className="help is-info">Use real email to have the ability to reset your password</p></label>
            <p className="control has-icons-left">
              <input id="useremailupdate" className="input" type="text" defaultValue={user.userEmail} placeholder="Enter your email here"/>
              <span className="icon is-small is-left">
                <i className="fa fa-envelope"></i>
              </span>
            </p>
            {reqMsg}
          </div>

          <div className="field">
            <label className="label">Password <p className="help is-warning">USE DUMMY PASSWORD</p></label>
            <p className="control">
              <input id="passwdupdate" className="input" type="password" />
            </p>
            {reqMsg}
          </div>

          <div className="field is-grouped">
            <p className="control">
              <button className="button" onClick={this.updateAcc}>Update Account</button>
            </p>
          </div>
        </form>
      </div>
    );
  }
};
