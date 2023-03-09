from upload import upsert_to_pinecone
import os
import json

jsonFile = open(os.path.dirname(os.path.realpath(__file__)) + "/experimental/test_data_log4shell.json")\

references = json.load(jsonFile)

upsert_to_pinecone(references)

jsonFile.close()
