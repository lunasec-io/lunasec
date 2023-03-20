from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Iterable as _Iterable, Mapping as _Mapping, Optional as _Optional, Union as _Union

DESCRIPTOR: _descriptor.FileDescriptor

class ChatRequest(_message.Message):
    __slots__ = ["message"]
    MESSAGE_FIELD_NUMBER: _ClassVar[int]
    message: str
    def __init__(self, message: _Optional[str] = ...) -> None: ...

class ChatResponse(_message.Message):
    __slots__ = ["finalAnswer", "intermediateSteps"]
    FINALANSWER_FIELD_NUMBER: _ClassVar[int]
    INTERMEDIATESTEPS_FIELD_NUMBER: _ClassVar[int]
    finalAnswer: str
    intermediateSteps: str
    def __init__(self, finalAnswer: _Optional[str] = ..., intermediateSteps: _Optional[str] = ...) -> None: ...

class CleanAdvisoryRequest(_message.Message):
    __slots__ = ["content", "description"]
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    content: str
    description: str
    def __init__(self, content: _Optional[str] = ..., description: _Optional[str] = ...) -> None: ...

class CleanAdvisoryResponse(_message.Message):
    __slots__ = ["content", "description"]
    CONTENT_FIELD_NUMBER: _ClassVar[int]
    DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    content: str
    description: str
    def __init__(self, content: _Optional[str] = ..., description: _Optional[str] = ...) -> None: ...

class CleanSnippetsRequest(_message.Message):
    __slots__ = ["snippets"]
    SNIPPETS_FIELD_NUMBER: _ClassVar[int]
    snippets: _containers.RepeatedCompositeFieldContainer[Snippet]
    def __init__(self, snippets: _Optional[_Iterable[_Union[Snippet, _Mapping]]] = ...) -> None: ...

class CleanSnippetsResponse(_message.Message):
    __slots__ = ["snippets"]
    SNIPPETS_FIELD_NUMBER: _ClassVar[int]
    snippets: _containers.RepeatedCompositeFieldContainer[CleanedSnippet]
    def __init__(self, snippets: _Optional[_Iterable[_Union[CleanedSnippet, _Mapping]]] = ...) -> None: ...

class CleanedSnippet(_message.Message):
    __slots__ = ["code", "language", "score", "summary", "type"]
    CODE_FIELD_NUMBER: _ClassVar[int]
    LANGUAGE_FIELD_NUMBER: _ClassVar[int]
    SCORE_FIELD_NUMBER: _ClassVar[int]
    SUMMARY_FIELD_NUMBER: _ClassVar[int]
    TYPE_FIELD_NUMBER: _ClassVar[int]
    code: str
    language: str
    score: int
    summary: str
    type: str
    def __init__(self, code: _Optional[str] = ..., score: _Optional[int] = ..., summary: _Optional[str] = ..., type: _Optional[str] = ..., language: _Optional[str] = ...) -> None: ...

class Snippet(_message.Message):
    __slots__ = ["code", "preamble", "vuln_description"]
    CODE_FIELD_NUMBER: _ClassVar[int]
    PREAMBLE_FIELD_NUMBER: _ClassVar[int]
    VULN_DESCRIPTION_FIELD_NUMBER: _ClassVar[int]
    code: str
    preamble: str
    vuln_description: str
    def __init__(self, code: _Optional[str] = ..., preamble: _Optional[str] = ..., vuln_description: _Optional[str] = ...) -> None: ...
