# Go monorepo

This monorepo contains all go services and tools that are a part of Lunasec.

### Build

To build an application, specify the *tag* and the *name* for what you want build in this form:
```shell
BUILD_TAG=<tag> make <name>
```

For example, to build the tokenizer cli tool:
```shell
BUILD_TAG=cli make tokenizer
```
