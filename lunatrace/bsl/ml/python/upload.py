from langchain.llms import OpenAI
from langchain.chains.qa_with_sources import load_qa_with_sources_chain
from langchain.docstore.document import Document
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Pinecone
from langchain.text_splitter import CharacterTextSplitter, RecursiveCharacterTextSplitter
import random
import os
import string
from dotenv import load_dotenv
from pinecone_tools.get_client import loadPineconeIndex

load_dotenv()
openai = OpenAI(openai_api_key=os.environ.get('OPENAI_API_KEY'), temperature=0)

# model_name = "sentence-transformers/all-mpnet-base-v2"
# huggingface_embeddings = HuggingFaceEmbeddings(model_name=model_name)
openai_embeddings = OpenAIEmbeddings(openai_api_key=os.environ.get('OPENAI_API_KEY'))

# pinecone.init(api_key=os.environ.get('PINECONE_API_KEY'), environment=os.environ.get('PINECONE_ENVIRONMENT'))
# index = pinecone.Index(os.environ.get('PINECONE_INDEX'))
index = loadPineconeIndex()
vectorstore = Pinecone(index, openai_embeddings.embed_query, "text")


# example processed_reference as if it were a typescript interface
# export interface Welcome {
# 	id:                 number;
# created_at:         string;
# updated_at:         string;
# deleted_at:         null;
# vulnerability_id:   string;
# url:                string;
# title:              string;
# content:            string;
# normalized_content: string;
# content_type:       string;
# successful_fetch:   number;
# }

# caches
documents = []
metadatas = []
ids = []

# needed because its possible to submit queries that are too large to pinecone, this handles the buffer and flushes to server when appropriate
def queue_pinecone_upload(force_flush, document=None, metadata=None, id=None):
	global documents
	global metadatas
	global ids
	if (document != None):
		documents.append(document)
		metadatas.append(metadata)
		ids.append(id)
		print('queued documents: ' + str(len(documents)))

	document_count = len(documents)
	if((document_count > 0 and force_flush) or document_count > 19):
		print('flushing cache of documents to pinecone')
		print(metadatas)
		# store the cache before wiping
		documents_flushed = documents
		metadatas_flushed = metadatas
		ids_flushed = ids
		# wipe the current values so we dont get dupes in case function is called while upserting
		documents = []
		metadatas = []
		ids = []
		# upload
		vectorstore.add_texts(texts=documents_flushed, metadatas=metadatas_flushed, ids=ids_flushed)


def upsert_to_pinecone(processed_references):
	for reference in processed_references:
		splitter = RecursiveCharacterTextSplitter(chunk_size=1024, chunk_overlap=int(os.environ.get('CHUNK_OVERLAP')))
		url = reference['url']
		text = reference['normalized_content']
		vulnerability_id = reference['vulnerability_id']
		for idx, partialDocument in enumerate(splitter.split_text(text)):
			metadata = {"source": url, "vulnerability_id": vulnerability_id}
			# the id is just the URL plus the chunk number, this should handle upserting fairly well unless a document shrinks a lot
			id = url + ':' + str(idx)
			# print(partialDocument)
			queue_pinecone_upload(False, partialDocument, metadata, id)

	queue_pinecone_upload(force_flush=True)



#
# if __name__ == '__main__':
# 	parser = argparse.ArgumentParser()
# 	parser.add_argument('--type', help='type of data to index', required=True)
# 	parser.add_argument('data', help='data to index')
# 	parser.add_argument('--baseurl', help='base url', required=False)
# 	parser.add_argument('--siteid', help='site id to be added to vector metadata', required=False)
#
# 	args = parser.parse_args()
# 	data_type = args.type
# 	data = args.data
# 	base_url = args.baseurl
# 	site_id = args.siteid
#
# 	if data_type == 'csv':
# 		gather_search_index_from_csv(data)
# 	elif data_type == 'json':
# 		gather_search_index_from_json(data)
# 	elif data_type == 'json_v2':
# 		gather_search_index_from_json_v2(data, base_url=base_url)
# 	elif data_type == 'video':
# 		gather_search_index_from_video_transcripts(data)
# 	elif data_type == 'urls':
# 		gather_search_index_from_urls(data, site_id=site_id)
# 	else:
# 		print("data type not supported")
