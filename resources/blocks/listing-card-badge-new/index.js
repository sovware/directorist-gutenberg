/**
 * Internal dependencies
 */
import registerBlock from '@directorist-gutenberg/gutenberg/register-block';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';
import badgeNewIcon from '@block-icon/badge-new.svg';

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
	icon: <ReactSVG src={badgeNewIcon} />,
	templateTypes: [
		'listings-archive-grid-view',
		'listings-archive-list-view',
	],
} );
