# from dotenv import load_dotenv
# from pinecone_loader.get_client import loadPineconeIndex
# load_dotenv()  # take environment variables from .env.
#
# from llama_index import GPTPineconeIndex
#
#
#
# index = GPTPineconeIndex([], pinecone_index=loadPineconeIndex())
#
#
# response = index.query('Tell me what would be required to exploit GHSA-9j49-mfvp-vmhm in practice',mode='embedding')
#
# print(response)

from langchain.llms import OpenAI
from langchain.chains.qa_with_sources import load_qa_with_sources_chain
from langchain.chains.summarize import load_summarize_chain

# from langchain.docstore.document import Document
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.chains import VectorDBQAWithSourcesChain
from langchain.prompts import PromptTemplate

import os
from pinecone_tools.get_client import loadPineconeIndex

index = loadPineconeIndex()
openai = OpenAI(openai_api_key=os.environ.get('OPENAI_API_KEY'), temperature=0)
openai_embeddings = OpenAIEmbeddings(openai_api_key=os.environ.get('OPENAI_API_KEY'))

query = "What are the vulnerable function names for"


vectorstore = Pinecone(index, openai_embeddings.embed_query, "text")
#
# request_json = request.get_json(silent=True)
# if 'conversation_transcript' not in request_json or 'last_message' not in request_json:
# 	return ({'response': 'Sorry, I didn\'t catch that. Try typing your request in again'}, 200, headers)
#
# conversation_transcript = request_json['conversation_transcript']
# last_message = request_json['last_message']


template = """Given the following information about the software vulnerability, what are the vulnerable function names of the vulnerable library. 
For instance, if the library is named "myLibrary" and called "myLibrary.myFunction" is vulnerable, then "myFunction" would be a vulnerable function name. 
 If you don't know or don't have enough information to answer, just say explain that you aren't sure instead of making up an answer.

QUESTION: {question}

SOURCES: 
=========
{summaries}
=========
Give your answer to the question: """

PROMPT = PromptTemplate(template=template, input_variables=["summaries", "question"])

chain = load_summarize_chain(openai, chain_type="stuff",verbose=True, prompt=PROMPT)

# Does the document loading built in, less control though
# chain = VectorDBQAWithSourcesChain.from_chain_type(OpenAI(temperature=0), chain_type="stuff", vectorstore=vectorstore)

input_documents = vectorstore.similarity_search("An example exploit of the vulnerability", k=5, filter={'vulnerability_id':'GHSA-jfh8-c2jp-5v3q'})
# print(input_documents)
# print('document length ')
# print(len(input_documents))


response = chain(
	{
		 "input_documents": input_documents,
		"question": query,
	},

	return_only_outputs=True,
)

print(response)
