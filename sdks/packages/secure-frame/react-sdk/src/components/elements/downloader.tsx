import React, { Component, CSSProperties } from 'react'
import { RenderData, WrappedProps } from '../../types'

export default class Downloader extends Component<WrappedProps>  {

  constructor(props: WrappedProps) {
    super(props)
  }

  componentDidMount() {
    this.props.renderData.mountedCallback();
  }

  renderFrame(renderData:RenderData) {
    if (!renderData.frameStyleInfo){
      return null
    }
    const {height} = renderData.frameStyleInfo;
    const iframeStyle: CSSProperties = {
      display: 'inline',
      height: height
    };

    return <iframe
      ref={renderData.frameRef}
      src={renderData.frameUrl}
      style={iframeStyle}
      frameBorder={0}
      key={renderData.frameUrl}
    />;
  }

  render() {
    const { ...otherProps} = this.props;
    const renderData = this.props.renderData;
    return (
      <a
        {...otherProps}
        className={`secure-downloader-container-${renderData.frameId} secure-downloader-container-${this.props.name}`}
        /* FIGURE OUT HOW TO FIX THIS
        //@ts-ignore */
        ref={renderData.dummyRef}
      >
        {this.renderFrame(renderData)}
      </a>
    );
  }
}
