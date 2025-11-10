/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

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
	return (
		<div
			className="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-badge"
		>
			<div class="directorist-gutenberg-listing-badge directorist-gutenberg-listing-badge-featured">
				<ReactSVG src={ featuredIcon } />
				<span>{__('Featured', 'directorist-gutenberg')}</span>
			</div>
		</div>
	)
}
