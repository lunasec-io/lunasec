import os

import tiktoken
from langchain.llms import OpenAIChat
from langchain.text_splitter import TokenTextSplitter


from langchain.prompts import PromptTemplate

template = """
I'm going to show you some text. Using it, {query}

--- BEGIN TEXT ---
{page_content}
--- END TEXT ---
 """

PROMPT = PromptTemplate(
	template=template, input_variables=["query","page_content"]
)

MODEL="gpt-3.5-turbo"
llm = OpenAIChat(
	openai_api_key=os.environ.get("OPENAI_API_KEY"), model_name=MODEL, temperature=0
)

enc = tiktoken.get_encoding('p50k_base')

def format_inputs_for_prompt(page_content, query):
	# it shouldn't be necessary to split the content since it shouldnt be very big, but just in case it is, only take the first big chunk of it
	content_splitter = TokenTextSplitter(chunk_size=3500, chunk_overlap=0)
	shortened_content = content_splitter.split_text(page_content)[0]
	return {"query": query, "page_content": shortened_content}


def read(page_content, query):
	print('reading anything')
	print(page_content)
	inputs = format_inputs_for_prompt(page_content, query)
	message_to_llm = PROMPT.format(**inputs)
	raw_result = llm(message_to_llm)
	return raw_result
