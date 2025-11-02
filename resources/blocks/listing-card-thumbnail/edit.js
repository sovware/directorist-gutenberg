/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './editor.scss';

export default function Edit() {
	return (
		<div {...useBlockProps()}>
			<img
				src="https://images.unsplash.com/vector-1745846418226-2e2588f6b766?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1160"
				alt="Listing Thumbnail"
			/>
		</div>
	);
}
