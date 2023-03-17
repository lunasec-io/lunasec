from langchain.agents import load_tools

google_search_tool = load_tools(['serpapi'])[0]

google_search_tool.description = "Used to run google searches. Useful to figure out the CVE number of a vuln if you need it, or as a last resort to try to answer questions not possible with the rest of the tools. Input should be a google search, like 'what is the CVE number of _vuln_name_'"
