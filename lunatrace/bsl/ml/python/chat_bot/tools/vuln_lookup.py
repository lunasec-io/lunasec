
from langchain.tools import BaseTool

from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport

# Select your transport with a defined url endpoint
transport = AIOHTTPTransport(url="http://localhost:4455/v1/graphql")

# Create a GraphQL client using the defined transport
client = Client(transport=transport, fetch_schema_from_transport=True)

query = gql(
	"""
	query GetVulnDetails($cve_id: String!) {
	  vulnerability(where: {cve_id: {_eq: $cve_id}, source: {_eq: "ghsa"}}) {
		id
		cve_id
		details
		summary
		cvss_score
		severity_name
		affected {
		  ranges {
			introduced
			fixed
		  }
		  package {
			name
			package_manager
		  }
		}
	  }
	}
"""
)


class VulnLookupTool(BaseTool):
	name = "VulnLookup"
	description = "Useful to look up vulnerability details about a given vulnerability by inputting the CVE name (like CVE-XXX-XXXXX) once you know it. Useful to determine basic vulnerability information, affected packages, fix versions, and so on. Don't just guess a CVE number, if you don't know it you should google it first. Don't put anything except the exact text of the cve number and don't put any whitespace before or after."

	def _run(self, input: str) -> str:
		"""Use the tool."""
		result = client.execute(query, variable_values={'cve_id':input})
		return result

	async def _arun(self, query: str) -> str:
		"""Use the tool asynchronously."""
		raise NotImplementedError("not implemented")
