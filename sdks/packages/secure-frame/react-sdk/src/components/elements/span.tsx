import React, { Component, CSSProperties } from 'react';

import { RenderData, WrappedProps } from '../../types';
type SpanRenderData = RenderData<HTMLSpanElement>;
type SpanProps = WrappedProps<HTMLSpanElement>;

export default class Span extends Component<SpanProps> {
  constructor(props: SpanProps) {
    super(props);
  }

  componentDidMount() {
    this.props.renderData.mountedCallback();
  }

  renderFrame(renderData: SpanRenderData) {
    if (!renderData.frameStyleInfo) {
      return null;
    }

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
    // Pull the renderData out so we don't weird stuff into our dummy element
    const { renderData, ...otherProps } = this.props;
    return (
      <div style={renderData.parentContainerStyle}>
        <span
          className={`secure-span-container-${renderData.frameId} secure-span-container-${this.props.name}`}
          ref={renderData.dummyRef}
          style={renderData.dummyElementStyle}
          {...otherProps}
        >
          &ensp;
        </span>
        {this.renderFrame(renderData)}
      </div>
    );
  }
}
