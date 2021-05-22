import {Tokenizer} from "@lunasec/tokenizer-sdk";


async function downloadS3UrlAsBlob(s3Url: string, s3Headers: Record<string, string>) {
    // This should work from the browser -- not tested though.
    const response = await fetch(s3Url, {
        headers: s3Headers
    });
    // Maybe display some progress to the user?
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

    // Clean up the Blob we created
    async function revokeBlob() {
        await new Promise((resolve) => setTimeout(resolve, 50)) // We have this in utils, it just sleeps for 50ms

        URL.revokeObjectURL(url);
        a.removeEventListener('click', revokeBlob);
    };

    a.addEventListener('click', revokeBlob);
}

// Prompts the user to download the contents of the provided S3 URL.
// async function downloadS3Url(s3Url: string, s3Headers: Record<string, string>, filename: string, anchor: HTMLAnchorElement) {
//     const blob = await downloadS3UrlAsBlob();
//     attachBlobDownloadAnchor(anchor, blob, filename);
//
//     // Trigger the download prompt
//     a.click();
// }

export async function handleDownload(token: string, a: HTMLAnchorElement, filename: string){
    a.textContent = `Loading ${filename}...`
    const tokenizer = new Tokenizer();
    const res = await tokenizer.detokenizeToUrl(token);
    if (!res.success){
        throw res.error;
    }
    const blob = await downloadS3UrlAsBlob(res.downloadUrl, res.headers);
    attachBlobDownloadAnchor(a, blob, filename);
    return;
}

