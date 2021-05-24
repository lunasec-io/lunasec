import {Tokenizer} from "@lunasec/tokenizer-sdk";

// 1 fetch filename from metadata and s3 headers in parallel
// 2 Put them onto the a tag
// 3 User clicks the tag
// 4 Maybe display percentage
// 5 Once blob is loaded, make a fake <a> with the blob as an href and trigger it

interface Options {
    type?: string,
    lastModified?: number,
}
interface FileInfo {
    filename: string,
    options: Options,
    headers: Record<string, string>,
    url: string,
}
// TODO: Add fileinfo property into the metadata during secureupload with the following props:
//  filename, type, lastModified


async function getFileInfo(token: string): Promise<FileInfo> {
    const tokenizer = new Tokenizer();
    const metaPromise = tokenizer.getMetadata(token);
    const urlPromise = tokenizer.detokenizeToUrl(token);
    const [metaRes, urlRes] = await Promise.all([metaPromise, urlPromise]);
    if (!metaRes.success){
        throw metaRes.error;
    }
    if (!urlRes.success) {
        throw urlRes.error;
    }
    const meta = JSON.parse(metaRes.value).fileinfo || {};
    const filename: string = meta.filename || 'document.pdf';
    const options: Options = {}

    if (meta.type) {
        options.type = meta.type;
    }
    if (meta.lastModified){
        options.lastModified = meta.lastModified;
    }
    const url = urlRes.downloadUrl;
    const headers = urlRes.headers;
    return {filename, options, headers, url}
}

async function downloadFile(fileInfo: FileInfo) {
    const res = await fetch(fileInfo.url, {
        headers: fileInfo.headers
    });
    const bits = await res.blob();
    // @ts-ignore
    return new File(bits, fileInfo.filename, fileInfo.options);
}
function setupLink(fileInfo: FileInfo, a: HTMLAnchorElement){
    a.textContent = fileInfo.filename;
    // In order to trigger a download in a browser, we need to fake a click on an href element
    a.addEventListener('click', async function handleClick() {
        a.textContent = 'Loading...';
        const f = await downloadFile(fileInfo);
        a.href = URL.createObjectURL(f);
        a.textContent = fileInfo.filename;
        a.click();
        a.removeEventListener('click', handleClick);
    })
}

export async function handleDownload(token: string, a: HTMLAnchorElement, filename: string){
    a.textContent = `${filename}...`;
    try {
        const fileInfo = await getFileInfo(token);
        setupLink(fileInfo, a);
    } catch (e) {
        a.textContent = 'Error';
        throw e;
    }
    return;
}

