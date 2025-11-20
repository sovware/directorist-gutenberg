import * as __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__ from "@wordpress/interactivity";
/******/ var __webpack_modules__ = ({

/***/ "./resources/js/fields/listing-card-favorite.js":
/*!******************************************************!*\
  !*** ./resources/js/fields/listing-card-favorite.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/interactivity */ "@wordpress/interactivity");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./resources/js/fields/utils.js");
/**
 * WordPress Interactivity API
 */


/**
 * Internal dependencies
 */


// Constants
const TOOLTIP_HIDE_DELAY = 3000;
const AJAX_ACTION = 'atbdp-favourites-all-listing';

// Helper function to hide tooltip after delay
const hideTooltipAfterDelay = ctx => {
  setTimeout(() => {
    ctx.showTooltip = false;
    ctx.tooltipMessage = '';
  }, TOOLTIP_HIDE_DELAY);
};

// Helper function to show tooltip
const showTooltip = (ctx, message) => {
  ctx.showTooltip = true;
  ctx.tooltipMessage = message;
  hideTooltipAfterDelay(ctx);
};

// Helper function to hide tooltip
const hideTooltip = ctx => {
  ctx.showTooltip = false;
  ctx.tooltipMessage = '';
};
(0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)('directorist/favorite-button', {
  state: {
    get isFavorite() {
      return (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)().isFavorite === true;
    },
    get isNotFavorite() {
      return (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)().isFavorite !== true;
    },
    get tooltipMessage() {
      return (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)().tooltipMessage || '';
    },
    get showTooltip() {
      return (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)().showTooltip === true;
    }
  },
  actions: {
    toggleFavorite: async ({
      event,
      context
    }) => {
      const ctx = context || (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const directorist = window.directorist || {};

      // Handle keyboard events - only allow Enter and Space
      if (event?.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') {
        return;
      }

      // Prevent default action
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      // Hide previous tooltips
      hideTooltip(ctx);

      // Validate required data
      if (!directorist.ajax_url || !directorist.directorist_nonce) {
        console.error('Directorist AJAX configuration missing');
        return;
      }

      // Prepare AJAX request data
      const requestData = {
        action: AJAX_ACTION,
        directorist_nonce: directorist.directorist_nonce,
        post_id: ctx.listingId
      };
      try {
        const result = await (0,_utils__WEBPACK_IMPORTED_MODULE_1__.ajaxFetch)(directorist.ajax_url, requestData);

        // Handle response
        if (result === 'login_required') {
          showTooltip(ctx, directorist.i18n_text?.please_login || 'Please login');
        } else if (result === 'false') {
          ctx.isFavorite = false;
          hideTooltip(ctx);
        } else {
          // Success - listing was added to favorites
          ctx.isFavorite = true;
          showTooltip(ctx, directorist.i18n_text?.added_favourite || 'Added to favorites');
        }
      } catch (error) {
        console.error('Error toggling favorite:', error);
        hideTooltip(ctx);
      }
    }
  }
});

/***/ }),

/***/ "./resources/js/fields/utils.js":
/*!**************************************!*\
  !*** ./resources/js/fields/utils.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ajaxFetch: () => (/* binding */ ajaxFetch)
/* harmony export */ });
/**
 * AJAX fetch utility for admin-ajax.php calls
 * @template T
 * @param {string} url - The AJAX URL (typically admin-ajax.php)
 * @param {Object} data - The data to send as form-encoded parameters
 * @return {Promise<T>} A promise that resolves with the response text
 */
async function ajaxFetch(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(data)
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.text();
}

/***/ }),

/***/ "./resources/js/gutenberg/instantSearch.js":
/*!*************************************************!*\
  !*** ./resources/js/gutenberg/instantSearch.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/debounce */ "./resources/js/utils/debounce.js");
/* harmony import */ var _utils_category_custom_fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @utils/category-custom-fields */ "./resources/js/utils/category-custom-fields.js");


jQuery(document).ready(function ($) {
  /**
  	Global Variables
  */

  // Globally accessible form_data
  let form_data = {};

  // Scrolling Pagination
  let scrollingPage = 1;
  let infinitePaginationIsLoading = false;
  let infinitePaginationCompleted = false;

  /**
  	Main Functions
  */

  // Perform Instant Search
  function performInstantSearch(searchElement) {
    // Get archive container - works for both old and new structure
    const archiveContainer = getArchiveContainer();

    // Instant Search Data
    const instant_search_data = prepareInstantSearchData(searchElement);
    $.ajax({
      url: directorist.ajaxurl,
      type: 'POST',
      data: instant_search_data,
      beforeSend: function () {
        // Disable buttons in advanced filter form
        $('.directorist-advanced-filter__form .directorist-btn-sm').attr('disabled', true);

        // Add fade class to archive items
        $('.directorist-archive-items, .directorist-gutenberg-listings-archive-contents').addClass('atbdp-form-fade');

        // Hide advanced filter
        $('.directorist-header-bar .directorist-advanced-filter').removeClass('directorist-advanced-filter--show').hide();

        // Scroll to archive if it exists
        if (archiveContainer.length && archiveContainer.offset()?.top > 0) {
          $(document).scrollTop(archiveContainer.offset().top);
        }
        closeAllSearchModal();
      },
      success: function (html) {
        if (html.search_result) {
          // Remove existing header titles
          $('.directorist-header-found-title, .dsa-save-search-container').remove();
          if (html.header_title) {
            $('.directorist-listings-header__left').append(html.header_title);
            $('.directorist-header-found-title span').text(html.count);
          }

          // Replace archive items
          $('.directorist-archive-items, .directorist-gutenberg-listings-archive-contents').replaceWith(html.search_result).removeClass('atbdp-form-fade');

          // Re-enable buttons
          $('.directorist-advanced-filter__form .directorist-btn-sm').attr('disabled', false);
          window.dispatchEvent(new CustomEvent('directorist-instant-search-reloaded'));
          window.dispatchEvent(new CustomEvent('directorist-reload-listings-map-archive'));

          // Optional: Update meta title
          let new_meta_title = '';
          if (html.category_name) new_meta_title += html.category_name;
          if (html.location_name) new_meta_title += (new_meta_title ? ' within ' : '') + html.location_name;
          if (form_data.address) new_meta_title += (form_data.in_cat || form_data.in_loc ? ' near ' : '') + form_data.address;
          document.title = new_meta_title ? `${new_meta_title} | ${directorist.site_name}` : directorist.site_name;
        }

        // Initialize scrolling status
        scrollingPage = 1;
        infinitePaginationCompleted = false;
      }
    });
  }

  // Perform Instant Search for directory type change
  function onDirectoryChange(searchElement) {
    // Get archive container
    const archiveContainer = getArchiveContainer();

    // Instant Search Data
    const instant_search_data = prepareInstantSearchData(searchElement);
    $.ajax({
      url: directorist.ajaxurl,
      type: 'POST',
      data: instant_search_data,
      beforeSend: function () {
        archiveContainer.addClass('atbdp-form-fade');
      },
      success: function (html) {
        if (html.directory_type) {
          // Replace the entire container if it exists
          if (archiveContainer.length) {
            archiveContainer.replaceWith(html.directory_type);
          }
          $('.atbdp-form-fade').removeClass('atbdp-form-fade');
          window.dispatchEvent(new CustomEvent('directorist-instant-search-reloaded'));
          window.dispatchEvent(new CustomEvent('directorist-reload-listings-map-archive'));

          // SearchForm Item in Single Category Location Page Init
          singleCategoryLocationInit();

          // Category Custom Field Assigned Init
          (0,_utils_category_custom_fields__WEBPACK_IMPORTED_MODULE_1__["default"])($);
        }

        // Initialize scrolling status
        scrollingPage = 1;
        infinitePaginationCompleted = false;
      }
    });
  }

  // AJAX call to load more listings
  function loadMoreListings(searchElement) {
    let loadingDiv;
    const container = $('.directorist-infinite-scroll .directorist-container-fluid .directorist-row');

    // Instant Search Data
    const preparedData = prepareInstantSearchData(searchElement);

    // make ajax data
    const instant_search_data = {
      ...preparedData,
      paged: scrollingPage
    };
    $.ajax({
      url: directorist.ajaxurl,
      type: 'POST',
      data: instant_search_data,
      beforeSend: function () {
        loadingDiv = $('<div>', {
          class: 'directorist-on-scroll-loading'
        }).append($('<div>', {
          class: 'directorist-spinner'
        }), $('<span>').text(directorist.loading_more_text));
        container.append(loadingDiv);
      },
      success: function (html) {
        if (loadingDiv) loadingDiv.remove();
        if (html.count > 0) {
          container.append(html.render_listings);
        } else {
          infinitePaginationCompleted = true;
        }
        triggerCustomEvents();
      },
      complete: function () {
        infinitePaginationIsLoading = false;
        if (loadingDiv) loadingDiv.remove();
      }
    });
  }

  /**
     	Helper Functions
   	**/

  // Find related Gutenberg block by searching for blocks with data-atts
  function findRelatedBlock(selector) {
    // Try to find in document - works for both old and new structure
    const block = $(selector).first();
    if (block.length) {
      return block;
    }
    // Fallback: search all blocks with data-atts
    return $('[data-atts]').first();
  }

  // Get the archive container (listings block) - works for both structures
  function getArchiveContainer() {
    // New structure: wp-block-directorist-gutenberg-listings-archive
    let container = $('.wp-block-directorist-gutenberg-listings-archive').first();
    if (!container.length) {
      // Fallback: find any archive container with data-atts
      container = $('.directorist-archive-items, .directorist-gutenberg-listings-archive-contents').closest('[data-atts]').first();
    }
    if (!container.length) {
      // Final fallback: find archive items container
      container = $('.directorist-archive-items').closest('[data-atts]').first();
    }
    return container;
  }

  // Get data-atts from any related block
  function getDataAtts(element) {
    // Try to find data-atts in the element or its closest block
    let $el = $(element);
    let atts = $el.data('atts') || $el.closest('[data-atts]').data('atts');

    // If still not found, try finding any related block
    if (!atts) {
      const relatedBlock = findRelatedBlock('[data-atts]');
      atts = relatedBlock.data('atts');
    }
    return atts;
  }

  // Prepare Instant Search Data
  function prepareInstantSearchData(searchElm) {
    // Get data-atts from the element or related blocks
    const instant_search_atts = getDataAtts(searchElm);

    // Make ajax data - ensure form_data is properly included
    const instant_search_data = {
      ...form_data,
      action: 'directorist_instant_search',
      _nonce: directorist.ajax_nonce,
      current_page_id: directorist.current_page_id,
      data_atts: instant_search_atts
    };

    // Debug: log the query being sent
    if (instant_search_data.q !== undefined) {
      console.log('Search query being sent:', instant_search_data.q);
    }
    return instant_search_data;
  }

  // Update or retain existing keys in form_data
  function updateFormData(newData) {
    Object.entries(newData).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '' || Array.isArray(value) && value.length === 0 || typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0) {
        delete form_data[key];
      } else {
        form_data[key] = value;
      }
    });
  }

  // Reset form_data
  function resetFormData() {
    Object.entries(form_data).forEach(([key, value]) => {
      delete form_data[key];
    });
  }

  // Update search URL with form data
  function update_instant_search_url(form_data) {
    if (!history.pushState) return;
    let newurl = window.location.protocol + '//' + window.location.host + window.location.pathname;
    let query = '';
    const appendQuery = (key, value) => {
      if (value !== undefined && value !== null && value !== '' && (!Array.isArray(value) || value.length)) {
        if (Array.isArray(value) && value.length) {
          query += (query.length ? '&' : '?') + `${key}=${value}`;
        } else {
          query += (query.length ? '&' : '?') + `${key}=${encodeURIComponent(value)}`;
        }
      }
    };

    // These keys will be ignored
    // and will not be appended to the URL
    // when updating the URL
    const ignoreKeys = ['data_atts', 'custom_field', 'current_page_id', 'action', '_nonce'];

    // Handle all form_data keys dynamically
    Object.entries(form_data).forEach(([key, value]) => {
      if (ignoreKeys.includes(key)) return;

      // Handle default page
      if (key === 'paged' && Number(value) === 1) {
        return; // ❌ Skip default page 1
      }

      // Handle price & address fields specifically
      if (key === 'price' && Array.isArray(value)) {
        appendQuery('price[0]', value[0] > 0 ? value[0] : '');
        appendQuery('price[1]', value[1] > 0 ? value[1] : '');
      } else if ((key === 'cityLat' || key === 'cityLng') && !form_data.address) {
        return; // ❌ Skip lat/lng if no address
      } else {
        appendQuery(key, value);
      }
    });

    // Handle custom_field
    if (form_data.custom_field && typeof form_data.custom_field === 'object') {
      Object.entries(form_data.custom_field).forEach(([key, val]) => {
        // Skip if value is "0-0" (empty range slider)
        if (val === '0-0') {
          return;
        }

        // Skip empty values
        if (!val || typeof val === 'string' && val.trim() === '') {
          return;
        }

        // Handle multiple values (arrays or comma-separated strings)
        const values = Array.isArray(val) ? val : typeof val === 'string' && val.includes(',') ? val.split(',') : [val];
        values.forEach(singleVal => {
          const formattedKey = key.startsWith('custom-checkbox') ? `custom_field%5B${key}%5D%5B%5D` : `custom_field%5B${key}%5D`;
          appendQuery(formattedKey, singleVal);
        });
      });
    }
    const finalUrl = query ? newurl + query : newurl;
    window.history.pushState({
      path: finalUrl
    }, '', finalUrl);
  }

  // Check required fields are valid or not
  // Checks across all related forms (basic search + advanced filter)
  function checkRequiredFields(searchElm) {
    // Find all related forms - search in basic and advanced search forms
    const basicForm = $('.directorist-basic-search').first();
    const advancedForm = $('.directorist-advanced-search').first();

    // Combine all forms if they exist, otherwise use the passed searchElm
    const allForms = [];
    if (basicForm.length) allForms.push(basicForm);
    if (advancedForm.length) allForms.push(advancedForm);
    const searchScope = allForms.length > 0 ? $(allForms) : searchElm;

    // Select all required inputs and selects inside searchScope
    const requiredInputs = searchScope.find('input[required], select[required], textarea[required]');
    let requiredFieldsAreValid = true;
    requiredInputs.each(function () {
      const $el = $(this);
      const tagName = $el.prop('tagName').toLowerCase();
      const type = $el.attr('type');
      if (tagName === 'input') {
        if (type === 'checkbox' || type === 'radio') {
          // For checkboxes/radios, at least one with this name must be checked
          const name = $el.attr('name');
          const checked = searchScope.find(`input[name="${name}"]:checked`).length > 0;
          if (!checked) {
            requiredFieldsAreValid = false;
            return false; // break .each loop early
          }
        } else {
          // For other input types, value must not be empty
          if (!$el.val()) {
            requiredFieldsAreValid = false;
            return false;
          }
        }
      } else if (tagName === 'select' || tagName === 'textarea') {
        // Select or textarea must have a value
        if (!$el.val()) {
          requiredFieldsAreValid = false;
          return false;
        }
      }
    });
    return requiredFieldsAreValid;
  }

  //  Build form_data from searchElm inputs.
  // Collects from all related forms (basic search + advanced filter)
  function buildFormData(searchElm) {
    // Find all related forms - search in basic and advanced search forms
    // Always search in both forms to collect all data
    const basicForm = $('.directorist-basic-search').first();
    const advancedForm = $('.directorist-advanced-search').first();

    // Collect from the form that triggered the event first, then check other forms
    // This ensures we get the most up-to-date value from the triggering form
    let searchScope = searchElm;

    // If we have multiple forms, combine them for comprehensive data collection
    if (basicForm.length && advancedForm.length) {
      // Combine both forms
      searchScope = basicForm.add(advancedForm);
    } else if (basicForm.length) {
      searchScope = basicForm;
    } else if (advancedForm.length) {
      searchScope = advancedForm;
    }
    let tag = [];
    let price = [];
    let custom_field = {};
    let search_by_rating = [];

    // Collect selected tags
    searchScope.find('input[name^="in_tag["]:checked').each((_, el) => {
      tag.push($(el).val());
    });

    // Collect selected ratings
    searchScope.find('input[name^="search_by_rating["]:checked').each((_, el) => {
      search_by_rating.push($(el).val());
    });

    // Collect price values
    searchScope.find('input[name^="price["]').each((_, el) => {
      price.push($(el).val());
    });

    // Check if **any** price is greater than 0
    const hasValidPrice = price.some(val => val > 0);
    if (!hasValidPrice) {
      price = []; // Reset price if no valid price found
    }

    // Collect custom field values
    searchScope.find('[name^="custom_field"]').each(function (_, el) {
      const $el = $(el);
      const name = $el.attr('name');
      const type = $el.attr('type');
      const match = name.match(/^custom_field\[(.+?)\]/);
      const post_id = match ? match[1] : '';
      if (!post_id) return;
      if (type === 'radio') {
        const checked = searchScope.find(`input[name="custom_field[${post_id}]"]:checked`).val();
        if (checked) custom_field[post_id] = checked;
      } else if (type === 'checkbox') {
        const values = [];
        searchScope.find(`input[name="custom_field[${post_id}][]"]:checked`).each(function () {
          const val = $(this).val();
          if (val) values.push(val);
        });
        if (values.length) custom_field[post_id] = values;
      } else {
        const value = $el.val();
        if (value && value !== '0-0') custom_field[post_id] = value;
      }
    });

    // Collect custom range slider min/max values
    let range_slider_values = {};
    searchScope.find('.directorist-custom-range-slider__text.directorist-custom-range-slider__value__min').each(function () {
      const minVal = $(this).val();
      if (minVal && minVal !== '0') {
        range_slider_values['directorist-custom-range-slider__value__min'] = minVal;
      }
    });
    searchScope.find('.directorist-custom-range-slider__text.directorist-custom-range-slider__value__max').each(function () {
      const maxVal = $(this).val();
      if (maxVal && maxVal !== '0') {
        range_slider_values['directorist-custom-range-slider__value__max'] = maxVal;
      }
    });

    // Collect basic form values - search across all forms
    // For query, prioritize getting from the triggering form, then search all forms
    let q = searchElm.find('input[name="q"]').val();
    // jQuery .val() returns empty string if input is empty, so check for empty string
    if (!q || q === '') {
      q = basicForm.find('input[name="q"]').val();
    }
    if (!q || q === '') {
      q = searchScope.find('input[name="q"]').val();
    }
    // Normalize empty string to undefined so it gets deleted from form_data
    if (!q || q === '') {
      q = undefined;
    }
    const in_cat = searchScope.find('.directorist-category-select').val();
    const in_loc = searchScope.find('.directorist-location-select').val();
    const price_range = searchScope.find("input[name='price_range']:checked").val();
    const address = searchScope.find('input[name="address"]').val();
    const zip = searchScope.find('input[name="zip"]').val();
    const fax = searchScope.find('input[name="fax"]').val();
    const email = searchScope.find('input[name="email"]').val();
    const website = searchScope.find('input[name="website"]').val();
    const phone = searchScope.find('input[name="phone"]').val();
    const phone2 = searchScope.find('input[name="phone2"]').val();
    const view = form_data.view;
    const paged = form_data.paged;

    // Get directory type - look in all forms to ensure it's found regardless of form
    const directory_type = searchScope.find('input[name="directory_type"]').val() || $('input[name="directory_type"]').first().val();

    // Update form_data
    updateFormData({
      q,
      in_cat,
      in_loc,
      in_tag: tag,
      price,
      price_range,
      search_by_rating,
      address,
      zip,
      fax,
      email,
      website,
      phone,
      phone2,
      custom_field,
      view,
      paged,
      directory_type,
      ...range_slider_values
    });

    // open_now checkbox
    const open_now_val = searchScope.find('input[name="open_now"]').is(':checked') ? searchScope.find('input[name="open_now"]').val() : undefined;
    updateFormData({
      open_now: open_now_val
    });
    const radius_search_based_on = searchScope.find('.directorist-radius_search_based_on').val();

    // Check if the address or zip code is present to update miles, lat, and lng
    if (radius_search_based_on === 'address' && address) {
      updateFormData({
        cityLat: searchScope.find('#cityLat').val(),
        cityLng: searchScope.find('#cityLng').val(),
        miles: searchScope.find('input[name="miles"]').val()
      });
    } else if (radius_search_based_on === 'zip' && zip) {
      updateFormData({
        zip_cityLat: searchScope.find('.zip-cityLat').val(),
        zip_cityLng: searchScope.find('.zip-cityLng').val(),
        miles: searchScope.find('input[name="miles"]').val()
      });
    } else {
      updateFormData({
        cityLat: undefined,
        cityLng: undefined,
        zip_cityLat: undefined,
        zip_cityLng: undefined,
        miles: undefined
      });
    }

    // Paging: get current page number, default 1 if not found
    let page = parseInt(form_data.paged, 10) || 1;
    updateFormData({
      paged: page > 1 ? page : undefined
    });

    // Update URL with form data
    update_instant_search_url(form_data);
  }

  // Build form data without required value
  function buildFormDataWithoutRequired() {
    const notRequiredFields = ['view', 'sort', 'paged'];
    Object.entries(form_data).forEach(([key, value]) => {
      if (!notRequiredFields.includes(key)) {
        delete form_data[key];
      }
    });

    // Update URL with form data
    update_instant_search_url(form_data);
  }

  // Perform Instant Search with required value
  function performInstantSearchWithRequiredValue(searchElm) {
    // Build form data
    buildFormData(searchElm);

    // Check required fields
    const allRequiredFieldsAreValid = checkRequiredFields(searchElm);

    // If required fields are valid, proceed with filtering
    if (allRequiredFieldsAreValid) {
      performInstantSearch(searchElm);
    }
  }

  // Perform Instant Search without required value
  function performInstantSearchWithoutRequiredValue(searchElm) {
    // Check required fields
    const allRequiredFieldsAreValid = checkRequiredFields(searchElm);

    // If required fields are valid, proceed with filtering
    if (allRequiredFieldsAreValid) {
      // Build form data
      buildFormData(searchElm);
      performInstantSearch(searchElm);
    } else {
      // Build form data without required value
      buildFormDataWithoutRequired();

      // Filter Listing
      performInstantSearch(searchElm);
    }
  }

  // Handle Infinite Scroll
  function handleScroll() {
    const container = $('.directorist-infinite-scroll .directorist-container-fluid .directorist-row');
    if (!container.length || infinitePaginationIsLoading) {
      return;
    }
    const containerBottom = container.offset().top + container.outerHeight();
    const scrollBottom = window.scrollY + window.innerHeight;
    if (scrollBottom >= containerBottom) {
      infinitePaginationIsLoading = true;
      scrollingPage++;

      // get active form
      const activeForm = getActiveForm();

      // build form_data
      buildFormData(activeForm);

      // Load more listings
      loadMoreListings(activeForm);
    }
  }

  // Close all search modal
  function closeAllSearchModal() {
    var searchModalElement = document.querySelectorAll('.directorist-search-modal');
    searchModalElement.forEach(modal => {
      var modalOverlay = modal.querySelector('.directorist-search-modal__overlay');
      var modalContent = modal.querySelector('.directorist-search-modal__contents');
      var modalBodyOverlay = document.querySelector('.directorist-content-active');

      // Overlay Style
      if (modalOverlay) {
        modalOverlay.style.cssText = 'opacity: 0; visibility: hidden; transition: 0.5s ease';
        // remove overlay class on body
        modalBodyOverlay.classList.remove('directorist-overlay-active');
      }

      // Modal Content Style
      if (modalContent) {
        modalContent.style.cssText = 'opacity: 0; visibility: hidden; bottom: -200px;';
      }
    });
  }

  // Determine the active form with intelligent fallback strategy
  function getActiveForm() {
    // Find forms directly in the document
    const advancedForm = $('.directorist-advanced-search, .directorist-advanced-filter__form').first();
    const searchForm = $('.directorist-basic-search, .directorist-search-form').first();

    // Create form candidates with metadata
    const candidates = [{
      form: advancedForm,
      hasDirectoryType: advancedForm.find('input[name="directory_type"]').length > 0
    }, {
      form: searchForm,
      hasDirectoryType: searchForm.find('input[name="directory_type"]').length > 0
    }].filter(candidate => candidate.form.length > 0);

    // Smart selection: prioritize forms with directory_type, fallback to responsive behavior
    const formWithDirectoryType = candidates.find(c => c.hasDirectoryType);
    if (formWithDirectoryType) {
      return formWithDirectoryType.form;
    }

    // Fallback: use responsive selection if no directory_type found
    return screen.width > 575 ? advancedForm : searchForm;
  }

  // Get directory type
  function getDirectoryType(directoryTypeLink) {
    const typeMatch = directoryTypeLink.attr('href')?.match(/type=([^&]+)/);
    return typeMatch ? typeMatch[1] : '';
  }

  // Get view as
  function getViewAs(viewAsLink) {
    const viewMatch = viewAsLink.attr('href')?.match(/view=([^&]+)/);
    return viewMatch ? viewMatch[1] : '';
  }

  // Get sort value
  function getSortValue(sortByLink) {
    let sort_href = sortByLink.attr('data-link');
    let sort_by = sort_href && sort_href.length ? sort_href.match(/sort=.+/) : '';
    return sort_by && sort_by.length ? sort_by[0].replace(/sort=/, '') : '';
  }

  // Trigger custom events
  function triggerCustomEvents() {
    window.dispatchEvent(new Event('directorist-instant-search-reloaded'));
    window.dispatchEvent(new Event('directorist-reload-listings-map-archive'));
  }

  // Range Slider searching observer
  function initObserver() {
    // Find all range slider inputs in both old and new structures
    let targetNodes = document.querySelectorAll('.directorist-custom-range-slider__value input');
    targetNodes.forEach(targetNode => {
      let searchElm = $(targetNode.closest('form'));
      if (targetNode && searchElm.length) {
        let timeout;
        const observerCallback = (mutationList, observer) => {
          for (const mutation of mutationList) {
            if (mutation.attributeName == 'value') {
              clearTimeout(timeout);
              timeout = setTimeout(() => {
                // Instant search with required value
                performInstantSearchWithRequiredValue(searchElm);
              }, 250);
            }
          }
        };
        const observer = new MutationObserver(observerCallback);
        observer.observe(targetNode, {
          attributes: true,
          childList: true,
          subtree: true
        });
      }
    });
  }

  // Single Location Category Page Search Form Item Disable
  function singleCategoryLocationInit() {
    // Try to find data-atts in any block (old or new structure)
    const directoristArchiveContents = document.querySelector('.directorist-archive-contents, [data-atts]');
    if (!directoristArchiveContents) {
      return;
    }
    const directoristDataAttributes = directoristArchiveContents.getAttribute('data-atts');
    if (!directoristDataAttributes) {
      return;
    }
    let shortcode, location, category;
    try {
      const parsed = JSON.parse(directoristDataAttributes);
      shortcode = parsed.shortcode || parsed._current_page;
      location = parsed.location || '';
      category = parsed.category || '';
    } catch (e) {
      return;
    }
    if (shortcode === 'directorist_category' && category.trim() !== '') {
      const categorySelect = document.querySelector('.directorist-search-form .directorist-category-select');
      if (categorySelect) {
        categorySelect.closest('.directorist-search-category').classList.add('directorist-search-form__single-category');
      }
    }
    if (shortcode === 'directorist_location' && location.trim() !== '') {
      const locationSelect = document.querySelector('.directorist-search-form .directorist-location-select');
      if (locationSelect) {
        locationSelect.closest('.directorist-search-location').classList.add('directorist-search-form__single-location');
      }
    }
  }

  /**
  	Event Listeners
  */

  // sidebar on keyup searching - listen on input fields directly
  $('body').on('keyup', '.directorist-search-form input, .directorist-basic-search input, .directorist-advanced-search input', (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_0__["default"])(function (e) {
    if ($(e.target).closest('.directorist-custom-range-slider__value').length > 0 || e.key === 'Enter' && e.target.value === '') {
      return; // Skip search for this element
    }
    e.preventDefault();
    // Get the form containing this input
    var searchElm = $(this).closest('form');

    // Only proceed if we have a valid form
    if (!searchElm.length) {
      searchElm = $(this).closest('.directorist-search-form, .directorist-basic-search, .directorist-advanced-search');
    }

    // Instant search with required value
    performInstantSearchWithRequiredValue(searchElm);
  }, 250));

  // sidebar on change searching - radio/checkbox/location/range
  $('body').on('change', ".directorist-search-form input[type='checkbox'], .directorist-search-form input[type='radio'], .directorist-search-form input[type='time'], .directorist-search-form input[type='date'], .directorist-search-form .directorist-custom-range-slider__wrap .directorist-custom-range-slider__range, .directorist-search-form .directorist-search-location .location-name, .directorist-basic-search input[type='checkbox'], .directorist-basic-search input[type='radio'], .directorist-basic-search input[type='time'], .directorist-basic-search input[type='date'], .directorist-advanced-search input[type='checkbox'], .directorist-advanced-search input[type='radio'], .directorist-advanced-search input[type='time'], .directorist-advanced-search input[type='date'], .directorist-basic-search .directorist-custom-range-slider__wrap .directorist-custom-range-slider__range, .directorist-advanced-search .directorist-custom-range-slider__wrap .directorist-custom-range-slider__range, .directorist-basic-search .directorist-search-location .location-name, .directorist-advanced-search .directorist-search-location .location-name", (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_0__["default"])(function (e) {
    e.preventDefault();
    var searchElm = $(this).closest('form');

    // Instant search with required value
    performInstantSearchWithRequiredValue(searchElm);
  }, 250));

  // sidebar on change searching - zipcode/location
  $('body').on('change', '.directorist-search-form .directorist-search-location, .directorist-search-form .directorist-zipcode-search, .directorist-basic-search .directorist-search-location, .directorist-basic-search .directorist-zipcode-search, .directorist-advanced-search .directorist-search-location, .directorist-advanced-search .directorist-zipcode-search', (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_0__["default"])(function (e) {
    e.preventDefault();
    const searchElm = $(this).closest('form');

    // If it's a location field, ensure it has a value before triggering the filter
    if ($(this).hasClass('directorist-search-location')) {
      const locationField = $(this).find('input[name="address"]');
      if (!locationField.val()) {
        return;
      }
    }

    // Instant search with required value
    performInstantSearchWithRequiredValue(searchElm);
  }, 250));

  // sidebar on change searching - select
  $('body').on('change', '.directorist-search-form select, .directorist-basic-search select, .directorist-advanced-search select', (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_0__["default"])(function (e) {
    e.preventDefault();
    if (!$(this).val()) {
      return; // Skip search if the value is empty
    }
    var searchElm = $(this).closest('form');

    // Instant search with required value
    performInstantSearchWithRequiredValue(searchElm);
  }, 250));

  // sidebar on change searching - color
  window.addEventListener('directorist-color-changed', (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_0__["default"])(function (e) {
    const {
      input
    } = e.detail;
    const searchElm = $(input);
    if (!searchElm.length) return;

    // Instant search with required value
    performInstantSearchWithRequiredValue(searchElm);
  }, 250));

  // sidebar on click searching - location icon
  $('body').on('click', '.directorist-search-form .directorist-filter-location-icon, .directorist-basic-search .directorist-filter-location-icon, .directorist-advanced-search .directorist-filter-location-icon', (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_0__["default"])(function (e) {
    e.preventDefault();
    var searchElm = $(this).closest('form');

    // Instant search with required value
    performInstantSearchWithRequiredValue(searchElm);
  }, 1000));

  // Clear Input Value
  $('body').on('click', '.directorist-search-form .directorist-search-field__btn--clear, .directorist-basic-search .directorist-search-field__btn--clear, .directorist-advanced-search .directorist-search-field__btn--clear', function (e) {
    // Clear Color Field Value
    let irisPicker = $(this).closest('.directorist-search-field.directorist-color').find('input.wp-picker-clear');
    if (irisPicker !== null && irisPicker.length) {
      irisPicker.click();
    }
    let $searchField = $(this).closest('.directorist-search-field');
    var searchElm = $(this).closest('form');

    // Clear text, email, number, select fields etc
    $searchField.find('input:not([type="checkbox"]):not([type="radio"]):not(.wp-picker-clear), select').val('');

    // Clear checkboxes
    $searchField.find('input[type="checkbox"]').prop('checked', false);

    // Clear radio buttons
    $searchField.find('input[type="radio"]').prop('checked', false);

    // Proceed if form exists
    if (searchElm.length) {
      performInstantSearchWithRequiredValue(searchElm);
    }
  });

  // Directorist instant search reset
  // Note: The actual form field reset is handled by search-form-reset.js
  // This listener handles the instant search data reset and triggers the search after form reset
  window.addEventListener('directorist-form-reset-complete', function (e) {
    // Get active form
    const activeForm = getActiveForm();

    // Reset form_data - clear all search parameters
    resetFormData();

    // ✅ only update `page` to 1
    updateFormData({
      paged: 1
    });

    // Build form data and perform search after form reset
    setTimeout(function () {
      buildFormData(activeForm);
      performInstantSearch(activeForm);
    }, 150);
  });

  // Directorist instant search submit
  $('body').on('submit', '.directorist-search-form, .directorist-basic-search, .directorist-advanced-search', function (e) {
    e.preventDefault();
    let _this = $(this);

    // Instant search with required value
    performInstantSearchWithRequiredValue(_this);
  });

  // Directorist instant search submit - for advanced filter
  $('body').on('submit', '.widget .default-ad-search:not(.directorist_single) .directorist-advanced-filter__form', function (e) {
    // Check if instant search forms are available
    if ($('.directorist-search-form, .directorist-basic-search, .directorist-advanced-search').length) {
      e.preventDefault();
      let _this = $(this);

      // Instant search with required value
      performInstantSearchWithRequiredValue(_this);
    }
  });

  // Directorist type changes
  $('body').on('click', '.directorist-gutenberg-listings-archive-search-nav .directorist-type-nav__link, .directorist-type-nav__link', function (e) {
    e.preventDefault();

    // Check if the clicked item is already active
    if ($(this).closest('.directorist-type-nav__list li').hasClass('directorist-type-nav__list__current')) {
      return; // Skip if already active
    }

    // reset form data
    resetFormData();

    // Get directory_type
    const directory_type = getDirectoryType($(this));

    // ✅ only update `directory_type`, preserve others
    updateFormData({
      directory_type
    });

    // Update URL with form data
    update_instant_search_url(form_data);

    // Set the directory_type value in all inputs
    $('input[name="directory_type"]').val(directory_type);

    // Get active form
    const activeForm = getActiveForm();

    // Instant search for directory type change
    onDirectoryChange(activeForm);
  });

  // Directorist view as changes
  $('body').on('click', '.directorist-viewas .directorist-viewas__item', function (e) {
    e.preventDefault();

    // Check if the clicked item is already active
    if ($(this).hasClass('active')) {
      return; // Skip if already active
    }

    // get view as value
    const view = getViewAs($(this));
    // ✅ only update `view`, preserve others
    updateFormData({
      view
    });

    // Get active form
    const activeForm = getActiveForm();

    // Instant search without required value
    performInstantSearchWithoutRequiredValue(activeForm);
  });

  // Directorist sort by changes
  $('body').on('click', '.directorist-sortby-dropdown .directorist-dropdown__links__single-js', function (e) {
    e.preventDefault();

    // toggle active class
    $(this).addClass('active').siblings('.directorist-dropdown__links__single-js').removeClass('active');

    // get sort value
    const sort = getSortValue($(this));
    // ✅ only update `sort`, preserve others
    updateFormData({
      sort
    });

    // get active form
    const activeForm = getActiveForm();

    // Instant search without required value
    performInstantSearchWithoutRequiredValue(activeForm);
  });

  // Directorist pagination changes
  $('body').on('click', '.directorist-pagination .page-numbers', function (e) {
    e.preventDefault();
    let page = form_data.paged || 1;
    const currentPage = $(this).text();
    if (currentPage) {
      page = parseInt(currentPage);
    } else if ($(this).hasClass('next')) {
      page = parseInt(page) + 1;
    } else if ($(this).hasClass('prev')) {
      page = parseInt(page) - 1;
    }
    // ✅ only update `paged`, preserve others
    updateFormData({
      paged: page
    });

    // get active form
    const activeForm = getActiveForm();

    // Instant search without required value
    performInstantSearchWithoutRequiredValue(activeForm);
  });

  // Submit on sidebar form - fallback for non-instant search
  if ($('.directorist-search-form, .directorist-basic-search, .directorist-advanced-search').length === 0) {
    $('body').on('submit', '.directorist-basic-search, .directorist-advanced-search', function (e) {
      e.preventDefault();
      let basic_data = $('.directorist-basic-search').serialize();
      let advanced_data = $('.directorist-advanced-search').serialize();
      let action_value = $('.directorist-advanced-search').attr('action');
      let url = action_value + '?' + basic_data + '&' + advanced_data;
      window.location.href = url;
    });
  }

  // Prevent disabled links from being clicked
  $('body').on('click', '.disabled-link', function (e) {
    e.preventDefault();
  });

  // Prevent default action for dropdown links
  $('.directorist-dropdown__links__single-js').off('click');

  // Initialize Infinite Scroll
  window.addEventListener('scroll', function () {
    if (infinitePaginationCompleted) {
      scrollingPage = 1;
      return;
    }
    handleScroll();
  });

  // Initialize the observer for single category location
  window.addEventListener('load', function () {
    (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_0__["default"])(initObserver(), 250);
    singleCategoryLocationInit();
  });
});

/***/ }),

/***/ "./resources/js/gutenberg/radius-search.js":
/*!*************************************************!*\
  !*** ./resources/js/gutenberg/radius-search.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @utils/debounce */ "./resources/js/utils/debounce.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/utils */ "./resources/js/gutenberg/utils/utils.js");


jQuery(document).ready(function ($) {
  /**
   * Radius Search Functionality
   * Handles location autocomplete, zipcode search, and radius search visibility
   */

  // Initialize on load and when instant search is reloaded
  window.addEventListener('load', initRadiusSearch);
  document.body.addEventListener('directorist-reload-map-api-field', initRadiusSearch);
  window.addEventListener('directorist-instant-search-reloaded', function () {
    setTimeout(initRadiusSearch, 100);
    setTimeout(_utils_utils__WEBPACK_IMPORTED_MODULE_1__.handleRadiusVisibility, 150);
  });

  // Initialize radius search functionality
  function initRadiusSearch() {
    initMapApiField();
    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.handleRadiusVisibility)();
  }

  // Initialize Map API Field (Google Maps or OpenStreetMap)
  function initMapApiField() {
    if (directorist.i18n_text.select_listing_map === 'google') {
      initGoogleMapsAutocomplete();
    } else if (directorist.i18n_text.select_listing_map === 'openstreet') {
      initOpenStreetMapSearch();
    }
  }

  // Initialize Google Maps Autocomplete
  function initGoogleMapsAutocomplete() {
    if (typeof google === 'undefined' || !google.maps) {
      return;
    }
    function initialize() {
      var opt = {
        types: ['geocode'],
        componentRestrictions: {
          country: directorist.restricted_countries
        }
      };
      var options = directorist.countryRestriction ? opt : '';
      var input_fields = [{
        input_class: '.directorist-location-js',
        lat_id: 'cityLat',
        lng_id: 'cityLng',
        options: options
      }];
      var setupAutocomplete = function (field) {
        var inputs = document.querySelectorAll(field.input_class);
        inputs.forEach(function (elm) {
          if (!elm) {
            return;
          }
          // Skip if already initialized
          if (elm.dataset.googleAutocompleteInitialized === 'true') {
            return;
          }
          var autocomplete = new google.maps.places.Autocomplete(elm, field.options);
          google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();
            var searchField = elm.closest('.directorist-search-field');
            if (searchField) {
              var latInput = searchField.querySelector('#' + field.lat_id);
              var lngInput = searchField.querySelector('#' + field.lng_id);
              if (latInput) latInput.value = place.geometry.location.lat();
              if (lngInput) lngInput.value = place.geometry.location.lng();
            }

            // Trigger radius visibility update
            (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.handleRadiusVisibility)();

            // Trigger location change event
            var locationSearch = $(elm).closest('.directorist-search-location');
            if (locationSearch.length) {
              locationSearch.trigger('change');
            }
          });
          elm.dataset.googleAutocompleteInitialized = 'true';
        });
      };
      input_fields.forEach(function (field) {
        setupAutocomplete(field);
      });
    }
    initialize();
  }

  // Initialize OpenStreetMap Search
  function initOpenStreetMapSearch() {
    var getResultContainer = function (context, field) {
      return $(context).next(field.search_result_elm);
    };
    var input_fields = [{
      input_elm: '.directorist-location-js',
      search_result_elm: '.address_result',
      getResultContainer: getResultContainer
    }];
    input_fields.forEach(function (field) {
      if (!$(field.input_elm).length) {
        return;
      }

      // Remove existing handlers to prevent duplicates
      $(field.input_elm).off('keyup.radiusSearch');
      $(field.input_elm).on('keyup.radiusSearch', (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_0__["default"])(function (event) {
        event.preventDefault();
        var blockedKeyCodes = [16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 91, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145];

        // Return early when blocked key is pressed
        if (blockedKeyCodes.includes(event.keyCode)) {
          return;
        }
        var $locationField = $(this).closest('.directorist-search-field');
        var result_container = field.getResultContainer(this, field);
        var search = $(this).val();
        if (search.length < 3) {
          result_container.css({
            display: 'none'
          });
          (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.handleRadiusVisibility)();
          return;
        }
        $locationField.addClass('atbdp-form-fade');
        result_container.css({
          display: 'block'
        });
        $.ajax({
          url: 'https://nominatim.openstreetmap.org/?q=%27+' + search + '+%27&format=json',
          type: 'GET',
          data: {},
          success: function (data) {
            var res = '';
            var currentIconURL = directorist.assets_url + 'icons/font-awesome/svgs/solid/paper-plane.svg';
            var currentIconHTML = directorist.icon_markup.replace('##URL##', currentIconURL).replace('##CLASS##', '');
            var currentLocationIconHTML = "<span class='location-icon'>" + currentIconHTML + '</span>';
            var currentLocationAddressHTML = "<span class='location-address'></span>";
            var iconURL = directorist.assets_url + 'icons/font-awesome/svgs/solid/map-marker-alt.svg';
            var iconHTML = directorist.icon_markup.replace('##URL##', iconURL).replace('##CLASS##', '');
            var locationIconHTML = "<span class='location-icon'>" + iconHTML + '</span>';
            for (var i = 0, len = data.length > 5 ? 5 : data.length; i < len; i++) {
              res += '<li><a href="#" data-lat=' + data[i].lat + ' data-lon=' + data[i].lon + '>' + locationIconHTML + "<span class='location-address'>" + data[i].display_name + '</span></a></li>';
            }
            function displayLocation(position, event) {
              var lat = position.coords.latitude;
              var lng = position.coords.longitude;
              $.ajax({
                url: 'https://nominatim.openstreetmap.org/reverse?format=json&lon=' + lng + '&lat=' + lat,
                type: 'GET',
                data: {},
                success: function (data) {
                  $('.directorist-location-js').val(data.display_name);
                  $('.directorist-location-js').attr('data-value', data.display_name);

                  // Find and set lat/lng in the same form
                  var $locationInput = $('.directorist-location-js');
                  var $searchField = $locationInput.closest('.directorist-search-field');
                  if ($searchField.length) {
                    $searchField.find('#cityLat').val(lat);
                    $searchField.find('#cityLng').val(lng);
                  }
                  var locationSearch = $('.directorist-search-location');
                  if (locationSearch.length) {
                    locationSearch.trigger('change');
                  }
                  (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.handleRadiusVisibility)();
                }
              });
            }
            result_container.html('<ul>' + "<li><a href='#' class='current-location'>" + currentLocationIconHTML + currentLocationAddressHTML + '</a></li>' + res + '</ul>');
            if (res.length) {
              result_container.show();
            } else {
              result_container.hide();
            }
            $locationField.removeClass('atbdp-form-fade');

            // Handle current location click
            $('body').off('click', '.address_result .current-location').on('click', '.address_result .current-location', function (e) {
              e.preventDefault();
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                  return displayLocation(position, e);
                });
              }
            });
          },
          error: function (error) {
            console.log({
              error: error
            });
            $locationField.removeClass('atbdp-form-fade');
          }
        });
      }, 750));
    });

    // Hide address result when click outside the input field
    $(document).on('click', function (e) {
      if (!$(e.target).closest('.directorist-location-js, .current-location, .address_result').length) {
        var locationSearch = $(e.target).closest('.directorist-search-location');
        var zipCodeSearch = $(e.target).closest('.directorist-zipcode-search');
        if (locationSearch.length) {
          locationSearch.trigger('change');
        }
        if (zipCodeSearch.length) {
          zipCodeSearch.trigger('change');
        }
        $('.address_result').hide();
      }
    });

    // Handle address result selection
    var syncLatLngData = function (context, event, args) {
      event.preventDefault();
      var text = $(context).text();
      var lat = $(context).data('lat');
      var lon = $(context).data('lon');

      // Find the location input and its parent search field
      var $locationInput = $(context).closest(args.result_list_container).siblings('.directorist-location-js');
      if (!$locationInput.length) {
        $locationInput = $('.directorist-location-js').first();
      }
      var $searchField = $locationInput.closest('.directorist-search-field');
      if ($searchField.length) {
        $searchField.find('input[name="cityLat"]').val(lat);
        $searchField.find('input[name="cityLng"]').val(lon);
        $searchField.find('#cityLat').val(lat);
        $searchField.find('#cityLng').val(lon);
      }
      $locationInput.val(text);
      $(args.result_list_container).hide();

      // Trigger change event
      var locationSearch = $locationInput.closest('.directorist-search-location');
      if (locationSearch.length) {
        locationSearch.trigger('change');
      }
      (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.handleRadiusVisibility)();
    };
    $('body').on('click', '.address_result ul li a', function (event) {
      syncLatLngData(this, event, {
        result_list_container: '.address_result'
      });
    });
  }

  // Initialize Zipcode Search
  function initZipcodeSearch() {
    // Remove existing handlers to prevent duplicates
    $('body').off('keyup.radiusSearchZip', '.zip-radius-search');
    $('body').on('keyup.radiusSearchZip', '.zip-radius-search', (0,_utils_debounce__WEBPACK_IMPORTED_MODULE_0__["default"])(function () {
      var zipcode = $(this).val();
      var zipcode_search = $(this).closest('.directorist-zipcode-search');
      var country_suggest = zipcode_search.find('.directorist-country');
      if (zipcode) {
        zipcode_search.addClass('dir_loading');
      }
      var url;
      var data = {};
      if (directorist.i18n_text.select_listing_map === 'google') {
        url = directorist.ajax_url;
        data = {
          nonce: directorist.directorist_nonce,
          action: 'directorist_zipcode_search',
          zipcode: zipcode
        };
      } else {
        url = 'https://nominatim.openstreetmap.org/?postalcode=' + zipcode + '&format=json&addressdetails=1';
        $('.directorist-country').css({
          display: 'block'
        });
        if (zipcode === '') {
          $('.directorist-country').css({
            display: 'none'
          });
        }
      }
      var res = '';
      $.ajax({
        url: url,
        method: directorist.i18n_text.select_listing_map === 'google' ? 'POST' : 'GET',
        data: data,
        success: function (data) {
          zipcode_search.removeClass('dir_loading');
          if (directorist.i18n_text.select_listing_map === 'google' && data.data && data.data.error_message) {
            zipcode_search.find('.error_message').remove();
            zipcode_search.find('.zip-cityLat').val('');
            zipcode_search.find('.zip-cityLng').val('');
            zipcode_search.append(data.data.error_message);
            return;
          }
          if (directorist.i18n_text.select_listing_map === 'google' && typeof data.lat !== 'undefined' && typeof data.lng !== 'undefined') {
            zipcode_search.find('.error_message').remove();
            zipcode_search.find('.zip-cityLat').val(data.lat);
            zipcode_search.find('.zip-cityLng').val(data.lng);
            (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.handleRadiusVisibility)();
          } else if (directorist.i18n_text.select_listing_map === 'openstreet') {
            if (data.length === 1) {
              var lat = data[0].lat;
              var lon = data[0].lon;
              zipcode_search.find('.zip-cityLat').val(lat);
              zipcode_search.find('.zip-cityLng').val(lon);
              (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.handleRadiusVisibility)();
            } else {
              for (var i = 0; i < data.length; i++) {
                res += '<li><a href="#" data-lat=' + data[i].lat + ' data-lon=' + data[i].lon + '>' + data[i].address.country + '</a></li>';
              }
              $(country_suggest).html('<ul>' + res + '</ul>');
              if (res.length) {
                $('.directorist-country').show();
              } else {
                $('.directorist-country').hide();
              }
            }
          }
        },
        error: function (error) {
          zipcode_search.removeClass('dir_loading');
          console.log('Zipcode search error:', error);
        }
      });
    }, 250));
  }

  // Handle Country Selection for Zipcode
  function initCountrySelection() {
    // Hide country result when clicking outside
    $(document).on('click', function (e) {
      if (!$(e.target).closest('.directorist-zip-code').length) {
        $('.directorist-country').hide();
      }
    });

    // Handle country selection
    $('body').on('click', '.directorist-country ul li a', function (event) {
      event.preventDefault();
      var zipcode_search = $(this).closest('.directorist-zipcode-search');
      var lat = $(this).data('lat');
      var lon = $(this).data('lon');
      if (lat && lon) {
        zipcode_search.find('.zip-cityLat').val(lat);
        zipcode_search.find('.zip-cityLng').val(lon);
        $('.directorist-country').hide();
        (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.handleRadiusVisibility)();

        // Trigger change event
        zipcode_search.trigger('change');
      }
    });
  }

  // Trigger radius visibility on location/zipcode changes
  $('body').on('keyup keydown input change focus', '.directorist-location-js, .zip-radius-search', function (e) {
    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.handleRadiusVisibility)();
  });

  // Initialize zipcode search and country selection
  initZipcodeSearch();
  initCountrySelection();

  // Hide address result initially
  $('.address_result').hide();
});

/***/ }),

/***/ "./resources/js/gutenberg/search-form-reset.js":
/*!*****************************************************!*\
  !*** ./resources/js/gutenberg/search-form-reset.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/utils */ "./resources/js/gutenberg/utils/utils.js");

jQuery(document).ready(function ($) {
  /**
   * Search Form Reset Functionality
   * Handles resetting all search form fields and integrates with instant search
   */

  // Reset Custom Range Slider
  function resetCustomRangeSlider(sliderItem) {
    var slider = sliderItem.querySelector('.directorist-custom-range-slider__slide');
    if (!slider) return;
    var minInput = sliderItem.querySelector('.directorist-custom-range-slider__value__min');
    var maxInput = sliderItem.querySelector('.directorist-custom-range-slider__value__max');
    var rangeValue = sliderItem.querySelector('.directorist-custom-range-slider__range');
    var radiusSearch = sliderItem.closest('.directorist-search-field-radius_search');
    var defaultValue = slider.getAttribute('default-value') || '0';
    if (radiusSearch) {
      // Radius search slider - reset to default
      if (minInput) minInput.value = '0';
      if (maxInput) maxInput.value = defaultValue;
      if (slider.directoristCustomRangeSlider) {
        slider.directoristCustomRangeSlider.set([0, defaultValue]);
      }
    } else {
      // Regular range slider - reset to 0-0
      if (minInput) minInput.value = '0';
      if (maxInput) maxInput.value = '0';
      if (rangeValue) rangeValue.value = '0-0';
      if (slider.directoristCustomRangeSlider) {
        slider.directoristCustomRangeSlider.set([0, 0]);
      }
    }
  }

  // Reset Search Form
  function resetSearchForm(searchForm) {
    if (!searchForm) return;

    // Reset text inputs
    searchForm.querySelectorAll("input[type='text']:not(.wp-picker-clear)").forEach(function (el) {
      el.value = '';
      var parent = el.parentElement;
      if (parent && (parent.classList.contains('input-has-value') || parent.classList.contains('input-is-focused'))) {
        parent.classList.remove('input-has-value', 'input-is-focused');
      }
    });

    // Reset date inputs
    searchForm.querySelectorAll("input[type='date']").forEach(function (el) {
      el.value = '';
    });

    // Reset time inputs
    searchForm.querySelectorAll("input[type='time']").forEach(function (el) {
      el.value = '';
    });

    // Reset URL inputs
    searchForm.querySelectorAll("input[type='url']").forEach(function (el) {
      el.value = '';
      var parent = el.parentElement;
      if (parent && (parent.classList.contains('input-has-value') || parent.classList.contains('input-is-focused'))) {
        parent.classList.remove('input-has-value', 'input-is-focused');
      }
    });

    // Reset number inputs
    searchForm.querySelectorAll("input[type='number']").forEach(function (el) {
      el.value = '';
      var parent = el.parentElement;
      if (parent && (parent.classList.contains('input-has-value') || parent.classList.contains('input-is-focused'))) {
        parent.classList.remove('input-has-value', 'input-is-focused');
      }
    });

    // Reset hidden inputs (except directory_type and radius-search-based-on)
    searchForm.querySelectorAll("input[type='hidden']:not(.listing_type)").forEach(function (el) {
      if (el.getAttribute('name') === 'directory_type' || el.getAttribute('name') === 'radius-search-based-on') {
        return;
      }
      el.value = '';
    });

    // Reset radio buttons
    searchForm.querySelectorAll("input[type='radio']").forEach(function (el) {
      el.checked = false;
    });

    // Reset checkboxes
    searchForm.querySelectorAll("input[type='checkbox']").forEach(function (el) {
      el.checked = false;
    });

    // Reset select fields
    searchForm.querySelectorAll('select').forEach(function (el) {
      el.selectedIndex = 0;
      // Trigger select2 close if available
      if ($(el).data('select2')) {
        $(el).val(null).trigger('change');
      }
      // Close select2 dropdown close button
      $(el).closest('.directorist-search-field').find('.directorist-select2-dropdown-close').click();
      var parentElem = el.closest('.directorist-search-field');
      if (parentElem && (parentElem.classList.contains('input-has-value') || parentElem.classList.contains('input-is-focused'))) {
        setTimeout(function () {
          parentElem.classList.remove('input-has-value', 'input-is-focused');
        }, 100);
      }
    });

    // Reset custom range sliders
    var customRangeSliders = searchForm.querySelectorAll('.directorist-custom-range-slider');
    customRangeSliders.forEach(function (sliderItem) {
      resetCustomRangeSlider(sliderItem);
    });

    // Reset basic dropdown selections
    searchForm.querySelectorAll('.directorist-search-basic-dropdown-content').forEach(function (dropdown) {
      var dropDownParent = dropdown.closest('.directorist-search-field');
      $(dropdown).siblings('.directorist-search-basic-dropdown-label').find('.directorist-search-basic-dropdown-selected-count').text('');
      $(dropdown).siblings('.directorist-search-basic-dropdown-label').find('.directorist-search-basic-dropdown-selected-prefix').text('');
      if (dropDownParent && (dropDownParent.classList.contains('input-has-value') || dropDownParent.classList.contains('input-is-focused'))) {
        dropDownParent.classList.remove('input-has-value', 'input-is-focused');
      }
    });

    // Reset color picker
    var irisPicker = searchForm.querySelector('input.wp-picker-clear');
    if (irisPicker) {
      irisPicker.click();
    }

    // Update radius visibility
    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.handleRadiusVisibility)();

    // Initialize form state
    initFormState(searchForm);
  }

  // Initialize Form State (check if reset button should be enabled/disabled)
  function initFormState(searchForm) {
    if (!searchForm) return;
    var hasValue = false;

    // Check all input fields which are not checkbox, radio & hidden
    searchForm.querySelectorAll("input:not([type='checkbox']):not([type='radio']):not([type='hidden']):not(.wp-picker-clear):not(.directorist-custom-range-slider__value__min):not(.directorist-custom-range-slider__value__max)").forEach(function (el) {
      if (el.value !== '') {
        hasValue = true;
      }
    });

    // Check all checkbox, radio field
    searchForm.querySelectorAll("input[type='checkbox'], input[type='radio']").forEach(function (el) {
      if (el.checked) {
        hasValue = true;
      }
    });

    // Check all select field
    searchForm.querySelectorAll('select').forEach(function (el) {
      if (el.value || el.selectedIndex !== 0) {
        hasValue = true;
      }
    });

    // Check all custom number range field
    searchForm.querySelectorAll('.directorist-search-field-text_range .directorist-custom-range-slider__range').forEach(function (el) {
      if (el.value !== '0-0') {
        hasValue = true;
      }
    });

    // Check all range slider field
    searchForm.querySelectorAll('.directorist-custom-range-slider__value input').forEach(function (el) {
      if (el.value > 0) {
        hasValue = true;
      }
    });

    // Update reset button state
    var resetButtonWrapper = findResetButtonWrapper(searchForm);
    if (resetButtonWrapper) {
      if (hasValue) {
        resetButtonWrapper.classList.remove('reset-btn-disabled');
      } else {
        resetButtonWrapper.classList.add('reset-btn-disabled');
      }
    }
  }

  // Enable Reset Button
  function enableResetButton(searchForm) {
    var resetButtonWrapper = findResetButtonWrapper(searchForm);
    if (resetButtonWrapper) {
      resetButtonWrapper.classList.remove('reset-btn-disabled');
    }
  }

  // Find Reset Button Wrapper (works with both old and new structure)
  function findResetButtonWrapper(searchForm) {
    // Try to find in current form
    var resetButtonWrapper = searchForm.querySelector('.directorist-advanced-filter__action');
    if (resetButtonWrapper) {
      return resetButtonWrapper;
    }

    // Try to find in old structure
    var contentsWrap = searchForm.closest('.directorist-contents-wrap');
    if (contentsWrap) {
      resetButtonWrapper = contentsWrap.querySelector('.directorist-advanced-filter__action');
      if (resetButtonWrapper) {
        return resetButtonWrapper;
      }
    }

    // Try to find in new Gutenberg block structure
    var blockWrapper = searchForm.closest('[data-atts]');
    if (blockWrapper) {
      resetButtonWrapper = blockWrapper.querySelector('.directorist-advanced-filter__action');
      if (resetButtonWrapper) {
        return resetButtonWrapper;
      }
    }

    // Try to find in listing-with-sidebar (old structure)
    var listingWithSidebar = searchForm.closest('.listing-with-sidebar');
    if (listingWithSidebar) {
      resetButtonWrapper = listingWithSidebar.querySelector('.directorist-advanced-filter__action');
      if (resetButtonWrapper) {
        return resetButtonWrapper;
      }
    }

    // Fallback: search in document
    return document.querySelector('.directorist-advanced-filter__action');
  }

  // Handle Reset Button Click
  function handleResetButtonClick(e) {
    e.preventDefault();
    var resetButton = this;

    // Clear URL params
    setTimeout(function () {
      var baseUrl = window.location.origin + window.location.pathname;
      window.history.replaceState(null, '', baseUrl);
    }, 300);

    // Find all forms to reset
    var formsToReset = [];

    // Try old structure first
    var contentsWrap = resetButton.closest('.directorist-contents-wrap');
    if (contentsWrap) {
      var searchForm = contentsWrap.querySelector('.directorist-search-form');
      if (searchForm) formsToReset.push(searchForm);
      var advanceSearchForm = contentsWrap.querySelector('.directorist-advanced-filter__form');
      if (advanceSearchForm) formsToReset.push(advanceSearchForm);
      var advanceSearchFilter = contentsWrap.querySelector('.directorist-advanced-filter__advanced');
      if (advanceSearchFilter) formsToReset.push(advanceSearchFilter);
    } else {
      // New Gutenberg block structure
      var blockWrapper = resetButton.closest('[data-atts]');
      if (blockWrapper) {
        var basicSearch = blockWrapper.querySelector('.directorist-basic-search');
        if (basicSearch) formsToReset.push(basicSearch);
        var advancedSearch = blockWrapper.querySelector('.directorist-advanced-search');
        if (advancedSearch) formsToReset.push(advancedSearch);
        var advancedFilterForm = blockWrapper.querySelector('.directorist-advanced-filter__form');
        if (advancedFilterForm) formsToReset.push(advancedFilterForm);
        var advancedFilterAdvanced = blockWrapper.querySelector('.directorist-advanced-filter__advanced');
        if (advancedFilterAdvanced) formsToReset.push(advancedFilterAdvanced);
      } else {
        // Fallback: find all search forms in document
        document.querySelectorAll('.directorist-search-form, .directorist-basic-search, .directorist-advanced-search, .directorist-advanced-filter__form, .directorist-advanced-filter__advanced').forEach(function (form) {
          formsToReset.push(form);
        });
      }
    }

    // Reset all found forms
    formsToReset.forEach(function (form) {
      resetSearchForm(form);
    });

    // Trigger instant search reset if available
    if (typeof window.directoristInstantSearchReset === 'function') {
      window.directoristInstantSearchReset();
    }

    // Dispatch custom event for instant search integration
    window.dispatchEvent(new CustomEvent('directorist-form-reset-complete', {
      detail: {
        forms: formsToReset
      }
    }));
  }

  // Export reset function for use by instantSearch.js
  window.directoristResetSearchForm = function (searchForm) {
    resetSearchForm(searchForm);
  };

  // Initialize form state on page load
  function initializeForms() {
    var forms = document.querySelectorAll('.directorist-search-form, .directorist-basic-search, .directorist-advanced-search, .directorist-advanced-filter__form, .directorist-advanced-filter__advanced');
    forms.forEach(function (form) {
      setTimeout(function () {
        initFormState(form);
      }, 100);
    });
  }

  // Event Listeners

  // Reset button click
  $('body').on('click', '.directorist-btn-reset-js', handleResetButtonClick);

  // Input field changes - update reset button state
  $('body').on('keyup', '.directorist-search-form input:not([type="checkbox"]):not([type="radio"]), .directorist-basic-search input:not([type="checkbox"]):not([type="radio"]), .directorist-advanced-search input:not([type="checkbox"]):not([type="radio"])', function (e) {
    var searchForm = this.closest('form');
    if (!searchForm) {
      searchForm = this.closest('.directorist-search-form, .directorist-basic-search, .directorist-advanced-search');
    }
    if (this.value && this.value !== 0 && this.value !== undefined) {
      enableResetButton(searchForm);
    } else {
      setTimeout(function () {
        initFormState(searchForm);
      }, 100);
    }
  });

  // Checkbox/Radio changes
  $('body').on('change', '.directorist-search-form input[type="checkbox"], .directorist-search-form input[type="radio"], .directorist-basic-search input[type="checkbox"], .directorist-basic-search input[type="radio"], .directorist-advanced-search input[type="checkbox"], .directorist-advanced-search input[type="radio"]', function (e) {
    var searchForm = this.closest('form');
    if (!searchForm) {
      searchForm = this.closest('.directorist-search-form, .directorist-basic-search, .directorist-advanced-search');
    }
    if (this.checked) {
      enableResetButton(searchForm);
    } else {
      setTimeout(function () {
        initFormState(searchForm);
      }, 100);
    }
  });

  // Select changes
  $('body').on('change', '.directorist-search-form select, .directorist-basic-search select, .directorist-advanced-search select', function (e) {
    var searchForm = this.closest('form');
    if (!searchForm) {
      searchForm = this.closest('.directorist-search-form, .directorist-basic-search, .directorist-advanced-search');
    }
    if (this.value !== undefined && this.value !== '') {
      enableResetButton(searchForm);
    } else {
      setTimeout(function () {
        initFormState(searchForm);
      }, 100);
    }
  });

  // Color field changes
  window.addEventListener('directorist-color-changed', function (e) {
    var color = e.detail.color;
    var form = e.detail.form;
    if (color && color !== '') {
      enableResetButton(form);
    } else {
      setTimeout(function () {
        initFormState(form);
      }, 100);
    }
  });

  // Initialize on page load
  window.addEventListener('load', function () {
    initializeForms();
  });

  // Re-initialize after instant search reload
  window.addEventListener('directorist-instant-search-reloaded', function () {
    setTimeout(function () {
      initializeForms();
      (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.handleRadiusVisibility)();
    }, 100);
  });

  // Initialize immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeForms);
  } else {
    initializeForms();
  }
});

/***/ }),

/***/ "./resources/js/gutenberg/utils/utils.js":
/*!***********************************************!*\
  !*** ./resources/js/gutenberg/utils/utils.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleRadiusVisibility: () => (/* binding */ handleRadiusVisibility)
/* harmony export */ });
/**
 * Hide or show the radius search field depending on whether the location field is empty.
 * Vanilla JS implementation using modern JS conventions.
 * Works with both old structure (.directorist-contents-wrap) and new Gutenberg blocks.
 */
const handleRadiusVisibility = () => {
  // Add class to mark the radius search field
  document.querySelectorAll('.directorist-range-slider-wrap').forEach(wrap => {
    const searchField = wrap.closest('.directorist-search-field');
    searchField?.classList.add('directorist-search-field-radius_search');
  });
  const basedOnElem = document.querySelector('.directorist-radius_search_based_on');
  const basedOn = basedOnElem?.value;
  const selector = basedOn === 'zip' ? '.directorist-zipcode-search .zip-radius-search' : '.directorist-location-js';
  document.querySelectorAll(selector).forEach(locationDOM => {
    const isEmpty = locationDOM.value === '';

    // Try to find container in old structure first
    let contentsWrap = locationDOM.closest('.directorist-contents-wrap');

    // If not found, try new Gutenberg block structure
    if (!contentsWrap) {
      // Look for radius search fields in the same form or nearby blocks
      const form = locationDOM.closest('form');
      if (form) {
        contentsWrap = form.closest('[data-atts]') || form;
      } else {
        // Fallback: search in document
        contentsWrap = document.body;
      }
    }
    if (!contentsWrap) return;

    // Find radius search fields within the container
    const radiusFields = contentsWrap.querySelectorAll ? contentsWrap.querySelectorAll('.directorist-search-field-radius_search, .directorist-radius-search') : document.querySelectorAll('.directorist-search-field-radius_search, .directorist-radius-search');
    radiusFields.forEach(container => {
      container.style.display = isEmpty ? 'none' : 'block';
    });
  });
};

/***/ }),

/***/ "./resources/js/utils/category-custom-fields.js":
/*!******************************************************!*\
  !*** ./resources/js/utils/category-custom-fields.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initSearchCategoryCustomFields)
/* harmony export */ });
// Search Category Change
function hideAllCustomFieldsExceptSelected(relations, categories, $container) {
  const fields = Object.keys(relations);
  const wrappers = ['.directorist-advanced-filter__advanced__element', '.directorist-search-modal__input', '.directorist-search-field'];
  if (!fields.length) {
    return;
  }

  // Convert categories to array if it's not already
  const categoryArray = Array.isArray(categories) ? categories : [categories];
  fields.forEach(field => {
    const fieldCategory = relations[field];

    // Try multiple selectors to find the field
    let $field = null;
    const selectors = [`[name="custom_field[${field}]"]`, `[name="custom_field[${field}][]"]`, `[name*="${field}"]`, `[data-field-key="${field}"]`, `[id*="${field}"]`];
    for (const selector of selectors) {
      $field = $container.find(selector);
      if ($field.length > 0) {
        break;
      }
    }
    if (!$field || !$field.length) {
      return;
    }

    // Check if the field category matches any of the selected categories
    const shouldShow = categoryArray.some(category => Number(category) === Number(fieldCategory));
    if (shouldShow) {
      $field.prop('disabled', false);
      wrappers.forEach(wrapper => {
        const $wrapper = $field.closest(wrapper);
        if ($wrapper.length) {
          $wrapper.show();
        }
      });
    } else {
      $field.prop('disabled', true);
      wrappers.forEach(wrapper => {
        const $wrapper = $field.closest(wrapper);
        if ($wrapper.length) {
          $wrapper.hide();
        }
      });
    }
  });
}
function initSearchCategoryCustomFields($) {
  // Handle multiple search forms and containers
  const containers = ['.directorist-search-contents', '.directorist-archive-contents', '.directorist-search-form', '.directorist-add-listing-form'];
  containers.forEach(containerSelector => {
    const $container = $(containerSelector);
    if ($container.length) {
      // Bind events to all category selects within this container
      $container.on('change', '.directorist-category-select, .directorist-search-category select, .bdas-category-search', function (event) {
        const $this = $(this);
        const $form = $this.parents('form');
        let categories = $this.val();
        let attributes = $form.data('atts');

        // If form doesn't have attributes, try container
        if (!attributes) {
          attributes = $container.data('atts');
        }

        // If still no attributes, try document body
        if (!attributes) {
          attributes = $(document.body).data('atts');
        }
        if (!attributes || !attributes.category_custom_fields_relations) {
          return;
        }

        // Handle both single and multiple category selections
        if (categories) {
          // Convert to array if it's a single value
          if (!Array.isArray(categories)) {
            categories = [categories];
          }
          // Convert string values to numbers and filter out empty values
          categories = categories.map(cat => Number(cat)).filter(cat => cat > 0); // Filter out 0, null, undefined, etc.
        } else {
          categories = [];
        }

        // Use the specific container for field search to avoid conflicts
        hideAllCustomFieldsExceptSelected(attributes.category_custom_fields_relations, categories, $container);
      });

      // Trigger change event on page load for all category selects in this container
      $container.find('.directorist-category-select, .directorist-search-category select, .bdas-category-search').each(function () {
        $(this).trigger('change');
      });
    }
  });

  // Also handle global category selects that might not be in specific containers
  const globalSelectors = '.directorist-category-select, .directorist-search-category select, .bdas-category-search';
  $(document).on('change', globalSelectors, function (event) {
    const $this = $(this);

    // Only handle if not already handled by container-specific handlers
    if (!event.isDefaultPrevented()) {
      const $form = $this.parents('form');
      let categories = $this.val();
      let attributes = $form.data('atts');
      if (!attributes) {
        attributes = $(document.body).data('atts');
      }
      if (!attributes || !attributes.category_custom_fields_relations) {
        return;
      }

      // Handle both single and multiple category selections
      if (categories) {
        if (!Array.isArray(categories)) {
          categories = [categories];
        }
        categories = categories.map(cat => Number(cat)).filter(cat => cat > 0);
      } else {
        categories = [];
      }
      hideAllCustomFieldsExceptSelected(attributes.category_custom_fields_relations, categories, $(document.body));
    }
  });
}

/***/ }),

/***/ "./resources/js/utils/debounce.js":
/*!****************************************!*\
  !*** ./resources/js/utils/debounce.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ debounce)
/* harmony export */ });
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/***/ }),

/***/ "@wordpress/interactivity":
/*!*******************************************!*\
  !*** external "@wordpress/interactivity" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************************************!*\
  !*** ./resources/js/block-sripts/frontend.js ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _directorist_gutenberg_gutenberg_instantSearch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @directorist-gutenberg/gutenberg/instantSearch */ "./resources/js/gutenberg/instantSearch.js");
/* harmony import */ var _directorist_gutenberg_gutenberg_radius_search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @directorist-gutenberg/gutenberg/radius-search */ "./resources/js/gutenberg/radius-search.js");
/* harmony import */ var _directorist_gutenberg_gutenberg_search_form_reset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @directorist-gutenberg/gutenberg/search-form-reset */ "./resources/js/gutenberg/search-form-reset.js");
/* harmony import */ var _directorist_gutenberg_fields_listing_card_favorite__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @directorist-gutenberg/fields/listing-card-favorite */ "./resources/js/fields/listing-card-favorite.js");




})();


//# sourceMappingURL=blocks-frontend.js.map