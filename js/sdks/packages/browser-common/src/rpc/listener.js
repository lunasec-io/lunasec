"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReactEventListener = exports.addMessageListener = void 0;
// import {patchStyle} from '../style-patcher/write';
const constants_1 = require("../constants");
const json_1 = require("../utils/json");
/**
 * The goal of this function is to receive RPC calls from the secure frame.
 * @param window Browser `window` instance.
 * @param domInstance Browser `document` instance.
 */
function addMessageListener(window, domInstance) {
    window.addEventListener('message', (event) => {
        console.log('parent message received:', event);
        if (event.origin !== constants_1.__SECURE_FRAME_URL__) {
            return;
        }
        if (!event.source) {
            console.error('invalid source of event');
            return;
        }
        const secureContainer = domInstance.querySelector(`[data-secure-frame-nonce="${event.data}"]`);
        if (!secureContainer) {
            console.error('Unable to locate secure container with nonce:', event.data);
            return;
        }
        // @ts-ignore
        const inputElementStyle = window.SECURE_FORM_ORIGINAL_ELEMENTS[event.data]; // secureContainer.querySelector('input') as (HTMLElement | undefined);
        if (!inputElementStyle) {
            console.error('Unable to find child input element for container with nonce:', event.data);
            return;
        }
        const secureIframe = secureContainer.querySelector('iframe');
        if (!secureIframe) {
            console.error('Missing iframe in secure container');
            return;
        }
        // const styleInfo = getStyleInfo(inputElement);
        // patchStyle(domInstance, secureIframe, inputElementStyle);
        // @ts-ignore
        event.source.postMessage(inputElementStyle, event.origin);
    }, false);
}
exports.addMessageListener = addMessageListener;
function addReactEventListener(window, controller, callback) {
    const abortSignal = controller.signal;
    // Note: The AbortSignal seems to be unknown to Typescript.
    // @ts-ignore
    const eventListenerOptions = { signal: abortSignal };
    window.addEventListener('message', (event) => {
        if (event.origin !== constants_1.__SECURE_FRAME_URL__) {
            return;
        }
        const frameMessage = json_1.safeParseJson(event.data);
        // Invalid data passed from frame.
        if (frameMessage === null) {
            console.error('Frame message null:', frameMessage);
            return;
        }
        // Message is not for us
        // if (frameMessage.correlationToken !== token) {
        //   console.log('correlation token mismatch:', frameMessage.correlationToken, token);
        //   return;
        // }
        callback(frameMessage);
    }, eventListenerOptions);
    return abortSignal;
}
exports.addReactEventListener = addReactEventListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsaXN0ZW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBcUQ7QUFDckQsNENBQWtEO0FBQ2xELHdDQUE4QztBQUc5Qzs7OztHQUlHO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsTUFBYyxFQUFFLFdBQXFCO0lBQ3RFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDckIsU0FBUyxFQUNULENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRS9DLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxnQ0FBb0IsRUFBRTtZQUN6QyxPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQUNqQixPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDekMsT0FBTztTQUNSO1FBRUQsTUFBTSxlQUFlLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyw2QkFBNkIsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7UUFFL0YsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNwQixPQUFPLENBQUMsS0FBSyxDQUFDLCtDQUErQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzRSxPQUFPO1NBQ1I7UUFFRCxhQUFhO1FBQ2IsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLENBQUMsNkJBQTZCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsdUVBQXVFO1FBRW5KLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLDhEQUE4RCxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxRixPQUFPO1NBQ1I7UUFFRCxNQUFNLFlBQVksR0FBRyxlQUFlLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTdELElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1lBQ3BELE9BQU87U0FDUjtRQUVELGdEQUFnRDtRQUVoRCw0REFBNEQ7UUFFNUQsYUFBYTtRQUNiLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RCxDQUFDLEVBQ0QsS0FBSyxDQUNOLENBQUM7QUFDSixDQUFDO0FBOUNELGdEQThDQztBQUVELFNBQWdCLHFCQUFxQixDQUNuQyxNQUFjLEVBQ2QsVUFBMkIsRUFDM0IsUUFBZ0Q7SUFFaEQsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztJQUV0QywyREFBMkQ7SUFDM0QsYUFBYTtJQUNiLE1BQU0sb0JBQW9CLEdBQTRCLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDO0lBRTlFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDckIsU0FBUyxFQUNULENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDUixJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssZ0NBQW9CLEVBQUU7WUFDekMsT0FBTztTQUNSO1FBRUQsTUFBTSxZQUFZLEdBQUcsb0JBQWEsQ0FBc0IsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBFLGtDQUFrQztRQUNsQyxJQUFJLFlBQVksS0FBSyxJQUFJLEVBQUU7WUFDekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNuRCxPQUFPO1NBQ1I7UUFFRCx3QkFBd0I7UUFDeEIsaURBQWlEO1FBQ2pELHNGQUFzRjtRQUN0RixZQUFZO1FBQ1osSUFBSTtRQUVKLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN6QixDQUFDLEVBQ0Qsb0JBQW9CLENBQ3JCLENBQUM7SUFFRixPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBdENELHNEQXNDQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7cGF0Y2hTdHlsZX0gZnJvbSAnLi4vc3R5bGUtcGF0Y2hlci93cml0ZSc7XG5pbXBvcnQge19fU0VDVVJFX0ZSQU1FX1VSTF9ffSBmcm9tICcuLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgc2FmZVBhcnNlSnNvbiB9IGZyb20gJy4uL3V0aWxzL2pzb24nO1xuaW1wb3J0IHsgVW5rbm93bkZyYW1lTWVzc2FnZSB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIFRoZSBnb2FsIG9mIHRoaXMgZnVuY3Rpb24gaXMgdG8gcmVjZWl2ZSBSUEMgY2FsbHMgZnJvbSB0aGUgc2VjdXJlIGZyYW1lLlxuICogQHBhcmFtIHdpbmRvdyBCcm93c2VyIGB3aW5kb3dgIGluc3RhbmNlLlxuICogQHBhcmFtIGRvbUluc3RhbmNlIEJyb3dzZXIgYGRvY3VtZW50YCBpbnN0YW5jZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFkZE1lc3NhZ2VMaXN0ZW5lcih3aW5kb3c6IFdpbmRvdywgZG9tSW5zdGFuY2U6IERvY3VtZW50KSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICdtZXNzYWdlJyxcbiAgICAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKCdwYXJlbnQgbWVzc2FnZSByZWNlaXZlZDonLCBldmVudCk7XG5cbiAgICAgIGlmIChldmVudC5vcmlnaW4gIT09IF9fU0VDVVJFX0ZSQU1FX1VSTF9fKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFldmVudC5zb3VyY2UpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignaW52YWxpZCBzb3VyY2Ugb2YgZXZlbnQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzZWN1cmVDb250YWluZXIgPSBkb21JbnN0YW5jZS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1zZWN1cmUtZnJhbWUtbm9uY2U9XCIke2V2ZW50LmRhdGF9XCJdYCk7XG5cbiAgICAgIGlmICghc2VjdXJlQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuYWJsZSB0byBsb2NhdGUgc2VjdXJlIGNvbnRhaW5lciB3aXRoIG5vbmNlOicsIGV2ZW50LmRhdGEpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgIGNvbnN0IGlucHV0RWxlbWVudFN0eWxlID0gd2luZG93LlNFQ1VSRV9GT1JNX09SSUdJTkFMX0VMRU1FTlRTW2V2ZW50LmRhdGFdOyAvLyBzZWN1cmVDb250YWluZXIucXVlcnlTZWxlY3RvcignaW5wdXQnKSBhcyAoSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQpO1xuXG4gICAgICBpZiAoIWlucHV0RWxlbWVudFN0eWxlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1VuYWJsZSB0byBmaW5kIGNoaWxkIGlucHV0IGVsZW1lbnQgZm9yIGNvbnRhaW5lciB3aXRoIG5vbmNlOicsIGV2ZW50LmRhdGEpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNlY3VyZUlmcmFtZSA9IHNlY3VyZUNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpZnJhbWUnKTtcblxuICAgICAgaWYgKCFzZWN1cmVJZnJhbWUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignTWlzc2luZyBpZnJhbWUgaW4gc2VjdXJlIGNvbnRhaW5lcicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbnN0IHN0eWxlSW5mbyA9IGdldFN0eWxlSW5mbyhpbnB1dEVsZW1lbnQpO1xuXG4gICAgICAvLyBwYXRjaFN0eWxlKGRvbUluc3RhbmNlLCBzZWN1cmVJZnJhbWUsIGlucHV0RWxlbWVudFN0eWxlKTtcblxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgZXZlbnQuc291cmNlLnBvc3RNZXNzYWdlKGlucHV0RWxlbWVudFN0eWxlLCBldmVudC5vcmlnaW4pO1xuICAgIH0sXG4gICAgZmFsc2VcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFJlYWN0RXZlbnRMaXN0ZW5lcihcbiAgd2luZG93OiBXaW5kb3csXG4gIGNvbnRyb2xsZXI6IEFib3J0Q29udHJvbGxlcixcbiAgY2FsbGJhY2s6IChtZXNzYWdlOiBVbmtub3duRnJhbWVNZXNzYWdlKSA9PiB2b2lkXG4pOiBBYm9ydFNpZ25hbCB7XG4gIGNvbnN0IGFib3J0U2lnbmFsID0gY29udHJvbGxlci5zaWduYWw7XG5cbiAgLy8gTm90ZTogVGhlIEFib3J0U2lnbmFsIHNlZW1zIHRvIGJlIHVua25vd24gdG8gVHlwZXNjcmlwdC5cbiAgLy8gQHRzLWlnbm9yZVxuICBjb25zdCBldmVudExpc3RlbmVyT3B0aW9uczogQWRkRXZlbnRMaXN0ZW5lck9wdGlvbnMgPSB7IHNpZ25hbDogYWJvcnRTaWduYWwgfTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAnbWVzc2FnZScsXG4gICAgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQub3JpZ2luICE9PSBfX1NFQ1VSRV9GUkFNRV9VUkxfXykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZyYW1lTWVzc2FnZSA9IHNhZmVQYXJzZUpzb248VW5rbm93bkZyYW1lTWVzc2FnZT4oZXZlbnQuZGF0YSk7XG5cbiAgICAgIC8vIEludmFsaWQgZGF0YSBwYXNzZWQgZnJvbSBmcmFtZS5cbiAgICAgIGlmIChmcmFtZU1lc3NhZ2UgPT09IG51bGwpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRnJhbWUgbWVzc2FnZSBudWxsOicsIGZyYW1lTWVzc2FnZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTWVzc2FnZSBpcyBub3QgZm9yIHVzXG4gICAgICAvLyBpZiAoZnJhbWVNZXNzYWdlLmNvcnJlbGF0aW9uVG9rZW4gIT09IHRva2VuKSB7XG4gICAgICAvLyAgIGNvbnNvbGUubG9nKCdjb3JyZWxhdGlvbiB0b2tlbiBtaXNtYXRjaDonLCBmcmFtZU1lc3NhZ2UuY29ycmVsYXRpb25Ub2tlbiwgdG9rZW4pO1xuICAgICAgLy8gICByZXR1cm47XG4gICAgICAvLyB9XG5cbiAgICAgIGNhbGxiYWNrKGZyYW1lTWVzc2FnZSk7XG4gICAgfSxcbiAgICBldmVudExpc3RlbmVyT3B0aW9uc1xuICApO1xuXG4gIHJldHVybiBhYm9ydFNpZ25hbDtcbn1cbiJdfQ==