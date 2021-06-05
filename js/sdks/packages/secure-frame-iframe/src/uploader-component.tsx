import React from 'react';
import Dropzone from 'react-dropzone';

interface UploaderProps {
  filetokens: [string];
}

interface UploaderState {
  files: [any];
}

export default class Uploader extends React.Component<UploaderProps, UploaderState> {
  fileTokens: [string];
  constructor(props: UploaderProps) {
    super(props);
    this.fileTokens = props.filetokens;
  }

  render() {
    return (
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag and drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    );
  }
}
