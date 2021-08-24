---
id: "express-grants"
title: "Express Grants"
sidebar_label: "Express Grants"
---

TODO: EHHHH dont use this, just explain in backend
# Express Grants
Because we need to set and check Grants (LunaSec's token specific permissions), the server needs to know what fields are tokens.
We provide a schema directive to make this straightforward.  Behind the scenes, the directive calls the Dedicated Tokenizer.
If there is a problem with the session or the Grant, it will throw and error that Apollo will handle and send to the client.
