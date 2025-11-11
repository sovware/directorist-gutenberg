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
import { getIconUrl } from '@directorist-gutenberg/gutenberg/utils/icon-url';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const iconUrl = getIconUrl(attributes.icon);

	return (
		<div
			className="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-email"
		>
			<div className="directorist-gutenberg-listing-card-element-content">
				{iconUrl && (
					<span className="directorist-gutenberg-listing-card-element-icon" style={{ '--directorist-gutenberg-icon-color': attributes.icon_color }}>
						<ReactSVG src={iconUrl} width={attributes.icon_size} height={attributes.icon_size} />
					</span>
				)}
				<div className="directorist-gutenberg-listing-card-element-details">
					{ attributes.show_label && (
						<span className="directorist-gutenberg-listing-card-element-label">Email:</span>
					)}
					<span className="directorist-gutenberg-listing-card-element-value">
						info@example.com
					</span>
				</div>
			</div>
		</div>
	);
}
