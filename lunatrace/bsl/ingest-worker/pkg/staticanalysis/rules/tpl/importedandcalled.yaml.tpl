rules:
  - id: imported-and-called
    options:
      symbolic_propagation: true
    patterns:
      - pattern-either:
          - pattern-inside: |
              $IMPORT = require("$PACKAGE")
              ...
          - pattern-inside: |
              $IMPORT = require("$PACKAGE")(...)
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
      - metavariable-regex:
          metavariable: $PACKAGE
          regex: \A('|")?{{ .PackageName }}/?
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
  - id: imported-and-called-module-export
    options:
      symbolic_propagation: true
    patterns:
      - pattern-either:
          - pattern-inside: |
              $IMPORT = require("$PACKAGE")
              ...
          - pattern-inside: |
              $IMPORT = require("$PACKAGE")(...)
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
      - metavariable-regex:
          metavariable: $PACKAGE
          regex: \A('|")?{{ .PackageName }}/?
      # TODO (cthompson) it doesn't seem that you can use a metavariable-pattern inside of a pattern-either so this is its own rule for now
      - metavariable-pattern:
          metavariable: $IMPORT
          patterns:
            - pattern-either:
                - pattern-regex: module\.exports
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
    - pattern-either:
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
