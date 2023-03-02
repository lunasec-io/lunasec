
from get_client import loadPinecone
import pinecone

loadPinecone()
pinecone.create_index(
	"quickstart",
	dimension=1536,
	metric="euclidean",
	pod_type="p1"
)
