import { handleRadiusVisibility } from './utils/utils';

jQuery( document ).ready( function ( $ ) {
	/**
	 * Search Form Reset Functionality
	 * Handles resetting all search form fields and integrates with instant search
	 */

	// Reset Custom Range Slider
	function resetCustomRangeSlider( sliderItem ) {
		var slider = sliderItem.querySelector(
			'.directorist-custom-range-slider__slide'
		);
		if ( ! slider ) return;

		var minInput = sliderItem.querySelector(
			'.directorist-custom-range-slider__value__min'
		);
		var maxInput = sliderItem.querySelector(
			'.directorist-custom-range-slider__value__max'
		);
		var rangeValue = sliderItem.querySelector(
			'.directorist-custom-range-slider__range'
		);
		var radiusSearch = sliderItem.closest(
			'.directorist-search-field-radius_search'
		);
		var defaultValue = slider.getAttribute( 'default-value' ) || '0';

		if ( radiusSearch ) {
			// Radius search slider - reset to default
			if ( minInput ) minInput.value = '0';
			if ( maxInput ) maxInput.value = defaultValue;
			if ( slider.directoristCustomRangeSlider ) {
				slider.directoristCustomRangeSlider.set( [ 0, defaultValue ] );
			}
		} else {
			// Regular range slider - reset to 0-0
			if ( minInput ) minInput.value = '0';
			if ( maxInput ) maxInput.value = '0';
			if ( rangeValue ) rangeValue.value = '0-0';
			if ( slider.directoristCustomRangeSlider ) {
				slider.directoristCustomRangeSlider.set( [ 0, 0 ] );
			}
		}
	}

	// Reset Search Form
	function resetSearchForm( searchForm ) {
		if ( ! searchForm ) return;

		// Reset text inputs
		searchForm
			.querySelectorAll( "input[type='text']:not(.wp-picker-clear)" )
			.forEach( function ( el ) {
				el.value = '';
				var parent = el.parentElement;
				if (
					parent &&
					( parent.classList.contains( 'input-has-value' ) ||
						parent.classList.contains( 'input-is-focused' ) )
				) {
					parent.classList.remove(
						'input-has-value',
						'input-is-focused'
					);
				}
			} );

		// Reset date inputs
		searchForm
			.querySelectorAll( "input[type='date']" )
			.forEach( function ( el ) {
				el.value = '';
			} );

		// Reset time inputs
		searchForm
			.querySelectorAll( "input[type='time']" )
			.forEach( function ( el ) {
				el.value = '';
			} );

		// Reset URL inputs
		searchForm
			.querySelectorAll( "input[type='url']" )
			.forEach( function ( el ) {
				el.value = '';
				var parent = el.parentElement;
				if (
					parent &&
					( parent.classList.contains( 'input-has-value' ) ||
						parent.classList.contains( 'input-is-focused' ) )
				) {
					parent.classList.remove(
						'input-has-value',
						'input-is-focused'
					);
				}
			} );

		// Reset number inputs
		searchForm
			.querySelectorAll( "input[type='number']" )
			.forEach( function ( el ) {
				el.value = '';
				var parent = el.parentElement;
				if (
					parent &&
					( parent.classList.contains( 'input-has-value' ) ||
						parent.classList.contains( 'input-is-focused' ) )
				) {
					parent.classList.remove(
						'input-has-value',
						'input-is-focused'
					);
				}
			} );

		// Reset hidden inputs (except directory_type and radius-search-based-on)
		searchForm
			.querySelectorAll( "input[type='hidden']:not(.listing_type)" )
			.forEach( function ( el ) {
				if (
					el.getAttribute( 'name' ) === 'directory_type' ||
					el.getAttribute( 'name' ) === 'radius-search-based-on'
				) {
					return;
				}
				el.value = '';
			} );

		// Reset radio buttons
		searchForm
			.querySelectorAll( "input[type='radio']" )
			.forEach( function ( el ) {
				el.checked = false;
			} );

		// Reset checkboxes
		searchForm
			.querySelectorAll( "input[type='checkbox']" )
			.forEach( function ( el ) {
				el.checked = false;
			} );

		// Reset select fields
		searchForm.querySelectorAll( 'select' ).forEach( function ( el ) {
			el.selectedIndex = 0;
			// Trigger select2 close if available
			if ( $( el ).data( 'select2' ) ) {
				$( el ).val( null ).trigger( 'change' );
			}
			// Close select2 dropdown close button
			$( el )
				.closest( '.directorist-search-field' )
				.find( '.directorist-select2-dropdown-close' )
				.click();

			var parentElem = el.closest( '.directorist-search-field' );
			if (
				parentElem &&
				( parentElem.classList.contains( 'input-has-value' ) ||
					parentElem.classList.contains( 'input-is-focused' ) )
			) {
				setTimeout( function () {
					parentElem.classList.remove(
						'input-has-value',
						'input-is-focused'
					);
				}, 100 );
			}
		} );

		// Reset custom range sliders
		var customRangeSliders = searchForm.querySelectorAll(
			'.directorist-custom-range-slider'
		);
		customRangeSliders.forEach( function ( sliderItem ) {
			resetCustomRangeSlider( sliderItem );
		} );

		// Reset basic dropdown selections
		searchForm
			.querySelectorAll( '.directorist-search-basic-dropdown-content' )
			.forEach( function ( dropdown ) {
				var dropDownParent = dropdown.closest(
					'.directorist-search-field'
				);
				$( dropdown )
					.siblings( '.directorist-search-basic-dropdown-label' )
					.find( '.directorist-search-basic-dropdown-selected-count' )
					.text( '' );
				$( dropdown )
					.siblings( '.directorist-search-basic-dropdown-label' )
					.find(
						'.directorist-search-basic-dropdown-selected-prefix'
					)
					.text( '' );
				if (
					dropDownParent &&
					( dropDownParent.classList.contains( 'input-has-value' ) ||
						dropDownParent.classList.contains(
							'input-is-focused'
						) )
				) {
					dropDownParent.classList.remove(
						'input-has-value',
						'input-is-focused'
					);
				}
			} );

		// Reset color picker
		var irisPicker = searchForm.querySelector( 'input.wp-picker-clear' );
		if ( irisPicker ) {
			irisPicker.click();
		}

		// Update radius visibility
		handleRadiusVisibility();

		// Initialize form state
		initFormState( searchForm );
	}

	// Initialize Form State (check if reset button should be enabled/disabled)
	function initFormState( searchForm ) {
		if ( ! searchForm ) return;

		var hasValue = false;

		// Check all input fields which are not checkbox, radio & hidden
		searchForm
			.querySelectorAll(
				"input:not([type='checkbox']):not([type='radio']):not([type='hidden']):not(.wp-picker-clear):not(.directorist-custom-range-slider__value__min):not(.directorist-custom-range-slider__value__max)"
			)
			.forEach( function ( el ) {
				if ( el.value !== '' ) {
					hasValue = true;
				}
			} );

		// Check all checkbox, radio field
		searchForm
			.querySelectorAll( "input[type='checkbox'], input[type='radio']" )
			.forEach( function ( el ) {
				if ( el.checked ) {
					hasValue = true;
				}
			} );

		// Check all select field
		searchForm.querySelectorAll( 'select' ).forEach( function ( el ) {
			if ( el.value || el.selectedIndex !== 0 ) {
				hasValue = true;
			}
		} );

		// Check all custom number range field
		searchForm
			.querySelectorAll(
				'.directorist-search-field-text_range .directorist-custom-range-slider__range'
			)
			.forEach( function ( el ) {
				if ( el.value !== '0-0' ) {
					hasValue = true;
				}
			} );

		// Check all range slider field
		searchForm
			.querySelectorAll( '.directorist-custom-range-slider__value input' )
			.forEach( function ( el ) {
				if ( el.value > 0 ) {
					hasValue = true;
				}
			} );

		// Update reset button state
		var resetButtonWrapper = findResetButtonWrapper( searchForm );
		if ( resetButtonWrapper ) {
			if ( hasValue ) {
				resetButtonWrapper.classList.remove( 'reset-btn-disabled' );
			} else {
				resetButtonWrapper.classList.add( 'reset-btn-disabled' );
			}
		}
	}

	// Enable Reset Button
	function enableResetButton( searchForm ) {
		var resetButtonWrapper = findResetButtonWrapper( searchForm );
		if ( resetButtonWrapper ) {
			resetButtonWrapper.classList.remove( 'reset-btn-disabled' );
		}
	}

	// Find Reset Button Wrapper (works with both old and new structure)
	function findResetButtonWrapper( searchForm ) {
		// Try to find in current form
		var resetButtonWrapper = searchForm.querySelector(
			'.directorist-advanced-filter__action'
		);
		if ( resetButtonWrapper ) {
			return resetButtonWrapper;
		}

		// Try to find in old structure
		var contentsWrap = searchForm.closest( '.directorist-contents-wrap' );
		if ( contentsWrap ) {
			resetButtonWrapper = contentsWrap.querySelector(
				'.directorist-advanced-filter__action'
			);
			if ( resetButtonWrapper ) {
				return resetButtonWrapper;
			}
		}

		// Try to find in new Gutenberg block structure
		var blockWrapper = searchForm.closest( '[data-atts]' );
		if ( blockWrapper ) {
			resetButtonWrapper = blockWrapper.querySelector(
				'.directorist-advanced-filter__action'
			);
			if ( resetButtonWrapper ) {
				return resetButtonWrapper;
			}
		}

		// Try to find in listing-with-sidebar (old structure)
		var listingWithSidebar = searchForm.closest( '.listing-with-sidebar' );
		if ( listingWithSidebar ) {
			resetButtonWrapper = listingWithSidebar.querySelector(
				'.directorist-advanced-filter__action'
			);
			if ( resetButtonWrapper ) {
				return resetButtonWrapper;
			}
		}

		// Fallback: search in document
		return document.querySelector( '.directorist-advanced-filter__action' );
	}

	// Handle Reset Button Click
	function handleResetButtonClick( e ) {
		e.preventDefault();
		var resetButton = this;

		// Clear URL params
		setTimeout( function () {
			var baseUrl = window.location.origin + window.location.pathname;
			window.history.replaceState( null, '', baseUrl );
		}, 300 );

		// Find all forms to reset
		var formsToReset = [];

		// Try old structure first
		var contentsWrap = resetButton.closest( '.directorist-contents-wrap' );
		if ( contentsWrap ) {
			var searchForm = contentsWrap.querySelector(
				'.directorist-search-form'
			);
			if ( searchForm ) formsToReset.push( searchForm );

			var advanceSearchForm = contentsWrap.querySelector(
				'.directorist-advanced-filter__form'
			);
			if ( advanceSearchForm ) formsToReset.push( advanceSearchForm );

			var advanceSearchFilter = contentsWrap.querySelector(
				'.directorist-advanced-filter__advanced'
			);
			if ( advanceSearchFilter ) formsToReset.push( advanceSearchFilter );
		} else {
			// New Gutenberg block structure
			var blockWrapper = resetButton.closest( '[data-atts]' );
			if ( blockWrapper ) {
				var basicSearch = blockWrapper.querySelector(
					'.directorist-basic-search'
				);
				if ( basicSearch ) formsToReset.push( basicSearch );

				var advancedSearch = blockWrapper.querySelector(
					'.directorist-advanced-search'
				);
				if ( advancedSearch ) formsToReset.push( advancedSearch );

				var advancedFilterForm = blockWrapper.querySelector(
					'.directorist-advanced-filter__form'
				);
				if ( advancedFilterForm )
					formsToReset.push( advancedFilterForm );

				var advancedFilterAdvanced = blockWrapper.querySelector(
					'.directorist-advanced-filter__advanced'
				);
				if ( advancedFilterAdvanced )
					formsToReset.push( advancedFilterAdvanced );
			} else {
				// Fallback: find all search forms in document
				document
					.querySelectorAll(
						'.directorist-search-form, .directorist-basic-search, .directorist-advanced-search, .directorist-advanced-filter__form, .directorist-advanced-filter__advanced'
					)
					.forEach( function ( form ) {
						formsToReset.push( form );
					} );
			}
		}

		// Reset all found forms
		formsToReset.forEach( function ( form ) {
			resetSearchForm( form );
		} );

		// Trigger instant search reset if available
		if ( typeof window.directoristInstantSearchReset === 'function' ) {
			window.directoristInstantSearchReset();
		}

		// Dispatch custom event for instant search integration
		window.dispatchEvent(
			new CustomEvent( 'directorist-form-reset-complete', {
				detail: { forms: formsToReset },
			} )
		);
	}

	// Export reset function for use by instantSearch.js
	window.directoristResetSearchForm = function ( searchForm ) {
		resetSearchForm( searchForm );
	};

	// Initialize form state on page load
	function initializeForms() {
		var forms = document.querySelectorAll(
			'.directorist-search-form, .directorist-basic-search, .directorist-advanced-search, .directorist-advanced-filter__form, .directorist-advanced-filter__advanced'
		);
		forms.forEach( function ( form ) {
			setTimeout( function () {
				initFormState( form );
			}, 100 );
		} );
	}

	// Event Listeners

	// Reset button click
	$( 'body' ).on(
		'click',
		'.directorist-btn-reset-js',
		handleResetButtonClick
	);

	// Input field changes - update reset button state
	$( 'body' ).on(
		'keyup',
		'.directorist-search-form input:not([type="checkbox"]):not([type="radio"]), .directorist-basic-search input:not([type="checkbox"]):not([type="radio"]), .directorist-advanced-search input:not([type="checkbox"]):not([type="radio"])',
		function ( e ) {
			var searchForm = this.closest( 'form' );
			if ( ! searchForm ) {
				searchForm = this.closest(
					'.directorist-search-form, .directorist-basic-search, .directorist-advanced-search'
				);
			}
			if ( this.value && this.value !== 0 && this.value !== undefined ) {
				enableResetButton( searchForm );
			} else {
				setTimeout( function () {
					initFormState( searchForm );
				}, 100 );
			}
		}
	);

	// Checkbox/Radio changes
	$( 'body' ).on(
		'change',
		'.directorist-search-form input[type="checkbox"], .directorist-search-form input[type="radio"], .directorist-basic-search input[type="checkbox"], .directorist-basic-search input[type="radio"], .directorist-advanced-search input[type="checkbox"], .directorist-advanced-search input[type="radio"]',
		function ( e ) {
			var searchForm = this.closest( 'form' );
			if ( ! searchForm ) {
				searchForm = this.closest(
					'.directorist-search-form, .directorist-basic-search, .directorist-advanced-search'
				);
			}
			if ( this.checked ) {
				enableResetButton( searchForm );
			} else {
				setTimeout( function () {
					initFormState( searchForm );
				}, 100 );
			}
		}
	);

	// Select changes
	$( 'body' ).on(
		'change',
		'.directorist-search-form select, .directorist-basic-search select, .directorist-advanced-search select',
		function ( e ) {
			var searchForm = this.closest( 'form' );
			if ( ! searchForm ) {
				searchForm = this.closest(
					'.directorist-search-form, .directorist-basic-search, .directorist-advanced-search'
				);
			}
			if ( this.value !== undefined && this.value !== '' ) {
				enableResetButton( searchForm );
			} else {
				setTimeout( function () {
					initFormState( searchForm );
				}, 100 );
			}
		}
	);

	// Color field changes
	window.addEventListener( 'directorist-color-changed', function ( e ) {
		var color = e.detail.color;
		var form = e.detail.form;
		if ( color && color !== '' ) {
			enableResetButton( form );
		} else {
			setTimeout( function () {
				initFormState( form );
			}, 100 );
		}
	} );

	// Initialize on page load
	window.addEventListener( 'load', function () {
		initializeForms();
	} );

	// Re-initialize after instant search reload
	window.addEventListener(
		'directorist-instant-search-reloaded',
		function () {
			setTimeout( function () {
				initializeForms();
				handleRadiusVisibility();
			}, 100 );
		}
	);

	// Initialize immediately if DOM is ready
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initializeForms );
	} else {
		initializeForms();
	}
} );
