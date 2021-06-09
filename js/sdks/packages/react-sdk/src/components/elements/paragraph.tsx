import React, { Component } from 'react';

import { RenderData, WrappedComponentProps } from '../../types';
type ParagraphRenderData = RenderData<HTMLParagraphElement>;
export type ParagraphProps = WrappedComponentProps<'p'>;

export default class Paragraph extends Component<ParagraphProps> {
  constructor(props: ParagraphProps) {
    super(props);
  }

  componentDidMount() {
    this.props.renderData.mountedCallback();
  }

  renderFrame(renderData: ParagraphRenderData) {
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
        <p
          className={`secure-paragraph-container-${renderData.frameId} secure-paragraph-container-${this.props.name}`}
          ref={renderData.dummyRef}
          style={renderData.dummyElementStyle}
          {...otherProps}
        >
          &ensp;
        </p>
        {this.renderFrame(renderData)}
      </div>
    );
  }
}
