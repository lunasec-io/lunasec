from dotenv import load_dotenv
from pinecone_loader.get_client import loadPineconeIndex
load_dotenv()  # take environment variables from .env.

from llama_index import GPTSimpleVectorIndex, SimpleDirectoryReader, LLMPredictor, download_loader, GPTPineconeIndex
import pinecone
from parse_html import parse_html
# Creating a Pinecone index


# document = parse_html('fake-url.com')


index = GPTPineconeIndex([], pinecone_index=loadPineconeIndex())


response = index.query('Name the three little sisters')

print(response)
