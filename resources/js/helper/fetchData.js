import apiFetch from '@wordpress/api-fetch';

export default async function fetchData( path, config ) {
	return await apiFetch( {
		path: 'directorist-gutenberg/' + path,
		...config,
	} )
		.then( ( res ) => {
			return res;
		} )
		.catch( ( error ) => {
			throw error;
		} );
}
