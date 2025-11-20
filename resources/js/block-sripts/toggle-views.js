/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ToggleViewsDropdown from '../gutenberg/components/EditorToggleViews';
import AiAssistantToggle from '../gutenberg/components/AiAssistantToggle';
import AiAssistantChatPanel from '../gutenberg/components/AiAssistantChatPanel';

domReady( () => {
	const findAndInject = () => {
		// Try multiple selectors for the header settings
		let headerSettings =
			document.querySelector( '.editor-header__settings' ) ||
			document.querySelector( '.edit-post-header__settings' ) ||
			document.querySelector(
				'.interface-complementary-area-header__actions'
			) ||
			document.querySelector( '[class*="header"][class*="settings"]' );

		let gutenbergEditorBody = document.querySelector( '.post-type-directorist_gbt' );

		if ( ! headerSettings || ! gutenbergEditorBody ) {
			// Retry after a short delay
			setTimeout( findAndInject, 500 );
			return;
		}

		// Check if already injected
		if ( document.getElementById( 'directorist-toggle-views-container' ) && document.getElementById( 'directorist-ai-assistant-chat-button-wrapper' ) ) {
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

		// Create the wrapper div for chat button toggle
		let chatButtonWrapper = document.createElement( 'div' );
		chatButtonWrapper.id = 'directorist-ai-assistant-chat-button-wrapper';
		gutenbergEditorBody.insertBefore( chatButtonWrapper, gutenbergEditorBody.firstChild );

		// Render the React app inside the header settings div
		if ( createRoot ) {
			const root = createRoot( reactAppElement );
			root.render( <div className="directorist-gutenberg-toolbar-actions"><ToggleViewsDropdown /> <AiAssistantToggle /></div> );
		} else {
			render( <div className="directorist-gutenberg-toolbar-actions"><ToggleViewsDropdown /> <AiAssistantToggle /></div>, reactAppElement );
		}

		// Render the AI Assistant Chat Toggle inside the gutenberg editor body
		if ( createRoot ) {
			const chatRoot = createRoot( chatButtonWrapper );
			chatRoot.render( <AiAssistantChatPanel /> );
		} else {
			render( <AiAssistantChatPanel />, chatButtonWrapper );
		}
	};

	// Start trying to find the element
	setTimeout( findAndInject, 100 );
} );
