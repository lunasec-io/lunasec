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
        - pattern-inside: class $X extends $IMPORT { ... }
        - pattern-inside: class $X extends $IMPORT.$CLASS { ... }
    message: A vulnerable package was imported and called.
    languages:
      - javascript
      - typescript
    severity: ERROR
  - id: imported-and-called-taint
    mode: taint
    options:
      symbolic_propagation: true
    pattern-sources:
    - pattern: $IMPORT = require("{{ .PackageName }}")
    pattern-sinks:
    - patterns:
        - pattern: $IMPORT(...)
        - pattern-not: require(...)
    - pattern: class $X extends $IMPORT { ... }
    - pattern: class $X extends $IMPORT.$CLASS { ... }
    message: A vulnerable package was imported and called.
    languages:
      - javascript
      - typescript
    severity: ERROR
