import classnames from 'classnames';
import React, { Component } from 'react';

import { RenderData, WrappedComponentProps } from '../../types';
type AnchorRenderData = RenderData<HTMLAnchorElement>;
export type AnchorProps = WrappedComponentProps<'a'>;

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
        frameBorder={0}
        key={renderData.frameUrl}
      />
    );
  }

  render() {
    const { renderData, className, children, ...otherProps } = this.props;

    // TODO: handle this in the wrapped component by using the styled component callback
    const containerClass = classnames({
      [`secure-downloader-container-${renderData.frameId} secure-downloader-container-${this.props.name}`]: true,
      // Combine with the classname passed in props because styled-components passes some random classnames to attach our css
      [className || '']: true,
    });

    return (
      <div className={containerClass} style={renderData.parentContainerStyle}>
        <a {...otherProps} ref={renderData.dummyRef} style={renderData.dummyElementStyle}>
          &ensp;
        </a>
        {this.renderFrame(renderData)}
        {children}
      </div>
    );
  }
}
