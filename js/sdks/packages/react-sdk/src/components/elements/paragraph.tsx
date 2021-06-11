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

    const containerClass = classnames({
      [`secure-paragraph-container-${renderData.frameId} secure-paragraph-container-${this.props.name}`]: true,
    });

    const dummyElementClass = classnames(renderData.containerClasses);

    console.log('in paragraph the classes are: ', containerClass);
    console.log('parentContainerStyle is ', renderData.parentContainerStyle);

    return (
      <div style={renderData.parentContainerStyle} className={containerClass}>
        <p ref={renderData.dummyRef} style={renderData.dummyElementStyle} className={dummyElementClass} {...otherProps}>
          &ensp;
        </p>
        {this.renderFrame(renderData)}
      </div>
    );
  }
}
