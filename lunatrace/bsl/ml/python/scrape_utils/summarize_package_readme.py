import os
from langchain.text_splitter import TokenTextSplitter
from langchain.llms import OpenAIChat
from langchain.chains.summarize import load_summarize_chain
import argparse

from langchain.prompts import PromptTemplate
from langchain.docstore.document import Document


initial_template = """I'm going to show you a readme from a software package. Explain the use case of the package in two sentences or less,
 with a specific focus on the general purpose and usage of the library in the most analytical terms, no marketing speak. You're also welcome to use your 
prior knowledge if you're familiar with the package. For instance, if I asked you analyze the use case of the node package Express, which I'm sure you're familiar with,
it might look like this. Your response should be like this one, which explains which environment the library is useful for (backend server), what language (javascript), 
and exactly what it could be used for. Example: "A webserver framework designed for building servers in Node backends using Javascript. 
It can be used to serve single page applications, websites, hybrids, or public HTTP APIs on the internet."

An explanation of the Fastify framework, for instance, 
would be identical, because the use case of the two libraries is the same. Don't mention the license, the creators name, or anything that isn't relevant to what the library is used for. 

If you can't tell because the readme is useless and you're not familiar with the library from prior knowledge, return nothing at all, just empty, no words or explanation.
---- BEGIN README ----
{text}
---- END README ----
  """

PROMPT = PromptTemplate(
	template=initial_template, input_variables=["text"]
)

MODEL="gpt-3.5-turbo"
llm = OpenAIChat(
	openai_api_key=os.environ.get("OPENAI_API_KEY"), model_name=MODEL, temperature=0
)

def summarize(readme):
	chain = load_summarize_chain(llm, chain_type="refine", verbose=True, question_prompt=PROMPT)
	text_splitter = TokenTextSplitter(chunk_size=3000, chunk_overlap=0)
	readme_chunks = text_splitter.split_text(readme)
	docs = [Document(page_content=readme_chunk) for readme_chunk in readme_chunks]
	# just use the first section for now, waiting to see if we really need to use more than this. If we do, then we will need to provide a refine_prompt as well
	result = chain.run([docs[0]])
	return result

def main(args):

	if args.readme != None:
		readme = args.readme[0]
		results = summarize(readme)
		print(results)


def add_subparser(subparsers):
	subparser = subparsers.add_parser('summarize-readme', help="takes a package readme and summarizes its use case in two sentences, primarily for vector encoding")

	subparser.add_argument("readme", nargs = 1, type = str, help ="a string markdown readme text")

	subparser.set_defaults(func=main)

