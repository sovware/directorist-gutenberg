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
import Block from './components/block.js';
import directoristLogo from '@block-icon/directorist-logo.svg';

export default function registerBlock( {
	metadata,
	fields,
	Edit,
	icon = '',
	exampleAttributes = {},
	props = {},
	showWidthControl = true
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

	// Function to render the Block component
	const renderBlock = ( attributes, setAttributes, clientId ) => (
		<Block
			fields={ fields }
			Edit={ Edit }
			attributes={ attributes }
			setAttributes={ setAttributes }
			metaData={ metadata }
			clientId={ clientId }
		/>
	);

	const EditBlock = function ( { attributes, setAttributes, clientId } ) {
		return renderBlock( attributes, setAttributes, clientId );
	};

	registerBlockType( metadata.name, {
		icon,
		example: {
			attributes: exampleAttributes,
		},
		edit: EditBlock,
		...props,
	} );
}
