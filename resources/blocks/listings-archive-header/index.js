/**
 * Internal dependencies
 */
import registerBlock from '@directorist-gutenberg/gutenberg/register-block';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';
import Controls, { StylesControls } from './controls';
import archiveHeaderIcon from '@block-icon/archive-header.svg';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

registerBlock( {
	metadata,
	Edit,
	Controls,
	StylesControls,
	templateTypes: [ 'listings-archive' ],
	showWidthControls: false,
	icon: <ReactSVG src={ archiveHeaderIcon } />,
} );
