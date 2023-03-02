import json
from parse_html import parse_html_to_document,upload_document_to_pinecone
from llama_index import Document, GPTPineconeIndex

# Opening JSON file
f = open('./experimental/test_data.json')

# returns JSON object as
# a dictionary
references = json.load(f)

for reference in references:
	print(reference.keys())
	# document = parse_html_to_document(reference['content'], reference['url'])
	# document = Document(reference['normalized_content'])
	# print(document.get_embedding())
	# print(document)
	upload_document_to_pinecone(reference['normalized_content'], 'fake-url.com', {'vulnerability_id':reference['vulnerability_id']})
