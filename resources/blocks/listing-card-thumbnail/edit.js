/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import sampleImage from '@image/sample-image.jpg';
import './editor.scss';

export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'directorist-gutenberg-listing-card-thumbnail',
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'directorist-gutenberg-listing-card-thumbnail-front',
		}
	);

	return (
		<div { ...blockProps }>
			<div className="directorist-gutenberg-listing-card-thumbnail-back">
				<img
					className="directorist-gutenberg-listing-card-thumbnail-preview-img"
					src={ sampleImage }
					alt="Listing Thumbnail"
				/>
			</div>
			<div { ...innerBlocksProps } />
		</div>
	);
}
