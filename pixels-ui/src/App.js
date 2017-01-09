import React, { Component } from 'react';

import PictureSelector from './PictureSelector.js';

// import logo from './logo.svg';
import './App.css';

var popsicle = require('popsicle');

let PIXEL_DATA_API_BASE_URL = "http://localhost:5000/";
let PIXEL_DATA_API_GROUPS_AND_IMAGES_URL = PIXEL_DATA_API_BASE_URL + "getGroupsAndImages/";
let PIXEL_DATA_API_GET_IMAGE_FROM_GROUP_IMAGE = PIXEL_DATA_API_BASE_URL + "getFromGroupAndImage/";

let PIXEL_SIDE_LENGTH = 15;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupAndImages: null,
      activeGroupImage: null,
      activeImageData: null,
    };

    // this.requestImage("Megaman", "Megaman1.png")
  }

  componentDidMount() {
    console.log("componentDidMount()");
    this.requestGroupsAndImagesMetadata();
    this.requestImage("Fruit", "Pomegranate.png")
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
      console.log('Received')
      this.setState({activeImageData: JSON.parse(res.body)});
    }

    var method = "GET";
    var url = PIXEL_DATA_API_GET_IMAGE_FROM_GROUP_IMAGE + group + "/" + image + "/";
    var headers = {};
    var body = {};
    console.log("requestImage(group, image)");
    this.makeAPICallWithCallback(method, url, body, headers, (res) => { callBack(res); });
  }

  getPixelDivHTML(pixel) {
    // var style = "background-color:rgb(" + pixel[0] + "," + pixel[1] + "," + pixel[2] + ")";
    if (pixel[0] === 128 || pixel[1] === 128 || pixel[2] === 128) {
      console.log(pixel);
    }

    return (
      <div 
        key={pixel[4] + "-" + pixel[5]}
        style={{
            "position": "absolute",
            "backgroundColor": "rgba(" + pixel[0] + "," + pixel[1] + "," + pixel[2] + "," + pixel[3] / 255 + ")",
            "top": pixel[5] * PIXEL_SIDE_LENGTH,
            "left": pixel[4] * PIXEL_SIDE_LENGTH,
            "width": PIXEL_SIDE_LENGTH, 
            "height": PIXEL_SIDE_LENGTH, 
          }} >

      </div>
    );
  }

  render() {
    if (this.state.activeImageData == null) {
      return (
        <div className="App" style={{"width": PIXEL_SIDE_LENGTH * 100, "height": PIXEL_SIDE_LENGTH * 100}}>
        </div>
      ); 
    }

    var pixels_json = this.state.activeImageData;

    console.log(pixels_json);
    var width = pixels_json.width;
    var height = pixels_json.height;
    var pixelArray = [];
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        var item = pixels_json.matrix[y][x];
        console.log(x);
        if (x === 50 && y === 9) {
          console.log(item);
        }

        // Add x,y coordinate respectivley to end of RGBA values
        item.push(x);
        item.push(y);
        pixelArray.push(item);
      }
    }
    console.log(pixelArray);

    return (
      <div className="app">
        <div className="header-container">
          <h1 className="website-name">Pixel Editor</h1>
        </div>
        <div className="pixel-body-left">
          <PictureSelector 
            groupAndImages={this.state.groupAndImages} 
            activeGroupImage={this.state.activeGroupImage}
            setActiveGroupImage={(group, image) => {
              this.setState({activeGroupImage: (group, image)});
            }}
          />
        </div>
        <div className="pixel-body-right">
          <div className="pixel-container-inner" 
            style={{
              "width": PIXEL_SIDE_LENGTH * width, 
              "height": PIXEL_SIDE_LENGTH * height}}
            >
            { pixelArray.map((pixel) => { return this.getPixelDivHTML(pixel); })}
          </div>
        </div>
      </div>      
    );
  }
}

export default App;
