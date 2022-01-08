const endpoint = `https://formspree.io/${process.env.REACT_APP_FORMSPREE_CONTACT_ID}`;

function submit(data) {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => r.json());
}

const contact = { submit };

export default contact;
