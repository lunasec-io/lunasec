import {Tokenizer} from "@lunasec/tokenizer-sdk";


async function downloadS3UrlAsBlob(s3Url: string, s3Headers: Record<string, string>) {
    // This should work from the browser -- not tested though.
    const response = await fetch(s3Url, {
        headers: s3Headers
    });
    // We could display progress to the user here if we need to
    return response.blob();
}

// Creates an anchor tag that, when clicked, will prompt the user to download the provided blob.
// This link may only be clicked once as the blob destroys itself afterwards.
function attachBlobDownloadAnchor(a:HTMLAnchorElement, blob: Blob, filename: string, ) {
    // This lets us actually prompt the user to download the file programmatically
    const url = URL.createObjectURL(blob);
    // Use the blob URL we created as the href so that when the users clicks it they will be prompted to save the file somewhere.
    a.href = url;
    // This is the name that the file will download as.
    a.download = filename;
    a.textContent = `${filename}`
    // Clean up the Blob we created
    async function revokeBlob() {
        await new Promise((resolve) => setTimeout(resolve, 50)) // We have this in utils, it just sleeps for 50ms

        URL.revokeObjectURL(url);
        a.removeEventListener('click', revokeBlob);
        a.removeAttribute('href')
    };
    a.addEventListener('click', revokeBlob);
}

export async function handleDownload(token: string, a: HTMLAnchorElement, filename: string){
    a.textContent = `Loading ${filename}...`;
    try {
        const tokenizer = new Tokenizer();
        const res = await tokenizer.detokenizeToUrl(token);
        if (!res.success) {
            throw res.error;
        }
        const blob = await downloadS3UrlAsBlob(res.downloadUrl, res.headers);
        attachBlobDownloadAnchor(a, blob, filename);
    } catch (e) {
        a.textContent = 'Error';
        throw e;
    }
    return;
}

