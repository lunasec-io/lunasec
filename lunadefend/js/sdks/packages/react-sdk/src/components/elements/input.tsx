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

type InputRenderData = RenderData<'Input'>;
export type InputProps = WrappedComponentProps<'Input'>;

export default class Input extends Component<InputProps> {
  constructor(props: InputProps) {
    super(props);
    console.log('props passed to input are ', props);
  }

  componentDidMount() {
    this.props.renderData.mountedCallback();
  }

  renderFrame(renderData: InputRenderData) {
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
    // Pull the renderData out so we don't put weird stuff into our dummy element
    const { renderData, children, className, name, ...otherProps } = this.props;

    // TODO: inputRef is leaking into here somehow but not sure where it is being set so ts-ignore to remove it
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { inputRef, ...scrubbedProps } = otherProps;

    return (
      <div style={{ ...renderData.parentContainerStyle, flexGrow: 1 }} className={`${renderData.containerClass}`}>
        <input
          {...scrubbedProps}
          ref={renderData.dummyInputStyleRef}
          style={{ ...renderData.dummyElementStyle, ...this.props.style }}
          tabIndex={-1}
          className={`${renderData.hiddenElementClass} ${className || ''}`}
        />
        <input
          {...scrubbedProps}
          name={name} // only the element we want to submit has a name, otherwise validations run
          type="text"
          ref={renderData.dummyRef}
          style={{ ...renderData.dummyElementStyle, ...this.props.style, position: 'absolute' }}
          tabIndex={-1}
          className={`${renderData.hiddenElementClass} ${className || ''}`}
        />
        {this.renderFrame(renderData)}
        {children}
      </div>
    );
  }
}
