import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useState, useEffect } from '@wordpress/element';

export default function useBlocksPreview( { directoryId, blockType, blockAttributes = {} } ) {
    const [ args, setArgs ] = useState( blockAttributes );
    const [ appliedArgs, setAppliedArgs ] = useState( null );
    const [ template, setTemplate ] = useState( '' );
    const [ isLoading, setIsLoading ] = useState( false );

	useEffect( () => {
		if (
			appliedArgs &&
			JSON.stringify( args ) === JSON.stringify( appliedArgs )
		) {
			return;
		}

		fetchTemplate();
	}, [ args ] );

    function refreshTemplate( newBlockAttributes = {} ) {
        setArgs( newBlockAttributes );
    }

    function fetchTemplate() {
        if ( isLoading ) {
            return;
        }

		const url = addQueryArgs( `/directorist-gutenberg/blocks-preview/${blockType}`, {
			directory_id: directoryId,
            ...args,
		} );

        setIsLoading( true );

		apiFetch( { path: url } ).then( ( response ) => {
			setTemplate( response.template );
			setIsLoading( false );
            setAppliedArgs( args );
		} ).catch( ( error ) => {
			console.error( 'error', error );
			setIsLoading( false );
		} );
	}

	function fetchTemplate() {
		const url = addQueryArgs(
			`/directorist-gutenberg/blocks-preview/${ blockType }`,
			{
				directory_id: directoryId,
				...args,
			}
		);

		setIsLoading( true );

		apiFetch( { path: url } )
			.then( ( response ) => {
				setTemplate( response.template );
				setIsLoading( false );
				setAppliedArgs( args );
			} )
			.catch( ( error ) => {
				console.error( 'error', error );
				setIsLoading( false );
			} );
	}

	return {
		template,
		isLoading,
		refreshTemplate,
	};
}
