import React, { Component, CSSProperties, RefObject } from 'react'
import { RenderData } from '../../types'

export interface SpanProps extends React.ComponentPropsWithoutRef<'span'> {
  renderData: RenderData,
  name:string
}

export class Span extends Component<SpanProps> {

  public elementType = 'span'
  public readonly frameRef!: RefObject<HTMLIFrameElement>;
  public readonly dummyElementRef!: RefObject<HTMLSpanElement>;

  constructor(props: SpanProps) {
    super(props)
    this.frameRef = React.createRef();
    this.dummyElementRef = React.createRef();
  }

  renderFrame(renderData:RenderData) {

    const {height} = renderData.frameStyleInfo;
    const iframeStyle: CSSProperties = {
      display: 'inline',
      height: height,
    };

    return <iframe
      ref={this.frameRef}
      src={renderData.frameUrl}
      style={iframeStyle}
      frameBorder={0}
      key={renderData.frameUrl}
    />;
  }

  render() {
    const { ...otherProps} = this.props;
    const renderData = this.props.renderData;

    return (
      <span
        {...otherProps}
        className={`secure-span-container-${renderData.frameId} secure-span-container-${this.props.name}`}
        ref={this.dummyElementRef}
      >
        {this.renderFrame(renderData)}
      </span>
    );
  }
}
