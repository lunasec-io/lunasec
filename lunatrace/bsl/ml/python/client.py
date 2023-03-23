# TODO: IS THIS DEAD CODE IN THIS FILE?

from twirp.context import Context
from twirp.exceptions import TwirpServerException

from gen import langchain_twirp, langchain_pb2

client = langchain_twirp.LangChainClient("http://localhost:3000")
# if you are using a custom prefix, then pass it as `server_path_prefix`
# param to `MakeHat` class.
try:
    #response = client.Summarize(ctx=Context(), request=langchain_pb2.SummarizeRequest(content="An apple is a fruit and fruits are good.", query="Are apples good?"))
    response = client.Chat(ctx=Context(), request=langchain_pb2.ChatRequest(message="What language did CVE-2021-44228 affect?"))
    print(response)
except TwirpServerException as e:
    print(e.code, e.message, e.meta, e.to_dict())
