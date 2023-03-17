
from bs4 import BeautifulSoup
from llama_index import Document, GPTPineconeIndex
from pinecone_loader.get_client import loadPineconeIndex
from llama_index.embeddings.openai import OpenAIEmbedding

def parse_html_to_document(html, url):
	soup = BeautifulSoup(html, 'html.parser')
	title = soup.head.title.string
	print('loading title: '+title)
	text = ''.join(soup.findAll(text=True))
	document = Document(text, doc_id=url, extra_info={'title': title})
	return document

embed_model = OpenAIEmbedding()
def upload_document_to_pinecone(text, doc_id, metadata):
	embedding = embed_model.get_text_embedding(text=text)

	# print(embedding)
	pinecone = loadPineconeIndex()
	pinecone.upsert([(doc_id, embedding, metadata)])
	# index = loadPineconeIndex()
	# GPTPineconeIndex([document], pinecone_index=index)
