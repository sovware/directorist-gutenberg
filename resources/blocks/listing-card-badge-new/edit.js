/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

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
	return (
		<div
			{...useBlockProps()}
			className="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-badge"
			style={ { display: 'inline-block' } }
		>
			<div class="directorist-gutenberg-listing-badge directorist-gutenberg-listing-badge-new">
				<ReactSVG src={ newIcon } />
				<span>{__('New', 'directorist-gutenberg')}</span>
			</div>
		</div>
	)
}
