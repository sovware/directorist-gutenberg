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
import { getIconUrl } from '@directorist-gutenberg/gutenberg/utils/icon-url';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const iconUrl = getIconUrl(attributes.icon);

	return (
		<>
			<div
				className="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-pricing"
			>
				<div className="directorist-gutenberg-listing-card-element-content">
					{iconUrl && (
						<span className="directorist-gutenberg-listing-card-element-icon">
							<ReactSVG src={iconUrl} />
						</span>
					)}
					<span>$1233.00</span>
				</div>
			</div>
		</>
	);
}
