import { Tokenizer } from '@lunasec/tokenizer-sdk';

// 1 fetch filename from metadata and s3 headers in parallel
// 2 Put them onto the a tag
// 3 User clicks the tag
// 4 Maybe display percentage
// 5 Once blob is loaded, make a fake <a> with the blob as an href and trigger it

export interface FileInfo {
  filename: string;
  options: { type?: string; lastModified?: number };
  headers: Record<string, string>;
  url: string;
}

// Pull file info from the metadata and detokenize the file url in parallel
async function getFileInfo(token: string): Promise<FileInfo> {
  const tokenizer = new Tokenizer();
  const metaPromise = tokenizer.getMetadata(token);
  const urlPromise = tokenizer.detokenizeToUrl(token);
  const [metaRes, urlRes] = await Promise.all([metaPromise, urlPromise]);
  if (!metaRes.success) {
    throw metaRes.error;
  }
  if (!urlRes.success) {
    throw urlRes.error;
  }

  const meta = metaRes.metadata;
  if (!meta || !('fileinfo' in meta)) {
    throw new Error('No metadata for file token ');
  }
  // eslint in intellij is an idiot, ignore it
  const fileMeta = meta.fileinfo;
  return {
    filename: fileMeta.filename,
    options: {
      lastModified: fileMeta.lastModified,
      type: fileMeta.type,
    },
    headers: urlRes.headers,
    url: urlRes.downloadUrl,
  };
}

// Download the file as a blob and then convert to a File object to add some metadata fields
// Then stick it on the link
async function downloadFile(fileInfo: FileInfo) {
  const res = await fetch(fileInfo.url, {
    headers: fileInfo.headers,
  });
  const bits = await res.blob();
  return new File([bits], fileInfo.filename, fileInfo.options);
}

function setupLink(fileInfo: FileInfo, a: HTMLAnchorElement, hidden: boolean) {
  a.textContent = fileInfo.filename;

  // In order to trigger a download in a browser, we need to fake a click on an href element
  // Note that we use the actual anchor element here instead of a fake, so that when we unregister our handler...
  // the file will download as normal on repeated clicks
  async function triggerDownload(e: Event) {
    e.preventDefault();
    a.textContent = 'Loading...';
    const f = await downloadFile(fileInfo);
    a.download = fileInfo.filename;
    a.href = URL.createObjectURL(f);
    a.textContent = fileInfo.filename;
    a.removeEventListener('click', (e) => void triggerDownload(e));
    a.click();
  }
  a.addEventListener('click', (e) => void triggerDownload(e));
  // If the element is in hidden mode, start the download ourselves.
  if (hidden) {
    a.click();
  }
}

export async function handleDownload(token: string, a: HTMLAnchorElement, hidden: boolean) {
  a.textContent = '...Loading';
  try {
    const fileInfo = await getFileInfo(token);
    setupLink(fileInfo, a, hidden);
  } catch (e) {
    a.textContent = 'Error';
    throw e;
  }
  return;
}
