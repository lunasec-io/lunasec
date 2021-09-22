<!--
  ~ Copyright by LunaSec (owned by Refinery Labs, Inc)
  ~
  ~ Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
  ~ (the "License"); you may not use this file except in compliance with the
  ~ License. You may obtain a copy of the License at
  ~
  ~ https://creativecommons.org/licenses/by-sa/4.0/legalcode
  ~
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
-->
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
