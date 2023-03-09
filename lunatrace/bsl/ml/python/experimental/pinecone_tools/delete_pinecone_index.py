

from get_client import loadPinecone
import pinecone

loadPinecone()
pinecone.delete_index("quickstart")
