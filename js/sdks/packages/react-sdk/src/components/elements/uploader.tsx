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
type UploaderRenderData = RenderData<'Uploader'>;
export type UploaderProps = WrappedComponentProps<'Uploader'>; // change these props to be some whitelisted filepond props

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
        className={renderData.frameClass}
      />
    );
  }

  render() {
    const { renderData, className, children, ...otherProps } = this.props;

    return (
      <div
        className={`${renderData.containerClass} ${this.props.className || ''}`}
        style={renderData.parentContainerStyle}
      >
        <input
          {...otherProps}
          type="file"
          ref={renderData.dummyRef}
          style={renderData.dummyElementStyle}
          tabIndex={-1}
          className={this.props.className || ''}
        />
        {this.renderFrame(renderData)}
        {children}
      </div>
    );
  }
}
