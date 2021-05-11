import app from './app';

if (!process.env.SECURE_FRAME_CLIENT_SECRET) {
    throw new Error('Unable to start server without SECURE_FRAME_CLIENT_SECRET for Tokenizer');
}
const port = 37766
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
