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
		<p>
			{__('Listing Title', 'directorist-gutenberg')}
		</p>
	);
}
