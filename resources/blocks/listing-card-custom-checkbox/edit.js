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
import BlockPreview from '@directorist-gutenberg/gutenberg/components/block-preview';
import previewImg from '@image/blocks-preview/checkbox.webp';
import { getIconUrl } from '@directorist-gutenberg/gutenberg/utils/icon-url';
import { useSubmissionFields } from '@directorist-gutenberg/gutenberg/hooks/useSubmissionFields';
import './editor.scss';

export default function Edit( { attributes } ) {
	// Show block preview image
	if ( attributes.is_preview ) {
		return <BlockPreview image={ previewImg } />;
	}

	const iconUrl = getIconUrl( attributes.icon );
	const { doesCustomFieldExist } = useSubmissionFields();
	const fieldExist = doesCustomFieldExist( 'checkbox', attributes.meta_key );

	return (
		<div
			style={ { opacity: fieldExist ? 1 : 0.2 } }
			className="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-custom-checkbox"
		>
			<div className="directorist-gutenberg-listing-card-element-content">
				{ iconUrl && (
					<span
						className="directorist-gutenberg-listing-card-element-icon"
						style={ {
							'--directorist-gutenberg-icon-color':
								attributes.icon_color,
						} }
					>
						<ReactSVG
							src={ iconUrl }
							width={ attributes.icon_size }
							height={ attributes.icon_size }
						/>
					</span>
				) }
				<div className="directorist-gutenberg-listing-card-element-details">
					<span className="directorist-gutenberg-listing-card-element-value">
						{ __( 'Option 1, Option 2', 'directorist-gutenberg' ) }
					</span>
				</div>
			</div>
		</div>
	);
}
