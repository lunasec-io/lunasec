from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain.llms import OpenAI

# llm = OpenAI( model_name="code-davinci-002")
llm = OpenAI(model_name="text-davinci-003")
tools = load_tools(["serpapi"], llm=llm)
agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True)

agent.run("Summarize the vulnerability called GHSA-f598-mfpv-gmfx")

