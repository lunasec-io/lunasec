import json

from langchain.tools import BaseTool

from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport
from scrape_utils.read_anything import read

# Select your transport with a defined url endpoint
transport = AIOHTTPTransport(url="http://localhost:4455/v1/graphql")

# Create a GraphQL client using the defined transport
client = Client(transport=transport, fetch_schema_from_transport=True)

query = gql(
"""
query GetCodeSnippetsList($snippet_id: uuid!) {
  vulnerability_code_snippet_by_pk(id: $snippet_id) {
    code
    source_url
  }
}
"""
)


class ReadCodeSnippet(BaseTool):
	name = "ReadCodeSnippet"
	description = "Used to read the code of a snippet by inputting its id (a uuid)"

	def _run(self, input: str) -> str:
		"""Use the tool."""
		snippet_id, query = json.loads(input)

		result = client.execute(query, variable_values={'$snippet_id':input})
		return read(str(result), query)

	async def _arun(self, query: str) -> str:
		"""Use the tool asynchronously."""
		raise NotImplementedError("not implemented")
