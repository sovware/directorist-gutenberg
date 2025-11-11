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
	},
	exampleAttributes,
	icon: <ReactSVG src={thumbnailIcon} />,
	templateTypes: [
		'listings-archive-grid-view',
		'listings-archive-list-view',
	],
} );
