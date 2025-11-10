import debounce from '@utils/debounce';
import { handleRadiusVisibility } from './utils/utils';

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
		setTimeout(handleRadiusVisibility, 150);
	});

	// Initialize radius search functionality
	function initRadiusSearch() {
		initMapApiField();
		handleRadiusVisibility();
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
					country: directorist.restricted_countries,
				},
			};
			var options = directorist.countryRestriction ? opt : '';
			var input_fields = [
				{
					input_class: '.directorist-location-js',
					lat_id: 'cityLat',
					lng_id: 'cityLng',
					options: options,
				},
			];

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

					var autocomplete = new google.maps.places.Autocomplete(
						elm,
						field.options
					);
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
						handleRadiusVisibility();

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

		var input_fields = [
			{
				input_elm: '.directorist-location-js',
				search_result_elm: '.address_result',
				getResultContainer: getResultContainer,
			},
		];

		input_fields.forEach(function (field) {
			if (!$(field.input_elm).length) {
				return;
			}

			// Remove existing handlers to prevent duplicates
			$(field.input_elm).off('keyup.radiusSearch');

			$(field.input_elm).on(
				'keyup.radiusSearch',
				debounce(function (event) {
					event.preventDefault();
					var blockedKeyCodes = [
						16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 91, 93,
						112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145,
					];

					// Return early when blocked key is pressed
					if (blockedKeyCodes.includes(event.keyCode)) {
						return;
					}

					var $locationField = $(this).closest('.directorist-search-field');
					var result_container = field.getResultContainer(this, field);
					var search = $(this).val();

					if (search.length < 3) {
						result_container.css({
							display: 'none',
						});
						handleRadiusVisibility();
						return;
					}

					$locationField.addClass('atbdp-form-fade');
					result_container.css({
						display: 'block',
					});

					$.ajax({
						url:
							'https://nominatim.openstreetmap.org/?q=%27+' +
							search +
							'+%27&format=json',
						type: 'GET',
						data: {},
						success: function (data) {
							var res = '';
							var currentIconURL =
								directorist.assets_url +
								'icons/font-awesome/svgs/solid/paper-plane.svg';
							var currentIconHTML = directorist.icon_markup
								.replace('##URL##', currentIconURL)
								.replace('##CLASS##', '');
							var currentLocationIconHTML =
								"<span class='location-icon'>" + currentIconHTML + '</span>';
							var currentLocationAddressHTML =
								"<span class='location-address'></span>";
							var iconURL =
								directorist.assets_url +
								'icons/font-awesome/svgs/solid/map-marker-alt.svg';
							var iconHTML = directorist.icon_markup
								.replace('##URL##', iconURL)
								.replace('##CLASS##', '');
							var locationIconHTML =
								"<span class='location-icon'>" + iconHTML + '</span>';

							for (
								var i = 0, len = data.length > 5 ? 5 : data.length;
								i < len;
								i++
							) {
								res +=
									'<li><a href="#" data-lat=' +
									data[i].lat +
									' data-lon=' +
									data[i].lon +
									'>' +
									locationIconHTML +
									"<span class='location-address'>" +
									data[i].display_name +
									'</span></a></li>';
							}

							function displayLocation(position, event) {
								var lat = position.coords.latitude;
								var lng = position.coords.longitude;
								$.ajax({
									url:
										'https://nominatim.openstreetmap.org/reverse?format=json&lon=' +
										lng +
										'&lat=' +
										lat,
									type: 'GET',
									data: {},
									success: function (data) {
										$('.directorist-location-js').val(data.display_name);
										$('.directorist-location-js').attr(
											'data-value',
											data.display_name
										);

										// Find and set lat/lng in the same form
										var $locationInput = $('.directorist-location-js');
										var $searchField = $locationInput.closest(
											'.directorist-search-field'
										);
										if ($searchField.length) {
											$searchField.find('#cityLat').val(lat);
											$searchField.find('#cityLng').val(lng);
										}

										var locationSearch = $('.directorist-search-location');
										if (locationSearch.length) {
											locationSearch.trigger('change');
										}

										handleRadiusVisibility();
									},
								});
							}

							result_container.html(
								'<ul>' +
									"<li><a href='#' class='current-location'>" +
									currentLocationIconHTML +
									currentLocationAddressHTML +
									'</a></li>' +
									res +
									'</ul>'
							);

							if (res.length) {
								result_container.show();
							} else {
								result_container.hide();
							}

							$locationField.removeClass('atbdp-form-fade');

							// Handle current location click
							$('body')
								.off('click', '.address_result .current-location')
								.on('click', '.address_result .current-location', function (e) {
									e.preventDefault();
									if (navigator.geolocation) {
										navigator.geolocation.getCurrentPosition(function (
											position
										) {
											return displayLocation(position, e);
										});
									}
								});
						},
						error: function (error) {
							console.log({
								error: error,
							});
							$locationField.removeClass('atbdp-form-fade');
						},
					});
				}, 750)
			);
		});

		// Hide address result when click outside the input field
		$(document).on('click', function (e) {
			if (
				!$(e.target).closest(
					'.directorist-location-js, .current-location, .address_result'
				).length
			) {
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
			var $locationInput = $(context)
				.closest(args.result_list_container)
				.siblings('.directorist-location-js');
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

			handleRadiusVisibility();
		};

		$('body').on('click', '.address_result ul li a', function (event) {
			syncLatLngData(this, event, {
				result_list_container: '.address_result',
			});
		});
	}

	// Initialize Zipcode Search
	function initZipcodeSearch() {
		// Remove existing handlers to prevent duplicates
		$('body').off('keyup.radiusSearchZip', '.zip-radius-search');

		$('body').on(
			'keyup.radiusSearchZip',
			'.zip-radius-search',
			debounce(function () {
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
						zipcode: zipcode,
					};
				} else {
					url =
						'https://nominatim.openstreetmap.org/?postalcode=' +
						zipcode +
						'&format=json&addressdetails=1';
					$('.directorist-country').css({
						display: 'block',
					});
					if (zipcode === '') {
						$('.directorist-country').css({
							display: 'none',
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

						if (
							directorist.i18n_text.select_listing_map === 'google' &&
							data.data &&
							data.data.error_message
						) {
							zipcode_search.find('.error_message').remove();
							zipcode_search.find('.zip-cityLat').val('');
							zipcode_search.find('.zip-cityLng').val('');
							zipcode_search.append(data.data.error_message);
							return;
						}

						if (
							directorist.i18n_text.select_listing_map === 'google' &&
							typeof data.lat !== 'undefined' &&
							typeof data.lng !== 'undefined'
						) {
							zipcode_search.find('.error_message').remove();
							zipcode_search.find('.zip-cityLat').val(data.lat);
							zipcode_search.find('.zip-cityLng').val(data.lng);
							handleRadiusVisibility();
						} else if (directorist.i18n_text.select_listing_map === 'openstreet') {
							if (data.length === 1) {
								var lat = data[0].lat;
								var lon = data[0].lon;
								zipcode_search.find('.zip-cityLat').val(lat);
								zipcode_search.find('.zip-cityLng').val(lon);
								handleRadiusVisibility();
							} else {
								for (var i = 0; i < data.length; i++) {
									res +=
										"<li><a href=\"#\" data-lat=" +
										data[i].lat +
										' data-lon=' +
										data[i].lon +
										'>' +
										data[i].address.country +
										'</a></li>';
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
					},
				});
			}, 250)
		);
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
				handleRadiusVisibility();

				// Trigger change event
				zipcode_search.trigger('change');
			}
		});
	}

	// Trigger radius visibility on location/zipcode changes
	$('body').on(
		'keyup keydown input change focus',
		'.directorist-location-js, .zip-radius-search',
		function (e) {
			handleRadiusVisibility();
		}
	);

	// Initialize zipcode search and country selection
	initZipcodeSearch();
	initCountrySelection();

	// Hide address result initially
	$('.address_result').hide();
});

