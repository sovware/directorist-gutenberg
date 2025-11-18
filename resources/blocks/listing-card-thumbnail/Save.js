/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { aspectRatio, width, height } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'directorist-gutenberg-listing-card-thumbnail',
		style: { width, height, aspectRatio },
	} );

	return (
		<div { ...blockProps }>
			<div className="directorist-gutenberg-listing-card-thumbnail-back"></div>
			<div className="directorist-gutenberg-listing-card-thumbnail-front">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
