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
template = """Given the following query
----- start query
{query}
----- end query  

Below I'm going to give you a section of page contents that were scraped off of a webpage. Copy any sentences from the scraped page
that might provide context for the query into the template.
The goal is to eliminate the useless parts of the scraped web page such as button text and headers, and go from scraped junk to a clean article.
It's okay to stop in the middle of a sentence if that's where the page contents ends. It's also ok to return the body as an empty string if 
 there is no useful text in the scraped section I gave you. 
  
 This is the last couple of sentences of a section of the page you previously processed. I'm showing you so that you can try to make your new section mesh 
grammatically with the last word of this previously processed text, as we will be adding your new "body" response onto the end of it. If it's empty then nevermind and just start fresh.
--- BEGIN PREVIOUS BODY ---
{existing_body}
--- END PREVIOUS BODY ---

 The template for your response is:
--- BEGIN TEMPLATE ---
Body: [your cleaned up page text from the below scraped page here]
--- END TEMPLATE ---


And here are the scraped page contents:
--- BEGIN SCRAPED PAGE CONTENTS ---
{page_content}
--- END SCRAPED PAGE CONTENTS ---

 """

output_parser = RegexParser(
	regex=r"Body:\s*(.*)",
	output_keys=["body"],
)


PROMPT = PromptTemplate(
	template=template, input_variables=["query","existing_body","page_content"]
)

MODEL="gpt-3.5-turbo"
llm = OpenAIChat(
	openai_api_key=os.environ.get("OPENAI_API_KEY"), model_name=MODEL, temperature=0
)

enc = tiktoken.encoding_for_model(MODEL)


def format_inputs_for_prompt(page_content, existing_body, query):
	query_splitter = TokenTextSplitter(chunk_size=300, chunk_overlap=0)
	shortened_query = query_splitter.split_text(query)[0]

	existing_body_splitter = TokenTextSplitter(chunk_size=50, chunk_overlap=0)
	shortened_existing_body = existing_body_splitter.split_text(existing_body).pop()

	return {"query": shortened_query, "existing_body": shortened_existing_body, "page_content": page_content}


def run_llm(page_content, existing_body, query):
	inputs = format_inputs_for_prompt(page_content, existing_body, query)
	message_to_llm = PROMPT.format(**inputs)
	raw_result = llm(message_to_llm)
	results = output_parser.parse(raw_result)
	return results['body']

def clean(page_content, query):

	content_splitter = TokenTextSplitter(chunk_size=1500, chunk_overlap=0)
	split_content = content_splitter.split_text(page_content)
	existing_body = " "

	for content in split_content:
		existing_body = existing_body + run_llm(content, existing_body, query)

	return existing_body

def main():
	parser = argparse.ArgumentParser(description = "takes in advisory page contents and cleans them up")
	parser.add_argument("contents", nargs = 1, type = str, help = "a string of page contents")
	parser.add_argument("query", nargs = 1, type = str, help = "query string that the scraper will try to focus on")

	args = parser.parse_args()

	if args.contents != None:
		contents = args.contents[0]
		query = args.query[0]
		results = clean(contents, query)
		print(results)

if __name__ == "__main__":
	main()
