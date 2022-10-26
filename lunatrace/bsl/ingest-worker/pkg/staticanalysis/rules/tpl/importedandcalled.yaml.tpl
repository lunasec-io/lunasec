rules:
  - id: imported-and-called
    mode: taint
    options:
      symbolic_propagation: true
    pattern-sources:
    - pattern: $IMPORT = require("{{ .PackageName }}")
    - pattern: import $IMPORT from "{{ .PackageName }}"
    - pattern: import * as $IMPORT from "{{ .PackageName }}"
    - pattern: import { ..., $IMPORT,... } from "{{ .PackageName }}"
    - pattern: import { ..., $X as $IMPORT,... } from "{{ .PackageName }}"
    pattern-sinks:
    - pattern: $IMPORT.$FUNC(...)
    - pattern: $IMPORT(...)
    - pattern: class $X extends $IMPORT { ... }
    - pattern: class $X extends $IMPORT.$CLASS { ... }
    message: A vulnerable package was imported and called.
    languages:
      - javascript
      - typescript
    severity: ERROR
