
from bs4 import BeautifulSoup
from llama_index import Document
from pinecone_loader.get_client import loadPineconeIndex


html_doc = """<html><head><title>The Dormouse's story</title></head>
<body>
<p class="title"><b>The Dormouse's story</b></p>

<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>

<p class="story">...</p>
"""




def parse_html_to_document(url):
	soup = BeautifulSoup(html_doc, 'html.parser')
	title = soup.head.title.string
	text = ''.join(soup.findAll(text=True))
	document = Document(text, doc_id=url, extra_info={'title': title})
	return document

def upload_document_to_pinecone(document):
	index = loadPineconeIndex()
	index.insert(document)
