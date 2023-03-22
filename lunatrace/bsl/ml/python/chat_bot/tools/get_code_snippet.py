

from langchain.tools import BaseTool

from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport

# Select your transport with a defined url endpoint
transport = AIOHTTPTransport(url="http://localhost:4455/v1/graphql")

# Create a GraphQL client using the defined transport
client = Client(transport=transport, fetch_schema_from_transport=True)

query = gql(
	"""
	query GetCodeSnippetsList($cve_id: String = "") {
		vulnerability_code_snippet(where: {vulnerabilityByVulnerability: {cve_id: {_eq: $cve_id}}}){
		id
		score
		summary
		type
		language
	}
	"""
)


class CodeSnippetLookup(BaseTool):
	name = "CodeSnippetList"
	description = "Used to get a list of code snippets by inputting the CVE name (like CVE-XXX-XXXXX) once you know it. Returns a list of snippets, each with an ID you can use to look at one specifically."

	def _run(self, input: str) -> str:
		"""Use the tool."""
		result = client.execute(query, variable_values={'cve_id':input})
		return result

	async def _arun(self, query: str) -> str:
		"""Use the tool asynchronously."""
		raise NotImplementedError("not implemented")
