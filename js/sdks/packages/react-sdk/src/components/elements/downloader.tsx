import React, { Component } from 'react';

import { RenderData, WrappedComponentProps } from '../../types';
type AnchorRenderData = RenderData<HTMLAnchorElement>;
export type AnchorProps = WrappedComponentProps<'a'>;

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
    const { width, ...frameStyle } = renderData.frameStyleInfo;
    // const iframeStyle: CSSProperties = {
    //   display: 'block',
    //   height: renderData.frameStyleInfo.height,
    // };

    return (
      <iframe
        ref={renderData.frameRef}
        src={renderData.frameUrl}
        style={frameStyle}
        frameBorder={0}
        key={renderData.frameUrl}
      />
    );
  }

  render() {
    const { renderData, ...otherProps } = this.props;
    return (
      <div
        className={`secure-downloader-container-${renderData.frameId} secure-downloader-container-${this.props.name}`}
        style={renderData.parentContainerStyle}
      >
        <a {...otherProps} ref={renderData.dummyRef} style={renderData.dummyElementStyle}>
          &ensp;
        </a>
        {this.renderFrame(renderData)}
      </div>
    );
  }
}
