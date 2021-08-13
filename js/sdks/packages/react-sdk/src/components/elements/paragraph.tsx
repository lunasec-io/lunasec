import React, { Component } from 'react';

import {
  RenderData,
  WrappedComponentProps,
  WrapperPropsWithProviders
} from '../../types';
import {WrapperState} from "../wrapComponent";
type ParagraphRenderData = RenderData<'Paragraph'>;
export type ParagraphProps = WrappedComponentProps<'Paragraph'>;

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
        className={renderData.frameClass}
        style={frameStyle}
        frameBorder={0}
        key={renderData.frameUrl}
      />
    );
  }

  render() {
    // Pull the renderData out so we don't weird stuff into our dummy element
    const { renderData, className, children, ...otherProps } = this.props;

    return (
      <div
        style={renderData.parentContainerStyle}
        className={`${renderData.containerClass} ${this.props.className || ''}`}
      >
        <p
          {...otherProps}
          ref={renderData.dummyRef}
          style={renderData.dummyElementStyle}
          tabIndex={-1}
          className={this.props.className || ''}
        >
          &ensp;
        </p>
        {this.renderFrame(renderData)}
        {children}
      </div>
    );
  }
}
