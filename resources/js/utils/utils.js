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

/**
 * Helper function to convert icon class name to SVG path
 * @param {string} iconClass - Icon class name (e.g., "las la-business-time", "fas fa-home", "lab la-codepen")
 * @returns {string|null} SVG path or null if invalid
 * @example
 * getIconSvgPath( 'las la-business-time' ) // '@icon/icon-library/line-awesome/business-time-solid.svg'
 * getIconSvgPath( 'fas fa-home' ) // '@icon/icon-library/font-awesome/home.svg'
 * getIconSvgPath( 'lab la-codepen' ) // '@icon/icon-library/line-awesome/codepen.svg'
 */
export function getIconSvgPath( iconClass ) {
	if ( ! iconClass || typeof iconClass !== 'string' ) {
		return null;
	}

	const parts = iconClass.trim().split( ' ' );

	if ( parts.length < 2 ) {
		return null;
	}

	const prefix = parts[ 0 ]; // "las", "fas", "far", "lab"
	const iconName = parts[ 1 ]; // "la-business-time", "fa-home", "la-codepen"

	// Line Awesome Solid (las)
	if ( prefix === 'las' ) {
		// Remove "la-" prefix and add "-solid" suffix
		const name = iconName.replace( /^la-/, '' );
		return `@icon/icon-library/line-awesome/${ name }-solid.svg`;
	}

	// Line Awesome Brand (lab)
	if ( prefix === 'lab' ) {
		// Remove "la-" prefix, no suffix needed
		const name = iconName.replace( /^la-/, '' );
		return `@icon/icon-library/line-awesome/${ name }.svg`;
	}

	// Font Awesome Solid (fas) or Regular (far)
	if ( prefix === 'fas' || prefix === 'far' ) {
		// Remove "fa-" prefix, no suffix needed
		const name = iconName.replace( /^fa-/, '' );
		return `@icon/icon-library/font-awesome/${ name }.svg`;
	}

	return null;
}
