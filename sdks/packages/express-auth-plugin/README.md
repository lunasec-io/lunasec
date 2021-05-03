# Express Auth Plugin

This plugin adds a route necessary in order to complete the secure frame oauth flow.

This endpoint takes the openid auth provider `id_token` cookie, encrypts it, and then continues the oauth flow so that a session with the secure frame is made.

## Testing

```
SECURE_FRAME_KEYSET="$(cat ~/projects/loq/fixtures/secureframe/public-secureframe.cfg)" SECURE_FRAME_URL="http://sound:37766" DEBUG=express:* node build/main/test_server.js
```
