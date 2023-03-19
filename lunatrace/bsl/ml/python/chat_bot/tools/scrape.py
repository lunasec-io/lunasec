import argparse
import json
from pprint import pprint

from typing import Dict, Optional

from langchain.tools import BaseTool
from langchain.utils import get_from_dict_or_env
from pydantic import BaseModel, Extra, Field, root_validator
import requests
from bs4 import BeautifulSoup
from bs4.element import Comment

import os.path
import sys
from urllib.parse import urlparse

from scrape_utils.summarize_scraped import summarize

# you seem to have to do this horrible stuff to import from higher local folders in python.
# remove this once we find a better way
parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.append(parent_dir)
# now we can import from the top

class Scraper(BaseTool):
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

	serper_api_key: Optional[str] = None
	params: dict = Field(
		default={
			"engine": "google",
			"google_domain": "google.com",
			"gl": "us",
			"hl": "en",
		}
	)
	description ="""Scrapes a web page and attempts to answer a query for you. Use this to read through the search results.
	 As input, takes a two element array where the first element is the url you wish to scrape, and the second is 
	 a command to the scraper of what to find on the page.
	 Example input: ["https://wikipedia.com", "Tell me wikipedias mission statement."]
	 You can't scrape anything ending in .pdf, don't try. Only web pages.
	 """
	name = "scrape"

	@root_validator()
	def validate_environment(cls, values: Dict) -> Dict:
		"""Validate that api key exists in environment."""
		serper_api_key = get_from_dict_or_env(
			values, "serper_api_key", "SERPER_API_KEY"
		)
		values["serper_api_key"] = serper_api_key

		return values

	def _run(self, inputs: str) -> str:
		"""Run query through GoogleSearch and parse result."""
		# return self._google_serper_search_results(query, gl=self.gl, hl=self.hl)
		url, query = json.loads(inputs)
		page = requests.get(url)
		if "text/html" not in page.headers["content-type"]:
			return "This isn't a normal html page, try a different page"
		text = self._text_from_html(page.content)
		links = self._links_from_html(page.content)
		text_and_links = text + " Here are the links we scraped from this page:" + str(links)
		cleaned_text = summarize(text_and_links, query)
		return cleaned_text


	async def _arun(self, query: str) -> str:
		"""Use the tool asynchronously."""
		raise NotImplementedError("not implemented")

	def _tag_visible(self, element):
		if element.parent.name in ['style', 'script', 'head', 'title', 'meta', '[document]']:
			return False
		if isinstance(element, Comment):
			return False
		return True

	def _text_from_html(self, body):
		soup = BeautifulSoup(body, 'html.parser')
		texts = soup.findAll(string=True)
		visible_texts = filter(self._tag_visible, texts)
		return u" ".join(t.strip() for t in visible_texts)

	def _links_from_html(self, body):
		soup = BeautifulSoup(body, 'html.parser')
		links = []
		for link in soup.findAll('a'):
			href = link.get("href")
			is_absolute = bool(urlparse(href).netloc)
			if is_absolute:
				links.append(link.get_text() + ":" + link.get('href'))
		return links

	def get_params(self, query: str) -> Dict[str, str]:
		"""Get parameters for SerpAPI."""
		_params = {
			"api_key": self.serper_api_key,
			"q": query,
		}
		params = {**self.params, **_params}
		return params

def main():
	parser = argparse.ArgumentParser(description = "scrape page")
	parser.add_argument("url", nargs = 1, type = str, help = "url")

	args = parser.parse_args()

	if args.url != None:
		url = args.url[0]
		scraper = Scraper()
		res = scraper._run(url)
		print(res)

if __name__ == "__main__":
	main()
