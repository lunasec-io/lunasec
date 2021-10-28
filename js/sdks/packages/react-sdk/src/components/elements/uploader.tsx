/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { camelCaseObject } from '@lunasec/browser-common';
import React, { Component, CSSProperties } from 'react';

import { RenderData, WrappedComponentProps } from '../../types/internal-types';
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
    const { parentStyle } = renderData.frameStyleInfo;

    const iframeStyle: CSSProperties = {
      ...camelCaseObject(parentStyle),
      width: '300px',
      height: '300px',
      display: 'block',
    };

    return (
      <iframe
        ref={renderData.frameRef}
        src={renderData.frameUrl}
        style={iframeStyle}
        frameBorder={0}
        key={renderData.frameUrl}
        className={renderData.frameClass}
      />
    );
  }

  render() {
    const { renderData, children, ...otherProps } = this.props;

    return (
      <div
        className={`${renderData.containerClass}`}
        style={{ ...renderData.parentContainerStyle, height: '300px', width: '300px' }}
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
