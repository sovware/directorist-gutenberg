import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import Controls from './controls';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	return (
		<>
			<Controls attributes={ attributes } setAttributes={ setAttributes } />
			<div {...useBlockProps()}>
				{__('Listings Archive Search', 'directorist-gutenberg-template')}
			</div>
		</>
	);
}
