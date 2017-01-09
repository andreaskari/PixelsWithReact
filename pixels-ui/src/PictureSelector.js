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
        <div>
          <div className="title active" onClick={() => {this.setActiveAccordianContent(null)}}>
            <i className="dropdown icon"></i>
            {group}
          </div>
          <div className="content active">
            <p className="transition visible">
              <div className="ui grid">
                {images.map(getContent)}
              </div>
            </p>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="title" onClick={() => {this.setActiveAccordianContent(group)}}>
          <i className="dropdown icon"></i>
          {group}
        </div>
        <div className="content">
          <p>
            <div className="ui padded grid">
              {images.map(getContent)}
            </div>
          </p>
        </div>
      </div>
    );
  }

  getContentButtonHTML(group, image) {
    var setActiveGroupImage = () => { this.props.setActiveGroupImage(group, image); };

    var imageName = image.substring(0, image.length - 4);

    if (this.state.activeGroupImage === (group, image)) {
      return (
        <div className="four wide column">
          <button className="positive ui button" onClick={setActiveGroupImage}>
            {imageName}
          </button>
        </div>
      );
    }

    return (
      <div className="four wide column">
        <button className="ui button" onClick={setActiveGroupImage}>
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

    console.log(this.state.groupAndImages);
    console.log(Object.keys(this.state.groupAndImages));

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
