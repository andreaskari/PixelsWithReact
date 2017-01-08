import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

var popsicle = require('popsicle');

let PIXEL_DATA_API_BASE_URL = "http://localhost:5000/"
let PIXEL_DATA_API_GROUPS_AND_IMAGES_URL = PIXEL_DATA_API_BASE_URL + "getGroupsAndImages/"
let PIXEL_DATA_API_GET_IMAGE_FROM_GROUP_IMAGE = PIXEL_DATA_API_BASE_URL + "getFromGroupAndImage/"

let PIXEL_SIDE_LENGTH = 20;
// let TEST_JSON = '{"width": 23, "matrix": [[[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [128, 255, 255, 255], [128, 255, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [128, 255, 255, 255], [128, 255, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [128, 255, 255, 255], [128, 255, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [128, 255, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 128, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [128, 255, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [252, 226, 201, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [255, 255, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [128, 255, 255, 255], [0, 128, 255, 255], [252, 226, 201, 255], [255, 255, 255, 255], [255, 255, 255, 255], [0, 0, 0, 255], [0, 0, 0, 255], [252, 226, 201, 255], [0, 0, 0, 255], [255, 255, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 128, 255, 255], [252, 226, 201, 255], [255, 255, 255, 255], [255, 255, 255, 255], [0, 0, 0, 255], [0, 0, 0, 255], [252, 226, 201, 255], [0, 0, 0, 255], [255, 255, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 0, 0, 255], [0, 128, 255, 255], [252, 226, 201, 255], [252, 226, 201, 255], [255, 255, 255, 255], [255, 255, 255, 255], [255, 255, 255, 255], [252, 226, 201, 255], [255, 255, 255, 255], [255, 255, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 0, 0, 255], [128, 255, 255, 255], [128, 255, 255, 255], [0, 0, 0, 255], [0, 0, 128, 255], [252, 226, 201, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [252, 226, 201, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 128, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [0, 0, 0, 255], [252, 226, 201, 255], [252, 226, 201, 255], [252, 226, 201, 255], [252, 226, 201, 255], [252, 226, 201, 255], [0, 0, 0, 255], [128, 255, 255, 255], [128, 255, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [128, 255, 255, 255], [128, 255, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [128, 255, 255, 255], [0, 0, 0, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [0, 0, 0, 255], [128, 255, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [0, 0, 0, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [255, 255, 255, 0], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [128, 255, 255, 255], [128, 255, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [0, 0, 0, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [128, 255, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [128, 255, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [0, 0, 0, 255], [128, 255, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0]], [[255, 255, 255, 0], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 128, 255, 255], [0, 0, 0, 255], [255, 255, 255, 0]], [[255, 255, 255, 0], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [0, 0, 0, 255], [255, 255, 255, 0]], [[255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0], [255, 255, 255, 0]]], "height": 26}';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupAndImages: null,
      activeGroupImage: null,
      activeImageData: null,
    };

    this.requestImage("Fruit", "Pomegranate.png")
    // this.requestImage("Megaman", "Megaman1.png")
  }

  componentDidMount() {
    console.log("componentDidMount()");
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
      this.setState({groupAndImages: res.body});
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
      <div className="app ui padded equal height grid">
        <div className="ui eight wide column">
          <div className="ui segment">
            <div className="ui accordion">
              <div className="title active">
                <i className="dropdown icon"></i>
                What is a dog?
              </div>
              <div className="content active">
                <p className="transition visible">A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.</p>
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                What kinds of dogs are there?
              </div>
              <div className="content">
                <p>There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.</p>
              </div>
              <div className="title">
                <i className="dropdown icon"></i>
                How do you acquire a dog?
              </div>
              <div className="content">
                <p>Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.</p>
                <p>A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ui eight wide column">
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

    // return (
    //   <div className="App">
    //     <div className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <h2>Welcome to React</h2>
    //     </div>
    //     <p className="App-intro">
    //       To get started, edit <code>src/App.js</code> and save to reload.
    //     </p>
    //   </div>
    // );
  }
}

export default App;
