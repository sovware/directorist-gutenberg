/**
 * AJAX fetch utility for admin-ajax.php calls
 * @template T
 * @param {string} url - The AJAX URL (typically admin-ajax.php)
 * @param {Object} data - The data to send as form-encoded parameters
 * @return {Promise<T>} A promise that resolves with the response text
 */
export async function ajaxFetch( url, data ) {
	const response = await fetch( url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams( data ),
	} );

	if ( ! response.ok ) {
		throw new Error( `HTTP error! status: ${ response.status }` );
	}

	return response.text();
}
