import os
from langchain.prompts.base import RegexParser
from langchain.text_splitter import TokenTextSplitter
from langchain.llms import OpenAIChat
import tiktoken
import argparse

from langchain.prompts import PromptTemplate


# jsonFile = open(
# 	os.path.dirname(os.path.realpath(__file__)) + "/../js/testvulndata.json"
# )
#
# references = json.load(jsonFile)

# this template is 389 tokens, ~ 400
template = """
I'm going to show you some scraped page text. Using it, {query}

I might show you a scraped section from lower down the page and give you an answer that was based on the content above the scraped section.
Refine or expand this answer based on the page content I give you.
 If it's empty or irrelevant to the query then never-mind and just start a new answer.
--- BEGIN PREVIOUS ANSWER ---
{existing_body}
--- END PREVIOUS ANSWER ---

And here are the scraped page contents:
--- BEGIN SCRAPED PAGE CONTENTS ---
{page_content}
--- END SCRAPED PAGE CONTENTS ---
You may have seen a list of links that were found on the page at the bottom of the scraped contents. If it looks like
one of these links might have the information needed, you could tell me to scrape it and give me the link. Otherwise, ignore this part.
 """

# output_parser = RegexParser(
# 	regex=r"(.*?)",
# 	output_keys=["body"],
# )


PROMPT = PromptTemplate(
	template=template, input_variables=["query","existing_body","page_content"]
)

MODEL="gpt-3.5-turbo"
llm = OpenAIChat(
	openai_api_key=os.environ.get("OPENAI_API_KEY"), model_name=MODEL, temperature=0
)

enc = tiktoken.get_encoding('p50k_base')


def format_inputs_for_prompt(page_content, existing_body, query):
	query_splitter = TokenTextSplitter(chunk_size=300, chunk_overlap=0)
	shortened_query = query_splitter.split_text(query)[0]

	# existing_body_splitter = TokenTextSplitter(chunk_size=50, chunk_overlap=0)
	# shortened_existing_body = existing_body_splitter.split_text(existing_body).pop()

	return {"query": shortened_query, "existing_body": existing_body, "page_content": page_content}


def run_llm(page_content, existing_body, query):
	inputs = format_inputs_for_prompt(page_content, existing_body, query)
	message_to_llm = PROMPT.format(**inputs)
	raw_result = llm(message_to_llm)
	return raw_result

def summarize(page_content, query):
	content_splitter = TokenTextSplitter(chunk_size=2200, chunk_overlap=40)
	split_content = content_splitter.split_text(page_content)
	if (len(split_content)) > 8:
		return "This page is too long to read quickly, try something else."
	existing_body = " "
	print("\nsplit page content into chunks: " + str(len(split_content)))
	for content in split_content:
		existing_body = existing_body + run_llm(content, existing_body, query)

	return existing_body

def main(args):
	if args.contents != None:
		contents = args.contents[0]
		query = args.query[0]
		results = summarize(contents, query)
		print(results)

def add_subparser(subparsers):
	subparser = subparsers.add_parser('summarize-scraped', help="takes any page content and a command to extract some information from it, as desired. Useful when you have a specific question to ask of an advisory. Not used for advisory ingestion, instead used by the chat-bot in real time.")

	subparser.add_argument("contents", nargs = 1, type = str, help = "a string of page contents")
	subparser.add_argument("query", nargs = 1, type = str, help = "query string that the scraper will try to focus on. can be phraised as a question or command, both are fine")

	subparser.set_defaults(func=main)
