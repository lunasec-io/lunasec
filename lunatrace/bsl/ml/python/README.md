
# Lunasec-ml Python package

This package contains lunasec's python ML tools, primarily built around langchain. 

## CLI Usage
It is best to install the built package to the system path using pip, unless you are working on this code itself, in which case
follow the dev setup directions below.

Here is the main help text:
```shell
╰─$ python main.py --help     
usage: main.py [-h] {summarize-scraped,clean-advisories,summarize-readme,summarize-code,chat} ...

A collection of lunatrace ML tools

positional arguments:
  {summarize-scraped,clean-advisories,summarize-readme,summarize-code,chat}
    summarize-scraped   takes any page content and a command to extract some information from it, as desired. Useful when you have a specific question to ask of an advisory
    clean-advisories    takes in advisory page contents and cleans them up. Useful for general pre-processing of dirty scraped data
    summarize-readme    takes a package readme and summarizes its use case in two sentences, primarily for vector encoding
    summarize-code      takes in things that might be vuln reproductions and filters and organizes them
    chat                uses a langchain agent and a set of tools to answer general questions about vulns

options:
  -h, --help            show this help message and exit

```

Each command also has its own arguments and help text

## Server

The server is a twirp server that exposes the grpc interface for the langchain agent.

To run the server:
```shell
OPENAI_API_KEY=$(aws secretsmanager get-secret-value --secret-id lunasec-OpenAISecret | jq -r .SecretString) SERPER_API_KEY=TODO uvicorn --reload server:app --port=3000
```

### Proto
The protobuf definitions are in `lunasec/lunatrace/bsl/proto/`. To update the protobuf definitions, you will need `protoc`, `protoc-gen-twirpy`, and `protoc-gen-go`:

```shell
yay -S protobuf
go get -u github.com/verloop/twirpy/protoc-gen-twirpy
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
```

To regenerate the twirp server, run:
```
protoc --python_out=./gen --pyi_out=./gen --twirpy_out=./gen -I ../../proto ../../proto/*
```

**Note**: You will also need to regenerate the go protobuf code. Do this with `go generate ./...` from the root of the repo. Or alternatively, run `yarn generate` from the root of the repo.

## Structure

`/scrape_utils` contains scripts that can be used to clean, summarize, and improve scraped data. Each is a callable CLI. Read the bottom of each file 
or simply call each CLI for usage instructions

`/chat_bot` contains a langchain agent based chatbot, designed for general purpose supply chain security questions and reasoning. `/chat_bot/tools` 
contains the tools that the chatbot can choose to use to access data, if needed.


## Development


### Dependency management
Pipenv is used to install project dependencies. Run `pipenv install` in this dir. Call the CLI by executing `main.py` in the context of pipenv,
so that's `pipenv run python main.py`.

### Building
To build the distributable, call `pipenv run python setup.py`.
