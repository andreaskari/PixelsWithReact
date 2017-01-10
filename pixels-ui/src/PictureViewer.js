import React, { Component } from 'react';

let PIXEL_SIDE_LENGTH = 15;

export default class PictureViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeImageData: props.activeImageData,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeImageData: nextProps.activeImageData,
    });
  }

  getPixelDivHTML(pixel) {
    return (
      <div 
        key={pixel[4] + "-" + pixel[5]}
        style={{
            "position": "absolute",
            "backgroundColor": "rgba(" + pixel[0] + "," + pixel[1] 
                                + "," + pixel[2] + "," + pixel[3] / 255 + ")",
            "top": pixel[5] * PIXEL_SIDE_LENGTH,
            "left": pixel[4] * PIXEL_SIDE_LENGTH,
            "width": PIXEL_SIDE_LENGTH, 
            "height": PIXEL_SIDE_LENGTH, 
          }} >

      </div>
    );
  }

  render() {
    console.log("rerender");

    if (this.state.activeImageData == null) {
      return (
        <div 
          className="pixel-container-inner"
          style={{
            "width": "200px", 
            "height": "200px"}}
          >
          <div className="ui active centered big loader"></div>
        </div>
      );
    }

    var width = this.state.activeImageData.width;
    var height = this.state.activeImageData.height;
    var pixelArray = [];
    console.log(this.state.activeImageData);
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        /* Add x,y coordinate respectivley to end of RGBA values */
        var item = this.state.activeImageData.matrix[y][x];
        console.log(item);
        item.push(x);
        item.push(y);
        pixelArray.push(item);
      }
    }

    console.log("change");

    return (
      <div 
        className="pixel-container-inner" 
        style={{
          "width": PIXEL_SIDE_LENGTH * width, 
          "height": PIXEL_SIDE_LENGTH * height}}
        >
        { pixelArray.map((pixel) => { return this.getPixelDivHTML(pixel); })}
      </div>
    );

  }
}
