import useTemplateMeta from './useTemplateMeta';

export default function useArchiveBlockCommonTask( { setAttributes } ) {
	const { directory_type_id } = useTemplateMeta();

	setAttributes( {
		directory_type_id: directory_type_id,
	} );
}