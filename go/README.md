# Go monorepo

This monorepo contains all go services and tools that are a part of Lunasec.

### Build

To build an application, specify the *tag* and the *name* for what you want build in this form:
```shell
make <name> tag=<tag>
```

For example, to build the tokenizer cli tool:
```shell
make tokenizer tag=cli
```
