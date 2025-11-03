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
import Controls from './controls';
import { getIconUrl } from '@directorist-gutenberg/gutenberg/utils/icon-url';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const iconUrl = getIconUrl(attributes.icon);

	return (
		<>
			<Controls attributes={attributes} setAttributes={setAttributes} />
			<div
				{...useBlockProps()}
				className="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-phone"
			>
				<div className="directorist-gutenberg-listing-card-element-content">
					{iconUrl && (
						<span className="directorist-gutenberg-listing-card-element-icon">
							<ReactSVG src={iconUrl} />
						</span>
					)}
					<div className="directorist-gutenberg-listing-card-element-details">
						{ attributes?.show_label && (
							<span className="directorist-gutenberg-listing-card-element-label">Phone:</span>
						)}
						<span className="directorist-gutenberg-listing-card-element-value">
							(123) 456-7890
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
