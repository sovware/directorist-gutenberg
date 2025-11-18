/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import useTemplateMeta from './useTemplateMeta';

export default function useArchiveBlockCommonTask( { setAttributes } ) {
	const { directory_type_id } = useTemplateMeta();

	useEffect( () => {
		setAttributes( {
			directory_type_id: directory_type_id,
		} );
	}, [ directory_type_id ] );
}
