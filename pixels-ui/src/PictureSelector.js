import React, { Component } from 'react';

export default class PictureSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupAndImages: props.groupAndImages,
      activeGroupImage: props.activeGroupImage,
      activeAccordianContent: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      groupAndImages: nextProps.groupAndImages,
      activeGroupImage: nextProps.activeGroupImage,
    });
  }

  setActiveAccordianContent(group) {
    this.setState({activeAccordianContent: group});
  }

  getTitleContentHTML(group, images) {
    var getContent = (image) => { return this.getContentButtonHTML(group, image); }; 

    if (this.state.activeAccordianContent === group) {
      return (
        <div key={group + "-" + images}>
          <div className="title active" onClick={() => {this.setActiveAccordianContent(null)}}>
            <i className="dropdown icon"></i>
            {group}
          </div>
          <div className="content active">
            <div className="ui grid">
              {images.map(getContent)}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={group + "-" + images}>
        <div className="title" onClick={() => {this.setActiveAccordianContent(group)}}>
          <i className="dropdown icon"></i>
          {group}
        </div>
        <div className="content">
          <div className="ui padded grid">
            {images.map(getContent)}
          </div>
        </div>
      </div>
    );
  }

  getContentButtonHTML(group, image) {
    var setActiveGroupImage = () => { this.props.setActiveGroupImage(group, image); };

    var imageName = image.substring(0, image.length - 4);

    if (this.state.activeGroupImage && this.state.activeGroupImage["group"] === group && this.state.activeGroupImage["image"] === image) {
      return (
        <div className="four wide column" key={group + "-" + image}>
          <button className="positive fluid ui button" onClick={setActiveGroupImage}>
            {imageName}
          </button>
        </div>
      );
    }

    return (
      <div className="four wide column" key={group + "-" + image}>
        <button className="ui fluid button" onClick={setActiveGroupImage}>
          {imageName}
        </button>
      </div>
    );
  }

  render() {
    if (this.state.groupAndImages == null) {
      return (
        <div className="ui segment">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
          <p></p>
        </div>
      );
    }

    return (
      <div className="ui segment">
        <div className="ui accordion">
          { Object.keys(this.state.groupAndImages).map((group) => {
            return this.getTitleContentHTML(group, this.state.groupAndImages[group]);
          }) }
        </div>
      </div>
    );
  }
}
