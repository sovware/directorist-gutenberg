/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

  // Define template type options
  const templateTypeOptions = [{
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Select Template Type', 'directorist-gutenberg'),
    value: ''
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Listings Archive', 'directorist-gutenberg'),
    value: 'listings-archive'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Listings Archive - Grid View Item', 'directorist-gutenberg'),
    value: 'listings-archive-grid-view'
  }, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Listings Archive - List View Item', 'directorist-gutenberg'),
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
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * WordPress dependencies
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
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: label,
    initialOpen: initialOpen,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      style: {
        marginBottom: '16px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("label", {
        style: {
          display: 'block',
          marginBottom: '8px',
          fontWeight: 500
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Shadow Color', 'directorist-gutenberg')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        style: {
          position: 'relative',
          display: 'inline-block',
          width: '100%'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          onClick: () => setIsColorPickerOpen(!isColorPickerOpen),
          style: {
            width: '100%',
            height: '30px',
            backgroundColor: shadowValues.color,
            border: '1px solid #ccc',
            borderRadius: '3px',
            cursor: 'pointer'
          }
        }), isColorPickerOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Popover, {
          onClose: () => setIsColorPickerOpen(false),
          placement: "left-start",
          offset: 20,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorPicker, {
            color: shadowValues.color,
            onChangeComplete: colorValue => {
              const colorString = colorValue.rgb ? `rgba(${colorValue.rgb.r}, ${colorValue.rgb.g}, ${colorValue.rgb.b}, ${colorValue.rgb.a})` : colorValue.hex || shadowValues.color;
              updateShadow('color', colorString);
            },
            enableAlpha: true
          })
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Horizontal Offset (X)', 'directorist-gutenberg'),
      value: shadowValues.x,
      onChange: value => updateShadow('x', value || 0),
      min: -100,
      max: 100
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Vertical Offset (Y)', 'directorist-gutenberg'),
      value: shadowValues.y,
      onChange: value => updateShadow('y', value || 0),
      min: -100,
      max: 100
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Blur Radius', 'directorist-gutenberg'),
      value: shadowValues.blur,
      onChange: value => updateShadow('blur', value || 0),
      min: 0,
      max: 100
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.RangeControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Spread Radius', 'directorist-gutenberg'),
      value: shadowValues.spread,
      onChange: value => updateShadow('spread', value || 0),
      min: -100,
      max: 100
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************************!*\
  !*** ./resources/js/block-sripts/editor.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ "./resources/js/block-sripts/settings.js");
/* harmony import */ var _directorist_gutenberg_gutenberg_extend_native_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @directorist-gutenberg/gutenberg/extend-native-blocks */ "./resources/js/gutenberg/extend-native-blocks.js");


})();

/******/ })()
;
//# sourceMappingURL=blocks-editor.js.map