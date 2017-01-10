import React, { Component } from 'react';

import PictureSelector from './PictureSelector.js';

export default class PanelMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupAndImages: null,
      activeGroupImage: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      groupAndImages: nextProps.groupAndImages,
      activeGroupImage: nextProps.activeGroupImage,
    });
  }

  render() {
    return (
      <div className="pixel-body-left">
        <div className="ui big two item fluid menu">
          <a className="active item">Select Image</a>
          <a className="item">Edit Image</a>
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
}
