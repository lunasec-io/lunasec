# ENTER YOUR OPENAPI KEY IN OPENAI_API_KEY FIRST
from llama_index import GPTSimpleVectorIndex, SimpleDirectoryReader, LLMPredictor, download_loader

savePath = f'/{os.path.dirname(__file__)}/indexes/index.json'
#
# index = GPTSimpleVectorIndex(documents)#, llm_predictor=llm_predictor)

index = GPTSimpleVectorIndex.load_from_disk(savePath)


response = index.query("Summarize the vulnerability CVE-2021-23406", response_mode="tree_summarize")
print(response)
print('Sources are ', response.get_formatted_sources())
