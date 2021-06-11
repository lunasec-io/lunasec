import classnames from 'classnames';
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

    const frameContainerClass = classnames(renderData.frameContainerClasses);

    return (
      <iframe
        ref={renderData.frameRef}
        src={renderData.frameUrl}
        className={frameContainerClass}
        style={frameStyle}
        frameBorder={0}
        key={renderData.frameUrl}
      />
    );
  }

  render() {
    // Pull the renderData out so we don't weird stuff into our dummy element
    const { renderData, className, children, ...otherProps } = this.props;

    const containerClass = classnames({
      [`secure-paragraph-container-${renderData.frameId} secure-paragraph-container-${this.props.name}`]: true,
      // Necessary for styled-components to attach to this element
      [className || '']: true,
    });

    return (
      <div style={renderData.parentContainerStyle} className={containerClass}>
        <p ref={renderData.dummyRef} style={renderData.dummyElementStyle} {...otherProps}>
          &ensp;
        </p>
        {this.renderFrame(renderData)}
        {children}
      </div>
    );
  }
}
