/**
 * Forces an element to gain "focus" in the browser.
 * Note: Element must be visible to gain focus.
 * @param element Element to snap focus to.
 */
export declare function triggerFocus(element: HTMLInputElement | Element): void;
/**
 * Forces an element to lose "focus" in the browser.
 * Note: Element must be visible for this to succeed.
 * Note: If an element doesn't have focus prior to calling this function, blur may not trigger.
 * @param element Element to remove focus from.
 */
export declare function triggerBlur(element: HTMLInputElement): void;
//# sourceMappingURL=element-event-triggers.d.ts.map