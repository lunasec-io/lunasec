from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

from langchain.llms import OpenAIChat
from langchain.agents import initialize_agent
import json
import os
from tools.vuln_lookup import VulnLookupTool
from tools.google_search import google_search_tool

MODEL="gpt-3.5-turbo"

llm = OpenAIChat(
	openai_api_key=os.environ.get("OPENAI_API_KEY"), model_name=MODEL, temperature=0
)

tools = [VulnLookupTool(), google_search_tool]

agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True, return_intermediate_steps=True)

response = agent("how serious is heartbleed")

print(json.dumps(response))
