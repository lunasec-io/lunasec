import os
import json
from langchain.prompts.base import RegexParser
import asyncio
from langchain.text_splitter import TokenTextSplitter
from langchain.llms import OpenAIChat
from langchain.chains.question_answering import load_qa_chain
import tiktoken
import argparse

from langchain.prompts import PromptTemplate
from langchain.docstore.document import Document


# jsonFile = open(
# 	os.path.dirname(os.path.realpath(__file__)) + "/../js/testvulndata.json"
# )
#
# references = json.load(jsonFile)

# this template is 294 tokens, ~ 300
template = """Given that there is a software vulnerability: 
----- start description
{description}
----- end description  

The following code snippet were found on a website about the vulnerability. It is a json object with the source code in the key "code" and a short preamble of whatever text was above the code snippet in the key "preamble". 
The preamble might not be relevant.
Give a short description in less than four sentences of what the code snippet could be used to do, 
particularly in how it relates to information about the software vulnerability described above. If the code just 
seems random, irrelevant, or not useful for that, then respond with the exact string "irrelevant" instead. 

In addition to giving a summary, also give the other fields listed as follows:
Response should be in the form: 

Answer: [summary here]
Score: [a score of how useful the code example is for learning about the vulnerability from 0 to 100]
Type: [ either "example_vulnerable_code" or "example_payload_or_exploit" or "vulnerability_and_exploit_combined" or "mitigation" or "other" or "irrelevant"]
Language: [programming language name in lower case, for example: "java" or "python" or "shell" or "unknown" ]


------ start code
{context}
------- end code

 """

output_parser = RegexParser(
	regex=r"Answer:\s*(.*)\s+Score:\s*([0-9]*)\s+Type:\s*(.*)\s+Language:\s*(.*)",
	output_keys=["answer", "score", "type", "language"],
)


PROMPT = PromptTemplate(
	template=template, input_variables=["description","context"], output_parser=output_parser
)

MODEL="gpt-3.5-turbo"
OpenAIChat = OpenAIChat(
	openai_api_key=os.environ.get("OPENAI_API_KEY"), model_name=MODEL
)

enc = tiktoken.get_encoding('p50k_base')

def get_token_length(text):
	return len(enc.encode(text))




def format_code_for_prompt(code,description):
	description_splitter = TokenTextSplitter(chunk_size=300, chunk_overlap=0)
	shortened_description = description_splitter.split_text(description)[0]
	description_length = get_token_length(shortened_description)

	preamble = code["preamble"]
	# get the end of the preamble since its more likely to have the context about the code block (closest on page to code block)
	preamble_splitter = TokenTextSplitter(chunk_size=150, chunk_overlap=0)
	shortened_preamble = preamble_splitter.split_text(preamble).pop()
	preamble_length = get_token_length(shortened_preamble)
	code_body = code["code"]

	#get the amount of space left minus 300 tokens for a response, should be plenty

	remaining_tokens = 3800 - description_length - preamble_length - get_token_length(template)
	# take the first chunk of code, hopefully enough
	code_splitter = TokenTextSplitter(chunk_size=remaining_tokens, chunk_overlap=0)
	shortened_code_body = code_splitter.split_text(code_body)[0]

	return [{"preamble": shortened_preamble, "code": shortened_code_body}, shortened_description]


async def async_run(chain, code, source_url, description):
	[shortened_code, shortened_description] = format_code_for_prompt(code, description)
	doc = Document(page_content=str(shortened_code))
	result = await chain.arun({"input_documents": [doc], "description":shortened_description})
	parsed_output = output_parser.parse(result)
	score_text = parsed_output["score"]
	return {
		"code": code["code"],
		"score": int(score_text),
		"summary": parsed_output["answer"],
		"type": parsed_output["type"],
		"language": parsed_output["language"],
		"source_url": source_url,
	}

async def summarize_concurrently(references):
	global global_results
	chain = load_qa_chain(openai, chain_type="stuff", verbose=False, prompt=PROMPT)
	# get the data organized in a flat format for task queueing
	to_summarize_list = []
	for idx, ref in enumerate(references):
		source = ref["url"]
		vuln_description = ref["vuln_description"]
		for code in ref["code"]:
			to_summarize = {'code':code,'source':source,'vuln_description':vuln_description}
			to_summarize_list.append(to_summarize)

	tasks = [async_run(chain, to_summarize['code'], to_summarize['source'], to_summarize['vuln_description']) for to_summarize in to_summarize_list]
	results = await asyncio.gather(*tasks)
	return results

async def main(args):

	if args.references != None:
		references = json.loads(args.references[0])
		results = await summarize_concurrently(references)

		filtered_results = filter(lambda result: result["score"] >= 80, results)
		sorted_results = sorted(filtered_results, key=lambda res: res["score"], reverse=True)

		print(json.dumps(sorted_results))

def async_main(args):
	asyncio.run(main(args))

def add_subparser(subparsers):
	subparser = subparsers.add_parser('summarize-code', help="takes in things that might be vuln reproductions and filters and organizes them")
	subparser.add_argument("references", nargs = 1, type = str, help = "takes a json array of references, each of which has an array of code snippets found within. JSON structure can be found in bsl/ml/js/index")
	subparser.add_argument('-s','--score-cutoff', nargs = 1, metavar = "min score", type = int, default=80)

	subparser.set_defaults(func=async_main)

