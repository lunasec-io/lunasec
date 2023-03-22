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
The protobuf definitions are in `lunasec/lunatrace/bsl/proto/`. To update the protobuf definitions, you will need `protoc` and `protoc-gen-go`:

```shell
yay -S protobuf
python -m pip install grpcio-tools
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
```

To regenerate all generated grpc client code, run this from the repo root
```shell
yarn run generate:go && yarn run generate:ml:python
```
To regenerate the grpc python server, run:
```
python -m grpc_tools.protoc -I../../proto --python_out=. --pyi_out=. --grpc_python_out=. ../../proto/langchain.proto
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
