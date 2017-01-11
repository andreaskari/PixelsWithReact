import React, { Component } from 'react';

export default class Toolbox extends Component {
    constructor(props) {
    super(props);

    this.state = {
      activeTool: props.activeTool,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeTool: nextProps.activeTool,
    });
  }

  getToolButtonHTML(tool) {
    var icon = null;
    if (tool === "Eye Dropper") {
      icon = "eyedropper";
    } else if (tool === "Pixel Selector") {
      icon = "hand pointer";
    } else if (tool === "Magic Wand") {
      icon = "wizard icon";
    } else if (tool === "Pixel Painter") {
      icon = "paint brush";
    }

    var iconAndState = icon;
    if (tool === this.state.activeTool) {
      iconAndState += " positive"
    }

    return (
      <button 
        className={iconAndState + " ui large circular icon button"}
        onClick={() => { this.props.setActiveTool(tool); }}
        >
        <i className={icon + " icon"}></i>
      </button>
    );
  }

  render() {
    return (
      <div>
        { this.props.tools.map((tool) => { return this.getToolButtonHTML(tool); }) }
      </div>
    );

    // return (
    //   <div>
    //     <button className="ui large circular eyedropper icon button">
    //       <i className="eyedropper icon"></i>
    //     </button>
    //     <button className="ui large circular hand pointer icon button">
    //       <i className="hand pointer icon"></i>
    //     </button>
    //     <button className="ui large circular wizard icon button">
    //       <i className="wizard icon"></i>
    //     </button>
    //     <button className="ui large circular paint brush icon button">
    //       <i className="paint brush icon"></i>
    //     </button>
    //   </div>
    // );
  }
}