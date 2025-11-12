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
import Block from './block';
import { getLocalizedBlockDataByKey } from './localized-data';
import WidthControls from './width-control';

export default function registerBlock( {
	metadata,
	Edit,
	Controls,
	icon = '',
	exampleAttributes = {},
	props = {},
	templateTypes = false,
	classNames = '',
	showWidthControls = true,
} ) {
	if ( 'directorist_gbt' !== typenow ) {
		return;
	}

	if ( templateTypes ) {
		const template_type = getLocalizedBlockDataByKey( 'template_type' );

		if ( ! templateTypes.includes( template_type ) ) {
			return;
		}
	}

	if ( ! icon ) {
		// Ensure directoristLogo is a valid URL string for ReactSVG
		// webpack asset/resource returns a URL string, but sometimes it's wrapped
		const logoUrl = typeof directoristLogo === 'string'
			? directoristLogo
			: (directoristLogo?.default || directoristLogo);

		if ( logoUrl ) {
			icon = <ReactSVG src={ logoUrl } />;
		} else {
			// Fallback to a dashicon if SVG fails to load
			icon = 'star-filled';
		}
	}

	// Wrap Edit component with Block wrapper that handles useBlockProps
	const WrappedEdit = ( editProps ) => (
		<>
			{ showWidthControls && <WidthControls attributes={editProps.attributes} setAttributes={editProps.setAttributes} /> }
			<Block
				Edit={Edit}
				Controls={Controls}
				classNames={classNames}
				{...editProps}
			/>
		</>
	);

	registerBlockType( metadata.name, {
		icon,
		example: {
			attributes: exampleAttributes,
		},
		edit: WrappedEdit,
		...props,
	} );
}
