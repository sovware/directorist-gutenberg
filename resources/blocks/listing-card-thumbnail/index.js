/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import { select, dispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import registerBlock from '@directorist-gutenberg/gutenberg/register-block';
import './style.scss';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import thumbnailIcon from '@block-icon/thumbnail.svg';
import Controls from './controls';
/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

const exampleAttributes = {
	is_preview: true,
};

registerBlock( {
	metadata,
	Edit,
	Controls,
	props: {
		save: Save,
		transforms: {
			from: [
				{
					type: 'block',
					blocks: [ 'core/post-featured-image' ],
					transform: ( attributes ) => {
						return createBlock(
							'directorist-gutenberg/listing-card-thumbnail',
							attributes
						);
					},
				},
			],
			to: [
				{
					type: 'block',
					blocks: [ 'core/post-featured-image' ],
					transform: ( attributes ) => {
						return createBlock(
							'core/post-featured-image',
							attributes
						);
					},
				},
			],
		},
	},
	exampleAttributes,
	icon: <ReactSVG src={ thumbnailIcon } />,
	templateTypes: [
		'listings-archive-grid-view',
		'listings-archive-list-view',
	],
} );

// Filter to prevent thumbnail block from being inserted when inside a thumbnail block
addFilter(
	'blocks.registerBlockType',
	'directorist-gutenberg/listing-card-thumbnail/prevent-nesting',
	( settings, name ) => {
		// Only modify the thumbnail block
		if ( name !== 'directorist-gutenberg/listing-card-thumbnail' ) {
			return settings;
		}

		// Store original edit function
		const originalEdit = settings.edit;

		// Wrap edit function to check parent context and prevent insertion
		settings.edit = ( props ) => {
			const { clientId } = props;

			// Check if we're inside a thumbnail block
			try {
				const blockEditor = select( 'core/block-editor' );
				if ( blockEditor ) {
					const parents = blockEditor.getBlockParents(
						clientId,
						true
					);
					const hasThumbnailParent = parents.some(
						( parentId ) =>
							blockEditor.getBlockName( parentId ) ===
							'directorist-gutenberg/listing-card-thumbnail'
					);

					if ( hasThumbnailParent ) {
						// Return null to prevent rendering and effectively prevent insertion
						return null;
					}
				}
			} catch ( e ) {
				// If store is not available, continue normally
			}

			// Call original edit function
			return originalEdit ? originalEdit( props ) : null;
		};

		return settings;
	}
);

// Also filter BlockListBlock to prevent rendering if somehow inserted
addFilter(
	'editor.BlockListBlock',
	'directorist-gutenberg/listing-card-thumbnail/prevent-rendering',
	( BlockListBlock ) => {
		return ( props ) => {
			const { name, clientId } = props;

			// If this is the thumbnail block or post-featured-image block
			if (
				name === 'directorist-gutenberg/listing-card-thumbnail' ||
				name === 'core/post-featured-image'
			) {
				// Check if we're inside a thumbnail block
				try {
					const blockEditor = select( 'core/block-editor' );
					if ( blockEditor ) {
						const parents = blockEditor.getBlockParents(
							clientId,
							true
						);
						const hasThumbnailParent = parents.some(
							( parentId ) =>
								blockEditor.getBlockName( parentId ) ===
								'directorist-gutenberg/listing-card-thumbnail'
						);

						if ( hasThumbnailParent ) {
							// Don't render if nested inside thumbnail
							// Also remove it from the editor
							setTimeout( () => {
								dispatch( 'core/block-editor' ).removeBlocks(
									[ clientId ],
									false
								);
							}, 0 );
							return null;
						}
					}
				} catch ( e ) {
					// If store is not available, continue normally
				}
			}

			return <BlockListBlock { ...props } />;
		};
	}
);
