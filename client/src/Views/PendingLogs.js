import React, { Component } from 'react';
import rp from 'request-promise';

export default class PendingLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {},
      logs: [],
      noLogs: false
    }
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
    }).then((user) => {
      if(user.error) {
        return console.log(`Couldn't fetch the user before mounting PendingLogs component`);
      }
      if(user._doc.pendingLogs.length === 0) {
        return this.setState({ noLogs: true });
      }

      this.setState({
        client: user._doc,
        logs: user._doc.pendingLogs
      });
    }).catch((err) => {
      console.log(`Err occured while executing getting user promise for PendingLogs component, ${JSON.stringify(err)}`);
    });
  }

  render() {
    var indexKey = 0;

    if(this.state.noLogs) {
      return (
        <h1 className="subtitle">Good job, there are no pending logs! View accepted logs, or add more logs using the Raspberry Pi.</h1>
      );
    }

    return (
      <table className="table">
        <thead>
          <tr>
            <th>Log Number</th>
            <th>Image Preview</th>
            <th>Food Mass</th>
            <th>Log Mode</th>
            <th>UPC Code</th>
            <th>Ingredients Detected</th>
          </tr>
        </thead>
        <tbody>
          {this.state.logs.map((log, curIndex) => {
            return (
              <tr key={curIndex+1}>
                <th>{curIndex+1}</th>
                <th>
                  <img className="image" alt="Thumbnail of this pending food log" src={log.photoThumbnail}/>
                </th>
                <th>{(log.foodMass)/100}</th>
                <th>{log.logMode}</th>
                <th>{log.imgBarcode}</th>
                <th>
                  {
                    log.ingredientsDetected.map((ing, ingIndex) => {
                      var tagClassNames = ['is-primary', 'is-info', 'is-success', 'is-warning', 'is-light'];
                      var tagType = tagClassNames[Math.floor(Math.random() * tagClassNames.length)];
                      var ingClassName = `tag ${tagType}`;
                      return <span key={indexKey++} className={ingClassName}>{ing}</span>
                    })
                  }
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
};
