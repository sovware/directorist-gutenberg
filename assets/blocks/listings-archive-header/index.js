/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs":
/*!***********************************************************************!*\
  !*** ./node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clsx: () => (/* binding */ clsx),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f)}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (clsx);

/***/ }),

/***/ "./node_modules/.pnpm/react-from-dom@0.7.5_react@18.3.1/node_modules/react-from-dom/dist/index.mjs":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/react-from-dom@0.7.5_react@18.3.1/node_modules/react-from-dom/dist/index.mjs ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertFromNode: () => (/* binding */ convertFromNode),
/* harmony export */   convertFromString: () => (/* binding */ convertFromString),
/* harmony export */   "default": () => (/* binding */ convert)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
// src/index.ts


// src/helpers.ts
var styleToObject = (input) => {
  if (typeof input !== "string") {
    return {};
  }
  return input.split(/ ?; ?/).reduce((acc, item) => {
    const [key, value] = item.split(/ ?: ?/).map((d, index) => index === 0 ? d.replace(/\s+/g, "") : d.trim());
    if (key && value) {
      const nextKey = key.replace(/(\w)-(\w)/g, (_$0, $1, $2) => `${$1}${$2.toUpperCase()}`);
      let nextValue = value.trim();
      if (!Number.isNaN(Number(value))) {
        nextValue = Number(value);
      }
      acc[key.startsWith("-") ? key : nextKey] = nextValue;
    }
    return acc;
  }, {});
};
function randomString(length = 6) {
  const characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let index = length; index > 0; --index) {
    result += characters[Math.round(Math.random() * (characters.length - 1))];
  }
  return result;
}
var noTextChildNodes = [
  "br",
  "col",
  "colgroup",
  "dl",
  "hr",
  "iframe",
  "img",
  "input",
  "link",
  "menuitem",
  "meta",
  "ol",
  "param",
  "select",
  "table",
  "tbody",
  "tfoot",
  "thead",
  "tr",
  "ul",
  "wbr"
];
var possibleStandardNames = {
  // HTML
  "accept-charset": "acceptCharset",
  acceptcharset: "acceptCharset",
  accesskey: "accessKey",
  allowfullscreen: "allowFullScreen",
  autocapitalize: "autoCapitalize",
  autocomplete: "autoComplete",
  autocorrect: "autoCorrect",
  autofocus: "autoFocus",
  autoplay: "autoPlay",
  autosave: "autoSave",
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  charset: "charSet",
  class: "className",
  classid: "classID",
  classname: "className",
  colspan: "colSpan",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  controlslist: "controlsList",
  crossorigin: "crossOrigin",
  dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
  datetime: "dateTime",
  defaultchecked: "defaultChecked",
  defaultvalue: "defaultValue",
  enctype: "encType",
  for: "htmlFor",
  formmethod: "formMethod",
  formaction: "formAction",
  formenctype: "formEncType",
  formnovalidate: "formNoValidate",
  formtarget: "formTarget",
  frameborder: "frameBorder",
  hreflang: "hrefLang",
  htmlfor: "htmlFor",
  httpequiv: "httpEquiv",
  "http-equiv": "httpEquiv",
  icon: "icon",
  innerhtml: "innerHTML",
  inputmode: "inputMode",
  itemid: "itemID",
  itemprop: "itemProp",
  itemref: "itemRef",
  itemscope: "itemScope",
  itemtype: "itemType",
  keyparams: "keyParams",
  keytype: "keyType",
  marginwidth: "marginWidth",
  marginheight: "marginHeight",
  maxlength: "maxLength",
  mediagroup: "mediaGroup",
  minlength: "minLength",
  nomodule: "noModule",
  novalidate: "noValidate",
  playsinline: "playsInline",
  radiogroup: "radioGroup",
  readonly: "readOnly",
  referrerpolicy: "referrerPolicy",
  rowspan: "rowSpan",
  spellcheck: "spellCheck",
  srcdoc: "srcDoc",
  srclang: "srcLang",
  srcset: "srcSet",
  tabindex: "tabIndex",
  typemustmatch: "typeMustMatch",
  usemap: "useMap",
  // SVG
  accentheight: "accentHeight",
  "accent-height": "accentHeight",
  alignmentbaseline: "alignmentBaseline",
  "alignment-baseline": "alignmentBaseline",
  allowreorder: "allowReorder",
  arabicform: "arabicForm",
  "arabic-form": "arabicForm",
  attributename: "attributeName",
  attributetype: "attributeType",
  autoreverse: "autoReverse",
  basefrequency: "baseFrequency",
  baselineshift: "baselineShift",
  "baseline-shift": "baselineShift",
  baseprofile: "baseProfile",
  calcmode: "calcMode",
  capheight: "capHeight",
  "cap-height": "capHeight",
  clippath: "clipPath",
  "clip-path": "clipPath",
  clippathunits: "clipPathUnits",
  cliprule: "clipRule",
  "clip-rule": "clipRule",
  colorinterpolation: "colorInterpolation",
  "color-interpolation": "colorInterpolation",
  colorinterpolationfilters: "colorInterpolationFilters",
  "color-interpolation-filters": "colorInterpolationFilters",
  colorprofile: "colorProfile",
  "color-profile": "colorProfile",
  colorrendering: "colorRendering",
  "color-rendering": "colorRendering",
  contentscripttype: "contentScriptType",
  contentstyletype: "contentStyleType",
  diffuseconstant: "diffuseConstant",
  dominantbaseline: "dominantBaseline",
  "dominant-baseline": "dominantBaseline",
  edgemode: "edgeMode",
  enablebackground: "enableBackground",
  "enable-background": "enableBackground",
  externalresourcesrequired: "externalResourcesRequired",
  fillopacity: "fillOpacity",
  "fill-opacity": "fillOpacity",
  fillrule: "fillRule",
  "fill-rule": "fillRule",
  filterres: "filterRes",
  filterunits: "filterUnits",
  floodopacity: "floodOpacity",
  "flood-opacity": "floodOpacity",
  floodcolor: "floodColor",
  "flood-color": "floodColor",
  fontfamily: "fontFamily",
  "font-family": "fontFamily",
  fontsize: "fontSize",
  "font-size": "fontSize",
  fontsizeadjust: "fontSizeAdjust",
  "font-size-adjust": "fontSizeAdjust",
  fontstretch: "fontStretch",
  "font-stretch": "fontStretch",
  fontstyle: "fontStyle",
  "font-style": "fontStyle",
  fontvariant: "fontVariant",
  "font-variant": "fontVariant",
  fontweight: "fontWeight",
  "font-weight": "fontWeight",
  glyphname: "glyphName",
  "glyph-name": "glyphName",
  glyphorientationhorizontal: "glyphOrientationHorizontal",
  "glyph-orientation-horizontal": "glyphOrientationHorizontal",
  glyphorientationvertical: "glyphOrientationVertical",
  "glyph-orientation-vertical": "glyphOrientationVertical",
  glyphref: "glyphRef",
  gradienttransform: "gradientTransform",
  gradientunits: "gradientUnits",
  horizadvx: "horizAdvX",
  "horiz-adv-x": "horizAdvX",
  horizoriginx: "horizOriginX",
  "horiz-origin-x": "horizOriginX",
  imagerendering: "imageRendering",
  "image-rendering": "imageRendering",
  kernelmatrix: "kernelMatrix",
  kernelunitlength: "kernelUnitLength",
  keypoints: "keyPoints",
  keysplines: "keySplines",
  keytimes: "keyTimes",
  lengthadjust: "lengthAdjust",
  letterspacing: "letterSpacing",
  "letter-spacing": "letterSpacing",
  lightingcolor: "lightingColor",
  "lighting-color": "lightingColor",
  limitingconeangle: "limitingConeAngle",
  markerend: "markerEnd",
  "marker-end": "markerEnd",
  markerheight: "markerHeight",
  markermid: "markerMid",
  "marker-mid": "markerMid",
  markerstart: "markerStart",
  "marker-start": "markerStart",
  markerunits: "markerUnits",
  markerwidth: "markerWidth",
  maskcontentunits: "maskContentUnits",
  maskunits: "maskUnits",
  numoctaves: "numOctaves",
  overlineposition: "overlinePosition",
  "overline-position": "overlinePosition",
  overlinethickness: "overlineThickness",
  "overline-thickness": "overlineThickness",
  paintorder: "paintOrder",
  "paint-order": "paintOrder",
  "panose-1": "panose1",
  pathlength: "pathLength",
  patterncontentunits: "patternContentUnits",
  patterntransform: "patternTransform",
  patternunits: "patternUnits",
  pointerevents: "pointerEvents",
  "pointer-events": "pointerEvents",
  pointsatx: "pointsAtX",
  pointsaty: "pointsAtY",
  pointsatz: "pointsAtZ",
  preservealpha: "preserveAlpha",
  preserveaspectratio: "preserveAspectRatio",
  primitiveunits: "primitiveUnits",
  refx: "refX",
  refy: "refY",
  renderingintent: "renderingIntent",
  "rendering-intent": "renderingIntent",
  repeatcount: "repeatCount",
  repeatdur: "repeatDur",
  requiredextensions: "requiredExtensions",
  requiredfeatures: "requiredFeatures",
  shaperendering: "shapeRendering",
  "shape-rendering": "shapeRendering",
  specularconstant: "specularConstant",
  specularexponent: "specularExponent",
  spreadmethod: "spreadMethod",
  startoffset: "startOffset",
  stddeviation: "stdDeviation",
  stitchtiles: "stitchTiles",
  stopcolor: "stopColor",
  "stop-color": "stopColor",
  stopopacity: "stopOpacity",
  "stop-opacity": "stopOpacity",
  strikethroughposition: "strikethroughPosition",
  "strikethrough-position": "strikethroughPosition",
  strikethroughthickness: "strikethroughThickness",
  "strikethrough-thickness": "strikethroughThickness",
  strokedasharray: "strokeDasharray",
  "stroke-dasharray": "strokeDasharray",
  strokedashoffset: "strokeDashoffset",
  "stroke-dashoffset": "strokeDashoffset",
  strokelinecap: "strokeLinecap",
  "stroke-linecap": "strokeLinecap",
  strokelinejoin: "strokeLinejoin",
  "stroke-linejoin": "strokeLinejoin",
  strokemiterlimit: "strokeMiterlimit",
  "stroke-miterlimit": "strokeMiterlimit",
  strokewidth: "strokeWidth",
  "stroke-width": "strokeWidth",
  strokeopacity: "strokeOpacity",
  "stroke-opacity": "strokeOpacity",
  suppresscontenteditablewarning: "suppressContentEditableWarning",
  suppresshydrationwarning: "suppressHydrationWarning",
  surfacescale: "surfaceScale",
  systemlanguage: "systemLanguage",
  tablevalues: "tableValues",
  targetx: "targetX",
  targety: "targetY",
  textanchor: "textAnchor",
  "text-anchor": "textAnchor",
  textdecoration: "textDecoration",
  "text-decoration": "textDecoration",
  textlength: "textLength",
  textrendering: "textRendering",
  "text-rendering": "textRendering",
  underlineposition: "underlinePosition",
  "underline-position": "underlinePosition",
  underlinethickness: "underlineThickness",
  "underline-thickness": "underlineThickness",
  unicodebidi: "unicodeBidi",
  "unicode-bidi": "unicodeBidi",
  unicoderange: "unicodeRange",
  "unicode-range": "unicodeRange",
  unitsperem: "unitsPerEm",
  "units-per-em": "unitsPerEm",
  unselectable: "unselectable",
  valphabetic: "vAlphabetic",
  "v-alphabetic": "vAlphabetic",
  vectoreffect: "vectorEffect",
  "vector-effect": "vectorEffect",
  vertadvy: "vertAdvY",
  "vert-adv-y": "vertAdvY",
  vertoriginx: "vertOriginX",
  "vert-origin-x": "vertOriginX",
  vertoriginy: "vertOriginY",
  "vert-origin-y": "vertOriginY",
  vhanging: "vHanging",
  "v-hanging": "vHanging",
  videographic: "vIdeographic",
  "v-ideographic": "vIdeographic",
  viewbox: "viewBox",
  viewtarget: "viewTarget",
  vmathematical: "vMathematical",
  "v-mathematical": "vMathematical",
  wordspacing: "wordSpacing",
  "word-spacing": "wordSpacing",
  writingmode: "writingMode",
  "writing-mode": "writingMode",
  xchannelselector: "xChannelSelector",
  xheight: "xHeight",
  "x-height": "xHeight",
  xlinkactuate: "xlinkActuate",
  "xlink:actuate": "xlinkActuate",
  xlinkarcrole: "xlinkArcrole",
  "xlink:arcrole": "xlinkArcrole",
  xlinkhref: "xlinkHref",
  "xlink:href": "xlinkHref",
  xlinkrole: "xlinkRole",
  "xlink:role": "xlinkRole",
  xlinkshow: "xlinkShow",
  "xlink:show": "xlinkShow",
  xlinktitle: "xlinkTitle",
  "xlink:title": "xlinkTitle",
  xlinktype: "xlinkType",
  "xlink:type": "xlinkType",
  xmlbase: "xmlBase",
  "xml:base": "xmlBase",
  xmllang: "xmlLang",
  "xml:lang": "xmlLang",
  "xml:space": "xmlSpace",
  xmlnsxlink: "xmlnsXlink",
  "xmlns:xlink": "xmlnsXlink",
  xmlspace: "xmlSpace",
  ychannelselector: "yChannelSelector",
  zoomandpan: "zoomAndPan",
  // event handlers
  onblur: "onBlur",
  onchange: "onChange",
  onclick: "onClick",
  oncontextmenu: "onContextMenu",
  ondoubleclick: "onDoubleClick",
  ondrag: "onDrag",
  ondragend: "onDragEnd",
  ondragenter: "onDragEnter",
  ondragexit: "onDragExit",
  ondragleave: "onDragLeave",
  ondragover: "onDragOver",
  ondragstart: "onDragStart",
  ondrop: "onDrop",
  onerror: "onError",
  onfocus: "onFocus",
  oninput: "onInput",
  oninvalid: "onInvalid",
  onkeydown: "onKeyDown",
  onkeypress: "onKeyPress",
  onkeyup: "onKeyUp",
  onload: "onLoad",
  onmousedown: "onMouseDown",
  onmouseenter: "onMouseEnter",
  onmouseleave: "onMouseLeave",
  onmousemove: "onMouseMove",
  onmouseout: "onMouseOut",
  onmouseover: "onMouseOver",
  onmouseup: "onMouseUp",
  onscroll: "onScroll",
  onsubmit: "onSubmit",
  ontouchcancel: "onTouchCancel",
  ontouchend: "onTouchEnd",
  ontouchmove: "onTouchMove",
  ontouchstart: "onTouchStart",
  onwheel: "onWheel"
};

// src/index.ts
function getReactNode(node, options) {
  const { key, level, ...rest } = options;
  switch (node.nodeType) {
    case 1: {
      return react__WEBPACK_IMPORTED_MODULE_0__.createElement(
        parseName(node.nodeName),
        parseAttributes(node, key),
        parseChildren(node.childNodes, level, rest)
      );
    }
    case 3: {
      const nodeText = node.nodeValue?.toString() ?? "";
      if (!rest.allowWhiteSpaces && /^\s+$/.test(nodeText) && !/[\u00A0\u202F]/.test(nodeText)) {
        return null;
      }
      if (!node.parentNode) {
        return nodeText;
      }
      const parentNodeName = node.parentNode.nodeName.toLowerCase();
      if (noTextChildNodes.includes(parentNodeName)) {
        if (/\S/.test(nodeText)) {
          console.warn(
            `A textNode is not allowed inside '${parentNodeName}'. Your text "${nodeText}" will be ignored`
          );
        }
        return null;
      }
      return nodeText;
    }
    case 8: {
      return null;
    }
    case 11: {
      return parseChildren(node.childNodes, level, options);
    }
    /* c8 ignore next 3 */
    default: {
      return null;
    }
  }
}
function parseAttributes(node, reactKey) {
  const attributes = {
    key: reactKey
  };
  if (node instanceof Element) {
    const nodeClassNames = node.getAttribute("class");
    if (nodeClassNames) {
      attributes.className = nodeClassNames;
    }
    [...node.attributes].forEach((d) => {
      switch (d.name) {
        // this is manually handled above, so break;
        case "class":
          break;
        case "style":
          attributes[d.name] = styleToObject(d.value);
          break;
        case "allowfullscreen":
        case "allowpaymentrequest":
        case "async":
        case "autofocus":
        case "autoplay":
        case "checked":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "formnovalidate":
        case "hidden":
        case "ismap":
        case "itemscope":
        case "loop":
        case "multiple":
        case "muted":
        case "nomodule":
        case "novalidate":
        case "open":
        case "readonly":
        case "required":
        case "reversed":
        case "selected":
        case "typemustmatch":
          attributes[possibleStandardNames[d.name] || d.name] = true;
          break;
        default:
          attributes[possibleStandardNames[d.name] || d.name] = d.value;
      }
    });
  }
  return attributes;
}
function parseChildren(childNodeList, level, options) {
  const children = [...childNodeList].map(
    (node, index) => convertFromNode(node, {
      ...options,
      index,
      level: level + 1
    })
  ).filter(Boolean);
  if (!children.length) {
    return null;
  }
  return children;
}
function parseName(nodeName) {
  if (/[a-z]+[A-Z]+[a-z]+/.test(nodeName)) {
    return nodeName;
  }
  return nodeName.toLowerCase();
}
function convert(input, options = {}) {
  if (typeof input === "string") {
    return convertFromString(input, options);
  }
  if (input instanceof Node) {
    return convertFromNode(input, options);
  }
  return null;
}
function convertFromNode(input, options = {}) {
  if (!input || !(input instanceof Node)) {
    return null;
  }
  const { actions = [], index = 0, level = 0, randomKey } = options;
  let node = input;
  let key = `${level}-${index}`;
  const result = [];
  if (randomKey && level === 0) {
    key = `${randomString()}-${key}`;
  }
  if (Array.isArray(actions)) {
    actions.forEach((action) => {
      if (action.condition(node, key, level)) {
        if (typeof action.pre === "function") {
          node = action.pre(node, key, level);
          if (!(node instanceof Node)) {
            node = input;
            if (true) {
              console.warn(
                "The `pre` method always must return a valid DomNode (instanceof Node) - your modification will be ignored (Hint: if you want to render a React-component, use the `post` method instead)"
              );
            }
          }
        }
        if (typeof action.post === "function") {
          result.push(action.post(node, key, level));
        }
      }
    });
  }
  if (result.length) {
    return result;
  }
  return getReactNode(node, { key, level, ...options });
}
function convertFromString(input, options = {}) {
  if (!input || typeof input !== "string") {
    return null;
  }
  const {
    includeAllNodes = false,
    nodeOnly = false,
    selector = "body > *",
    type = "text/html"
  } = options;
  try {
    const parser = new DOMParser();
    const document = parser.parseFromString(input, type);
    if (includeAllNodes) {
      const { childNodes } = document.body;
      if (nodeOnly) {
        return childNodes;
      }
      return [...childNodes].map((node2) => convertFromNode(node2, options));
    }
    const node = document.querySelector(selector) || document.body.childNodes[0];
    if (!(node instanceof Node)) {
      throw new TypeError("Error parsing input");
    }
    if (nodeOnly) {
      return node;
    }
    return convertFromNode(node, options);
  } catch (error) {
    if (true) {
      console.error(error);
    }
  }
  return null;
}

//# sourceMappingURL=index.mjs.map

/***/ }),

/***/ "./node_modules/.pnpm/react-inlinesvg@4.2.0_react@18.3.1/node_modules/react-inlinesvg/dist/index.mjs":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/react-inlinesvg@4.2.0_react@18.3.1/node_modules/react-inlinesvg/dist/index.mjs ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cacheStore: () => (/* binding */ cacheStore),
/* harmony export */   "default": () => (/* binding */ InlineSVG)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_from_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-from-dom */ "./node_modules/.pnpm/react-from-dom@0.7.5_react@18.3.1/node_modules/react-from-dom/dist/index.mjs");
"use client";
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.tsx



// src/config.ts
var CACHE_NAME = "react-inlinesvg";
var CACHE_MAX_RETRIES = 10;
var STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  LOADED: "loaded",
  FAILED: "failed",
  READY: "ready",
  UNSUPPORTED: "unsupported"
};

// src/modules/helpers.ts
function randomCharacter(character) {
  return character[Math.floor(Math.random() * character.length)];
}
function canUseDOM() {
  return !!(typeof window !== "undefined" && window.document?.createElement);
}
function isSupportedEnvironment() {
  return supportsInlineSVG() && typeof window !== "undefined" && window !== null;
}
function omit(input, ...filter) {
  const output = {};
  for (const key in input) {
    if ({}.hasOwnProperty.call(input, key)) {
      if (!filter.includes(key)) {
        output[key] = input[key];
      }
    }
  }
  return output;
}
function randomString(length) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "1234567890";
  const charset = `${letters}${letters.toUpperCase()}${numbers}`;
  let R = "";
  for (let index = 0; index < length; index++) {
    R += randomCharacter(charset);
  }
  return R;
}
async function request(url, options) {
  const response = await fetch(url, options);
  const contentType = response.headers.get("content-type");
  const [fileType] = (contentType ?? "").split(/ ?; ?/);
  if (response.status > 299) {
    throw new Error("Not found");
  }
  if (!["image/svg+xml", "text/plain"].some((d) => fileType.includes(d))) {
    throw new Error(`Content type isn't valid: ${fileType}`);
  }
  return response.text();
}
function sleep(seconds = 1) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1e3);
  });
}
function supportsInlineSVG() {
  if (!document) {
    return false;
  }
  const div = document.createElement("div");
  div.innerHTML = "<svg />";
  const svg = div.firstChild;
  return !!svg && svg.namespaceURI === "http://www.w3.org/2000/svg";
}

// src/modules/cache.ts
var CacheStore = class {
  constructor() {
    __publicField(this, "cacheApi");
    __publicField(this, "cacheStore");
    __publicField(this, "subscribers", []);
    __publicField(this, "isReady", false);
    this.cacheStore = /* @__PURE__ */ new Map();
    let cacheName = CACHE_NAME;
    let usePersistentCache = false;
    if (canUseDOM()) {
      cacheName = window.REACT_INLINESVG_CACHE_NAME ?? CACHE_NAME;
      usePersistentCache = !!window.REACT_INLINESVG_PERSISTENT_CACHE && "caches" in window;
    }
    if (usePersistentCache) {
      caches.open(cacheName).then((cache) => {
        this.cacheApi = cache;
      }).catch((error) => {
        console.error(`Failed to open cache: ${error.message}`);
        this.cacheApi = void 0;
      }).finally(() => {
        this.isReady = true;
        const callbacks = [...this.subscribers];
        this.subscribers.length = 0;
        callbacks.forEach((callback) => {
          try {
            callback();
          } catch (error) {
            console.error(`Error in CacheStore subscriber callback: ${error.message}`);
          }
        });
      });
    } else {
      this.isReady = true;
    }
  }
  onReady(callback) {
    if (this.isReady) {
      callback();
    } else {
      this.subscribers.push(callback);
    }
  }
  async get(url, fetchOptions) {
    await (this.cacheApi ? this.fetchAndAddToPersistentCache(url, fetchOptions) : this.fetchAndAddToInternalCache(url, fetchOptions));
    return this.cacheStore.get(url)?.content ?? "";
  }
  set(url, data) {
    this.cacheStore.set(url, data);
  }
  isCached(url) {
    return this.cacheStore.get(url)?.status === STATUS.LOADED;
  }
  async fetchAndAddToInternalCache(url, fetchOptions) {
    const cache = this.cacheStore.get(url);
    if (cache?.status === STATUS.LOADING) {
      await this.handleLoading(url, async () => {
        this.cacheStore.set(url, { content: "", status: STATUS.IDLE });
        await this.fetchAndAddToInternalCache(url, fetchOptions);
      });
      return;
    }
    if (!cache?.content) {
      this.cacheStore.set(url, { content: "", status: STATUS.LOADING });
      try {
        const content = await request(url, fetchOptions);
        this.cacheStore.set(url, { content, status: STATUS.LOADED });
      } catch (error) {
        this.cacheStore.set(url, { content: "", status: STATUS.FAILED });
        throw error;
      }
    }
  }
  async fetchAndAddToPersistentCache(url, fetchOptions) {
    const cache = this.cacheStore.get(url);
    if (cache?.status === STATUS.LOADED) {
      return;
    }
    if (cache?.status === STATUS.LOADING) {
      await this.handleLoading(url, async () => {
        this.cacheStore.set(url, { content: "", status: STATUS.IDLE });
        await this.fetchAndAddToPersistentCache(url, fetchOptions);
      });
      return;
    }
    this.cacheStore.set(url, { content: "", status: STATUS.LOADING });
    const data = await this.cacheApi?.match(url);
    if (data) {
      const content = await data.text();
      this.cacheStore.set(url, { content, status: STATUS.LOADED });
      return;
    }
    try {
      await this.cacheApi?.add(new Request(url, fetchOptions));
      const response = await this.cacheApi?.match(url);
      const content = await response?.text() ?? "";
      this.cacheStore.set(url, { content, status: STATUS.LOADED });
    } catch (error) {
      this.cacheStore.set(url, { content: "", status: STATUS.FAILED });
      throw error;
    }
  }
  async handleLoading(url, callback) {
    for (let retryCount = 0; retryCount < CACHE_MAX_RETRIES; retryCount++) {
      if (this.cacheStore.get(url)?.status !== STATUS.LOADING) {
        return;
      }
      await sleep(0.1);
    }
    await callback();
  }
  keys() {
    return [...this.cacheStore.keys()];
  }
  data() {
    return [...this.cacheStore.entries()].map(([key, value]) => ({ [key]: value }));
  }
  async delete(url) {
    if (this.cacheApi) {
      await this.cacheApi.delete(url);
    }
    this.cacheStore.delete(url);
  }
  async clear() {
    if (this.cacheApi) {
      const keys = await this.cacheApi.keys();
      await Promise.allSettled(keys.map((key) => this.cacheApi.delete(key)));
    }
    this.cacheStore.clear();
  }
};

// src/modules/hooks.tsx

function usePrevious(state) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(void 0);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    ref.current = state;
  });
  return ref.current;
}

// src/modules/utils.ts

function getNode(options) {
  const {
    baseURL,
    content,
    description,
    handleError,
    hash,
    preProcessor,
    title,
    uniquifyIDs = false
  } = options;
  try {
    const svgText = processSVG(content, preProcessor);
    const node = (0,react_from_dom__WEBPACK_IMPORTED_MODULE_1__["default"])(svgText, { nodeOnly: true });
    if (!node || !(node instanceof SVGSVGElement)) {
      throw new Error("Could not convert the src to a DOM Node");
    }
    const svg = updateSVGAttributes(node, { baseURL, hash, uniquifyIDs });
    if (description) {
      const originalDesc = svg.querySelector("desc");
      if (originalDesc?.parentNode) {
        originalDesc.parentNode.removeChild(originalDesc);
      }
      const descElement = document.createElementNS("http://www.w3.org/2000/svg", "desc");
      descElement.innerHTML = description;
      svg.prepend(descElement);
    }
    if (typeof title !== "undefined") {
      const originalTitle = svg.querySelector("title");
      if (originalTitle?.parentNode) {
        originalTitle.parentNode.removeChild(originalTitle);
      }
      if (title) {
        const titleElement = document.createElementNS("http://www.w3.org/2000/svg", "title");
        titleElement.innerHTML = title;
        svg.prepend(titleElement);
      }
    }
    return svg;
  } catch (error) {
    return handleError(error);
  }
}
function processSVG(content, preProcessor) {
  if (preProcessor) {
    return preProcessor(content);
  }
  return content;
}
function updateSVGAttributes(node, options) {
  const { baseURL = "", hash, uniquifyIDs } = options;
  const replaceableAttributes = ["id", "href", "xlink:href", "xlink:role", "xlink:arcrole"];
  const linkAttributes = ["href", "xlink:href"];
  const isDataValue = (name, value) => linkAttributes.includes(name) && (value ? !value.includes("#") : false);
  if (!uniquifyIDs) {
    return node;
  }
  [...node.children].forEach((d) => {
    if (d.attributes?.length) {
      const attributes = Object.values(d.attributes).map((a) => {
        const attribute = a;
        const match = /url\((.*?)\)/.exec(a.value);
        if (match?.[1]) {
          attribute.value = a.value.replace(match[0], `url(${baseURL}${match[1]}__${hash})`);
        }
        return attribute;
      });
      replaceableAttributes.forEach((r) => {
        const attribute = attributes.find((a) => a.name === r);
        if (attribute && !isDataValue(r, attribute.value)) {
          attribute.value = `${attribute.value}__${hash}`;
        }
      });
    }
    if (d.children.length) {
      return updateSVGAttributes(d, options);
    }
    return d;
  });
  return node;
}

// src/index.tsx
var cacheStore;
function ReactInlineSVG(props) {
  const {
    cacheRequests = true,
    children = null,
    description,
    fetchOptions,
    innerRef,
    loader = null,
    onError,
    onLoad,
    src,
    title,
    uniqueHash
  } = props;
  const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(
    (previousState2, nextState) => ({
      ...previousState2,
      ...nextState
    }),
    {
      content: "",
      element: null,
      isCached: cacheRequests && cacheStore.isCached(props.src),
      status: STATUS.IDLE
    }
  );
  const { content, element, isCached, status } = state;
  const previousProps = usePrevious(props);
  const previousState = usePrevious(state);
  const hash = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(uniqueHash ?? randomString(8));
  const isActive = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const isInitialized = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  const handleError = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
    (error) => {
      if (isActive.current) {
        setState({
          status: error.message === "Browser does not support SVG" ? STATUS.UNSUPPORTED : STATUS.FAILED
        });
        onError?.(error);
      }
    },
    [onError]
  );
  const handleLoad = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((loadedContent, hasCache = false) => {
    if (isActive.current) {
      setState({
        content: loadedContent,
        isCached: hasCache,
        status: STATUS.LOADED
      });
    }
  }, []);
  const fetchContent = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    const responseContent = await request(src, fetchOptions);
    handleLoad(responseContent);
  }, [fetchOptions, handleLoad, src]);
  const getElement = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    try {
      const node = getNode({ ...props, handleError, hash: hash.current, content });
      const convertedElement = (0,react_from_dom__WEBPACK_IMPORTED_MODULE_1__["default"])(node);
      if (!convertedElement || !(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(convertedElement)) {
        throw new Error("Could not convert the src to a React element");
      }
      setState({
        element: convertedElement,
        status: STATUS.READY
      });
    } catch (error) {
      handleError(error);
    }
  }, [content, handleError, props]);
  const getContent = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    const dataURI = /^data:image\/svg[^,]*?(;base64)?,(.*)/u.exec(src);
    let inlineSrc;
    if (dataURI) {
      inlineSrc = dataURI[1] ? window.atob(dataURI[2]) : decodeURIComponent(dataURI[2]);
    } else if (src.includes("<svg")) {
      inlineSrc = src;
    }
    if (inlineSrc) {
      handleLoad(inlineSrc);
      return;
    }
    try {
      if (cacheRequests) {
        const cachedContent = await cacheStore.get(src, fetchOptions);
        handleLoad(cachedContent, true);
      } else {
        await fetchContent();
      }
    } catch (error) {
      handleError(error);
    }
  }, [cacheRequests, fetchContent, fetchOptions, handleError, handleLoad, src]);
  const load = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    if (isActive.current) {
      setState({
        content: "",
        element: null,
        isCached: false,
        status: STATUS.LOADING
      });
    }
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(
    () => {
      isActive.current = true;
      if (!canUseDOM() || isInitialized.current) {
        return void 0;
      }
      try {
        if (status === STATUS.IDLE) {
          if (!isSupportedEnvironment()) {
            throw new Error("Browser does not support SVG");
          }
          if (!src) {
            throw new Error("Missing src");
          }
          load();
        }
      } catch (error) {
        handleError(error);
      }
      isInitialized.current = true;
      return () => {
        isActive.current = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!canUseDOM() || !previousProps) {
      return;
    }
    if (previousProps.src !== src) {
      if (!src) {
        handleError(new Error("Missing src"));
        return;
      }
      load();
    }
  }, [handleError, load, previousProps, src]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (status === STATUS.LOADED) {
      getElement();
    }
  }, [status, getElement]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!canUseDOM() || !previousProps || previousProps.src !== src) {
      return;
    }
    if (previousProps.title !== title || previousProps.description !== description) {
      getElement();
    }
  }, [description, getElement, previousProps, src, title]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!previousState) {
      return;
    }
    switch (status) {
      case STATUS.LOADING: {
        if (previousState.status !== STATUS.LOADING) {
          getContent();
        }
        break;
      }
      case STATUS.LOADED: {
        if (previousState.status !== STATUS.LOADED) {
          getElement();
        }
        break;
      }
      case STATUS.READY: {
        if (previousState.status !== STATUS.READY) {
          onLoad?.(src, isCached);
        }
        break;
      }
    }
  }, [getContent, getElement, isCached, onLoad, previousState, src, status]);
  const elementProps = omit(
    props,
    "baseURL",
    "cacheRequests",
    "children",
    "description",
    "fetchOptions",
    "innerRef",
    "loader",
    "onError",
    "onLoad",
    "preProcessor",
    "src",
    "title",
    "uniqueHash",
    "uniquifyIDs"
  );
  if (!canUseDOM()) {
    return loader;
  }
  if (element) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(element, {
      ref: innerRef,
      ...elementProps
    });
  }
  if ([STATUS.UNSUPPORTED, STATUS.FAILED].includes(status)) {
    return children;
  }
  return loader;
}
function InlineSVG(props) {
  if (!cacheStore) {
    cacheStore = new CacheStore();
  }
  const { loader } = props;
  const [isReady, setReady] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(cacheStore.isReady);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isReady) {
      return;
    }
    cacheStore.onReady(() => {
      setReady(true);
    });
  }, [isReady]);
  if (!isReady) {
    return loader;
  }
  return /* @__PURE__ */ react__WEBPACK_IMPORTED_MODULE_0__.createElement(ReactInlineSVG, { ...props });
}

//# sourceMappingURL=index.mjs.map

/***/ }),

/***/ "./resources/blocks-icon/archive-header.svg":
/*!**************************************************!*\
  !*** ./resources/blocks-icon/archive-header.svg ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "icons/archive-header.svg";

/***/ }),

/***/ "./resources/blocks-icon/directorist-logo.svg":
/*!****************************************************!*\
  !*** ./resources/blocks-icon/directorist-logo.svg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "icons/directorist-logo.svg";

/***/ }),

/***/ "./resources/blocks/listings-archive-header/block.json":
/*!*************************************************************!*\
  !*** ./resources/blocks/listings-archive-header/block.json ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"directorist-gutenberg/listings-archive-header","version":"0.1.0","title":"Listings Archive Header","category":"directorist-listings-archive","attributes":{"directory_type_id":{"type":"number","default":0},"template_id":{"type":"number","default":0},"show_listings_count":{"type":"number","default":1},"listings_count_text":{"type":"string","default":"Items Found"},"view_type":{"type":"array","default":["grid","list","map"]},"enable_sorting":{"type":"number","default":1},"sort_by_label":{"type":"string","default":"Sort by"},"sort_by":{"type":"array","default":["a_z","z_a","latest","oldest","popular","price_low_high","price_high_low","random"]},"block_width":{"type":"string","default":"100"},"is_preview":{"type":"boolean","default":false},"drop_shadow":{"type":"string","default":""}},"description":"Listings archive header block","example":{},"supports":{"html":false,"color":{"background":true,"gradients":true},"spacing":{"margin":true,"padding":true},"__experimentalBorder":{"color":true,"radius":true,"style":true,"width":true}},"textdomain":"directorist-gutenberg","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js"}');

/***/ }),

/***/ "./resources/blocks/listings-archive-header/controls.js":
/*!**************************************************************!*\
  !*** ./resources/blocks/listings-archive-header/controls.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StylesControls: () => (/* binding */ StylesControls),
/* harmony export */   "default": () => (/* binding */ Controls)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _directorist_gutenberg_gutenberg_hooks_useArchiveBlockCommonTask__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @directorist-gutenberg/gutenberg/hooks/useArchiveBlockCommonTask */ "./resources/js/gutenberg/hooks/useArchiveBlockCommonTask.js");
/* harmony import */ var _directorist_gutenberg_gutenberg_components_controls_shadow_control__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @directorist-gutenberg/gutenberg/components/controls/shadow-control */ "./resources/js/gutenberg/components/controls/shadow-control.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);
/**
 * WordPress dependencies
 */






// View Type mappings
const VIEW_TYPE_MAP = {
  grid: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Grid', 'directorist-gutenberg'),
  list: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('List', 'directorist-gutenberg'),
  map: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Map', 'directorist-gutenberg')
};
const VIEW_TYPE_VALUES = Object.keys(VIEW_TYPE_MAP);
const VIEW_TYPE_SUGGESTIONS = Object.values(VIEW_TYPE_MAP);

// Sort By mappings
const SORT_BY_MAP = {
  a_z: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('A to Z (title)', 'directorist-gutenberg'),
  z_a: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Z to A (title)', 'directorist-gutenberg'),
  latest: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Latest Listings', 'directorist-gutenberg'),
  oldest: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Oldest Listings', 'directorist-gutenberg'),
  popular: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Popular Listings', 'directorist-gutenberg'),
  price_low_high: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Price: Low to High', 'directorist-gutenberg'),
  price_high_low: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Price: High to Low', 'directorist-gutenberg'),
  random: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Random Listings', 'directorist-gutenberg')
};
const SORT_BY_VALUES = Object.keys(SORT_BY_MAP);
const SORT_BY_SUGGESTIONS = Object.values(SORT_BY_MAP);

// Reverse maps for onChange handlers (label to value)
const VIEW_TYPE_LABEL_TO_VALUE = Object.fromEntries(Object.entries(VIEW_TYPE_MAP).map(([key, value]) => [value, key]));
const SORT_BY_LABEL_TO_VALUE = Object.fromEntries(Object.entries(SORT_BY_MAP).map(([key, value]) => [value, key]));

// Helper function to convert values to labels
const valuesToLabels = (values, valueToLabelMap) => {
  return (values || []).map(value => valueToLabelMap[value] || value);
};

// Helper function to convert tokens to values
const tokensToValues = (tokens, labelToValueMap, validValues) => {
  return tokens.map(token => {
    // Handle label (translated)
    if (labelToValueMap[token]) {
      return labelToValueMap[token];
    }
    // Handle value (already a valid value)
    if (validValues.includes(token)) {
      return token;
    }
    return null;
  }).filter(value => value !== null);
};
/**
 * Internal dependencies
 */



function Controls({
  attributes,
  setAttributes
}) {
  (0,_directorist_gutenberg_gutenberg_hooks_useArchiveBlockCommonTask__WEBPACK_IMPORTED_MODULE_5__["default"])({
    setAttributes
  });

  // Inside your component
  const templateID = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    return select('core/editor').getCurrentPostId();
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useEffect)(() => {
    setAttributes({
      template_id: templateID
    });
  }, [templateID]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Listings Archive Header Settings', 'directorist-gutenberg'),
      initialOpen: true,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Listings Count', 'directorist-gutenberg'),
        checked: attributes.show_listings_count === 1,
        onChange: value => setAttributes({
          show_listings_count: value ? 1 : 0
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Listings Count Text', 'directorist-gutenberg'),
        value: attributes.listings_count_text,
        onChange: value => setAttributes({
          listings_count_text: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FormTokenField, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('View Type', 'directorist-gutenberg'),
        value: valuesToLabels(attributes.view_type, VIEW_TYPE_MAP),
        suggestions: VIEW_TYPE_SUGGESTIONS,
        onChange: tokens => {
          setAttributes({
            view_type: tokensToValues(tokens, VIEW_TYPE_LABEL_TO_VALUE, VIEW_TYPE_VALUES)
          });
        },
        __experimentalExpandOnFocus: true
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Enable Sorting', 'directorist-gutenberg'),
        checked: attributes.enable_sorting === 1,
        onChange: value => setAttributes({
          enable_sorting: value ? 1 : 0
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sort By Label', 'directorist-gutenberg'),
        value: attributes.sort_by_label,
        onChange: value => setAttributes({
          sort_by_label: value
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FormTokenField, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Sort By', 'directorist-gutenberg'),
        value: valuesToLabels(attributes.sort_by, SORT_BY_MAP),
        suggestions: SORT_BY_SUGGESTIONS,
        onChange: tokens => {
          setAttributes({
            sort_by: tokensToValues(tokens, SORT_BY_LABEL_TO_VALUE, SORT_BY_VALUES)
          });
        },
        __experimentalExpandOnFocus: true
      })]
    })
  });
}
function StylesControls({
  attributes,
  setAttributes
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
    group: "styles",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_directorist_gutenberg_gutenberg_components_controls_shadow_control__WEBPACK_IMPORTED_MODULE_6__["default"], {
      attributes: attributes,
      setAttributes: setAttributes,
      attrName: "drop_shadow",
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Drop Shadow', 'directorist-gutenberg'),
      initialOpen: false
    })
  });
}

/***/ }),

/***/ "./resources/blocks/listings-archive-header/edit.js":
/*!**********************************************************!*\
  !*** ./resources/blocks/listings-archive-header/edit.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./resources/blocks/listings-archive-header/editor.scss");
/* harmony import */ var _directorist_gutenberg_gutenberg_localized_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @directorist-gutenberg/gutenberg/localized-data */ "./resources/js/gutenberg/localized-data.js");
/* harmony import */ var _directorist_gutenberg_gutenberg_hooks_useBlocksPreview__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @directorist-gutenberg/gutenberg/hooks/useBlocksPreview */ "./resources/js/gutenberg/hooks/useBlocksPreview.js");
/* harmony import */ var _directorist_gutenberg_gutenberg_components_block_preview__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @directorist-gutenberg/gutenberg/components/block-preview */ "./resources/js/gutenberg/components/block-preview.js");
/* harmony import */ var _image_blocks_preview_archive_header_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @image/blocks-preview/archive-header.png */ "./resources/images/blocks-preview/archive-header.png");
/* harmony import */ var _directorist_gutenberg_gutenberg_components_skeleton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @directorist-gutenberg/gutenberg/components/skeleton */ "./resources/js/gutenberg/components/skeleton.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */







function Edit({
  attributes,
  setAttributes
}) {
  // Show block preview image
  if (attributes.is_preview) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_directorist_gutenberg_gutenberg_components_block_preview__WEBPACK_IMPORTED_MODULE_5__["default"], {
      image: _image_blocks_preview_archive_header_png__WEBPACK_IMPORTED_MODULE_6__
    });
  }
  const directoryId = (0,_directorist_gutenberg_gutenberg_localized_data__WEBPACK_IMPORTED_MODULE_3__.getLocalizedBlockDataByKey)('directory_type_id', 0);
  const {
    template,
    isLoading,
    refreshTemplate
  } = (0,_directorist_gutenberg_gutenberg_hooks_useBlocksPreview__WEBPACK_IMPORTED_MODULE_4__["default"])({
    directoryId,
    blockType: 'listings-archive/header',
    blockAttributes: attributes
  });
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    refreshTemplate(attributes);
  }, [attributes.show_listings_count, attributes.listings_count_text, attributes.view_type, attributes.enable_sorting, attributes.sort_by_label]);
  if (isLoading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      style: {
        pointerEvents: 'none',
        padding: '20px'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_directorist_gutenberg_gutenberg_components_skeleton__WEBPACK_IMPORTED_MODULE_7__["default"], {
        variant: "card",
        count: 3,
        width: "100%"
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
    style: {
      pointerEvents: 'none'
    },
    dangerouslySetInnerHTML: {
      __html: template
    }
  });
}

/***/ }),

/***/ "./resources/blocks/listings-archive-header/editor.scss":
/*!**************************************************************!*\
  !*** ./resources/blocks/listings-archive-header/editor.scss ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/blocks/listings-archive-header/index.js":
/*!***********************************************************!*\
  !*** ./resources/blocks/listings-archive-header/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _directorist_gutenberg_gutenberg_register_block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @directorist-gutenberg/gutenberg/register-block */ "./resources/js/gutenberg/register-block.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./resources/blocks/listings-archive-header/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./resources/blocks/listings-archive-header/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./resources/blocks/listings-archive-header/block.json");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controls */ "./resources/blocks/listings-archive-header/controls.js");
/* harmony import */ var _block_icon_archive_header_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @block-icon/archive-header.svg */ "./resources/blocks-icon/archive-header.svg");
/* harmony import */ var react_inlinesvg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-inlinesvg */ "./node_modules/.pnpm/react-inlinesvg@4.2.0_react@18.3.1/node_modules/react-inlinesvg/dist/index.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);
/**
 * Internal dependencies
 */







/**
 * External dependencies
 */


const exampleAttributes = {
  is_preview: true
};
(0,_directorist_gutenberg_gutenberg_register_block__WEBPACK_IMPORTED_MODULE_0__["default"])({
  metadata: _block_json__WEBPACK_IMPORTED_MODULE_3__,
  Edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  Controls: _controls__WEBPACK_IMPORTED_MODULE_4__["default"],
  StylesControls: _controls__WEBPACK_IMPORTED_MODULE_4__.StylesControls,
  exampleAttributes,
  templateTypes: ['listings-archive'],
  showWidthControls: false,
  icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_inlinesvg__WEBPACK_IMPORTED_MODULE_6__["default"], {
    src: _block_icon_archive_header_svg__WEBPACK_IMPORTED_MODULE_5__
  })
});

/***/ }),

/***/ "./resources/blocks/listings-archive-header/style.scss":
/*!*************************************************************!*\
  !*** ./resources/blocks/listings-archive-header/style.scss ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/images/blocks-preview/archive-header.png":
/*!************************************************************!*\
  !*** ./resources/images/blocks-preview/archive-header.png ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/archive-header.png";

/***/ }),

/***/ "./resources/js/gutenberg/block.js":
/*!*****************************************!*\
  !*** ./resources/js/gutenberg/block.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Block)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! clsx */ "./node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * WordPress dependencies
 */



/**
 * Set custom class names to the block
 *
 * @param {string|string[]|undefined} classNames - Class names as string, array, or undefined
 * @returns {string} Custom class names string
 */

const setCustomClassNames = classNames => {
  if (!classNames) {
    return '';
  }
  return Array.isArray(classNames) ? classNames.filter(Boolean).join(' ') : classNames;
};

/**
 * Block wrapper component that centralizes useBlockProps
 *
 * @param {Object} props - Component props
 * @param {Function} props.Edit - The Edit component to wrap
 * @param {Object} props.attributes - Block attributes
 * @param {Function} props.setAttributes - Function to set block attributes
 * @param {string|string[]} props.classNames - Additional custom class names to add
 * @param {string} props.name - Block name
 * @param {Object} props.rest - Additional props to pass to Edit component
 */
function Block({
  Edit,
  attributes,
  setAttributes,
  Controls,
  StylesControls,
  classNames = '',
  name,
  ...rest
}) {
  const customClasses = setCustomClassNames(classNames);

  // For thumbnail block, don't use useBlockProps on outer wrapper (Edit component handles it)
  const isThumbnailBlock = name === 'directorist-gutenberg/listing-card-thumbnail';
  if (isThumbnailBlock) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: `directorist-gutenberg-listing-card-block ${customClasses} directorist-gutenberg-block-width-${Math.trunc(attributes.block_width)}`,
      children: [Controls && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Controls, {
        attributes: attributes,
        setAttributes: setAttributes
      }), StylesControls && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StylesControls, {
        attributes: attributes,
        setAttributes: setAttributes
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Edit, {
        attributes: attributes,
        setAttributes: setAttributes,
        name: name,
        ...rest
      })]
    });
  }

  // Block props with textAlign support
  const {
    textAlign
  } = attributes || {};

  // Apply drop shadow to parent for listings-archive-header block
  const isArchiveHeaderBlock = name === 'directorist-gutenberg/listings-archive-header';
  const shadowStyle = isArchiveHeaderBlock && attributes.drop_shadow ? {
    boxShadow: attributes.drop_shadow
  } : {};
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)({
    className: (0,clsx__WEBPACK_IMPORTED_MODULE_1__["default"])('directorist-gutenberg-listing-card-block', customClasses, `directorist-gutenberg-block-width-${Math.trunc(attributes.block_width || 100)}`, {
      [`has-text-align-${textAlign}`]: textAlign
    }),
    style: shadowStyle
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    ...blockProps,
    children: [Controls && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Controls, {
      attributes: attributes,
      setAttributes: setAttributes
    }), StylesControls && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(StylesControls, {
      attributes: attributes,
      setAttributes: setAttributes
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Edit, {
      attributes: attributes,
      setAttributes: setAttributes,
      name: name,
      ...rest
    })]
  });
}

/***/ }),

/***/ "./resources/js/gutenberg/components/block-preview.js":
/*!************************************************************!*\
  !*** ./resources/js/gutenberg/components/block-preview.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BlockPreview)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function BlockPreview({
  image
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "directorist-gutenberg-block-preview",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
      src: image,
      style: {
        height: 'auto',
        width: '100%',
        textAlign: 'center'
      }
    })
  });
}

/***/ }),

/***/ "./resources/js/gutenberg/components/controls/color-picker-control.js":
/*!****************************************************************************!*\
  !*** ./resources/js/gutenberg/components/controls/color-picker-control.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ColorPickerControl),
/* harmony export */   getColorString: () => (/* binding */ getColorString)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


/**
 * Convert color value to string format
 *
 * @param {Object} colorValue - Color value from ColorPicker
 * @returns {string} Color string (rgba or hex)
 */

const getColorString = colorValue => {
  return colorValue.rgb ? `rgba(${colorValue.rgb.r}, ${colorValue.rgb.g}, ${colorValue.rgb.b}, ${colorValue.rgb.a})` : colorValue.hex || '';
};

/**
 * Color Picker Control Component
 *
 * @param {Object} props - Component props
 * @param {string} props.label - Label for the color picker
 * @param {string} props.color - Current color value
 * @param {string} props.defaultColor - Default color if none is set
 * @param {Function} props.onChange - Callback when color changes
 * @param {boolean} props.isOpen - Whether the picker is open
 * @param {Function} props.onToggle - Toggle function for picker open state
 */
function ColorPickerControl({
  label,
  color,
  defaultColor,
  onChange,
  isOpen,
  onToggle
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "directorist-gutenberg-color-picker-container",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("label", {
      className: "directorist-gutenberg-color-picker-label",
      children: label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "directorist-gutenberg-color-picker-wrapper",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
        onClick: onToggle,
        style: {
          backgroundColor: color || defaultColor
        }
      }), isOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Popover, {
        onClose: onToggle,
        placement: "left-start",
        offset: 20,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.ColorPicker, {
          color: color || defaultColor,
          onChangeComplete: colorValue => {
            onChange(getColorString(colorValue));
          },
          enableAlpha: true
        })
      })]
    })]
  });
}

/***/ }),

/***/ "./resources/js/gutenberg/components/controls/shadow-control.js":
/*!**********************************************************************!*\
  !*** ./resources/js/gutenberg/components/controls/shadow-control.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ShadowControl)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _color_picker_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./color-picker-control */ "./resources/js/gutenberg/components/controls/color-picker-control.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */


/**
 * Parse drop shadow string to extract values
 * Format: "offset-x offset-y blur spread color"
 * Example: "10px 12px 15px 17px rgba(188, 2, 2, 0.3)"
 */

function parseDropShadow(shadowString) {
  if (!shadowString || typeof shadowString !== 'string') {
    return {
      x: 0,
      y: 0,
      blur: 0,
      spread: 0,
      color: 'rgba(0, 0, 0, 0.3)'
    };
  }

  // Remove trailing semicolon if present
  const cleaned = shadowString.trim().replace(/;\s*$/, '');
  const parts = cleaned.split(/\s+/);

  // Extract numeric values (remove 'px' unit)
  const x = parseInt(parts[0]?.replace('px', '') || '0', 10);
  const y = parseInt(parts[1]?.replace('px', '') || '0', 10);
  const blur = parseInt(parts[2]?.replace('px', '') || '0', 10);
  const spread = parseInt(parts[3]?.replace('px', '') || '0', 10);

  // Color is everything after the 4th space-separated part
  const color = parts.slice(4).join(' ').replace(/;\s*$/, '') || 'rgba(0, 0, 0, 0.3)';
  return {
    x,
    y,
    blur,
    spread,
    color
  };
}

/**
 * Reconstruct drop shadow string from values
 */
function buildDropShadow({
  x,
  y,
  blur,
  spread,
  color
}) {
  return `${x}px ${y}px ${blur}px ${spread}px ${color}`;
}

/**
 * Shadow Control Component
 *
 * @param {Object} props - Component props
 * @param {Object} props.attributes - Block attributes
 * @param {Function} props.setAttributes - Function to update attributes
 * @param {string} props.attrName - Attribute name for drop_shadow (default: 'drop_shadow')
 * @param {string} props.label - Label for the panel
 * @param {boolean} props.initialOpen - Whether panel should be open initially
 */
function ShadowControl({
  attributes,
  setAttributes,
  attrName = 'drop_shadow',
  label = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Custom Drop Shadow', 'directorist-gutenberg'),
  initialOpen = false
}) {
  const dropShadow = attributes[attrName] || '';
  const [isColorPickerOpen, setIsColorPickerOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);

  // Parse the drop shadow string
  const shadowValues = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    return parseDropShadow(dropShadow);
  }, [dropShadow]);

  // Update a specific shadow property
  const updateShadow = (property, value) => {
    const updated = {
      ...shadowValues,
      [property]: value
    };
    const newShadowString = buildDropShadow(updated);
    setAttributes({
      [attrName]: newShadowString
    });
  };

  // Reset shadow to default values
  const resetShadow = () => {
    setAttributes({
      [attrName]: ''
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: label,
    initialOpen: initialOpen,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_color_picker_control__WEBPACK_IMPORTED_MODULE_3__["default"], {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Shadow Color', 'directorist-gutenberg'),
      color: shadowValues.color,
      onChange: color => updateShadow('color', color),
      isOpen: isColorPickerOpen,
      onToggle: () => setIsColorPickerOpen(!isColorPickerOpen)
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Horizontal Offset (X)', 'directorist-gutenberg'),
      value: shadowValues.x,
      onChange: value => updateShadow('x', value || 0),
      min: -100,
      max: 100
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Vertical Offset (Y)', 'directorist-gutenberg'),
      value: shadowValues.y,
      onChange: value => updateShadow('y', value || 0),
      min: -100,
      max: 100
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Blur Radius', 'directorist-gutenberg'),
      value: shadowValues.blur,
      onChange: value => updateShadow('blur', value || 0),
      min: 0,
      max: 100
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Spread Radius', 'directorist-gutenberg'),
      value: shadowValues.spread,
      onChange: value => updateShadow('spread', value || 0),
      min: -100,
      max: 100
    }), dropShadow && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      variant: "secondary",
      size: "small",
      onClick: resetShadow,
      style: {
        marginTop: '12px'
      },
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Reset Shadow', 'directorist-gutenberg')
    })]
  });
}

/***/ }),

/***/ "./resources/js/gutenberg/components/skeleton.js":
/*!*******************************************************!*\
  !*** ./resources/js/gutenberg/components/skeleton.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SkeletonCard: () => (/* binding */ SkeletonCard),
/* harmony export */   SkeletonList: () => (/* binding */ SkeletonList),
/* harmony export */   SkeletonText: () => (/* binding */ SkeletonText),
/* harmony export */   "default": () => (/* binding */ Skeleton)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * WordPress dependencies
 */


/**
 * Skeleton Loading Component
 *
 * A reusable animated skeleton loading component that provides a placeholder
 * while waiting for content to load.
 *
 * Use Cases:
 * - When a resource needs long time to load
 * - When the component contains lots of information, such as List or Card
 * - Only works when loading data for the first time
 * - Could be replaced by Spin in any situation, but can provide a better user experience
 *
 * Usage Examples:
 *
 * // Basic text skeleton
 * <Skeleton variant="text" width="100%" />
 *
 * // Circular avatar skeleton
 * <Skeleton variant="circular" width={40} height={40} />
 *
 * // Rectangular image skeleton
 * <Skeleton variant="rectangular" width="100%" height={200} />
 *
 * // Multiple card skeletons
 * <Skeleton variant="card" count={3} width="100%" />
 *
 * // Custom lines layout
 * <Skeleton
 *   lines={[
 *     { width: '100%', height: '16px' },
 *     { width: '80%', height: '16px' },
 *     { width: '60%', height: '16px' }
 *   ]}
 * />
 *
 * // Using convenience components
 * import { SkeletonText, SkeletonCard, SkeletonList } from '@directorist-gutenberg/gutenberg/components/skeleton';
 * <SkeletonText lines={4} />
 * <SkeletonCard />
 * <SkeletonList items={5} />
 *
 * @param {Object} props - Component props
 * @param {string} props.variant - Variant type: 'text', 'circular', 'rectangular', 'card', 'list'
 * @param {number|string} props.width - Width of the skeleton (e.g., '100%', 200, '50px')
 * @param {number|string} props.height - Height of the skeleton (e.g., '100%', 20, '40px')
 * @param {number} props.count - Number of skeleton items to render (for list/card variants)
 * @param {boolean} props.animated - Whether to show animation (default: true)
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 * @param {Array} props.lines - Array of line configurations for custom layouts
 *
 * @returns {JSX.Element} Skeleton component
 */

function Skeleton({
  variant = 'text',
  width,
  height,
  count = 1,
  animated = true,
  className = '',
  style = {},
  lines = []
}) {
  const baseClassName = 'directorist-gutenberg-skeleton';
  const variantClassName = `${baseClassName}--${variant}`;
  const animationClassName = animated ? `${baseClassName}--animated` : '';
  const combinedClassName = [baseClassName, variantClassName, animationClassName, className].filter(Boolean).join(' ');

  // Custom inline styles
  const customStyle = {
    ...(width && {
      width: typeof width === 'number' ? `${width}px` : width
    }),
    ...(height && {
      height: typeof height === 'number' ? `${height}px` : height
    }),
    ...style
  };

  // Render multiple items for list/card variants
  if ((variant === 'list' || variant === 'card') && count > 1) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: `${baseClassName}-container`,
      children: Array.from({
        length: count
      }).map((_, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Skeleton, {
        variant: variant,
        width: width,
        height: height,
        animated: animated,
        className: className,
        style: style
      }, index))
    });
  }

  // Custom lines layout
  if (lines.length > 0) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      className: combinedClassName,
      style: customStyle,
      children: lines.map((line, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: `${baseClassName}__line`,
        style: {
          width: line.width || '100%',
          height: line.height || '12px',
          marginBottom: line.marginBottom || '8px'
        }
      }, index))
    });
  }

  // Single skeleton item
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: combinedClassName,
    style: customStyle,
    "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loading content', 'directorist-gutenberg'),
    role: "status"
  });
}

/**
 * Skeleton Text Component
 * Convenience component for text skeleton
 */
function SkeletonText({
  lines = 3,
  ...props
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Skeleton, {
    variant: "text",
    lines: Array.from({
      length: lines
    }).map((_, index) => ({
      width: index === lines - 1 ? '60%' : '100%',
      height: '12px',
      marginBottom: '8px'
    })),
    ...props
  });
}

/**
 * Skeleton Card Component
 * Convenience component for card skeleton
 */
function SkeletonCard({
  ...props
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
    className: "directorist-gutenberg-skeleton-card",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Skeleton, {
      variant: "rectangular",
      width: "100%",
      height: 200,
      ...props
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      style: {
        padding: '16px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Skeleton, {
        variant: "text",
        width: "80%",
        height: 20,
        style: {
          marginBottom: '12px'
        },
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Skeleton, {
        variant: "text",
        width: "100%",
        height: 16,
        style: {
          marginBottom: '8px'
        },
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Skeleton, {
        variant: "text",
        width: "60%",
        height: 16,
        ...props
      })]
    })]
  });
}

/**
 * Skeleton List Component
 * Convenience component for list skeleton
 */
function SkeletonList({
  items = 5,
  ...props
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    className: "directorist-gutenberg-skeleton-list",
    children: Array.from({
      length: items
    }).map((_, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "directorist-gutenberg-skeleton-list__item",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Skeleton, {
        variant: "circular",
        width: 40,
        height: 40,
        style: {
          marginRight: '12px'
        },
        ...props
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        style: {
          flex: 1
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Skeleton, {
          variant: "text",
          width: "80%",
          height: 16,
          style: {
            marginBottom: '8px'
          },
          ...props
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Skeleton, {
          variant: "text",
          width: "60%",
          height: 14,
          ...props
        })]
      })]
    }, index))
  });
}

/***/ }),

/***/ "./resources/js/gutenberg/hooks/useArchiveBlockCommonTask.js":
/*!*******************************************************************!*\
  !*** ./resources/js/gutenberg/hooks/useArchiveBlockCommonTask.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useArchiveBlockCommonTask)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useTemplateMeta__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./useTemplateMeta */ "./resources/js/gutenberg/hooks/useTemplateMeta.js");
/**
 * WordPress dependencies
 */


/**
 * Internal dependencies
 */

function useArchiveBlockCommonTask({
  setAttributes
}) {
  const {
    directory_type_id
  } = (0,_useTemplateMeta__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setAttributes({
      directory_type_id: directory_type_id
    });
  }, [directory_type_id]);
}

/***/ }),

/***/ "./resources/js/gutenberg/hooks/useBlocksPreview.js":
/*!**********************************************************!*\
  !*** ./resources/js/gutenberg/hooks/useBlocksPreview.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useBlocksPreview)
/* harmony export */ });
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/url */ "@wordpress/url");
/* harmony import */ var _wordpress_url__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_url__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);



function useBlocksPreview({
  directoryId,
  blockType,
  blockAttributes = {}
}) {
  const [args, setArgs] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(blockAttributes);
  const [appliedArgs, setAppliedArgs] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
  const [template, setTemplate] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)('');
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (appliedArgs && JSON.stringify(args) === JSON.stringify(appliedArgs)) {
      return;
    }
    fetchTemplate();
  }, [args]);
  function refreshTemplate(newBlockAttributes = {}) {
    setArgs(newBlockAttributes);
  }
  function fetchTemplate() {
    if (isLoading) {
      return;
    }
    const url = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)(`/directorist-gutenberg/blocks-preview/${blockType}`, {
      directory_id: directoryId,
      ...args
    });
    setIsLoading(true);
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: url
    }).then(response => {
      setTemplate(response.template);
      setIsLoading(false);
      setAppliedArgs(args);
    }).catch(error => {
      console.error('error', error);
      setIsLoading(false);
    });
  }
  function fetchTemplate() {
    const url = (0,_wordpress_url__WEBPACK_IMPORTED_MODULE_1__.addQueryArgs)(`/directorist-gutenberg/blocks-preview/${blockType}`, {
      directory_id: directoryId,
      ...args
    });
    setIsLoading(true);
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({
      path: url
    }).then(response => {
      setTemplate(response.template);
      setIsLoading(false);
      setAppliedArgs(args);
    }).catch(error => {
      console.error('error', error);
      setIsLoading(false);
    });
  }
  return {
    template,
    isLoading,
    refreshTemplate
  };
}

/***/ }),

/***/ "./resources/js/gutenberg/hooks/useTemplateMeta.js":
/*!*********************************************************!*\
  !*** ./resources/js/gutenberg/hooks/useTemplateMeta.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useTemplateMeta)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);

function useTemplateMeta() {
  return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    const meta = select('core/editor').getEditedPostAttribute('meta') || {};
    return {
      directory_type_id: meta.directory_type_id || 0,
      template_type: meta.template_type || ''
    };
  }, []);
}

/***/ }),

/***/ "./resources/js/gutenberg/localized-data.js":
/*!**************************************************!*\
  !*** ./resources/js/gutenberg/localized-data.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getLocalizedBlockData: () => (/* binding */ getLocalizedBlockData),
/* harmony export */   getLocalizedBlockDataByKey: () => (/* binding */ getLocalizedBlockDataByKey),
/* harmony export */   getSubmissionFormFields: () => (/* binding */ getSubmissionFormFields)
/* harmony export */ });
const getLocalizedBlockData = () => {
  return window.directorist_gutenberg_block_data || {};
};
const getLocalizedBlockDataByKey = (key, defaultValue = null) => {
  const data = getLocalizedBlockData();
  return data[key] !== undefined ? data[key] : defaultValue;
};
const getSubmissionFormFields = () => {
  const data = getLocalizedBlockData();
  if (data && data.submission_form_fields && data.submission_form_fields.fields) {
    return data.submission_form_fields.fields;
  }
  return {};
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  getLocalizedBlockData,
  getLocalizedBlockDataByKey,
  getSubmissionFormFields
});

/***/ }),

/***/ "./resources/js/gutenberg/register-block.js":
/*!**************************************************!*\
  !*** ./resources/js/gutenberg/register-block.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ registerBlock)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_inlinesvg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-inlinesvg */ "./node_modules/.pnpm/react-inlinesvg@4.2.0_react@18.3.1/node_modules/react-inlinesvg/dist/index.mjs");
/* harmony import */ var _block_icon_directorist_logo_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @block-icon/directorist-logo.svg */ "./resources/blocks-icon/directorist-logo.svg");
/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block */ "./resources/js/gutenberg/block.js");
/* harmony import */ var _localized_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./localized-data */ "./resources/js/gutenberg/localized-data.js");
/* harmony import */ var _width_control__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./width-control */ "./resources/js/gutenberg/width-control.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * WordPress dependencies
 */


/**
 * External dependencies
 */


/**
 * Internal dependencies
 */





function registerBlock({
  metadata,
  Edit,
  Controls,
  StylesControls,
  icon = '',
  exampleAttributes = {},
  props = {},
  templateTypes = false,
  classNames = '',
  showWidthControls = true
}) {
  if ('directorist_gbt' !== typenow) {
    return;
  }
  if (templateTypes) {
    const template_type = (0,_localized_data__WEBPACK_IMPORTED_MODULE_4__.getLocalizedBlockDataByKey)('template_type');
    if (!templateTypes.includes(template_type)) {
      return;
    }
  }
  if (!icon) {
    // Ensure directoristLogo is a valid URL string for ReactSVG
    // webpack asset/resource returns a URL string, but sometimes it's wrapped
    const logoUrl = typeof _block_icon_directorist_logo_svg__WEBPACK_IMPORTED_MODULE_2__ === 'string' ? _block_icon_directorist_logo_svg__WEBPACK_IMPORTED_MODULE_2__ : _block_icon_directorist_logo_svg__WEBPACK_IMPORTED_MODULE_2__?.default || _block_icon_directorist_logo_svg__WEBPACK_IMPORTED_MODULE_2__;
    if (logoUrl) {
      icon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_inlinesvg__WEBPACK_IMPORTED_MODULE_1__["default"], {
        src: logoUrl
      });
    } else {
      // Fallback to a dashicon if SVG fails to load
      icon = 'star-filled';
    }
  }

  // Wrap Edit component with Block wrapper that handles useBlockProps
  const WrappedEdit = editProps => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [showWidthControls && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_width_control__WEBPACK_IMPORTED_MODULE_5__["default"], {
      attributes: editProps.attributes,
      setAttributes: editProps.setAttributes
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_block__WEBPACK_IMPORTED_MODULE_3__["default"], {
      Edit: Edit,
      Controls: Controls,
      StylesControls: StylesControls,
      classNames: classNames,
      ...editProps
    })]
  });
  (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(metadata.name, {
    icon,
    example: {
      attributes: exampleAttributes
    },
    edit: WrappedEdit,
    ...props
  });
}

/***/ }),

/***/ "./resources/js/gutenberg/width-control.js":
/*!*************************************************!*\
  !*** ./resources/js/gutenberg/width-control.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WidthControls)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * WordPress dependencies
 */




/**
 * External dependencies
 */


const widthOptions = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('100%', 'directorist-gutenberg'),
  value: '100'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('75%', 'directorist-gutenberg'),
  value: '75'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('67%', 'directorist-gutenberg'),
  value: '67'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('50%', 'directorist-gutenberg'),
  value: '50'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('33%', 'directorist-gutenberg'),
  value: '33.33'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('25%', 'directorist-gutenberg'),
  value: '25'
}];
function WidthControls({
  attributes,
  setAttributes
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.BlockControls, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToolbarGroup, {
      className: "directorist-gutenberg-toolbar",
      children: widthOptions.map(({
        label,
        value
      }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToolbarButton, {
        variant: "secondary",
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])({
          'is-selected': attributes.block_width === value
        }),
        onClick: () => setAttributes({
          block_width: value
        }),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
          children: label
        })
      }, value))
    })
  });
}

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/url":
/*!*****************************!*\
  !*** external ["wp","url"] ***!
  \*****************************/
/***/ ((module) => {

module.exports = window["wp"]["url"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"listings-archive-header/index": 0,
/******/ 			"listings-archive-header/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkwpmvc"] = globalThis["webpackChunkwpmvc"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["listings-archive-header/style-index"], () => (__webpack_require__("./resources/blocks/listings-archive-header/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map