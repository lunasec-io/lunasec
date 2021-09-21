<!--
  ~ Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
  ~
  ~ Licensed under the Apache License, Version 2.0 (the "License");
  ~ you may not use this file except in compliance with the License.
  ~ You may obtain a copy of the License at
  ~
  ~ http://www.apache.org/licenses/LICENSE-2.0
  ~
  ~ Unless required by applicable law or agreed to in writing, software
  ~ distributed under the License is distributed on an "AS IS" BASIS,
  ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
-->
import React, { Component } from 'react';

import { RenderData, WrappedComponentProps } from '../../types';
type AnchorRenderData = RenderData<'Downloader'>;
export type AnchorProps = WrappedComponentProps<'Downloader'>;

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
        className={renderData.frameClass}
        frameBorder={0}
        key={renderData.frameUrl}
      />
    );
  }

  render() {
    const { renderData, className, children, ...otherProps } = this.props;

    // TODO: handle this in the wrapped component by using the styled component callback

    return (
      <div
        className={`${renderData.containerClass} ${this.props.className || ''}`}
        style={renderData.parentContainerStyle}
      >
        <a
          {...otherProps}
          ref={renderData.dummyRef}
          style={renderData.dummyElementStyle}
          tabIndex={-1}
          className={this.props.className || ''}
        >
          &ensp;
        </a>
        {this.renderFrame(renderData)}
        {children}
      </div>
    );
  }
}
