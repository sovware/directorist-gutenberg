/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<div>
			{__('Listings Archive Header', 'directorist-gutenberg')}
		</div>
	);
}
