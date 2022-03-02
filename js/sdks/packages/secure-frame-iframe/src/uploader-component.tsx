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
import { ComponentNames } from '@lunasec/react-sdk';
import React from 'react';
import Dropzone, { DropzoneProps, FileWithPath } from 'react-dropzone';

import { handleDownload } from './secure-download';
import { SecureFrame } from './secure-frame';

interface UploaderProps {
  filetokens: string[];
  secureframe: SecureFrame<ComponentNames>;
}

interface UploadedFileRecord {
  token?: string;
  id: number;
  status: 'Uploading' | 'Uploaded' | 'Error';
  name: string;
}

interface UploaderState {
  files: UploadedFileRecord[];
}

export default class Uploader extends React.Component<UploaderProps, UploaderState> {
  fileTokens: string[];

  constructor(props: UploaderProps) {
    super(props);
    this.fileTokens = props.filetokens;
    this.state = {
      files: [],
    };
  }

  componentDidMount() {
    // Load any pre-existing tokens from props
    void this.loadExistingFiles();
  }

  sendTokens() {
    const tokens: Array<string> = [];
    this.state.files.forEach((f) => {
      if (f.token) {
        tokens.push(f.token);
      }
    });
    const secureFrame = this.props.secureframe;
    secureFrame.rpc.sendMessageToParentFrame({
      command: 'NotifyOnToken',
      frameNonce: secureFrame.frameNonce,
      data: { token: tokens },
    });
  }

  loadExistingFiles(): void {
    const tokenizer = this.props.secureframe.tokenizer;
    this.fileTokens.map(async (token) => {
      const fileInfoRes = await tokenizer.detokenizeToFileInfo(token);
      if (!fileInfoRes.success) {
        return this.props.secureframe.handleError(fileInfoRes.error);
      }
      const fileRecord: UploadedFileRecord = {
        name: fileInfoRes.fileInfo.filename,
        token: token,
        status: 'Uploaded',
        id: this.state.files.length,
      };
      this.setState({ files: this.state.files.concat(fileRecord) });
    });
  }

  processAddedFiles(files: FileWithPath[]) {
    // Single file mode for now to simplify things
    const file = files[0];
    const fileInfo: UploadedFileRecord = {
      name: file.name,
      status: 'Uploading',
      id: this.state.files.length,
    };
    // wait for the state to set before continuing

    this.setState({ files: this.state.files.concat(fileInfo) }, async () => {
      const metaData = this.props.secureframe.customMetadata;
      const tokenizeRes = await this.props.secureframe.tokenizer.tokenizeFile(file, metaData);
      if (!tokenizeRes.success) {
        await this.mutateFileState(fileInfo.id, { status: 'Error' });
        this.props.secureframe.handleError(tokenizeRes.error);
        return;
      }
      const token = tokenizeRes.tokenId;
      await this.mutateFileState(fileInfo.id, { status: 'Uploaded', token: token });

      this.sendTokens();
    });
  }

  // a helper function to go through the files array and find the file we want to change some fields on
  mutateFileState(id: number, changedFields: Partial<UploadedFileRecord>, destroy = false): Promise<null> {
    const modifiedFiles = this.modifyFiles(this.state.files, id, changedFields, destroy);
    // setState is async but doesnt even give us a promise so we have to do this
    return new Promise((resolve) => {
      this.setState({ files: modifiedFiles }, () => resolve(null));
    });
  }

  modifyFiles(
    files: UploadedFileRecord[],
    id: number,
    changedFields: Partial<UploadedFileRecord>,
    destroy = false
  ): UploadedFileRecord[] {
    if (destroy) {
      return files.filter((f) => f.id !== id);
    }
    return files.map((f) => {
      if (f.id === id) {
        Object.assign(f, changedFields);
      }
      return f;
    });
  }

  handleFileClick(token: string | undefined) {
    if (!token) {
      return;
    }
    // Hidden element for the downloader to trigger
    const hiddenAnchor = document.createElement('a');
    hiddenAnchor.style.display = 'none';
    document.body.appendChild(hiddenAnchor);
    // Just reusing the download code from Secure Downloader
    try {
      return handleDownload(token, hiddenAnchor, this.props.secureframe.tokenizer, true);
    } catch (e) {
      return this.props.secureframe.handleError(e);
    }
  }

  async deleteFile(e: React.MouseEvent<HTMLButtonElement>, id: number) {
    e.stopPropagation();
    await this.mutateFileState(id, {}, true);
    this.sendTokens();
  }

  render() {
    const dropZoneOptions: DropzoneProps = {
      onDrop: (acceptedFiles) => this.processAddedFiles(acceptedFiles),
      multiple: false,
    };

    const files = this.state.files.map((f) => {
      const className = 'file-container';
      return (
        <div className={className} key={f.id} onClick={() => this.handleFileClick(f.token)}>
          <button className="deletebutton" onClick={(e) => void this.deleteFile(e, f.id)}>
            X
          </button>
          <p className="filename">{f.name}</p>
          <p className={`filestatus ${f.status.toLowerCase()}`}>{f.status}</p>
          <div className={f.status === 'Uploading' ? 'spinner' : ''} />
        </div>
      );
    });

    return (
      <Dropzone {...dropZoneOptions}>
        {({ getRootProps, getInputProps }) => (
          <div>
            <section className="dropzone-container">
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag and drop a file here or click to browse</p>
              </div>
            </section>
            <aside>{files}</aside>
          </div>
        )}
      </Dropzone>
    );
  }
}
