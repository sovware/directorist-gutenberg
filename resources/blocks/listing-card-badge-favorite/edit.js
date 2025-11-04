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
import favoriteIcon from '@icon/heart.svg';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const isActive = false;
	return (
		<div
			className="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-badge"
		>
			<div class={ `directorist-gutenberg-listing-favorite-button ${ isActive ? 'active' : '' }` }>
				<ReactSVG src={ favoriteIcon } />
			</div>
		</div>
	)
}
