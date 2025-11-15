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
import featuredIcon from '@icon/star.svg';
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
				<div className="directorist-gutenberg-listing-badge directorist-gutenberg-listing-badge-featured" style={{ backgroundColor: attributes.background_color, color: attributes.text_color }}>
					<ReactSVG src={ featuredIcon } />
					{ attributes.text && <span>{attributes.text}</span> }
				</div>
			</div>
		</>
	)
}
