/**
 * Get the full URL to an icon SVG file
 *
 * @param {string} iconPath - Icon path stored in attributes
 *   Supports multiple formats:
 *   - Shortest: "line-awesome/address-card-alt.svg" or "font-awesome/star.svg"
 *   - Medium: "icon-library/line-awesome/address-card-alt.svg"
 *   - Legacy: "icons/icon-library/line-awesome/address-card-alt.svg"
 * @returns {string|null} Full URL to the icon or null if path is invalid
 */
export function getIconUrl( iconPath ) {
	if ( ! iconPath ) return null;

	// Get plugin URL from WordPress localized data
	const pluginUrl =
		window.directoristGutenbergPluginData?.pluginUrl ||
		window.directoristGutenberg?.pluginUrl ||
		'/wp-content/plugins/directorist-gutenberg';

	// Handle different path formats and construct full path
	let fullPath;

	if ( iconPath.startsWith( 'icons/' ) ) {
		// Legacy format: icons/icon-library/...
		fullPath = iconPath;
	} else if ( iconPath.startsWith( 'icon-library/' ) ) {
		// Medium format: icon-library/...
		fullPath = `icons/${ iconPath }`;
	} else if (
		iconPath.includes( 'font-awesome/' ) ||
		iconPath.includes( 'line-awesome/' )
	) {
		// Shortest format: font-awesome/... or line-awesome/...
		fullPath = `icons/icon-library/${ iconPath }`;
	} else {
		// Fallback: assume it's the shortest format
		fullPath = `icons/icon-library/${ iconPath }`;
	}

	return `${ pluginUrl }/resources/svg/${ fullPath }`;
}
