/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
/**
 * Creates events in a cross-browser compatible way.
 * @param eventType String of the event type to pass.
 * @param bubbles True of false if the event should bubble up.
 */
function createEvent(eventType: string, bubbles: boolean) {
  if ('createEvent' in document) {
    const event = document.createEvent('Event');
    event.initEvent(eventType, bubbles, true);
    return event;
  }

  if ('Event' in window) {
    return new Event(eventType, { bubbles: bubbles, cancelable: true });
  }

  throw new Error('Unable to create a new event: Unknown environment');
}

/**
 * Forces an element to gain "focus" in the browser.
 * Note: Element must be visible to gain focus.
 * @param element Element to snap focus to.
 */
export function triggerFocus(element: HTMLInputElement | Element) {
  const eventType = 'onfocusin' in element ? 'focusin' : 'focus';
  const bubbles = 'onfocusin' in element;

  'focus' in element && element.focus();
  element.dispatchEvent(createEvent(eventType, bubbles));
}

/**
 * Forces an element to lose "focus" in the browser.
 * Note: Element must be visible for this to succeed.
 * Note: If an element doesn't have focus prior to calling this function, blur may not trigger.
 * @param element Element to remove focus from.
 */
export function triggerBlur(element: HTMLElement) {
  element.blur();
  element.dispatchEvent(createEvent('blur', true));
}
