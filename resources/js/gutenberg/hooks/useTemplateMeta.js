import { useSelect } from '@wordpress/data';

export default function useTemplateMeta() {
	return useSelect( ( select ) => {
		const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {};

		return {
			directory_type_id: meta.directory_type_id || 0,
			template_type: meta.template_type || '',
		};
	}, [] );
}