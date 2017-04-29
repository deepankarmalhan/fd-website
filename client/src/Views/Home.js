import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className="content">
        <h1 className="title">Welcome to Food Diary, a CCSU CS 355 Spring'17 Project</h1>
        <hr />

        <h2 className="subtitle"><strong>What is this project:</strong></h2>
        <p>
          People are becoming more conscious about their daily diet. Food and beverage manufacturers are becoming
          more aware in this public shift and are trying to create new products which appeal to the healthier sides
          of today's shoppers. Our project is aimed at creating a product which users can use to keep track of what
          they eat, when they eat it, and have the ability to sort through this data whenver they want to.
        </p>

        <blockquote>
          <em>
            This product will enable them to look at their eating habits and pinpoint the exact food that they need
            to give up to live a healthier lifestyle.
          </em>
        </blockquote>

        <p>
          Please use the links above to register/login, and access your dashboard. This website is an supplementary
          interface to the <strong> C application that we have designed for a Raspberry Pi</strong>. It utilizes <a href="https://www.imgur.com" target="_blank"><u>Imgur</u></a> to
          store the images of the food that you eat, so you will need to either create a new account or login to your existing Imgur account during the registeration process on this website.
        </p>

        <h2 className="subtitle"><strong>How it works:</strong></h2>
        <ul>
          <li>You create a new account on this website, and Imgur (unless you have an existing account with them).</li>
          <li>Every time you eat a new food, there are two ways to create your logs:</li>

          <ul>
            <li>Through a Raspberry Pi</li>

            <ol>
              <li>Enter your username after a prompt on the terminal.</li>
              <li>Either put food without a barcode on the USB Scale (<em>fruits, homemade food, etc.</em>)
              or hold the barcode up in front of the camera.</li>
              <li>The application will automatically detect if it should scan the barcode or take a photo of your food.</li>
              <li>The photo of your barcode will be processed on the Pi, and the UPC code will be sent to this website's backend API.
              If the camera took a photo of your food, it will be uploaded to Imgur, and added as a reference to your account's pending logs.</li>
              <li>Visit this website to access <strong>your pending logs</strong>, and make final edits to them (<em>ingredients detected in your food, mass of the food, etc.</em>)
              before accepting the changes which moves them to <strong>your accepted logs</strong>.</li>
              <li>COMING SOON: See recommendations according to your physical attributes and logs to eat better.</li>
            </ol>

            <li>COMING SOON: Through this website</li>
          </ul>
        </ul>
      </div>
    );
  }
};
