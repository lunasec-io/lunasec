import json

from typing import Dict, Optional


from langchain.utils import get_from_dict_or_env
from serpapi import GoogleSearch
from pydantic import BaseModel, Extra, Field, root_validator
import argparse
from langchain.tools import BaseTool


class RawGoogleSearch(BaseTool):
	"""Wrapper around the Serper.dev Google Search API.
	You can create a free API key at https://serper.dev.
	To use, you should have the environment variable ``SERPER_API_KEY``
	set with your API key, or pass `serper_api_key` as a named parameter
	to the constructor.
	Example:
		.. code-block:: python
			from langchain import GoogleSerperAPIWrapper
			google_serper = GoogleSerperAPIWrapper()
	"""

	k: int = 10
	serper_api_key: Optional[str] = None
	params: dict = Field(
		default={
			"engine": "google",
			"google_domain": "google.com",
			"gl": "us",
			"hl": "en",
			"num": "10"
		}
	)
	description ="""A google search tool that can be used to find links to scrape.
	 A good first step when looking for information. Returns results in order.
	  Might also return a 'direct_answer' that might answer the query without the need to scrape. 
	  Input should be a raw google search query with no quotes or brackets."""
	name = "raw-google-search"

	@root_validator()
	def validate_environment(cls, values: Dict) -> Dict:
		"""Validate that api key exists in environment."""
		serper_api_key = get_from_dict_or_env(
			values, "serper_api_key", "SERPER_API_KEY"
		)
		values["serper_api_key"] = serper_api_key

		return values

	def _run(self, query: str) -> str:
		"""Run query through GoogleSearch and parse result."""
		params = self.get_params(query)
		search = GoogleSearch(params)
		res = search.get_dict()
		return self._parse_results(res)

	async def _arun(self, query: str) -> str:
		"""Use the tool asynchronously."""
		raise NotImplementedError("not implemented")

	def get_params(self, query: str) -> Dict[str, str]:
		"""Get parameters for SerpAPI."""
		_params = {
			"api_key": self.serper_api_key,
			"q": query,
		}
		params = {**self.params, **_params}
		return params



	def _parse_results(self, results: dict) -> str:
		clean_response = {"results": []}
		if "organic_results" not in results:
			raise Exception("should have had organic results in google search but the results were: "+ json.dumps(results))
		for result in results["organic_results"]:
			clean_result = {"title":result["title"], "snippet":result["snippet"], "link":result["link"]}
			if "date" in result:
				clean_result["date"] = result["date"]
			clean_response["results"].append(clean_result)
		if "knowledge_graph" in results and "description" in results["knowledge_graph"]:
			clean_response["direct_answer"] = results["knowledge_graph"]["description"]
		return clean_response

def main():
	parser = argparse.ArgumentParser(description = "searches google")
	parser.add_argument("query", nargs = 1, type = str, help = "query")

	args = parser.parse_args()

	if args.query != None:
		query = args.query[0]
		search = RawGoogleSearch()
		res = search._run(query)
		print(json.dumps(res, indent=4))

if __name__ == "__main__":
	main()
