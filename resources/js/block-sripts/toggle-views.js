/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ToggleViewsDropdown from '../gutenberg/components/EditorToggleViews';

domReady( () => {
	const findAndInject = () => {
		// Try multiple selectors for the header settings
		let headerSettings = document.querySelector( '.editor-header__settings' ) ||
			document.querySelector( '.edit-post-header__settings' ) ||
			document.querySelector( '.interface-complementary-area-header__actions' ) ||
			document.querySelector( '[class*="header"][class*="settings"]' );

		if ( ! headerSettings ) {
			// Retry after a short delay
			setTimeout( findAndInject, 500 );
			return;
		}

		// Check if already injected
		if ( document.getElementById( 'directorist-toggle-views-container' ) ) {
			return;
		}

		// Create the React app container div
		let reactAppElement = document.createElement( 'div' );
		reactAppElement.id = 'directorist-toggle-views-container';

		// Insert the button as the first element in the header settings
		headerSettings.insertBefore(
			reactAppElement,
			headerSettings.firstChild
		);

		// Render the React app inside the new div
		if ( createRoot ) {
			const root = createRoot( reactAppElement );
			root.render( <ToggleViewsDropdown /> );
		} else {
			render( <ToggleViewsDropdown />, reactAppElement );
		}
	};

	// Start trying to find the element
	setTimeout( findAndInject, 100 );
} );