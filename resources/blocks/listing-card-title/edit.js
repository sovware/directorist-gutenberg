/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.scss';

export default function Edit() {
	return (
		<span>
			{__('Listing Title', 'directorist-gutenberg')}
		</span>
	);
}
