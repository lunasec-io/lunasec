import classnames from 'classnames';
import React, { Component } from 'react';

import { RenderData, WrappedComponentProps } from '../../types';
type UploaderRenderData = RenderData<HTMLInputElement>;
export type UploaderProps = WrappedComponentProps<'input'>; // change these props to be some whitelisted filepond props

export default class Uploader extends Component<UploaderProps> {
  constructor(props: UploaderProps) {
    super(props);
  }

  componentDidMount() {
    this.props.renderData.mountedCallback();
  }

  renderFrame(renderData: UploaderRenderData) {
    if (!renderData.frameStyleInfo) {
      return null;
    }
    const { ...frameStyle } = renderData.frameStyleInfo;
    frameStyle.width = '300px';
    frameStyle.height = '300px';

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
    const { renderData, className, children, ...otherProps } = this.props;
    const containerClass = classnames({
      [`secure-uploader-container-${renderData.frameId} secure-uploader-container-${this.props.name}`]: true,
      // Combine with the classname passed in props because styled-components passes some random classnames to attach our css
      [className || '']: true,
    });
    return (
      <div className={containerClass} style={renderData.parentContainerStyle}>
        <input
          {...otherProps}
          type="file"
          ref={renderData.dummyRef}
          style={renderData.dummyElementStyle}
          tabIndex={-1}
        />
        {this.renderFrame(renderData)}
        {children}
      </div>
    );
  }
}
