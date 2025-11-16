/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import {
	useInnerBlocksProps,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockPreview from '@directorist-gutenberg/gutenberg/components/block-preview';
import previewImg from '@image/blocks-preview/thumbnail.webp';
import sampleImage from '@image/sample-image.webp';
import DimensionControls from './dimension-controls';
import OverlayControls from './overlay-controls';
import Overlay from './overlay';
import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
	// Show block preview image
	if ( attributes.is_preview ) {
		return <BlockPreview image={ previewImg } />;
	}

	const { aspectRatio, width, height, scale } = attributes;

	const blockProps = useBlockProps( {
		className: 'directorist-gutenberg-listing-card-thumbnail',
		style: { width, height, aspectRatio },
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'directorist-gutenberg-listing-card-thumbnail-front',
		}
	);

	const imageStyles = {
		height: aspectRatio ? '100%' : height,
		width: !! aspectRatio && '100%',
		objectFit: !! ( height || aspectRatio ) && scale,
	};

	return (
		<>
			<InspectorControls group="color">
				<OverlayControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					clientId={ clientId }
				/>
			</InspectorControls>
			<InspectorControls group="dimensions">
				<DimensionControls
					clientId={ clientId }
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</InspectorControls>
			<div { ...blockProps }>
				<div className="directorist-gutenberg-listing-card-thumbnail-back">
					<img
						className="directorist-gutenberg-listing-card-thumbnail-preview-img"
						src={ sampleImage }
						alt="Listing Thumbnail"
						style={ imageStyles }
					/>
				</div>
				<div { ...innerBlocksProps } />
				<Overlay
					attributes={ attributes }
					setAttributes={ setAttributes }
					clientId={ clientId }
				/>
			</div>
		</>
	);
}
