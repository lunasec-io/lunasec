rules:
  - id: imported-and-called
    options:
      symbolic_propagation: true
    patterns:
      - pattern-either:
          - pattern-inside: |
              $IMPORT = require($PACKAGE)
              ...
          - pattern-inside: |
              import $IMPORT from "$PACKAGE"
              ...
          - pattern-inside: |
              import * as $IMPORT from "$PACKAGE"
              ...
          - pattern-inside: |
              import { ..., $IMPORT,... } from "$PACKAGE"
              ...
          - pattern-inside: |
              import { ..., $X as $IMPORT,... } from "$PACKAGE"
              ...
      - metavariable-comparison:
          metavariable: $PACKAGE
          comparison: $PACKAGE == "{{ .PackageName }}"
      - pattern-either:
        - pattern-inside: $IMPORT.$FUNC(...)
        - pattern-inside: $IMPORT(...)
    message: A vulnerable package was imported and called.
    languages:
      - javascript
      - typescript
    severity: ERROR
