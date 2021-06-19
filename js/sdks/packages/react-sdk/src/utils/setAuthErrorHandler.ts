declare global {
  interface Window {
    LUNASEC_AUTH_ERROR_HANDLER?: (e: Error) => void;
  }
}

// Sets the handler used by our internal library @lunasec/browser-common/utils/authentication
// This is exposed here in the react SDK so that users dont have to import our internal library
export function onLunaSecAuthError(handler: (e: Error) => void) {
  window.LUNASEC_AUTH_ERROR_HANDLER = handler;
}
