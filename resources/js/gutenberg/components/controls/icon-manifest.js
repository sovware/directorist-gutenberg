/**
 * Icon Manifest
 * This file contains lists of all available icons from font-awesome and line-awesome
 *
 * Uses require.context to get file names only. The SVG files themselves are loaded
 * at runtime via URL, not bundled by webpack.
 */

// Get icon file names from directories using require.context
// The webpack loader for SVGs in the icon-library directory returns just the filename
// so webpack doesn't try to emit them as assets
const requireFontAwesomeContext = require.context(
	'../../../../svg/icons/icon-library/font-awesome',
	false,
	/\.svg$/
);

const requireLineAwesomeContext = require.context(
	'../../../../svg/icons/icon-library/line-awesome',
	false,
	/\.svg$/
);

// Create icon registry - we only use .keys() to get file names
// The webpack loader prevents these from being bundled as assets
const fontAwesomeIcons = requireFontAwesomeContext.keys().map( ( filename ) => {
	const iconName = filename.replace( './', '' ).replace( '.svg', '' );
	return {
		name: iconName,
		set: 'fa',
		displayName: iconName
			.replace( /-/g, ' ' )
			.replace( /\b\w/g, ( l ) => l.toUpperCase() ),
	};
} );

const lineAwesomeIcons = requireLineAwesomeContext.keys().map( ( filename ) => {
	const iconName = filename.replace( './', '' ).replace( '.svg', '' );
	return {
		name: iconName,
		set: 'la',
		displayName: iconName
			.replace( /-/g, ' ' )
			.replace( /\b\w/g, ( l ) => l.toUpperCase() ),
	};
} );

export const allIcons = [ ...fontAwesomeIcons, ...lineAwesomeIcons ];
