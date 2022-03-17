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
import classnames from 'classnames';
import React, { Component, CSSProperties } from 'react';

import { RenderData, WrappedComponentProps } from '../../types/internal-types';
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
    const { parentStyle, width, height } = renderData.frameStyleInfo;

    const iframeStyle: CSSProperties = {
      ...camelCaseObject(parentStyle),
      display: 'block',
      width: width,
      height: height,
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
    // Pull the renderData out so we don't weird stuff into our dummy element
    const { renderData, className, children, ...otherProps } = this.props;

    const validatedName = this.props.name !== undefined ? this.props.name : '';

    const containerName = `secure-textarea-container-${renderData.frameId} secure-textarea-container-${validatedName}`;

    const textareaClass = classnames({
      // Combine with the classname passed in props because styled-components passes some random classnames to attach our css
      [className || '']: true,
    });

    return (
      // TODO: height of this container is not working properly, fix
      <div style={renderData.parentContainerStyle} className={containerName}>
        <textarea
          {...otherProps}
          ref={renderData.dummyRef}
          style={{ ...renderData.dummyElementStyle, width: '100%' }}
          tabIndex={-1}
          className={textareaClass}
        />
        {this.renderFrame(renderData)}
        {children}
      </div>
    );
  }
}
