import { AllowedElements } from '@lunasec/react-sdk';
import { MetaData, Tokenizer } from '@lunasec/tokenizer-sdk';
import React from 'react';
import Dropzone, { DropzoneProps, FileWithPath } from 'react-dropzone';

import { sendMessageToParentFrame } from './rpc';
import { handleDownload } from './secure-download';
import { SecureFrame } from './secure-frame';

interface UploaderProps {
  filetokens: string[];
  secureframe: SecureFrame<keyof AllowedElements>;
}

interface FileInfo {
  token?: string;
  id: number;
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
    sendMessageToParentFrame(secureFrame.origin, {
      command: 'NotifyOnToken',
      frameNonce: secureFrame.frameNonce,
      data: { token: tokens },
    });
  }

  loadExistingFiles(): void {
    const tokenizer = new Tokenizer();
    this.fileTokens.map(async (token) => {
      const metaRes = await tokenizer.getMetadata(token);
      if (!metaRes.success) {
        // If it failed then do nothing and don't show a file
        console.error('Fetching file metadata failed');
        return;
      }
      const meta = metaRes.metadata;
      if (!('fileinfo' in meta) || !('filename' in meta.fileinfo)) {
        console.error('Received bad file metadata');
        return;
      }
      const { filename } = meta.fileinfo;
      const fileInfo: FileInfo = {
        name: filename,
        token: token,
        status: 'Uploaded',
        id: this.state.files.length,
      };
      this.setState({ files: this.state.files.concat(fileInfo) });
    });
  }

  // TODO: add the ability to remove a file
  processAddedFiles(files: FileWithPath[]) {
    // Single file mode for now to simplify things
    const file = files[0];
    const fileInfo: FileInfo = {
      name: file.name,
      status: 'Uploading',
      id: this.state.files.length,
    };
    // wait for the state to set before continuing
    this.setState({ files: this.state.files.concat(fileInfo) }, async () => {
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
          dataType: 'file',
          fileinfo: {
            filename: file.name,
            type: file.type,
            lastModified: file.lastModified,
          },
        };
        const metaRes = await tokenizer.setMetadata(token, meta);
        if (!metaRes.success) {
          throw metaRes.error;
        }
        await this.mutateFileState(fileInfo.id, { status: 'Uploaded', token: token });
        this.sendTokens();
      } catch (e) {
        console.error(e);
        await this.mutateFileState(fileInfo.id, { status: 'Error' });
      }
    });
  }

  // a helper function to go through the files array and find the file we want to change some fields on
  mutateFileState(id: number, changedFields: Partial<FileInfo>, destroy = false): Promise<null> {
    const modifiedFiles = this.modifyFiles(this.state.files, id, changedFields, destroy);
    // setState is async but doesnt even give us a promise so we have to do this
    return new Promise((resolve) => {
      this.setState({ files: modifiedFiles }, () => resolve(null));
    });
  }

  modifyFiles(files: FileInfo[], id: number, changedFields: Partial<FileInfo>, destroy = false): FileInfo[] {
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
    return handleDownload(token, hiddenAnchor, true);
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
