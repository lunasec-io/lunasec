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
  
    window.addEventListener('message', (event) => {
      console.log('parent message:', event);
    });
  
    setTimeout(() => {
      const insecure = document.querySelector('#insecure');
      const secure = document.querySelector('#secure');
      
      console.log('insecure', insecure.contentWindow.document.querySelector('h3'));
      
      insecure.contentWindow.postMessage('hello', 'http://localhost:8891');
      
      try {
        // This seems to need to be set as * because nothing else will work. But, it does work, at least!
        secure.contentWindow.postMessage('hello', '*');
        // console.log('secure', secure.contentWindow.document.querySelector('h3'));
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
    
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:8891') {
        console.error('illegal message to non-sandboxed iframe', event);
        return;
      }
      
      console.log('no sandbox event', event);
      
      window.parent.postMessage('hello', 'http://localhost:8891');
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
    
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:8891') {
        console.error('illegal message to sandboxed iframe', event);
        return;
      }
      
      console.log('sandbox event', event);
      
      window.parent.postMessage('hello', 'http://localhost:8891');
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
