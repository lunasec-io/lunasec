
function onLoad() {
  const element = document.querySelector('#secure-input');

  const nonce = element.getAttribute('data-nonce');
  const origin = element.getAttribute('data-origin');


  window.addEventListener("message", (event) => {

    if ((event.origin + '/') !== origin) {
      console.log('rejected origin', event.origin, origin)
      return;
    }

    console.log('frame message:', event);
  });

    window.parent.postMessage(nonce, origin);
}

onLoad();
