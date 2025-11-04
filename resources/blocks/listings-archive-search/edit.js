import { __ } from '@wordpress/i18n';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<div>
			{__('Listings Archive Search', 'directorist-gutenberg-template')}
		</div>
	);
}
