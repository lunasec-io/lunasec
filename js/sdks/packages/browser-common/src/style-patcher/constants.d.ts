/**
 * Surprisingly, <style> element can be appended to <input> and <textarea>
 * so we can support ::placeholder, and ::selection even for them.
 */
import { SupportedElementTagName } from './types';
export declare const SUPPORTED_PSEUDO_SELECTORS: string[];
export declare const REPLACED_ELEMENTS: SupportedElementTagName[];
export declare const VOID_ELEMENTS: SupportedElementTagName[];
export declare const PARENT_ELEMENT_STYLE_ATTRIBUTES: string[];
export declare const ELEMENT_ATTRIBUTE_WHITELIST: string[];
export declare const NO_GENERATE_CONTENT_ELEMENTS: ("symbol" | "object" | "link" | "small" | "sub" | "sup" | "input" | "progress" | "select" | "a" | "abbr" | "address" | "applet" | "area" | "article" | "aside" | "audio" | "b" | "base" | "basefont" | "bdi" | "bdo" | "blockquote" | "body" | "br" | "button" | "canvas" | "caption" | "cite" | "code" | "col" | "colgroup" | "data" | "datalist" | "dd" | "del" | "details" | "dfn" | "dialog" | "dir" | "div" | "dl" | "dt" | "em" | "embed" | "fieldset" | "figcaption" | "figure" | "font" | "footer" | "form" | "frame" | "frameset" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "head" | "header" | "hgroup" | "hr" | "html" | "i" | "iframe" | "img" | "ins" | "kbd" | "label" | "legend" | "li" | "main" | "map" | "mark" | "marquee" | "menu" | "meta" | "meter" | "nav" | "noscript" | "ol" | "optgroup" | "option" | "output" | "p" | "param" | "picture" | "pre" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "script" | "section" | "slot" | "source" | "span" | "strong" | "style" | "summary" | "table" | "tbody" | "td" | "template" | "textarea" | "tfoot" | "th" | "thead" | "time" | "title" | "tr" | "track" | "u" | "ul" | "var" | "video" | "wbr" | "circle" | "clipPath" | "defs" | "desc" | "ellipse" | "feBlend" | "feColorMatrix" | "feComponentTransfer" | "feComposite" | "feConvolveMatrix" | "feDiffuseLighting" | "feDisplacementMap" | "feDistantLight" | "feFlood" | "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR" | "feGaussianBlur" | "feImage" | "feMerge" | "feMergeNode" | "feMorphology" | "feOffset" | "fePointLight" | "feSpecularLighting" | "feSpotLight" | "feTile" | "feTurbulence" | "filter" | "foreignObject" | "g" | "image" | "line" | "linearGradient" | "marker" | "mask" | "metadata" | "path" | "pattern" | "polygon" | "polyline" | "radialGradient" | "rect" | "stop" | "svg" | "switch" | "text" | "textPath" | "tspan" | "use" | "view")[];
export declare const PLACEHOLDER_ELEMENTS: SupportedElementTagName[];
export declare const SKIPPED_PROPERTIES: string[];
export declare const INLINE_SKIPPED_PROPERTIES: null;
//# sourceMappingURL=constants.d.ts.map