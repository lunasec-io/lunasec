"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStyleInfo = void 0;
const dom_utils_1 = require("./dom-utils");
// import {
//   NO_GENERATE_CONTENT_ELEMENTS,
//   PLACEHOLDER_ELEMENTS,
//   // SUPPORTED_PSEUDO_SELECTORS
// } from './constants';
function getStyleInfo(source, pseudoSelector) {
    const computed = window.getComputedStyle(source, pseudoSelector);
    const allStyleInfo = dom_utils_1.getStyleSnapshot(computed);
    const framedInputStyle = dom_utils_1.getChildStyle(allStyleInfo);
    const parentStyle = dom_utils_1.getParentStyle(allStyleInfo);
    const { display, content } = framedInputStyle;
    if (display === 'none' || (pseudoSelector && content === 'none')) {
        console.debug("Can't generate style from hidden element ", source);
        return null;
    }
    if (!pseudoSelector) {
        const { width, height } = source.getBoundingClientRect();
        // TODO: Figure out why we were doing this in the first place
        // if (width * height === 0) {
        //   console.debug('elements width times height is 0, bail ', source);
        //   return null;
        // }
        const allPseudoStyleInfo = Object.create(null);
        // TODO: Figure out implementing pseudo selectors for cloned element
        // for (const selector of SUPPORTED_PSEUDO_SELECTORS) {
        //   const pseudoStyleInfo = getStyleInfo(source, selector);
        //
        //   if (pseudoStyleInfo) {
        //     allPseudoStyleInfo[selector] = pseudoStyleInfo;
        //   }
        // }
        return {
            parentStyle: parentStyle,
            width: `${width}px`,
            height: `${height}px`,
            childStyle: {
                style: framedInputStyle,
                pseudo: allPseudoStyleInfo,
            },
        };
    }
    throw new Error('Pseudo selector support is broken. Fix it if you want it');
    // pseudo elements
    // if (
    //   content === "none" ||
    //   (pseudoSelector === "::marker" && display !== "list-item") ||
    //   ((pseudoSelector === "::before" || pseudoSelector === "::after") &&
    //     isTagName(source as SupportedElement, NO_GENERATE_CONTENT_ELEMENTS)) ||
    //   (pseudoSelector === "::placeholder" &&
    //     !isTagName(source as SupportedElement, PLACEHOLDER_ELEMENTS))
    // ) {
    //   return null;
    // }
    //
    // return {
    //   style,
    // };
}
exports.getStyleInfo = getStyleInfo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQThFO0FBRTlFLFdBQVc7QUFDWCxrQ0FBa0M7QUFDbEMsMEJBQTBCO0FBQzFCLGtDQUFrQztBQUNsQyx3QkFBd0I7QUFFeEIsU0FBZ0IsWUFBWSxDQUFDLE1BQXdCLEVBQUUsY0FBdUI7SUFDNUUsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNqRSxNQUFNLFlBQVksR0FBRyw0QkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNoRCxNQUFNLGdCQUFnQixHQUFHLHlCQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDckQsTUFBTSxXQUFXLEdBQUcsMEJBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNqRCxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLGdCQUFnQixDQUFDO0lBRTlDLElBQUksT0FBTyxLQUFLLE1BQU0sSUFBSSxDQUFDLGNBQWMsSUFBSSxPQUFPLEtBQUssTUFBTSxDQUFDLEVBQUU7UUFDaEUsT0FBTyxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNuRSxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUNuQixNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRXpELDZEQUE2RDtRQUM3RCw4QkFBOEI7UUFDOUIsc0VBQXNFO1FBQ3RFLGlCQUFpQjtRQUNqQixJQUFJO1FBRUosTUFBTSxrQkFBa0IsR0FBdUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuRSxvRUFBb0U7UUFDcEUsdURBQXVEO1FBQ3ZELDREQUE0RDtRQUM1RCxFQUFFO1FBQ0YsMkJBQTJCO1FBQzNCLHNEQUFzRDtRQUN0RCxNQUFNO1FBQ04sSUFBSTtRQUVKLE9BQU87WUFDTCxXQUFXLEVBQUUsV0FBVztZQUN4QixLQUFLLEVBQUUsR0FBRyxLQUFLLElBQUk7WUFDbkIsTUFBTSxFQUFFLEdBQUcsTUFBTSxJQUFJO1lBQ3JCLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsZ0JBQWdCO2dCQUN2QixNQUFNLEVBQUUsa0JBQWtCO2FBQzNCO1NBQ0YsQ0FBQztLQUNIO0lBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQywwREFBMEQsQ0FBQyxDQUFDO0lBRTVFLGtCQUFrQjtJQUNsQixPQUFPO0lBQ1AsMEJBQTBCO0lBQzFCLGtFQUFrRTtJQUNsRSx3RUFBd0U7SUFDeEUsOEVBQThFO0lBQzlFLDJDQUEyQztJQUMzQyxvRUFBb0U7SUFDcEUsTUFBTTtJQUNOLGlCQUFpQjtJQUNqQixJQUFJO0lBQ0osRUFBRTtJQUNGLFdBQVc7SUFDWCxXQUFXO0lBQ1gsS0FBSztBQUNQLENBQUM7QUE1REQsb0NBNERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0Q2hpbGRTdHlsZSwgZ2V0UGFyZW50U3R5bGUsIGdldFN0eWxlU25hcHNob3QgfSBmcm9tICcuL2RvbS11dGlscyc7XG5pbXBvcnQgeyBQZXN1ZG9TdHlsZUluZm9NYXAsIFJlYWRFbGVtZW50U3R5bGUsIFN1cHBvcnRlZEVsZW1lbnQgfSBmcm9tICcuL3R5cGVzJztcbi8vIGltcG9ydCB7XG4vLyAgIE5PX0dFTkVSQVRFX0NPTlRFTlRfRUxFTUVOVFMsXG4vLyAgIFBMQUNFSE9MREVSX0VMRU1FTlRTLFxuLy8gICAvLyBTVVBQT1JURURfUFNFVURPX1NFTEVDVE9SU1xuLy8gfSBmcm9tICcuL2NvbnN0YW50cyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHlsZUluZm8oc291cmNlOiBTdXBwb3J0ZWRFbGVtZW50LCBwc2V1ZG9TZWxlY3Rvcj86IHN0cmluZyk6IFJlYWRFbGVtZW50U3R5bGUgfCBudWxsIHtcbiAgY29uc3QgY29tcHV0ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShzb3VyY2UsIHBzZXVkb1NlbGVjdG9yKTtcbiAgY29uc3QgYWxsU3R5bGVJbmZvID0gZ2V0U3R5bGVTbmFwc2hvdChjb21wdXRlZCk7XG4gIGNvbnN0IGZyYW1lZElucHV0U3R5bGUgPSBnZXRDaGlsZFN0eWxlKGFsbFN0eWxlSW5mbyk7XG4gIGNvbnN0IHBhcmVudFN0eWxlID0gZ2V0UGFyZW50U3R5bGUoYWxsU3R5bGVJbmZvKTtcbiAgY29uc3QgeyBkaXNwbGF5LCBjb250ZW50IH0gPSBmcmFtZWRJbnB1dFN0eWxlO1xuXG4gIGlmIChkaXNwbGF5ID09PSAnbm9uZScgfHwgKHBzZXVkb1NlbGVjdG9yICYmIGNvbnRlbnQgPT09ICdub25lJykpIHtcbiAgICBjb25zb2xlLmRlYnVnKFwiQ2FuJ3QgZ2VuZXJhdGUgc3R5bGUgZnJvbSBoaWRkZW4gZWxlbWVudCBcIiwgc291cmNlKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmICghcHNldWRvU2VsZWN0b3IpIHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHNvdXJjZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIFRPRE86IEZpZ3VyZSBvdXQgd2h5IHdlIHdlcmUgZG9pbmcgdGhpcyBpbiB0aGUgZmlyc3QgcGxhY2VcbiAgICAvLyBpZiAod2lkdGggKiBoZWlnaHQgPT09IDApIHtcbiAgICAvLyAgIGNvbnNvbGUuZGVidWcoJ2VsZW1lbnRzIHdpZHRoIHRpbWVzIGhlaWdodCBpcyAwLCBiYWlsICcsIHNvdXJjZSk7XG4gICAgLy8gICByZXR1cm4gbnVsbDtcbiAgICAvLyB9XG5cbiAgICBjb25zdCBhbGxQc2V1ZG9TdHlsZUluZm86IFBlc3Vkb1N0eWxlSW5mb01hcCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgICAvLyBUT0RPOiBGaWd1cmUgb3V0IGltcGxlbWVudGluZyBwc2V1ZG8gc2VsZWN0b3JzIGZvciBjbG9uZWQgZWxlbWVudFxuICAgIC8vIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgU1VQUE9SVEVEX1BTRVVET19TRUxFQ1RPUlMpIHtcbiAgICAvLyAgIGNvbnN0IHBzZXVkb1N0eWxlSW5mbyA9IGdldFN0eWxlSW5mbyhzb3VyY2UsIHNlbGVjdG9yKTtcbiAgICAvL1xuICAgIC8vICAgaWYgKHBzZXVkb1N0eWxlSW5mbykge1xuICAgIC8vICAgICBhbGxQc2V1ZG9TdHlsZUluZm9bc2VsZWN0b3JdID0gcHNldWRvU3R5bGVJbmZvO1xuICAgIC8vICAgfVxuICAgIC8vIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwYXJlbnRTdHlsZTogcGFyZW50U3R5bGUsXG4gICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgaGVpZ2h0OiBgJHtoZWlnaHR9cHhgLFxuICAgICAgY2hpbGRTdHlsZToge1xuICAgICAgICBzdHlsZTogZnJhbWVkSW5wdXRTdHlsZSxcbiAgICAgICAgcHNldWRvOiBhbGxQc2V1ZG9TdHlsZUluZm8sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoJ1BzZXVkbyBzZWxlY3RvciBzdXBwb3J0IGlzIGJyb2tlbi4gRml4IGl0IGlmIHlvdSB3YW50IGl0Jyk7XG5cbiAgLy8gcHNldWRvIGVsZW1lbnRzXG4gIC8vIGlmIChcbiAgLy8gICBjb250ZW50ID09PSBcIm5vbmVcIiB8fFxuICAvLyAgIChwc2V1ZG9TZWxlY3RvciA9PT0gXCI6Om1hcmtlclwiICYmIGRpc3BsYXkgIT09IFwibGlzdC1pdGVtXCIpIHx8XG4gIC8vICAgKChwc2V1ZG9TZWxlY3RvciA9PT0gXCI6OmJlZm9yZVwiIHx8IHBzZXVkb1NlbGVjdG9yID09PSBcIjo6YWZ0ZXJcIikgJiZcbiAgLy8gICAgIGlzVGFnTmFtZShzb3VyY2UgYXMgU3VwcG9ydGVkRWxlbWVudCwgTk9fR0VORVJBVEVfQ09OVEVOVF9FTEVNRU5UUykpIHx8XG4gIC8vICAgKHBzZXVkb1NlbGVjdG9yID09PSBcIjo6cGxhY2Vob2xkZXJcIiAmJlxuICAvLyAgICAgIWlzVGFnTmFtZShzb3VyY2UgYXMgU3VwcG9ydGVkRWxlbWVudCwgUExBQ0VIT0xERVJfRUxFTUVOVFMpKVxuICAvLyApIHtcbiAgLy8gICByZXR1cm4gbnVsbDtcbiAgLy8gfVxuICAvL1xuICAvLyByZXR1cm4ge1xuICAvLyAgIHN0eWxlLFxuICAvLyB9O1xufVxuIl19