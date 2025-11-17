/**
 * WordPress dependencies
 */
import { createRoot } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import Header from './components/Header';

function AllTemplates() {
    return (
        <div className="directorist-gutenberg-templates-admin">
            <Header />
        </div>
    );
}

// Render the Admin component when DOM is ready
domReady( () => {
    // Try to find a container element, or create one
    let container = document.getElementById( 'directorist-gutenberg-templates-admin-container' );

    if ( ! container ) {
        // Try to find common admin page containers
        container = document.querySelector( '.wrap' ) ||
                   document.querySelector( '#wpbody-content' ) ||
                   document.body;

        // If we found a container, create a div inside it
        if ( container && container !== document.body ) {
            const adminDiv = document.createElement( 'div' );
            adminDiv.id = 'directorist-gutenberg-templates-admin-container';
            container.insertBefore( adminDiv, container.firstChild );
            container = adminDiv;
        } else {
            // Fallback: create container at the top of body
            container = document.createElement( 'div' );
            container.id = 'directorist-gutenberg-templates-admin-container';
            document.body.insertBefore( container, document.body.firstChild );
        }
    }

    // Render the React app
    if ( createRoot ) {
        const root = createRoot( container );
        root.render( <AllTemplates /> );
    } else {
        render( <AllTemplates />, container );
    }
} );