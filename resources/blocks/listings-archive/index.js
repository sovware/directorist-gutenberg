/**
 * Internal dependencies
 */
import registerBlock from '@directorist-gutenberg/gutenberg/register-block';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';
import Controls from './controls';
import archiveIcon from '@block-icon/archive.svg';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

registerBlock( {
	metadata,
	Edit,
	Controls,
	icon: <ReactSVG src={archiveIcon} />,
	templateTypes: [ 'listings-archive' ],
	showWidthControls: false,
} );
