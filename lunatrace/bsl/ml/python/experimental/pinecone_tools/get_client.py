
import os
import pinecone

PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')

def loadPineconeIndex():
	loadPinecone()
	return pinecone.Index("quickstart")

def loadPinecone():
	pinecone.init(api_key=PINECONE_API_KEY, environment="us-west1-gcp")
