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
import { useSubmissionFields } from '@directorist-gutenberg/gutenberg/hooks/useSubmissionFields';
import './editor.scss';

export default function Edit( { attributes } ) {
	const iconUrl = getIconUrl(attributes.icon);
	const { doesCustomFieldExist } = useSubmissionFields();
	const fieldExist = doesCustomFieldExist( 'number', attributes.meta_key );

	return (
		<div
			style={{ opacity: fieldExist ? 1 : 0.2 }}
			className="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-custom-text"
		>
			<div className="directorist-gutenberg-listing-card-element-content">
				{iconUrl && (
					<span className="directorist-gutenberg-listing-card-element-icon">
						<ReactSVG src={iconUrl} />
					</span>
				)}
				<div className="directorist-gutenberg-listing-card-element-details">
					<span className="directorist-gutenberg-listing-card-element-value">
						1234567890
					</span>
				</div>
			</div>
		</div>
	);
}
