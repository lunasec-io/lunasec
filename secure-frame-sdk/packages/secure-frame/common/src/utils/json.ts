
export function safeParseJson<T>(json: string) {
  try {
    return JSON.parse(json) as T;
  } catch (e) {
    return null;
  }
}
