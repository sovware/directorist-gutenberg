/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

/**
 * Internal dependencies
 */
import directoristLogo from '@block-icon/directorist-logo.svg';

export default function registerBlock( {
	metadata,
	Edit,
	icon = '',
	exampleAttributes = {},
	props = {},
} ) {
	if ( 'directorist_gbt' !== typenow ) {
		return;
	}

	if ( ! icon ) {
		// Ensure directoristLogo is a valid URL string for ReactSVG
		// webpack asset/resource returns a URL string, but sometimes it's wrapped
		const logoUrl = typeof directoristLogo === 'string'
			? directoristLogo
			: (directoristLogo?.default || directoristLogo);

		console.log('directoristLogo', directoristLogo);

		console.log('logoUrl', logoUrl);


		if ( logoUrl ) {
			icon = <ReactSVG src={ logoUrl } />;
		} else {
			// Fallback to a dashicon if SVG fails to load
			icon = 'star-filled';
		}
	}

	registerBlockType( metadata.name, {
		icon,
		example: {
			attributes: exampleAttributes,
		},
		edit: Edit,
		...props,
	} );
}
