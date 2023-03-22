from concurrent import futures
from pprint import pprint

from dotenv import load_dotenv
import asyncio
import langchain_pb2
from langchain_pb2_grpc import LangChainServicer
import langchain_pb2_grpc

load_dotenv()

import grpc
from chat_bot.chat_bot import chatbot
from scrape_utils.clean_scraped_advisories import clean
from scrape_utils.summarize_code_snippets import summarize_concurrently

class LangChainService(LangChainServicer):
    # Todo: it might be a problem that some of these methods arent async, chatgpt says they may block the event loop
    def CleanAdvisory(self, req: langchain_pb2.CleanAdvisoryRequest, context):
        try:
            result = clean(req.content, req.description)
            return langchain_pb2.CleanAdvisoryResponse(**result)
        except Exception as e:
            print("Received exception ")
            print(e)
            raise(e)

    def CleanSnippets(self, request: langchain_pb2.CleanSnippetsRequest, context):
        try:
            result = asyncio.run(summarize_concurrently(request.snippets))
            return langchain_pb2.CleanSnippetsResponse(**result)
        except Exception as e:
            print("Received exception ")
            print(e)
            raise(e)
    # def CleanWebpage(self, req: langchain_pb2.CleanWebpageRequest, context):
    #     result = clean(req.content, req.description)
    #     return langchain_pb2.CleanWebpageResponse(content=result)

    def Chat(self, req: langchain_pb2.ChatRequest, context):
        print('Chat request received', context, req)
        try:
            result = chatbot(req.message)
        except Exception as e:
            print('Error', e)
            result = 'Error: ' + str(e)
        return langchain_pb2.ChatResponse(response=str(result))


def serve():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=100))
  langchain_pb2_grpc.add_LangChainServicer_to_server(
      LangChainService(), server)
  server.add_insecure_port('[::]:50051')
  print("Server started on port 50051")
  server.start()
  server.wait_for_termination()

if __name__ == '__main__':
    serve()
