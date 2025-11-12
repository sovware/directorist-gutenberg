/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	AlignmentControl,
	BlockControls,
} from '@wordpress/block-editor';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

/**
 * Internal dependencies
 */
import newIcon from '@icon/bolt-solid.svg';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
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
			<div
				className="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-badge"
			>
				<div className="directorist-gutenberg-listing-badge directorist-gutenberg-listing-badge-new">
					<ReactSVG src={ newIcon } />
					<span>{__('New', 'directorist-gutenberg')}</span>
				</div>
			</div>
		</>
	)
}
