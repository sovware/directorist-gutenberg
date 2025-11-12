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
import titleIcon from '@block-icon/title.svg';

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
	exampleAttributes,
	icon: <ReactSVG src={titleIcon} />,
	templateTypes: [
		'listings-archive-grid-view',
		'listings-archive-list-view',
	],
	classNames: [
		'directorist-gutenberg-listing-card-title',
	],
	props: {
		transforms: {
			from: [
				{
					type: 'block',
					blocks: [ 'core/post-title' ],
					transform: ( attributes ) => {
						return createBlock( 'directorist-gutenberg/listing-card-title', attributes );
					},
				},
			],
			to: [
				{
					type: 'block',
					blocks: [ 'core/post-title' ],
					transform: ( attributes ) => {
						return createBlock( 'core/post-title', attributes );
					},
				},
			],
		},
	},
} );
