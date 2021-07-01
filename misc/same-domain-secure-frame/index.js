import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send(
    `
<html lang="en">
<head title="same origin secure frame test">
<style>
iframe {
  display: block;
  width: 200px;
  height: 200px;
}
</style>
</head>
<body>

  <script>
  
    document.cookie = 'insecure-cookie=secret';
  </script>
  <iframe id="insecure" src="/not-sandboxed"></iframe>
  <iframe id="secure" src="/sandboxed"></iframe>
  
  <script>
  
    setTimeout(() => {
      const insecure = document.querySelector('#insecure');
      const secure = document.querySelector('#secure');
      
      console.log('insecure', insecure.contentWindow.document.querySelector('h3'));
      try {
      console.log('secure', secure.contentWindow.document.querySelector('h3'));
      } catch (e) {
        console.error('could not read h3 for secure domain', e);
      }
    }, 1000);
  </script>
</body>
</html>
    `
  );
});


app.get('/not-sandboxed', (req, res) => {
  res.send(`
<html lang="en">
<head title="not sandboxed"></head>
<body>
  <h3>insecure</h3>
  <script>
    console.log('insecure', {
      opener: window.opener,
      parent: window.parent,
      cookies: document.cookie
    });
  </script>
</body>
</html>
  `);
});

app.get('/sandboxed', (req, res) => {
  res.set('Content-Security-Policy', 'sandbox allow-scripts');
  res.send(
    `
<html lang="">
<head title="sandboxed"></head>
<body>
  
  <h3>secure</h3>
  <script>
    console.log('secure', {
      opener: window.opener,
      parent: window.parent,
      // cookies: document.cookie
    });
  </script>
</body>
</html>
    `
  );
});

app.listen(8891, () => {
  console.log('listening on http://localhost:8891/');
})
