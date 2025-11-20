/**
 * Simple webpack loader for SVG icons used in require.context
 * Returns just the filename without bundling the SVG content as an asset
 * This prevents webpack from trying to emit multiple chunks with the same SVG file
 */
module.exports = function svgNameLoader( source ) {
	// Extract just the filename from the resource path
	const resourcePath = this.resourcePath;
	const filename = resourcePath.split( '/' ).pop();
	const iconName = filename.replace( '.svg', '' );

	// Return a simple ES module that exports the icon name
	// This module won't cause webpack to emit the SVG as an asset
	// because we're returning JavaScript, not an asset reference
	return `export default "${ iconName }";`;
};
