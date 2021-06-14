import classnames from 'classnames';
import React, { Component } from 'react';

import { RenderData, WrappedComponentProps } from '../../types';
type TextAreaRenderData = RenderData<'TextArea'>;
export type TextAreaProps = WrappedComponentProps<'TextArea'>;

export default class TextArea extends Component<TextAreaProps> {
  constructor(props: TextAreaProps) {
    super(props);
  }

  componentDidMount() {
    this.props.renderData.mountedCallback();
  }

  renderFrame(renderData: TextAreaRenderData) {
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
      // Combine with the classname passed in props because styled-components passes some random classnames to attach our css
      [className || '']: true,
    });

    return (
      <div style={renderData.parentContainerStyle} className={containerClass}>
        <textarea ref={renderData.dummyRef} style={renderData.dummyElementStyle} tabIndex={-1} {...otherProps} />
        {this.renderFrame(renderData)}
        {children}
      </div>
    );
  }
}
