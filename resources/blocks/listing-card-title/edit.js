/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockPreview from '@directorist-gutenberg/gutenberg/components/block-preview';
import previewImg from '@image/blocks-preview/listing-title.webp';
import './editor.scss';

export default function Edit({ attributes }) {
	// Show block preview image
	if ( attributes.is_preview ) {
		return <BlockPreview image={ previewImg } />;
	}

	return (
		<span>
			{__('Listing Title', 'directorist-gutenberg')}
		</span>
	);
}
