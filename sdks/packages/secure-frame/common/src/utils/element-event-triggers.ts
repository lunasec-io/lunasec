/**
 * Creates events in a cross-browser compatible way.
 * @param eventType String of the event type to pass.
 * @param bubbles True of false if the event should bubble up.
 */
function createEvent(eventType: string, bubbles: boolean) {
  if ("createEvent" in document) {
    const event = document.createEvent("Event");
    event.initEvent(eventType, bubbles, true);
    return event;
  }

  if ("Event" in window) {
    return new Event(eventType, { bubbles: bubbles, cancelable: true });
  }

  throw new Error('Unable to create a new event: Unknown environment');
}

/**
 * Forces an element to gain "focus" in the browser.
 * Note: Element must be visible to gain focus.
 * @param element Element to snap focus to.
 */
export function triggerFocus(element: HTMLInputElement) {
  const eventType = "onfocusin" in element ? "focusin" : "focus";
  const bubbles = "onfocusin" in element;

  element.focus();
  element.dispatchEvent(createEvent(eventType, bubbles));
}

/**
 * Forces an element to lose "focus" in the browser.
 * Note: Element must be visible for this to succeed.
 * Note: If an element doesn't have focus prior to calling this function, blur may not trigger.
 * @param element Element to remove focus from.
 */
export function triggerBlur(element: HTMLInputElement) {
  element.blur();
  element.dispatchEvent(createEvent('blur', true));
}
