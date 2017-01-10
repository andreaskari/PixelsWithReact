import React, { Component } from 'react';

import PictureSelector from './PictureSelector.js';

export default class PanelMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePanelMenuOption: null,
      groupAndImages: null,
      activeGroupImage: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activePanelMenuOption: nextProps.activePanelMenuOption,
      groupAndImages: nextProps.groupAndImages,
      activeGroupImage: nextProps.activeGroupImage,
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

    return (
      <div className="pixel-body-left">
        <div className="ui big two item fluid menu">
          { this.props.menuOptions.map((option) => { return this.getMenuOptionHTML(option); }) }
        </div>
        <h2 className="white">Edit Image</h2>
      </div>
    );
  }
}
