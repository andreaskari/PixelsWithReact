import React, { Component } from 'react';

let PIXEL_SIDE_LENGTH = 15;

export default class PictureViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeImageData: props.activeImageData,
      activeColor: props.activeColor,
      activeTool: props.activeTool,
      selectedPixels: props.selectedPixels,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeImageData: nextProps.activeImageData,
      activeColor: nextProps.activeColor,
      activeTool: nextProps.activeTool,
      selectedPixels: nextProps.selectedPixels,
    });
  }

  colorsMatch(pixel1, pixel2) {
    return pixel1[0] === pixel2[0] && pixel1[1] === pixel2[1] && pixel1[2] === pixel2[2] && pixel1[3] === pixel2[3];
  }

  magicWandPixelSearch(x, y) {
    var width = this.state.activeImageData.width;
    var height = this.state.activeImageData.height;
    var searchMatrix = [];
    for (var j = 0; j < height; j += 1) {
      var row = []
      for (var i = 0; i < width; i += 1) {
        row.push(false);
      }
      searchMatrix.push(row);
    }
    var helperObj = {
      searchMatrix: searchMatrix, 
      pixelMatrix: this.state.activeImageData.matrix,
      selectedPixels: [],
    };
    this.magicWandPixelSearchHelper(x, y, helperObj, width, height)
    return helperObj.selectedPixels;
  }

  magicWandPixelSearchHelper(x, y, helperObj, width, height) {
    console.log(helperObj);
    console.log(x, y);
    helperObj.searchMatrix[y][x] = true;
    helperObj.selectedPixels.push([x, y]);
    if (x+1 < width && !helperObj.searchMatrix[y][x+1] && this.colorsMatch(helperObj.pixelMatrix[y][x+1], helperObj.pixelMatrix[y][x])) {
      this.magicWandPixelSearchHelper(x+1, y, helperObj, width, height);
    }
    if (x-1 >=0 && !helperObj.searchMatrix[y][x-1] && this.colorsMatch(helperObj.pixelMatrix[y][x-1], helperObj.pixelMatrix[y][x])) {
      this.magicWandPixelSearchHelper(x-1, y, helperObj, width, height);
    }
    if (y+1 < height && !helperObj.searchMatrix[y+1][x] && this.colorsMatch(helperObj.pixelMatrix[y+1][x], helperObj.pixelMatrix[y][x])) {
      this.magicWandPixelSearchHelper(x, y+1, helperObj, width, height);
    }
    if (y-1 >= 0 && !helperObj.searchMatrix[y-1][x] && this.colorsMatch(helperObj.pixelMatrix[y-1][x], helperObj.pixelMatrix[y][x])) {
      this.magicWandPixelSearchHelper(x, y-1, helperObj, width, height);
    }
  }

  getPixelDivHTML(pixel) {
    var onClickByTool = () => {
      if (this.state.activeTool === "Eye Dropper") {
        console.log("Eye Dropper");
        this.props.setActiveColor({a: pixel[3] / 255, r: pixel[0], g: pixel[1], b: pixel[2]});
      } else if (this.state.activeTool === "Pixel Selector") {
        console.log("Pixel Selector");
        var selectedPixels = this.state.selectedPixels;
        selectedPixels.push([pixel[4], pixel[5]]);
        this.props.setSelectedPixels(selectedPixels);
      } else if (this.state.activeTool === "Magic Wand") {
        console.log("Magic Wand");
        var selectedPixels = this.magicWandPixelSearch(pixel[4], pixel[5]);
        this.props.setSelectedPixels(selectedPixels);
      } else if (this.state.activeTool === "Pixel Painter") {
        console.log("Pixel Painter");
        var activeImageData = this.state.activeImageData;
        let c = this.state.activeColor;
        this.state.selectedPixels.forEach((p) => {
          this.state.activeImageData.matrix[p[1]][p[0]] = [c.r, c.g, c.b, c.a * 255];
        });
        this.props.setActiveImageData(activeImageData);
      }
    };

    var className = "";
    this.state.selectedPixels.forEach((p) => {
      if (p[0] == pixel[4] && p[1] == pixel[5]) {
        className = "selected-pixel";
      }
    });

    return (
      <div 
        key={pixel[4] + "-" + pixel[5]}
        onClick={onClickByTool}
        className={className}
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
    if (this.state.activeImageData == null) {
      return (
        <div className="pixel-body-right">
          <div 
            className="pixel-container-inner"
            style={{
              "width": "200px", 
              "height": "200px"}}
            >
            <div className="ui active centered big loader"></div>
          </div>
        </div>
      );
    }

    var width = this.state.activeImageData.width;
    var height = this.state.activeImageData.height;
    var pixelArray = [];
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        /* Add x,y coordinate respectivley to end of RGBA values */
        var item = this.state.activeImageData.matrix[y][x];
        // console.log(item);
        item.push(x);
        item.push(y);
        pixelArray.push(item);
      }
    }

    return (
      <div className="pixel-body-right">
        <div 
          className="pixel-container-inner" 
          style={{
            "width": PIXEL_SIDE_LENGTH * width, 
            "height": PIXEL_SIDE_LENGTH * height}}
          >
          { pixelArray.map((pixel) => { return this.getPixelDivHTML(pixel); })}
        </div>
      </div>
    );

  }
}
