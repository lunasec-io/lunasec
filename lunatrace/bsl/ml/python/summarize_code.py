



import os
import json

from langchain.llms import OpenAI
from langchain.chains.summarize import load_summarize_chain
from langchain.chains.question_answering import load_qa_chain
# from langchain.docstore.document import Document
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.chains import VectorDBQAWithSourcesChain
from langchain.prompts import PromptTemplate
from langchain.docstore.document import Document

from pinecone_tools.get_client import loadPineconeIndex

jsonFile = open(os.path.dirname(os.path.realpath(__file__)) + "/../js/testvulndata.json")

references = json.load(jsonFile)


template = """Given that there is a software vulnerability: 
----- start description
Apache Log4j2 2.0-beta9 through 2.15.0 (excluding security releases 2.12.2, 2.12.3, and 2.3.1) JNDI features used in configuration, log messages, and parameters do not protect against attacker controlled LDAP and other JNDI related endpoints. An attacker who can control log messages or log message parameters can execute arbitrary code loaded from LDAP servers when message lookup substitution is enabled. From log4j 2.15.0, this behavior has been disabled by default. From version 2.16.0 (along with 2.12.2, 2.12.3, and 2.3.1), this functionality has been completely removed. Note that this vulnerability is specific to log4j-core and does not affect log4net, log4cxx, or other Apache Logging Services projects.
----- end description  

The following code snippet were found on a website about the vulnerability. It is a json object with the source code in the key "code" and a short preamble of whatever text was above the code snippet in the key "preamble". 
The preamble might not be relevant.
As best you can, 
give a short description in less than four sentences of what the code snippet could be used to do, 
particularly in how it relates to information about the software vulnerability described above. If the code just 
seems random, irrelevant, or not useful for that, then respond with the exact string "irrelevant" instead.

------ start code
{context}
------- end code

 """

PROMPT = PromptTemplate(template=template, input_variables=["context"])

openai = OpenAI(openai_api_key=os.environ.get('OPENAI_API_KEY'), model_name="text-davinci-003", temperature=0)

chain = load_qa_chain(openai, chain_type="stuff",verbose=True, prompt=PROMPT)

# print(references)
# docs = [Document(page_content=ref['code']) for ref in references[:5]]


print(references[0]['code'][0])
doc = Document(page_content=str(references[0]['code'][0]))
result = chain({"input_documents": doc}, return_only_outputs=True)

print(result)
