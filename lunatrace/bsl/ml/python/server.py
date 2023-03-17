from dotenv import load_dotenv
load_dotenv()

from twirp.asgi import TwirpASGIApp

from gen import langchain_twirp, langchain_pb2
from chat_bot.chat_bot import chatbot
from scrape_utils.clean_scraped_advisories import clean
from scrape_utils.summarize_scraped import summarize


class LangChainService(object):
    def Summarize(self, context, req: langchain_pb2.SummarizeRequest):
        result = summarize(req.content, req.query)
        return langchain_pb2.SummarizeResponse(summary=result)

    def CleanWebpage(self, context, req: langchain_pb2.CleanWebpageRequest):
        result = clean(req.content, req.description)
        return langchain_pb2.CleanWebpageResponse(content=result)

    def Chat(self, context, req: langchain_pb2.ChatRequest):
        result = chatbot(req.message)
        return langchain_pb2.ChatResponse(response=result)


# if you are using a custom prefix, then pass it as `server_path_prefix`
# param to `HaberdasherServer` class.
service = langchain_twirp.LangChainServer(service=LangChainService())
app = TwirpASGIApp()
app.add_service(service)
