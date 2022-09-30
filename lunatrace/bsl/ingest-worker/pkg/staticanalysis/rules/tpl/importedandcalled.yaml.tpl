rules:
  - id: imported-and-called
    options:
      symbolic_propagation: true
    patterns:
      - pattern-either:
          - pattern-inside: |
              $IMPORT = require("{{ .PackageName }}")
              ...
          - pattern-inside: |
              import $IMPORT from "{{ .PackageName }}"
              ...
          - pattern-inside: |
              import * as $IMPORT from "{{ .PackageName }}"
              ...
          - pattern-inside: |
              import { ..., $IMPORT,... } from "{{ .PackageName }}"
              ...
          - pattern-inside: |
              import { ..., $X as $IMPORT,... } from "{{ .PackageName }}"
              ...
      - pattern-either:
        - pattern-inside: $IMPORT.$FUNC()
        - pattern-inside: $IMPORT()
    message: A vulnerable package was imported and called.
    languages:
      - javascript
      - typescript
    severity: ERROR
