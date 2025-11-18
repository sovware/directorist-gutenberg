/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';

/**
 * Enable overlay support for thumbnail block
 * This filter ensures overlay and overlay opacity controls appear in the Color panel
 */
addFilter(
	'blocks.registerBlockType',
	'directorist-gutenberg/enable-overlay-support',
	( settings, name ) => {
		// Only enable for thumbnail block
		if ( name !== 'directorist-gutenberg/listing-card-thumbnail' ) {
			return settings;
		}

		// Ensure color supports include overlay
		if ( settings.supports?.color ) {
			return {
				...settings,
				supports: {
					...settings.supports,
					color: {
						...settings.supports.color,
						overlay: true,
						__experimentalOverlayOpacity: true,
					},
				},
			};
		}

		return settings;
	}
);
