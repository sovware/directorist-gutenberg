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
		icon = <ReactSVG src={ directoristLogo } />;
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
