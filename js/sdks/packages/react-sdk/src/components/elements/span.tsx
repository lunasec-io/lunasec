import React, { Component } from 'react';

import { RenderData, WrappedComponentProps } from '../../types';
type SpanRenderData = RenderData<HTMLSpanElement>;
export type SpanProps = WrappedComponentProps<'span'>;

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
    const { width, ...frameStyle } = renderData.frameStyleInfo;
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
