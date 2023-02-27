
import os
import pinecone

PINECONE_API_KEY = os.getenv('PINECONE_API_KEY')

def loadPineconeIndex:
	pinecone.init(api_key=PINECONE_API_KEY, environment="us-west1-gcp")
	# pinecone.create_index(
	#     "quickstart",
	#     dimension=1536,
	#     metric="euclidean",
	#     pod_type="p1"
	# )
	return pinecone.Index("quickstart")

