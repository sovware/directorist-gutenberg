/**
 * WordPress dependencies
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Save() {
	const blockProps = useBlockProps.save( {
		className: 'directorist-gutenberg-listing-card-thumbnail',
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

