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
import favoriteIcon from '@icon/heart.svg';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	return (
		<div
			{...useBlockProps()}
			className="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-badge"
			style={ { display: 'inline-block' } }
		>
			<div class="directorist-gutenberg-listing-badge directorist-gutenberg-listing-badge-favorite">
				<ReactSVG src={ favoriteIcon } />
				<span>{__('Favorite', 'directorist-gutenberg')}</span>
			</div>
		</div>
	)
}
