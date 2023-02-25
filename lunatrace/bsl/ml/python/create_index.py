# ENTER YOUR OPENAPI KEY IN OPENAI_API_KEY FIRST


from llama_index import GPTSimpleVectorIndex, SimpleDirectoryReader, LLMPredictor, download_loader
import sqlalchemy

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

documents = sqliteReader.load_data(query=query)

savePath = f'/{os.path.dirname(__file__)}/indexes/index.json'

index = GPTSimpleVectorIndex(documents)#, llm_predictor=llm_predictor)
index.save_to_disk(savePath);

print('saved index to disk')
