import React, { Component } from 'react';

import PanelMenu from './PanelMenu.js';
import PictureViewer from './PictureViewer.js';

// import logo from './logo.svg';
import './App.css';

let TOOLS = ["Eye Dropper", "Pixel Selector", "Magic Wand", "Pixel Painter"];
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
      activeColor: {a: 1, r: 255, g: 255, b: 255},
      activeTool: null,
      selectedPixels: [],
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
            this.setState({
              activeGroupImage: {group, image},
              activeImageData: null,
              activeTool: null,
              selectedPixels: [],
            });
          }}
          activeColor={this.state.activeColor}
          setActiveColor={(color) => {
            console.log(color);
            this.setState({activeColor: color.rgb});
          }}
          tools={TOOLS}
          activeTool={this.state.activeTool}
          setActiveTool={(tool) => {
            this.setState({activeTool: tool});
          }}
        />
        <PictureViewer 
          activeImageData={this.state.activeImageData}
          setActiveImageData={(activeImageData) => {
            this.setState({activeImageData, selectedPixels: []});
          }}
          activeColor={this.state.activeColor}
          setActiveColor={(color) => {
            console.log(color);
            this.setState({activeColor: color});
          }}
          activeTool={this.state.activeTool}
          selectedPixels={this.state.selectedPixels}
          setSelectedPixels={(selectedPixels) => {
            this.setState({selectedPixels});
          }}
        />
      </div>      
    );
  }
}

export default App;
