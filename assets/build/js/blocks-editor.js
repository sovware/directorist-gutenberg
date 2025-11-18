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

/***/ "./resources/js/block-sripts/settings.js":
/*!***********************************************!*\
  !*** ./resources/js/block-sripts/settings.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/editor */ "@wordpress/editor");
/* harmony import */ var _wordpress_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








const TemplateSettingsPanel = () => {
  const [directoryTypes, setDirectoryTypes] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)([]);
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useState)(true);
  const {
    directoryTypeId,
    templateType
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    const meta = select('core/editor').getEditedPostAttribute('meta') || {};
    return {
      directoryTypeId: meta.directory_type_id || 0,
      templateType: meta.template_type || ''
    };
  }, []);
  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useDispatch)('core/editor');

  // Update iframe body class based on template_type
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    const updateIframeBodyClass = () => {
      // Find the editor iframe - try multiple selectors
      const iframeSelectors = ['iframe[name="editor-canvas"]', 'iframe.editor-canvas__iframe', '.block-editor-iframe__container iframe', 'iframe.block-editor-iframe__container'];
      let iframe = null;
      for (const selector of iframeSelectors) {
        iframe = document.querySelector(selector);
        if (iframe) break;
      }
      if (!iframe) {
        return false;
      }
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc || !iframeDoc.body) {
        return false;
      }
      const iframeBody = iframeDoc.body;

      // Remove all existing directorist-gutenberg-* classes
      const classesToRemove = Array.from(iframeBody.classList).filter(className => className.startsWith('directorist-gutenberg-'));
      classesToRemove.forEach(className => {
        iframeBody.classList.remove(className);
      });

      // Add the new class if templateType exists
      if (templateType) {
        // Sanitize the template type to match PHP's sanitize_html_class behavior
        const sanitizedType = templateType.toLowerCase().replace(/[^a-z0-9-]/g, '-');
        const className = 'directorist-gutenberg-' + sanitizedType;
        iframeBody.classList.add(className);
      }
      return true;
    };

    // Try to update immediately
    if (updateIframeBodyClass()) {
      return; // Success, no need to set up observers
    }

    // If iframe not found, set up observers and retries
    let retryCount = 0;
    const maxRetries = 50; // Try for ~5 seconds (50 * 100ms)

    const tryUpdate = () => {
      if (updateIframeBodyClass()) {
        return; // Success
      }
      retryCount++;
      if (retryCount < maxRetries) {
        setTimeout(tryUpdate, 100);
      }
    };

    // Start trying
    const timeoutId = setTimeout(tryUpdate, 100);

    // Also watch for iframe addition to DOM
    const observer = new MutationObserver(() => {
      if (updateIframeBodyClass()) {
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Listen for iframe load events
    const handleIframeLoad = event => {
      const iframe = event.target;
      if (iframe.tagName === 'IFRAME') {
        setTimeout(() => {
          updateIframeBodyClass();
        }, 50);
      }
    };
    document.addEventListener('load', handleIframeLoad, true);
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      document.removeEventListener('load', handleIframeLoad, true);
    };
  }, [templateType]);

  // Define template type options
  const templateTypeOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Select Template Type', 'directorist-gutenberg'),
    value: ''
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Archive', 'directorist-gutenberg'),
    value: 'listings-archive'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Archive - Grid View', 'directorist-gutenberg'),
    value: 'listings-archive-grid-view'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Archive - List View', 'directorist-gutenberg'),
    value: 'listings-archive-list-view'
  }];

  // Fetch directory types from the taxonomy
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_5__.useEffect)(() => {
    setIsLoading(true);

    // Fetch all directory types (per_page=-1 gets all results)
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_6___default()({
      path: '/wp/v2/atbdp_listing_types?per_page=-1&orderby=name&order=asc'
    }).then(terms => {
      const options = [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Select Directory Type', 'directorist-gutenberg'),
        value: 0
      }, ...terms.map(term => ({
        label: term.name,
        value: term.id
      }))];
      setDirectoryTypes(options);
      setIsLoading(false);
    }).catch(error => {
      console.error('Error fetching directory types:', error);
      setDirectoryTypes([{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Error loading directory types', 'directorist-gutenberg'),
        value: 0
      }]);
      setIsLoading(false);
    });
  }, []);
  const handleDirectoryTypeChange = value => {
    editPost({
      meta: {
        directory_type_id: parseInt(value, 10)
      }
    });
  };
  const handleTemplateTypeChange = value => {
    editPost({
      meta: {
        template_type: value
      }
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(_wordpress_editor__WEBPACK_IMPORTED_MODULE_1__.PluginDocumentSettingPanel, {
    name: "template-settings-panel",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Template Settings', 'directorist-gutenberg'),
    className: "template-settings-panel",
    children: [isLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Directory Type', 'directorist-gutenberg'),
      value: directoryTypeId,
      options: directoryTypes,
      onChange: handleDirectoryTypeChange,
      disabled: directoryTypeId ? true : false
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      style: {
        marginTop: '16px'
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Template Type', 'directorist-gutenberg'),
      value: templateType,
      options: templateTypeOptions,
      onChange: handleTemplateTypeChange
    })]
  });
};
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('directorist-gutenberg-template-settings', {
  render: TemplateSettingsPanel
});

/***/ }),

/***/ "./resources/js/block-sripts/toggle-views.js":
/*!***************************************************!*\
  !*** ./resources/js/block-sripts/toggle-views.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _gutenberg_components_EditorToggleViews__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gutenberg/components/EditorToggleViews */ "./resources/js/gutenberg/components/EditorToggleViews.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * WordPress dependencies
 */



/**
 * Internal dependencies
 */


_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_0___default()(() => {
  const findAndInject = () => {
    // Try multiple selectors for the header settings
    let headerSettings = document.querySelector('.editor-header__settings') || document.querySelector('.edit-post-header__settings') || document.querySelector('.interface-complementary-area-header__actions') || document.querySelector('[class*="header"][class*="settings"]');
    if (!headerSettings) {
      // Retry after a short delay
      setTimeout(findAndInject, 500);
      return;
    }

    // Check if already injected
    if (document.getElementById('directorist-toggle-views-container')) {
      return;
    }

    // Create the React app container div
    let reactAppElement = document.createElement('div');
    reactAppElement.id = 'directorist-toggle-views-container';

    // Insert the button as the first element in the header settings
    headerSettings.insertBefore(reactAppElement, headerSettings.firstChild);

    // Render the React app inside the new div
    if (_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot) {
      const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createRoot)(reactAppElement);
      root.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_gutenberg_components_EditorToggleViews__WEBPACK_IMPORTED_MODULE_2__["default"], {}));
    } else {
      render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_gutenberg_components_EditorToggleViews__WEBPACK_IMPORTED_MODULE_2__["default"], {}), reactAppElement);
    }
  };

  // Start trying to find the element
  setTimeout(findAndInject, 100);
});

/***/ }),

/***/ "./resources/js/gutenberg/components/EditorToggleViews.js":
/*!****************************************************************!*\
  !*** ./resources/js/gutenberg/components/EditorToggleViews.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToggleViewsDropdown)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_inlinesvg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-inlinesvg */ "./node_modules/.pnpm/react-inlinesvg@4.2.0_react@18.3.1/node_modules/react-inlinesvg/dist/index.mjs");
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! clsx */ "./node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs");
/* harmony import */ var _directorist_gutenberg_gutenberg_localized_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @directorist-gutenberg/gutenberg/localized-data */ "./resources/js/gutenberg/localized-data.js");
/* harmony import */ var _icon_chevron_down_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @icon/chevron-down.svg */ "./resources/svg/icons/chevron-down.svg");
/* harmony import */ var _icon_check_solid_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @icon/check-solid.svg */ "./resources/svg/icons/check-solid.svg");
/* harmony import */ var _icon_grid_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @icon/grid.svg */ "./resources/svg/icons/grid.svg");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
/**
 * WordPress dependencies
 */



/**
 * External dependencies
 */



/**
 * Internal dependencies
 */





function ToggleViewsDropdown() {
  const templateLinks = (0,_directorist_gutenberg_gutenberg_localized_data__WEBPACK_IMPORTED_MODULE_4__.getLocalizedBlockDataByKey)('template_links') || [];

  // Find the current template
  const currentTemplate = templateLinks.find(template => template.is_current === true);
  const currentViewTitle = currentTemplate ? currentTemplate.title : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('View', 'directorist-gutenberg');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Dropdown, {
    className: "directorist-gutenberg-toggle-views-dropdown",
    contentClassName: "directorist-gutenberg-toggle-views-dropdown-content",
    popoverProps: {
      placement: 'bottom-end'
    },
    renderToggle: ({
      isOpen,
      onToggle
    }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
      variant: "tertiary",
      onClick: onToggle,
      "aria-expanded": isOpen,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_inlinesvg__WEBPACK_IMPORTED_MODULE_2__["default"], {
        src: _icon_grid_svg__WEBPACK_IMPORTED_MODULE_7__
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Edit %s', 'directorist-gutenberg'), currentViewTitle)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_inlinesvg__WEBPACK_IMPORTED_MODULE_2__["default"], {
        src: _icon_chevron_down_svg__WEBPACK_IMPORTED_MODULE_5__
      })]
    }),
    renderContent: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      children: templateLinks.map(template => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("a", {
        href: template.url,
        className: (0,clsx__WEBPACK_IMPORTED_MODULE_3__["default"])('directorist-gutenberg-toggle-views-dropdown-item', {
          'directorist-gutenberg-toggle-views-dropdown-item-current': template.is_current
        }),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
          children: template.title
        }), template.is_current && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_inlinesvg__WEBPACK_IMPORTED_MODULE_2__["default"], {
          src: _icon_check_solid_svg__WEBPACK_IMPORTED_MODULE_6__
        })]
      }, template.id))
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

/***/ "./resources/js/gutenberg/extend-native-blocks.js":
/*!********************************************************!*\
  !*** ./resources/js/gutenberg/extend-native-blocks.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _directorist_gutenberg_gutenberg_components_controls_shadow_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @directorist-gutenberg/gutenberg/components/controls/shadow-control */ "./resources/js/gutenberg/components/controls/shadow-control.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * WordPress dependencies
 */




/**
 * Internal dependencies
 */


/**
 * List of native blocks to extend with shadow control
 */

const BLOCKS_TO_EXTEND = ['core/group', 'core/column', 'core/columns', 'core/row', 'core/stack', 'core/grid'];

/**
 * Default shadow value (no shadow)
 */
const DEFAULT_SHADOW = '0px 0px 0px 0px rgba(0, 0, 0, 0)';

/**
 * Check if shadow value is meaningful (not default/no shadow)
 */
const isMeaningfulShadow = shadowValue => {
  if (!shadowValue || shadowValue === DEFAULT_SHADOW) {
    return false;
  }
  // Check if all offset/blur/spread values are 0
  const shadowRegex = /^(\d+px|0)\s+(\d+px|0)\s+(\d+px|0)\s+(\d+px|0)/;
  const match = shadowValue.match(shadowRegex);
  if (match) {
    const [, x, y, blur, spread] = match;
    // If all values are 0 or 0px, it's not meaningful
    if ((x === '0' || x === '0px') && (y === '0' || y === '0px') && (blur === '0' || blur === '0px') && (spread === '0' || spread === '0px')) {
      return false;
    }
  }
  return true;
};

/**
 * Add drop_shadow attribute to block settings
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.registerBlockType', 'directorist-gutenberg/add-drop-shadow-attribute', (settings, name) => {
  // Only add attribute to specified blocks
  if (!BLOCKS_TO_EXTEND.includes(name)) {
    return settings;
  }
  return {
    ...settings,
    attributes: {
      ...settings.attributes,
      drop_shadow: {
        type: 'string',
        default: DEFAULT_SHADOW
      }
    }
  };
});

/**
 * Add shadow control to InspectorControls
 */
const withShadowControl = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(BlockEdit => props => {
  const {
    name,
    attributes,
    setAttributes
  } = props;

  // Only add control to specified blocks
  if (!BLOCKS_TO_EXTEND.includes(name)) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
      ...props
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockEdit, {
      ...props
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InspectorControls, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_directorist_gutenberg_gutenberg_components_controls_shadow_control__WEBPACK_IMPORTED_MODULE_3__["default"], {
        attributes: attributes,
        setAttributes: setAttributes,
        attrName: "drop_shadow",
        label: "Custom Drop Shadow",
        initialOpen: false
      })
    })]
  });
}, 'withShadowControl');
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('editor.BlockEdit', 'directorist-gutenberg/add-shadow-control', withShadowControl);

/**
 * Apply shadow styles to block wrapper
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('blocks.getSaveContent.extraProps', 'directorist-gutenberg/apply-shadow-styles', (props, blockType, attributes) => {
  // Only apply to specified blocks
  if (!BLOCKS_TO_EXTEND.includes(blockType.name)) {
    return props;
  }

  // Apply shadow style only if drop_shadow is meaningful (not default/no shadow)
  if (attributes.drop_shadow && isMeaningfulShadow(attributes.drop_shadow)) {
    const existingStyle = props.style || {};
    return {
      ...props,
      style: {
        ...existingStyle,
        boxShadow: attributes.drop_shadow
      }
    };
  }
  return props;
});

/**
 * Apply shadow styles in editor (for edit view)
 * This modifies the block wrapper to include shadow styles
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_0__.addFilter)('editor.BlockListBlock', 'directorist-gutenberg/apply-shadow-styles-editor', BlockListBlock => props => {
  const {
    name,
    attributes
  } = props;

  // Only apply to specified blocks and if shadow is meaningful
  if (!BLOCKS_TO_EXTEND.includes(name) || !attributes.drop_shadow || !isMeaningfulShadow(attributes.drop_shadow)) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockListBlock, {
      ...props
    });
  }

  // Get wrapper props and add shadow style
  const wrapperProps = props.wrapperProps || {};
  const existingStyle = wrapperProps.style || {};
  const newWrapperProps = {
    ...wrapperProps,
    style: {
      ...existingStyle,
      boxShadow: attributes.drop_shadow
    }
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockListBlock, {
    ...props,
    wrapperProps: newWrapperProps
  });
});

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

/***/ "./resources/svg/icons/check-solid.svg":
/*!*********************************************!*\
  !*** ./resources/svg/icons/check-solid.svg ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "icons/check-solid.svg";

/***/ }),

/***/ "./resources/svg/icons/chevron-down.svg":
/*!**********************************************!*\
  !*** ./resources/svg/icons/chevron-down.svg ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "icons/chevron-down.svg";

/***/ }),

/***/ "./resources/svg/icons/grid.svg":
/*!**************************************!*\
  !*** ./resources/svg/icons/grid.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "icons/grid.svg";

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

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/editor":
/*!********************************!*\
  !*** external ["wp","editor"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["editor"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["plugins"];

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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************************!*\
  !*** ./resources/js/block-sripts/editor.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./resources/js/block-sripts/settings.js");
/* harmony import */ var _toggle_views__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toggle-views */ "./resources/js/block-sripts/toggle-views.js");
/* harmony import */ var _directorist_gutenberg_gutenberg_extend_native_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @directorist-gutenberg/gutenberg/extend-native-blocks */ "./resources/js/gutenberg/extend-native-blocks.js");



})();

/******/ })()
;
//# sourceMappingURL=blocks-editor.js.map