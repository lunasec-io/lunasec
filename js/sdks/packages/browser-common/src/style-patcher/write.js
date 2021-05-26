"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchStyle = void 0;
const dom_utils_1 = require("./dom-utils");
// TODO: Figure out if this is a security concern before re-enabling
function patchStyle(target, styleInfo) {
    if (!styleInfo) {
        return;
    }
    const { style } = styleInfo;
    // also possible to concat target.style.cssText onto this, but for now we don't have any, so forget it
    target.style.cssText = dom_utils_1.generateCssText(style);
    /**
     * Patch size
     *
     * TODO: how to deal with inline elements?
     *
     */
    // This is brittle but checking for display: inline was not working.
    // Remember to add any inline elements we need here
    // Another option is to use HTML5 content categories "phrasing content" but worried about browser support
    if (target.nodeName !== 'SPAN') {
        target.style.boxSizing = 'border-box';
        target.style.width = '100%';
        target.style.height = '100%';
        target.style.maxWidth = 'none';
        target.style.minWidth = 'auto';
    }
    // TODO: Pseudo element support is disabled.
    // const pseudoCssTextList = [];
    //
    //
    // for (const selector in pseudo) {
    //
    //   const pseudoStyleInfo = pseudo[selector];
    //   const pseudoDefaultStyleInfo = pseudoDefault[selector];
    //
    //   if (!pseudoDefaultStyleInfo) {
    //     continue;
    //   }
    //
    //   const pseudoStyle = pseudoStyleInfo && pseudoStyleInfo.style;
    //   const pseudoDefaultStyle = pseudoDefaultStyleInfo && pseudoDefaultStyleInfo.style;
    //   const cssText = generateCssText(
    //     getStyleDiff(pseudoStyle, pseudoDefaultStyle)
    //   );
    //
    //   const css = generatePseudoElementCSS(target, selector, cssText);
    //
    //   if (css) {
    //     pseudoCssTextList.push(css);
    //   }
    // }
    //
    // if (pseudoCssTextList.length) {
    //   const style = createStyleElement(doc, pseudoCssTextList.join("\n"));
    //
    //   target.appendChild(style);
    // }
}
exports.patchStyle = patchStyle;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3cml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBOEM7QUFHOUMsb0VBQW9FO0FBQ3BFLFNBQWdCLFVBQVUsQ0FBQyxNQUF3QixFQUFFLFNBQW9CO0lBQ3ZFLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxPQUFPO0tBQ1I7SUFFRCxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsU0FBUyxDQUFDO0lBQzVCLHNHQUFzRztJQUN0RyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRywyQkFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRTlDOzs7OztPQUtHO0lBQ0gsb0VBQW9FO0lBQ3BFLG1EQUFtRDtJQUNuRCx5R0FBeUc7SUFDekcsSUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUM5QixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUM7UUFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM3QixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDL0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO0tBQ2hDO0lBRUQsNENBQTRDO0lBQzVDLGdDQUFnQztJQUNoQyxFQUFFO0lBQ0YsRUFBRTtJQUNGLG1DQUFtQztJQUNuQyxFQUFFO0lBQ0YsOENBQThDO0lBQzlDLDREQUE0RDtJQUM1RCxFQUFFO0lBQ0YsbUNBQW1DO0lBQ25DLGdCQUFnQjtJQUNoQixNQUFNO0lBQ04sRUFBRTtJQUNGLGtFQUFrRTtJQUNsRSx1RkFBdUY7SUFDdkYscUNBQXFDO0lBQ3JDLG9EQUFvRDtJQUNwRCxPQUFPO0lBQ1AsRUFBRTtJQUNGLHFFQUFxRTtJQUNyRSxFQUFFO0lBQ0YsZUFBZTtJQUNmLG1DQUFtQztJQUNuQyxNQUFNO0lBQ04sSUFBSTtJQUNKLEVBQUU7SUFDRixrQ0FBa0M7SUFDbEMseUVBQXlFO0lBQ3pFLEVBQUU7SUFDRiwrQkFBK0I7SUFDL0IsSUFBSTtBQUNOLENBQUM7QUF6REQsZ0NBeURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2VuZXJhdGVDc3NUZXh0IH0gZnJvbSAnLi9kb20tdXRpbHMnO1xuaW1wb3J0IHsgU3R5bGVJbmZvLCBTdXBwb3J0ZWRFbGVtZW50IH0gZnJvbSAnLi90eXBlcyc7XG5cbi8vIFRPRE86IEZpZ3VyZSBvdXQgaWYgdGhpcyBpcyBhIHNlY3VyaXR5IGNvbmNlcm4gYmVmb3JlIHJlLWVuYWJsaW5nXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2hTdHlsZSh0YXJnZXQ6IFN1cHBvcnRlZEVsZW1lbnQsIHN0eWxlSW5mbzogU3R5bGVJbmZvKTogdm9pZCB7XG4gIGlmICghc3R5bGVJbmZvKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyBzdHlsZSB9ID0gc3R5bGVJbmZvO1xuICAvLyBhbHNvIHBvc3NpYmxlIHRvIGNvbmNhdCB0YXJnZXQuc3R5bGUuY3NzVGV4dCBvbnRvIHRoaXMsIGJ1dCBmb3Igbm93IHdlIGRvbid0IGhhdmUgYW55LCBzbyBmb3JnZXQgaXRcbiAgdGFyZ2V0LnN0eWxlLmNzc1RleHQgPSBnZW5lcmF0ZUNzc1RleHQoc3R5bGUpO1xuXG4gIC8qKlxuICAgKiBQYXRjaCBzaXplXG4gICAqXG4gICAqIFRPRE86IGhvdyB0byBkZWFsIHdpdGggaW5saW5lIGVsZW1lbnRzP1xuICAgKlxuICAgKi9cbiAgLy8gVGhpcyBpcyBicml0dGxlIGJ1dCBjaGVja2luZyBmb3IgZGlzcGxheTogaW5saW5lIHdhcyBub3Qgd29ya2luZy5cbiAgLy8gUmVtZW1iZXIgdG8gYWRkIGFueSBpbmxpbmUgZWxlbWVudHMgd2UgbmVlZCBoZXJlXG4gIC8vIEFub3RoZXIgb3B0aW9uIGlzIHRvIHVzZSBIVE1MNSBjb250ZW50IGNhdGVnb3JpZXMgXCJwaHJhc2luZyBjb250ZW50XCIgYnV0IHdvcnJpZWQgYWJvdXQgYnJvd3NlciBzdXBwb3J0XG4gIGlmICh0YXJnZXQubm9kZU5hbWUgIT09ICdTUEFOJykge1xuICAgIHRhcmdldC5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG4gICAgdGFyZ2V0LnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIHRhcmdldC5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgdGFyZ2V0LnN0eWxlLm1heFdpZHRoID0gJ25vbmUnO1xuICAgIHRhcmdldC5zdHlsZS5taW5XaWR0aCA9ICdhdXRvJztcbiAgfVxuXG4gIC8vIFRPRE86IFBzZXVkbyBlbGVtZW50IHN1cHBvcnQgaXMgZGlzYWJsZWQuXG4gIC8vIGNvbnN0IHBzZXVkb0Nzc1RleHRMaXN0ID0gW107XG4gIC8vXG4gIC8vXG4gIC8vIGZvciAoY29uc3Qgc2VsZWN0b3IgaW4gcHNldWRvKSB7XG4gIC8vXG4gIC8vICAgY29uc3QgcHNldWRvU3R5bGVJbmZvID0gcHNldWRvW3NlbGVjdG9yXTtcbiAgLy8gICBjb25zdCBwc2V1ZG9EZWZhdWx0U3R5bGVJbmZvID0gcHNldWRvRGVmYXVsdFtzZWxlY3Rvcl07XG4gIC8vXG4gIC8vICAgaWYgKCFwc2V1ZG9EZWZhdWx0U3R5bGVJbmZvKSB7XG4gIC8vICAgICBjb250aW51ZTtcbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgY29uc3QgcHNldWRvU3R5bGUgPSBwc2V1ZG9TdHlsZUluZm8gJiYgcHNldWRvU3R5bGVJbmZvLnN0eWxlO1xuICAvLyAgIGNvbnN0IHBzZXVkb0RlZmF1bHRTdHlsZSA9IHBzZXVkb0RlZmF1bHRTdHlsZUluZm8gJiYgcHNldWRvRGVmYXVsdFN0eWxlSW5mby5zdHlsZTtcbiAgLy8gICBjb25zdCBjc3NUZXh0ID0gZ2VuZXJhdGVDc3NUZXh0KFxuICAvLyAgICAgZ2V0U3R5bGVEaWZmKHBzZXVkb1N0eWxlLCBwc2V1ZG9EZWZhdWx0U3R5bGUpXG4gIC8vICAgKTtcbiAgLy9cbiAgLy8gICBjb25zdCBjc3MgPSBnZW5lcmF0ZVBzZXVkb0VsZW1lbnRDU1ModGFyZ2V0LCBzZWxlY3RvciwgY3NzVGV4dCk7XG4gIC8vXG4gIC8vICAgaWYgKGNzcykge1xuICAvLyAgICAgcHNldWRvQ3NzVGV4dExpc3QucHVzaChjc3MpO1xuICAvLyAgIH1cbiAgLy8gfVxuICAvL1xuICAvLyBpZiAocHNldWRvQ3NzVGV4dExpc3QubGVuZ3RoKSB7XG4gIC8vICAgY29uc3Qgc3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQoZG9jLCBwc2V1ZG9Dc3NUZXh0TGlzdC5qb2luKFwiXFxuXCIpKTtcbiAgLy9cbiAgLy8gICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAvLyB9XG59XG4iXX0=