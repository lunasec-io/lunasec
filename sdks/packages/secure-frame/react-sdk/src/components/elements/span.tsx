import React, { Component, CSSProperties } from 'react';

import { RenderData, WrappedProps } from '../../types';

export default class Span extends Component<WrappedProps> {
  constructor(props: WrappedProps) {
    super(props);
  }

  componentDidMount() {
    this.props.renderData.mountedCallback();
  }

  renderFrame(renderData: RenderData) {
    if (!renderData.frameStyleInfo) {
      return null;
    }
    const { height } = renderData.frameStyleInfo;
    const iframeStyle: CSSProperties = {
      display: 'inline',
      height: height,
    };

    return (
      <iframe
        ref={renderData.frameRef}
        src={renderData.frameUrl}
        style={iframeStyle}
        frameBorder={0}
        key={renderData.frameUrl}
      />
    );
  }

  render() {
    const { renderData, ...otherProps } = this.props;
    return (
      <span
        {...otherProps}
        className={`secure-span-container-${renderData.frameId} secure-span-container-${this.props.name}`}
        ref={renderData.dummyRef}
      >
        {this.renderFrame(renderData)}
      </span>
    );
  }
}
