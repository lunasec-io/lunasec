export function getRequestBody<T>(request: T) {
  if (request === undefined || request === null) {
    return undefined;
  }

  return JSON.stringify(request);
}

export function safeParseJson<T>(json: string) {
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    return null;
  }
}
