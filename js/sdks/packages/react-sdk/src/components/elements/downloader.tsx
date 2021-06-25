import React, { Component } from 'react';

import { RenderData, WrappedComponentProps } from '../../types';
type AnchorRenderData = RenderData<'Downloader'>;
export type AnchorProps = WrappedComponentProps<'Downloader'>;

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
        className={renderData.frameClass}
        frameBorder={0}
        key={renderData.frameUrl}
      />
    );
  }

  render() {
    const { renderData, className, children, ...otherProps } = this.props;

    // TODO: handle this in the wrapped component by using the styled component callback

    return (
      <div
        className={`${renderData.containerClass} ${this.props.className || ''}`}
        style={renderData.parentContainerStyle}
      >
        <a {...otherProps} ref={renderData.dummyRef} style={renderData.dummyElementStyle} tabIndex={-1}>
          &ensp;
        </a>
        {this.renderFrame(renderData)}
        {children}
      </div>
    );
  }
}
