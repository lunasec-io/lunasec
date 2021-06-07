import { AllowedElements } from '@lunasec/react-sdk';
import { Tokenizer } from '@lunasec/tokenizer-sdk';
import React from 'react';
import Dropzone, { DropzoneProps, FileWithPath } from 'react-dropzone';

import { notifyParentOfEvent } from './rpc';
import { handleDownload } from './secure-download';
import { SecureFrame } from './secure-frame';
import { MetaData } from './types';

interface UploaderProps {
  filetokens: string[];
  secureframe: SecureFrame<keyof AllowedElements>;
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
    notifyParentOfEvent('NotifyOnToken', secureFrame.origin, secureFrame.frameNonce, { token: tokens });
  }

  loadExistingFiles(): void {
    const tokenizer = new Tokenizer();
    this.fileTokens.map(async (token) => {
      const metaRes = await tokenizer.getMetadata(token);
      if (!metaRes.success) {
        // If it failed then do nothing and don't show a file
        return;
      }
      const meta = metaRes.metadata as MetaData;
      const fileInfo: FileInfo = {
        name: meta.fileinfo.filename,
        token: token,
        status: 'Uploaded',
      };
      this.setState({ files: this.state.files.concat(fileInfo) });
    });
  }

  // TODO: add the ability to remove a file
  async processAddedFiles(files: FileWithPath[]) {
    // Single file mode for now to simplify things
    const file = files[0];
    const fileInfo: FileInfo = {
      name: file.name,
      status: 'Uploading',
    };
    this.setState({ files: this.state.files.concat(fileInfo) });
    try {
      // TODO: Move this logic into the tokenizer so that tokenizer simply takes a File
      const arrayBuf = await file.arrayBuffer();
      // Turn the JS ArrayBuffer into a Node type Buffer for tokenizer
      const buf = Buffer.from(new Uint8Array(arrayBuf));
      const tokenizer = new Tokenizer();
      const uploadRes = await tokenizer.tokenize(buf);
      if (!uploadRes.success) {
        throw uploadRes.error;
      }
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
      this.mutateFileState(file.name, { status: 'Uploaded', token: token });
      this.sendTokens();
    } catch (e) {
      console.error(e);
      this.mutateFileState(file.name, { status: 'Error' });
    }
  }

  // a helper function to go through the files array and find the file we want to change some fields on
  mutateFileState(name: string, changedFields: Partial<FileInfo>) {
    const updatedFiles = this.state.files.map((f) => {
      if (f.name === name) {
        Object.assign(f, changedFields);
      }
      return f;
    });
    this.setState({ files: updatedFiles });
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
    return handleDownload(token, hiddenAnchor, true);
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
