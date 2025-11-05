/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import userAvatarImage from '@image/default-avatar.jpg';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	return (
		<div
			className={`directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-user-avatar`}
		>
			<div className={`directorist-gutenberg-listing-card-element-content directorist-gutenberg-listing-card-element-content-${attributes.alignment}`}>
				<div className="directorist-gutenberg-listing-user-avatar">
					<img src={userAvatarImage} alt="User Avatar" />
				</div>
			</div>
		</div>
	);
}
