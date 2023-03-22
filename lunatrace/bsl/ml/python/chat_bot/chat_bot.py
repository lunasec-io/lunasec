from langchain.agents.agent import AgentExecutor

from langchain.agents.mrkl.base import ZeroShotAgent
from langchain.llms import OpenAIChat
import os
from chat_bot.tools.raw_google_search import RawGoogleSearch
from chat_bot.tools.scrape import Scraper
from chat_bot.tools.get_code_snippet import ReadCodeSnippet
from chat_bot.tools.get_code_snippets_list import CodeSnippetLookup
from chat_bot.tools.vuln_lookup import VulnLookupTool
from chat_bot.tools.read_advisory import ReadAdvisory
MODEL="gpt-3.5-turbo"



class VerboseLLM(OpenAIChat):
	def nothing(self):
		print("I do nothing")

llm = VerboseLLM(
	openai_api_key=os.environ.get("OPENAI_API_KEY"), model_name=MODEL, temperature=0, verbose=True
)

PREFIX = """Answer the following question or follow its instructions as best you can. You have access to the following tools:"""
FORMAT_INSTRUCTIONS = """You'll be given an incomplete template in this format, please return the next line of the
 template that should be completed. Your response should always start with a keyword from the template like 'Thought:...'. Never reply with text that does not start with a main clause from the template, followed by the subordinate clause of your own :
Question: the input question you must answer or command you must do
Thought: What you think you should do next.
Action: the action to take, absolutely must be one of the tools name. Cannot be any other string than the exact name of a tool, and no inputs. Ex: "VulnLookup".
Action Input: the input to the action. All actions take a two-element javascript-style array where the first argument is the raw input to the tool (whatever the tool description says it takes) and the second argument is a command telling the tool what you want to know. Ex: ["CVE-2021-44228","Tell me the vulnerable function names."]
Observation: the result of the action
... (this Thought/Action/Action Input/Observation loop can repeat N times)
Thought: I know the final answer (say that exactly when you have enough information to respond to the query command)
Final Answer: the final answer to the original input question. Always preface this with the text 'Final answer:', don't just respond directly. If you found a good source, you may want to provide a link to it here."""
SUFFIX = """Begin!
Question: {input}
Thought:{agent_scratchpad}"""


tools = [RawGoogleSearch(), ReadCodeSnippet(), CodeSnippetLookup(), VulnLookupTool(), ReadAdvisory() ]


# executor = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True, return_intermediate_steps=True)
agent = ZeroShotAgent.from_llm_and_tools(llm, tools,format_instructions=FORMAT_INSTRUCTIONS, prefix=PREFIX, suffix=SUFFIX)

chatbot = AgentExecutor.from_agent_and_tools(agent, tools, verbose=True)

def main(args):
	print(args)
	if args.query != None:
		print(type(chatbot(args.query)))
def add_subparser(subparsers):
	subparser = subparsers.add_parser('chat', help="uses a langchain agent and a set of tools to answer general questions about vulns")

	subparser.add_argument("query", nargs = 1, type = str, help = "a question or command for the chat bot")

	subparser.set_defaults(func=main)

