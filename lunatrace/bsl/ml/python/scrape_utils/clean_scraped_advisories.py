import json
import os
import pprint

from langchain.prompts.base import RegexParser
from langchain.text_splitter import TokenTextSplitter
from langchain.llms import OpenAIChat
import tiktoken
import argparse

from langchain.prompts import PromptTemplate
from langchain.docstore.document import Document


# jsonFile = open(
# 	os.path.dirname(os.path.realpath(__file__)) + "/../js/testvulndata.json"
# )
#
# references = json.load(jsonFile)

# this template is 389 tokens, ~ 400
template = """Given that there is a software vulnerability: 
----- start description
{description}
----- end description  

Below I'm going to give you a section of page contents that were scraped off of a webpage that may be about that vulnerability. Copy any sentences from the scraped page
that might be useful into the template.
The goal is to eliminate the useless parts of the scraped web page such as button text and headers, and go from scraped junk to a clean article. Omit anything that looks like a big block of code.
It's okay to stop in the middle of a sentence if that's where the page contents ends. It's also ok to return the body as an empty string if 
 there is no useful text in the scraped section I gave you. Don't omit any sentences from the scraped text, only remove things that look like text from buttons and footers and junk like that. Be sparing with what you omit. 
 I want to see most of the content returned, minus all the one word sentences from buttons and so on.
 
 This is the last couple of sentences of a section of the page you previously processed. I'm showing you so that you can try to make your new section mesh 
grammatically with the last word of this previously processed text, as we will be adding your new "body" response onto the end of it. If it's empty then nevermind and just start fresh.
--- BEGIN PREVIOUS BODY ---
{existing_body}
--- END PREVIOUS BODY ---

 The template for your response is:
--- BEGIN TEMPLATE ---
Body: [your cleaned up page text from the below scraped page here]
Summary: [your one sentence summary of what this page is about, potentially refining the summary shown below. Give a meta-description of the page, not a direct summary of the contents. Ex: "Ruby-advisory-db page explaining mitigation techniques"]
--- END TEMPLATE ---


And here are the scraped page contents:
--- BEGIN SCRAPED PAGE CONTENTS ---
{page_content}
--- END SCRAPED PAGE CONTENTS ---

Here is the existing summary from the contents higher up on the page, if there is one
--- BEGIN EXISTING SUMMARY ---
{existing_summary}
--- END EXISTING SUMMARY ---
 """

output_parser = RegexParser(
	regex=r"Body:\s*((?:.|\n)*?)(?:\n?Summary:|\Z)\s*((?:.|\n)*)",
	output_keys=["body", "summary"],
)


PROMPT = PromptTemplate(
	template=template, input_variables=["description","existing_body","existing_summary","page_content"]
)

MODEL="gpt-3.5-turbo"
llm = OpenAIChat(
	openai_api_key=os.environ.get("OPENAI_API_KEY"), model_name=MODEL, temperature=0
)

enc = tiktoken.get_encoding('p50k_base')


def format_inputs_for_prompt(page_content, existing_body, existing_summary, vuln_description):
	description_splitter = TokenTextSplitter(chunk_size=300, chunk_overlap=0)
	shortened_description = description_splitter.split_text(vuln_description)[0]

	existing_body_splitter = TokenTextSplitter(chunk_size=50, chunk_overlap=0)
	shortened_existing_body = existing_body_splitter.split_text(existing_body).pop()

	return {"description": shortened_description, "existing_body": shortened_existing_body, "existing_summary":existing_summary, "page_content": page_content}


def run_llm(page_content, existing_body, existing_summary, vuln_description):
	inputs = format_inputs_for_prompt(page_content, existing_body, existing_summary, vuln_description)
	message_to_llm = PROMPT.format(**inputs)
	raw_result = llm(message_to_llm)
	results = output_parser.parse(raw_result)
	return results

def clean(page_content, vuln_description):
	content_splitter = TokenTextSplitter(chunk_size=1500, chunk_overlap=0)
	split_content = content_splitter.split_text(page_content)
	existing_body = " "
	existing_summary = ""
	for content in split_content:
		results = run_llm(content, existing_body, existing_summary, vuln_description)
		existing_summary = results["summary"]
		existing_body = existing_body + results['body']

	return {"content":existing_body, "summary":existing_summary}

def main(args):
	if args.contents != None:
		contents = args.contents[0]
		description = args.description[0]
		results = clean(contents, description)
		print(json.dumps(results))

def add_subparser(subparsers):
	subparser = subparsers.add_parser('clean-advisories', help="takes in advisory page contents and cleans them up. Useful for general pre-processing of dirty scraped data")

	subparser.add_argument("contents", nargs = 1, type = str, help = "a string of page contents")
	subparser.add_argument("description", nargs = 1, type = str, help = "vuln description string to help give context clues to the cleanup")

	subparser.set_defaults(func=main)
