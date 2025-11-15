/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import registerBlock from '@directorist-gutenberg/gutenberg/register-block';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';
import badgeNewIcon from '@block-icon/badge-new.svg';
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
	exampleAttributes,
	icon: <ReactSVG src={badgeNewIcon} />,
	templateTypes: [
		'listings-archive-grid-view',
		'listings-archive-list-view',
	],
	props: {
		transforms: {
			from: [
				{
					type: 'block',
					blocks: [ 'directorist-gutenberg/listing-card-badge-featured', 'directorist-gutenberg/listing-card-badge-popular' ],
					transform: ( attributes ) => {
						return createBlock( 'directorist-gutenberg/listing-card-badge-new', attributes );
					},
				},
			],
			to: [
				{
					type: 'block',
					blocks: [ 'directorist-gutenberg/listing-card-badge-featured' ],
					transform: ( attributes ) => {
						return createBlock( 'directorist-gutenberg/listing-card-badge-featured', attributes );
					},
				},
				{
					type: 'block',
					blocks: [ 'directorist-gutenberg/listing-card-badge-popular' ],
					transform: ( attributes ) => {
						return createBlock( 'directorist-gutenberg/listing-card-badge-popular', attributes );
					},
				},
			],
		},
	},
} );
