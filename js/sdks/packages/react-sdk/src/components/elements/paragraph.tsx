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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { parentStyle, width, height, ...frameStyle } = renderData.frameStyleInfo;

    const iframeStyle: CSSProperties = {
      ...camelCaseObject(parentStyle),
      display: 'block',
      width: width,
      height: height,
      margin: 0,
      marginBlock: 0,
    };

    return (
      <iframe
        ref={renderData.frameRef}
        src={renderData.frameUrl}
        className={renderData.frameClass}
        style={iframeStyle}
        frameBorder={0}
        key={renderData.frameUrl}
      />
    );
  }

  render() {
    // Pull the renderData out so we don't put weird stuff into our dummy element
    const { renderData, className, children, ...otherProps } = this.props;

    return (
      <div style={renderData.parentContainerStyle} className={`${renderData.containerClass}`}>
        <p
          {...otherProps}
          ref={renderData.dummyRef}
          style={{ ...renderData.dummyElementStyle }}
          tabIndex={-1}
          className={className || ''}
        >
          &ensp;
        </p>
        {this.renderFrame(renderData)}
        {children}
      </div>
    );
  }
}
