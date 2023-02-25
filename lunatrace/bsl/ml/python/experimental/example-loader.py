import os
os.environ["OPENAI_API_KEY"] = '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'

from langchain import OpenAI
from llama_index import GPTSimpleVectorIndex, SimpleDirectoryReader, LLMPredictor, download_loader
import sqlalchemy
import time

DatabaseReader = download_loader('DatabaseReader')
databasePath = f'sqlite:///{os.path.dirname(__file__)}/../..//databases/npm-vulnerability-info-2023-02-22/vulns.db'
print('Reading database:'+ databasePath)
dbEngine=sqlalchemy.create_engine(databasePath)

sqliteReader = DatabaseReader(
 engine=dbEngine
)

query = f"""
SELECT normalized_content FROM processed_references WHERE vulnerability_id = 'GHSA-9j49-mfvp-vmhm' UNION SELECT normalized_content FROM processed_references LIMIT 100;
"""

# documents = sqliteReader.load_data(query=query)


# documents = SimpleDirectoryReader('data').load_data()

# llm_predictor = LLMPredictor(llm=OpenAI(model_name="davinci-instruct-beta:2.0.0"))

savePath = f'/{os.path.dirname(__file__)}/../indexes/index.json'
#
# index = GPTSimpleVectorIndex(documents)#, llm_predictor=llm_predictor)
# index.save_to_disk(savePath)

index = GPTSimpleVectorIndex.load_from_disk(savePath)


response = index.query("Summarize the vulnerability  CVE-2021-23406", response_mode="tree_summarize")
print(response)
