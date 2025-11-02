/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './editor.scss';
import Controls from './controls';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<>
			<Controls attributes={ attributes } setAttributes={ setAttributes } />
			<div {...useBlockProps()}>
				{__('Listings Archive', 'directorist-gutenberg-template')}
			</div>
		</>
	);
}
