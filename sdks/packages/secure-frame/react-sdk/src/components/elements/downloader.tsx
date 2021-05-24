import React, { Component, CSSProperties } from 'react';

import { RenderData, WrappedProps } from '../../types';
type AnchorRenderData = RenderData<HTMLAnchorElement>;
type AnchorProps = WrappedProps<HTMLAnchorElement>;

export default class Downloader extends Component<AnchorProps> {
  constructor(props: AnchorProps) {
    super(props);
  }

  componentDidMount() {
    this.props.renderData.mountedCallback();
  }

  renderFrame(renderData: AnchorRenderData) {
    if (!renderData.frameStyleInfo) {
      return null;
    }
    // const iframeStyle: CSSProperties = {
    //   display: 'block',
    //   height: renderData.frameStyleInfo.height,
    // };

    return (
      <iframe
        ref={renderData.frameRef}
        src={renderData.frameUrl}
        style={renderData.frameStyleInfo}
        frameBorder={0}
        key={renderData.frameUrl}
      />
    );
  }

  render() {
    const { renderData, ...otherProps } = this.props;
    return (
      <div
        {...otherProps}
        className={`secure-downloader-container-${renderData.frameId} secure-downloader-container-${this.props.name}`}
        style={renderData.parentContainerStyle}
      >
        <a ref={renderData.dummyRef} style={renderData.dummyElementStyle}>
          &ensp;
        </a>
        {this.renderFrame(renderData)}
      </div>
    );
  }
}
