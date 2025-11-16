/**
 * Internal dependencies
 */
import registerBlock from '@directorist-gutenberg/gutenberg/register-block';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';
import Controls from './controls';
import archiveSearchIcon from '@block-icon/archive-search.svg';

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
	templateTypes: [ 'listings-archive' ],
	showWidthControls: false,
	icon: <ReactSVG src={archiveSearchIcon} />,
} );
