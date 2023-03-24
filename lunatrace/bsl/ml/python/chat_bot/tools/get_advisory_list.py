import json

from langchain.tools import BaseTool

from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport
from scrape_utils.summarize_scraped import summarize

# Select your transport with a defined url endpoint
transport = AIOHTTPTransport(url="http://localhost:4455/v1/graphql")

# Create a GraphQL client using the defined transport
client = Client(transport=transport, fetch_schema_from_transport=True)

query = gql(
	"""
	query ReadAdvisory($id: uuid!) {
	  vulnerability_reference_content(where: {reference_id: {_eq: $id}}){
		parsed_content
	  }
	}
	
	"""
)


class ReadAdvisory(BaseTool):
	name = "ReadAdvisory"
	description = """Used to read a specific advisory from the list of advisories in the VulnInfo response. 
				  Takes an advisory UUID. Example complete input: ["6e100df0-e4f0-4306-8c45-da8b851f7776", "tell me what java versions are vulnerable"]
				  """

	def _run(self, input: str) -> str:
		"""Use the tool."""
		advisory_id, query = json.loads(input)
		result = client.execute(query, variable_values={'id':advisory_id})
		print('got graphql advisory result ', result)
		contents = result["ReadAdvisory"]['vulnerability_reference_content']
		if not contents or len(contents) < 1:
			return "We dont seem to have that fetched, try something else"
		content = summarize(str(contents[0]["parsed_content"]), query)
		return content

	async def _arun(self, query: str) -> str:
		"""Use the tool asynchronously."""
		raise NotImplementedError("not implemented")
