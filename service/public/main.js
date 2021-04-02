/**
 * This code runs in the context of the secure frame origin and handles passing RPC back/forth between origins.
 */
function onLoad() {
  const element = document.querySelector('.secure-input');

  const nonce = element.getAttribute('data-nonce');
  const origin = element.getAttribute('data-origin');
  const style = window.location.hash;

  window.addEventListener("message", (event) => {

    // TODO: Is this a security problem?
    if (!origin.startsWith(event.origin + '/')) {
      console.log('rejected origin', event.origin, origin)
      return;
    }

    const requestData = JSON.parse(event.data);

    const tokenData = JSON.stringify({
      command: 'ReceiveCommittedToken',
      correlationToken: requestData.correlationToken,
      data: 'a-public-token'
    });

    window.parent.postMessage(tokenData, origin);

    console.log('frame response:', tokenData);
  });

  // window.parent.postMessage(nonce, origin);
}

onLoad();
