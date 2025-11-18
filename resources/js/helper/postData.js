import apiFetch from '@wordpress/api-fetch';

/**
 * Helper function to post data using WordPress REST API.
 *
 * @param {string} path - The REST API endpoint to post data to.
 * @param {Object} data - The data to be posted.
 * @returns {Promise<Object>} - The response data from the API.
 */
export default async function postData( path, data, config ) {
	try {
		const response = await apiFetch( {
			path: 'directorist-gutenberg/' + path,
			method: 'POST',
			data,
			...config,
		} );

		return response;
	} catch ( error ) {
		console.error( 'Error posting data:', error );
		throw error;
	}
}
