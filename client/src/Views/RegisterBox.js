import React, { Component } from 'react';
import rp from 'request-promise';

export default class RegisterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      reqError: false,
      imgurInfo: {
        account_username: '',
        access_token: '',
        refresh_token: ''
      },
      msg: 'There was an error trying to register a new account, please try again later.'
    };
  }

  componentWillMount() {
    if(this.props.location.state) {
      this.setState({
        imgurInfo: this.props.location.state.imgurInfo,
      });
    }
  }

  hideError = (e) => {
    e.preventDefault();
    this.setState({ error: false });
  }

  registerForm = (e) => {
    e.preventDefault();
    if(
      !document.getElementById('usernameregister').value ||
      !document.getElementById('useremailregister').value ||
      !document.getElementById('passwdregister').value
    ) {
      this.setState({ reqError: true });
      return;
    }

    var endpoint;
    endpoint = (process.env.NODE_ENV === 'development') ? 'http://localhost:50001/api/auth/register' : 'https://fd-website.herokuapp.com/api/auth/register';

    // If everything is in order, register the user
        // Create an Imgur
    rp({
      method: 'POST',
      uri: `https://api.imgur.com/3/album`,
      body: {
        title: 'Food Diary'
      },
      headers: {
        'Authorization': `Bearer ${this.state.imgurInfo.access_token}`
      },
      json: true
    }).then((imgurdata) => {
      rp({
        method: 'POST',
        uri: endpoint,
        body: {
          firstnameregister: document.getElementById('firstnameregister').value,
          lastnameregister: document.getElementById('lastnameregister').value,
          usernameregister: document.getElementById('usernameregister').value,
          passwdregister: document.getElementById('passwdregister').value,
          useremailregister: document.getElementById('useremailregister').value,
          imguruseraccesstoken: this.state.imgurInfo.access_token,
          imguruserrefreshtoken: this.state.imgurInfo.refresh_token,
          imguralbumid: imgurdata.data.id
        },
        json: true
      }).then((data) => {
        if(data.error === false) {
          console.log(`Registered user, created session with: ${document.getElementById('usernameregister')}`);
          localStorage.setItem('clientName', document.getElementById('usernameregister').value);
          location.reload();
        }

        console.log(`Error while registering: ${JSON.stringify(data)}`);
        this.setState({ error: true });
      }).catch((registeringerr)=> {
        console.log(`Error occured while registering user, ${JSON.stringify(registeringerr)}`);
        return;
      });
      return;
    }).catch((err) => {
      console.log(`Error occured while creating Imgur album`);
      return;
    });
  }

  clearForm = (e) => {
    e.preventDefault();
    document.getElementById('registerForm').reset();
  }

  getImgurTokens= (e) => {
    e.preventDefault();
    var imgurURI = `https://api.imgur.com/oauth2/authorize?response_type=token&client_id=d67981700aee49f&state=`;
    window.location.href = imgurURI;
  }

  render() {
    var errorMsg = <div></div>;

    if(this.state.error) {
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

    var submitBtn = <button className="button is-primary" disabled>Register</button>;
    if(this.state.imgurInfo.access_token) {
      // Extract out the tokens here prob
      submitBtn = <button className="button is-primary" onClick={this.registerForm}>Register</button>;
    }
    
    return (
      <form id="registerForm">
        {errorMsg}

        <div className="field">
          <label className="label">Imgur User Access Token<p className="help is-info">Click on the "Generate Tokens" button to generate this token</p></label>
          <p className="control">
            <input id="useraccesstoken" className="input" type="text" value={this.state.imgurInfo.access_token} readOnly disabled />
          </p>
        </div>

        <div className="field">
          <label className="label">Imgur User Refresh Token<p className="help is-info">Click on the "Generate Tokens" button to generate this token</p></label>
          <p className="control">
            <input id="userrefreshtoken" className="input" type="text" value={this.state.imgurInfo.refresh_token} readOnly disabled/>
          </p>
        </div>

        <div className="field is-grouped">
          <p className="control">
            <button className="button is-info" onClick={this.getImgurTokens}>Generate Imgur tokens</button>
          </p>
        </div>

        <div className="field">
          <label className="label">First Name</label>
          <p className="control">
            <input id="firstnameregister" className="input" type="text" placeholder="Enter your First Name here"/>
          </p>
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <p className="control">
            <input id="lastnameregister" className="input" type="text" placeholder="Enter your Last Name here" />
          </p>
        </div>

        <div className="field">
          <label className="label">Username</label>
          <p className="control has-icons-left">
            <input id="usernameregister" className="input" type="text" defaultValue={this.state.imgurInfo.account_username} placeholder="Enter your username here"/>
            <span className="icon is-small is-left">
              <i className="fa fa-user"></i>
            </span>
          </p>
          {reqMsg}
        </div>

        <div className="field">
          <label className="label">Email <p className="help is-info">Use real email to have the ability to reset your password</p></label>
          <p className="control has-icons-left">
            <input id="useremailregister" className="input" type="text" placeholder="Enter your real email here" />
            <span className="icon is-small is-left">
              <i className="fa fa-envelope"></i>
            </span>
          </p>
          {reqMsg}
        </div>

        <div className="field">
          <label className="label">Password <p className="help is-warning">USE DUMMY PASSWORD</p></label>
          <p className="control">
            <input id="passwdregister" className="input" type="password" />
          </p>
          {reqMsg}
        </div>

        <div className="field is-grouped">
          <p className="control">
            {submitBtn}
          </p>
          <p className="control">
            <button className="button is-link" onClick={this.clearForm}>Reset</button>
          </p>
        </div>
      </form>
    );
  }
};
