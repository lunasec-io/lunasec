export function getRequestBody<T>(request: T) {
  if (request === undefined || request === null) {
    return undefined;
  }

  return JSON.stringify(request);
}
