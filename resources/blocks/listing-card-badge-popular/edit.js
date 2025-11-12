/**
 * WordPress dependencies
 */
import {
	AlignmentControl,
	BlockControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

/**
 * Internal dependencies
 */
import popularIcon from '@icon/fire-solid.svg';
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
			<div className="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-badge">
				<div className="directorist-gutenberg-listing-badge directorist-gutenberg-listing-badge-popular">
					<ReactSVG src={ popularIcon } />
					<span>{__('Popular', 'directorist-gutenberg')}</span>
				</div>
			</div>
		</>
	)
}
