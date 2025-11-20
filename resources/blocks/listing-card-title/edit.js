/**
 * WordPress dependencies
 */
import { AlignmentControl, BlockControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockPreview from '@directorist-gutenberg/gutenberg/components/block-preview';
import previewImg from '@image/blocks-preview/listing-title.webp';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	// Show block preview image
	if ( attributes.is_preview ) {
		return <BlockPreview image={ previewImg } />;
	}

	const { textAlign } = attributes;

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={ textAlign }
					onChange={ ( nextAlign ) => {
						setAttributes( { textAlign: nextAlign } );
					} }
				/>
			</BlockControls>
			<span>{ __( 'Listing Title', 'directorist-gutenberg' ) }</span>
		</>
	);
}
