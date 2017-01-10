import React, { Component } from 'react';

import PanelMenu from './PanelMenu.js';
import PictureViewer from './PictureViewer.js';

// import logo from './logo.svg';
import './App.css';

let MENU_OPTIONS = ["Select Image", "Edit Image"];

var popsicle = require('popsicle');

let PIXEL_DATA_API_BASE_URL = "http://localhost:5000/";
let PIXEL_DATA_API_GROUPS_AND_IMAGES_URL = PIXEL_DATA_API_BASE_URL + "getGroupsAndImages/";
let PIXEL_DATA_API_GET_IMAGE_FROM_GROUP_IMAGE = PIXEL_DATA_API_BASE_URL + "getFromGroupAndImage/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePanelMenuOption: MENU_OPTIONS[0],
      groupAndImages: null,
      activeGroupImage: null,
      activeImageData: null,
    };

    // this.requestImage("Megaman", "Megaman1.png")
  }

  componentDidUpdate(prevProps, prevState) {
    /* After a new image has been chosen to render, 
      this.state.activeGroupImage would have changed */
      if (prevState.activeGroupImage !== this.state.activeGroupImage) {
        console.log(this.state);
        var {group, image} = this.state.activeGroupImage;
        this.requestImage(group, image);
      }
  }


  componentDidMount() {
    console.log("componentDidMount()");
    this.requestGroupsAndImagesMetadata();
    // this.requestImage("Fruit", "Pomegranate.png")
  }

  makeAPICallWithCallback(method, url, body, headers, callBack) {
    popsicle.request({
      method: method,
      url: url,
      body: body,
      headers: headers,
      options: { rejectUnauthorized: false }
    })
    .then((res) => { callBack(res); })
  }

  requestGroupsAndImagesMetadata() {
    var callBack = (res) => {
      console.log("received from requestGroupsAndImagesMetadata()");      
      this.setState({groupAndImages: JSON.parse(res.body)});
    }

    var method = "GET";
    var url = PIXEL_DATA_API_GROUPS_AND_IMAGES_URL;
    var headers = {};
    var body = {};
    console.log("requestGroupsAndImagesMetadata()");
    this.makeAPICallWithCallback(method, url, body, headers, (res) => { callBack(res); });
  }

  requestImage(group, image) {
    var callBack = (res) => {
      console.log("received from requestImage(group, image)");      
      console.log(JSON.parse(res.body));
      this.setState({activeImageData: JSON.parse(res.body)});
    }

    var method = "GET";
    var url = PIXEL_DATA_API_GET_IMAGE_FROM_GROUP_IMAGE + group + "/" + image + "/";
    var headers = {};
    var body = {};
    console.log("requestImage(group, image)");
    this.makeAPICallWithCallback(method, url, body, headers, (res) => { callBack(res); });
  }

  render() {
    return (
      <div className="app">
        <div className="header-container">
          <h1 className="white website-name">Pixel Editor</h1>
        </div>
        <PanelMenu
          menuOptions={MENU_OPTIONS}
          activePanelMenuOption={this.state.activePanelMenuOption} 
          setActivePanelMenuOption={(option) => { this.setState({activePanelMenuOption: option}); }}
          groupAndImages={this.state.groupAndImages} 
          activeGroupImage={this.state.activeGroupImage}
          setActiveGroupImage={(group, image) => {
            console.log(group, image);
            this.setState({
              activeGroupImage: {group, image},
              activeImageData: null,
            });
          }}
        />
        <PictureViewer 
          activeImageData={this.state.activeImageData} 
        />
      </div>      
    );
  }
}

export default App;
