---
id: "mitre-cwe-top-25-weaknesses"
title: "Mitre CWE Top 25 Weaknesses"
sidebar_label: "Mitre CWE Top 25 Weaknesses"
sidebar_position: 7
---

[2021 Common Weakness Enumeration (CWE) 25 Most Dangerous Software Weaknesses](https://cwe.mitre.org/top25/archive/2021/2021_cwe_top25.html)

NOTE: Some weaknesses from this list are not applicable since they only apply to certain software languages which LunaSec does not support.

| Vulnerability | Description | LunaSec Mitigation |
| --- | --- | --- |
| (2) Cross Site Scripting (XSS) | [https://cwe.mitre.org/data/definitions/79.html](https://cwe.mitre.org/data/definitions/79.html) | (See XSS) |
| (4) Improper Input Validation | [https://cwe.mitre.org/data/definitions/20.html](https://cwe.mitre.org/data/definitions/20.html) | The LunaSec Tokenizer only ever treats data as data when it is being stored. In the LunaSec Secure Frame, there are hardened data validators which can enforce validation for certain formats (ex. credit card numbers). |
| (5) OS Command Injection | [https://cwe.mitre.org/data/definitions/78.html](https://cwe.mitre.org/data/definitions/78.html) | (See Code Injection) |
| (6) SQL Injection | [https://cwe.mitre.org/data/definitions/89.html](https://cwe.mitre.org/data/definitions/89.html) | (See SQLi) |
| (9) Cross-Site Request Forgery (CSRF) | [https://cwe.mitre.org/data/definitions/352.html](https://cwe.mitre.org/data/definitions/352.html) | (See CSRF) |
| (10) Unrestricted Upload of File with Dangerous Type | [https://cwe.mitre.org/data/definitions/434.html](https://cwe.mitre.org/data/definitions/434.html) | Using blob storage to securely store sensitive data, such as S3, means that data will only ever be treated as data. If file processing needs to be performed on files uploaded to LunaSec, using LunaSec Functions will greatly reduce the impact of this vulnerability if it exists in your application&#39;s code or a third party library you might use. |
| (11) Missing Authentication for Critical Function | [https://cwe.mitre.org/data/definitions/306.html](https://cwe.mitre.org/data/definitions/306.html) | (See Improper Access Control) |
| (14) Improper Authentication | [https://cwe.mitre.org/data/definitions/287.html](https://cwe.mitre.org/data/definitions/287.html) | (See Improper Authentication) |
| (16) Use of Hard-coded Credentials | [https://cwe.mitre.org/data/definitions/798.html](https://cwe.mitre.org/data/definitions/798.html) | (See Insufficiently Protected Credentials) |
| (18) Missing Authorization | [https://cwe.mitre.org/data/definitions/862.html](https://cwe.mitre.org/data/definitions/862.html) | In order to access the data corresponding to a token in the LunaSec Stack, a valid authorization grant must exist for the requesting user. Even with this system, it is possible for a grant to simply be created for the user without actually performing a proper authorization check. To solve this issue, a LunaSec Secure Authorizer can be used to perform just in time authorization checks at the point in time a token is being detokenized. |
| (19) Incorrect Default Permissions | [https://cwe.mitre.org/data/definitions/276.html](https://cwe.mitre.org/data/definitions/276.html) | The LunaSec Stack is designed to be as secure as possible for each level of configuration. Higher security levels provide more security guarantees by default, therefore decreasing the risk of a vulnerable default configuration. |
| (20) Exposure of Sensitive Information to an Unauthorized Actor | [https://cwe.mitre.org/data/definitions/200.html](https://cwe.mitre.org/data/definitions/200.html) | (See Information Disclosure) |
| (21) Insufficiently Protected Credentials | [https://cwe.mitre.org/data/definitions/522.html](https://cwe.mitre.org/data/definitions/522.html) | Encryption keys used for encrypting the sensitive data given to LunaSec are encrypted themselves at rest in a hardened database. Additionally the Tokenizer Secret, which is used as a part of the encryption process, is stored in the AWS Secrets Manager. If the Level 5 security configuration is being used, the Cloud HSM even further protects against this vulnerability by locking the tokenizer secret in dedicated hardware. |
| (22) Incorrect Permission Assignment for a Critical Resource | [https://cwe.mitre.org/data/definitions/732.html](https://cwe.mitre.org/data/definitions/732.html) | (See Incorrect Default Permissions) |
| (24) Server-Side Request Forgery (SSRF) | [https://cwe.mitre.org/data/definitions/918.html](https://cwe.mitre.org/data/definitions/918.html) | (See SSRF) |
| (25) Command Injection | [https://cwe.mitre.org/data/definitions/77.html](https://cwe.mitre.org/data/definitions/77.html) | (See Code Injection) |
