import os
from langchain import OpenAI
from llama_index import GPTSimpleVectorIndex, SimpleDirectoryReader, LLMPredictor, download_loader, SQLDatabase, GPTSQLStructStoreIndex
import sqlalchemy
import time

DatabaseReader = download_loader('DatabaseReader')
databasePath = f'sqlite:///{os.path.dirname(__file__)}/vulns.db'
print('Reading database:'+ databasePath)
dbEngine=sqlalchemy.create_engine(databasePath)

sql_database = SQLDatabase(dbEngine, include_tables=["processed_references"])
# NOTE: the table_name specified here is the table that you
# want to extract into from unstructured documents.

index = GPTSQLStructStoreIndex(
 [],
 sql_database=sql_database,
 table_name="processed_references",

)

response = index.query('Tell me what would be required to exploit GHSA-9j49-mfvp-vmhm in practice')

print(response)

# sqliteReader = DatabaseReader(
#  engine=dbEngine
# )
#
# query = f"""
# SELECT normalized_content FROM processed_references WHERE vulnerability_id = 'GHSA-9j49-mfvp-vmhm' UNION SELECT normalized_content FROM processed_references LIMIT 100;
# """

# documents = sqliteReader.load_data(query=query)


# documents = SimpleDirectoryReader('data').load_data()

# llm_predictor = LLMPredictor(llm=OpenAI(model_name="davinci-instruct-beta:2.0.0"))
#
# savePath = f'/{os.path.dirname(__file__)}/../indexes/index.json'
# #
# # index = GPTSimpleVectorIndex(documents)#, llm_predictor=llm_predictor)
# # index.save_to_disk(savePath)
#
# index = GPTSimpleVectorIndex.load_from_disk(savePath)
#
#
# response = index.query("Summarize the vulnerability  CVE-2021-23406", response_mode="tree_summarize")
# print(response)
