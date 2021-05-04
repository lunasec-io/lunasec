import app from './app';

if (!process.env.SECURE_FRAME_CLIENT_SECRET) {
    throw new Error('Unable to start server without SECURE_FRAME_CLIENT_SECRET for Tokenizer');
}

app.listen(5002, () => {
    console.log('listening on http://localhost:5002/');
});
