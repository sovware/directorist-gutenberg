/**
 * Helper function to animate progress smoothly
 * @param {Function} setProgress - Function to update progress state
 * @param {number} start - Starting progress percentage
 * @param {number} end - Ending progress percentage
 * @param {number} duration - Animation duration in milliseconds
 * @returns {Promise} Promise that resolves when animation completes
 */
export function animateProgress( setProgress, start, end, duration ) {
	return new Promise( ( resolve ) => {
		const startTime = Date.now();

		const updateProgress = () => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(
				start + ( ( end - start ) * elapsed ) / duration,
				end
			);
			setProgress( Math.round( progress ) );

			if ( progress < end ) {
				requestAnimationFrame( updateProgress );
			} else {
				setProgress( end );
				resolve();
			}
		};

		updateProgress();
	} );
}

/**
 * Helper function to create a delay promise
 * @param {number} duration - Delay duration in milliseconds
 * @returns {Promise} Promise that resolves after the delay
 */
export function createDelay( duration ) {
	return new Promise( ( resolve ) => setTimeout( resolve, duration ) );
}


/**
 * Helper date formater. i.e: 23 Jan, 2025
 * @param {string} date - The date to format
 * @param {string} format - The format to use
 * @example
 * formatDate( '2025-01-23', 'en-UK' ) // 23 Jan, 2025
 * formatDate( '2025-01-23', 'en-US' ) // Jan 23, 2025
 * formatDate( '2025-01-23', 'en-GB' ) // 23 Jan, 2025
 * formatDate( '2025-01-23', 'en-AU' ) // 23 Jan, 2025
 * formatDate( '2025-01-23', 'en-CA' ) // 23 Jan, 2025
 */
export function formatDate(date, format = 'en-GB') {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.toLocaleString(format, { month: 'short' });
    const year = d.getFullYear();

    return `${day} ${month}, ${year}`;
}
