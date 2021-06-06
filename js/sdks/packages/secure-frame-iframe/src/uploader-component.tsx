import { Tokenizer } from '@lunasec/tokenizer-sdk';
import React from 'react';
import Dropzone, { DropzoneProps, FileWithPath } from 'react-dropzone';

import { getFileInfo, setupLink } from './secure-download';
import { MetaData } from './types';

interface UploaderProps {
  filetokens: string[];
}

interface FileInfo {
  token?: string;
  status: 'Uploading' | 'Uploaded' | 'Error';
  name: string;
}

interface UploaderState {
  files: FileInfo[];
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
    void this.loadExistingFiles();
  }

  async loadExistingFiles() {
    const tokenizer = new Tokenizer();
    return Promise.all(
      this.fileTokens.map(async (token) => {
        const metaRes = await tokenizer.getMetadata(token);
        if (!metaRes.success) {
          return Promise.reject(metaRes.error);
        }
        const meta = metaRes.metadata as MetaData;
        const fileInfo: FileInfo = {
          name: meta.fileinfo.filename,
          token: token,
          status: 'Uploaded',
        };
        this.setState({ files: this.state.files.concat(fileInfo) });
        return Promise.resolve();
      })
    );
  }

  async processAddedFiles(files: FileWithPath[]) {
    // Single file mode for now to simplify things
    const file = files[0];
    const fileInfo: FileInfo = {
      name: file.name,
      status: 'Uploading',
    };
    this.setState({ files: this.state.files.concat(fileInfo) });
    try {
      const fileText = await file.text();
      const tokenizer = new Tokenizer();
      const uploadRes = await tokenizer.tokenize(fileText);
      if (!uploadRes.success) {
        throw uploadRes.error;
      }
      console.log('uploadRes is ', uploadRes);
      const token = uploadRes.tokenId;
      const meta: MetaData = {
        fileinfo: {
          filename: file.name,
          type: file.type,
          lastModified: file.lastModified,
        },
      };
      const metaRes = await tokenizer.setMetadata<MetaData>(token, meta);
      if (!metaRes.success) {
        throw metaRes.error;
      }
      console.log('metaRes is ', metaRes);
      this.mutateFileState(file.name, { status: 'Uploaded', token: token });
    } catch (e) {
      this.mutateFileState(file.name, { status: 'Error' });
    }
  }

  mutateFileState(name: string, changedFields: Partial<FileInfo>) {
    const updatedFiles = this.state.files.map((f) => {
      if (f.name === name) {
        Object.assign(f, changedFields);
      }
      return f;
    });
    this.setState({ files: updatedFiles });
  }

  async handleFileClick(token: string | undefined) {
    if (!token) {
      return;
    }
    console.log('downloading from token ', token);
    const info = await getFileInfo(token);

    const hiddenAnchor = document.createElement('a');
    hiddenAnchor.style.display = 'none';
    document.body.appendChild(hiddenAnchor);
    setupLink(info, hiddenAnchor, true);
  }

  render() {
    const dropZoneOptions: DropzoneProps = {
      onDrop: (acceptedFiles) => this.processAddedFiles(acceptedFiles),
      multiple: false,
    };

    const files = this.state.files.map((f) => {
      const className = f.status ? 'file-container ' + f.status.toLowerCase() : 'file-container';
      return (
        <div className={className} key={f.name} onClick={() => this.handleFileClick(f.token)}>
          <p>{`${f.name} ${f.status || ''}`}</p>
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
