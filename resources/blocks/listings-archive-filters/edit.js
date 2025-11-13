/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
// import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import './editor.scss';
import { getLocalizedBlockDataByKey } from '@directorist-gutenberg/gutenberg/localized-data';
import useBlocksPreview from '@directorist-gutenberg/gutenberg/hooks/useBlocksPreview';

export default function Edit( { attributes, setAttributes } ) {
	const directoryId = getLocalizedBlockDataByKey( 'directory_type_id', 0 );
	const { template, isLoading, refreshTemplate } = useBlocksPreview( { directoryId, blockType: 'listings-archive/filter' } );

	// useEffect( () => {
	// 	refreshTemplate( attributes );
	// }, [ attributes ] );

	return (
		<div style={ { pointerEvents: 'none' } } dangerouslySetInnerHTML={ { __html: isLoading ? 'Loading...' : template } } />
	);
}
