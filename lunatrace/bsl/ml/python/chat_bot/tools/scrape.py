import argparse
from dotenv import load_dotenv
load_dotenv()  # take environment variables from .env.
from typing import Dict, Optional


from langchain.utils import get_from_dict_or_env
from pydantic import BaseModel, Extra, Field, root_validator
import requests
from bs4 import BeautifulSoup
from bs4.element import Comment

import os.path
import sys

parent_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
sys.path.append(parent_dir)

from scrape_utils.clean_scraped_anything import clean

class Scraper(BaseModel):
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
	description ="Scrape the main article context of a web page. Provide the full url as the input."
	name = "scrape"

	@root_validator()
	def validate_environment(cls, values: Dict) -> Dict:
		"""Validate that api key exists in environment."""
		serper_api_key = get_from_dict_or_env(
			values, "serper_api_key", "SERPER_API_KEY"
		)
		values["serper_api_key"] = serper_api_key

		return values

	def run(self, url: str) -> str:
		"""Run query through GoogleSearch and parse result."""
		# return self._google_serper_search_results(query, gl=self.gl, hl=self.hl)

		# return self._parse_results(results)
		html = self._scrape(url)
		text = self._text_from_html(html)
		cleaned_text = clean(text, 'No specific query, just scrape all complete sentences please')
		return cleaned_text


	def _scrape(self, url):
		page = requests.get(url)
		return page.text

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
		res = scraper.run(url)
		print(res)

if __name__ == "__main__":
	main()
