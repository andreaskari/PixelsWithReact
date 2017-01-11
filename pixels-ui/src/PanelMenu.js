import React, { Component } from 'react';

import { ChromePicker, SwatchesPicker } from 'react-color';

import PictureSelector from './PictureSelector.js';

export default class PanelMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePanelMenuOption: props.activePanelMenuOption,
      groupAndImages: props.groupAndImages,
      activeGroupImage: props.activeGroupImage,
      activeColor: props.activeColor,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activePanelMenuOption: nextProps.activePanelMenuOption,
      groupAndImages: nextProps.groupAndImages,
      activeGroupImage: nextProps.activeGroupImage,
      activeColor: nextProps.activeColor,
    });
  }

  getMenuOptionHTML(option) {
    if (option === this.state.activePanelMenuOption) {
      return (
        <a key={option} className="active item">{option}</a>
      );
    }

    return (
      <a key={option} className="item" onClick={() => { this.props.setActivePanelMenuOption(option); }}>
        {option}
        </a>
    );
  }

  handleActiveColorChange(color) {
    console.log(color);
    this.setState({activeColor: color.rgb});
  }

  render() {
    if (this.state.activePanelMenuOption === this.props.menuOptions[0]) {
      return (
        <div className="pixel-body-left">
          <div className="ui big two item fluid menu">
            { this.props.menuOptions.map((option) => { return this.getMenuOptionHTML(option); }) }
          </div>
          <h2 className="white">Choose an Image</h2>
          <PictureSelector 
            groupAndImages={this.state.groupAndImages} 
            activeGroupImage={this.state.activeGroupImage}
            setActiveGroupImage={this.props.setActiveGroupImage}
          />
        </div>
      );
    }

    let c = this.state.activeColor;
    var activeRGBA = "rgba(" + c.r + "," + c.g + "," + c.b + "," + c.a + ")";

    return (
      <div className="pixel-body-left">
        <div className="ui big two item fluid menu">
          { this.props.menuOptions.map((option) => { return this.getMenuOptionHTML(option); }) }
        </div>
        <h2 className="white">Toolbox</h2>
        <button className="ui large circular eyedropper icon button">
          <i className="eyedropper icon"></i>
        </button>
        <button className="ui large circular hand pointer icon button">
          <i className="hand pointer icon"></i>
        </button>
        <button className="ui large circular wizard icon button">
          <i className="wizard icon"></i>
        </button>
        <button className="ui large circular paint brush icon button">
          <i className="paint brush icon"></i>
        </button>
        <h2 className="white">Color Palette</h2>
        <div className="clearfix">
          <div className="float-left">
            <ChromePicker
              color={this.state.activeColor}
              onChangeComplete={this.props.setActiveColor}
            />
          </div>
          <div className="float-right">
            <SwatchesPicker
              color={this.state.activeColor}
              onChangeComplete={this.props.setActiveColor}
            />
          </div>
        </div>
        <h4 className="white" style={{"marginTop": "10px"}}>Active Color</h4>
        <div className="active-color-container">
          <div className="active-color" style={{"backgroundColor": activeRGBA}} ></div>
        </div>
      </div>
    );
  }
}
