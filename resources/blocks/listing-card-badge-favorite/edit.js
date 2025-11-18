/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { AlignmentControl, BlockControls } from '@wordpress/block-editor';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

/**
 * Internal dependencies
 */
import BlockPreview from '@directorist-gutenberg/gutenberg/components/block-preview';
import previewImg from '@image/blocks-preview/badge-favorite.webp';
import favoriteIcon from '@icon/heart.svg';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	// Show block preview image
	if ( attributes.is_preview ) {
		return <BlockPreview image={ previewImg } />;
	}

	const isActive = false;
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
			<div className="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-badge">
				<div
					className={ `directorist-gutenberg-listing-favorite-button ${
						isActive ? 'active' : ''
					}` }
				>
					<ReactSVG src={ favoriteIcon } />
				</div>
			</div>
		</>
	);
}
