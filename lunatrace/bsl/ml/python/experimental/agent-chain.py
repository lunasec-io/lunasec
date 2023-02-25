import os
os.environ["OPENAI_API_KEY"] = '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'
os.environ["SERPAPI_API_KEY"] = "195c752ec9a07c48559b3e0ed84405dc7eb44637d14437446ff35d7bcc53e99c"

from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain.llms import OpenAI

# llm = OpenAI( model_name="code-davinci-002")
llm = OpenAI(model_name="text-davinci-003")
tools = load_tools(["serpapi"], llm=llm)
agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True)

agent.run("Summarize the vulnerability called GHSA-f598-mfpv-gmfx")

