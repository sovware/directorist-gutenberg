const path = require('path');
const fs = require( 'fs-extra' );
const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const I18nLoaderWebpackPlugin = require( '@automattic/i18n-loader-webpack-plugin' );

// Remove old build files
fs.removeSync( path.resolve( __dirname, './assets/build/' ) );
fs.removeSync( path.resolve( __dirname, './assets/blocks/' ) );

const chunkUniqueKey = Date.now().toString();

const resolve = {
	alias: {
		'@directorist-gutenberg': path.resolve( __dirname, 'resources/js' ),
		'@blocks': path.resolve( __dirname, 'resources/blocks' ),
		'@utils': path.resolve( __dirname, 'resources/js/utils' ),
		'@icon': path.resolve( __dirname, 'resources/svg/icons' ),
		'@block-icon': path.resolve( __dirname, 'resources/blocks-icon' ),
		'@assets': path.resolve( __dirname, 'assets' ),
		'@image': path.resolve( __dirname, 'resources/images' ),
	},
};

const plugins = [
	...defaultConfig[ 0 ].plugins.reduce( ( acc, plugin ) => {
		if (
			plugin.constructor.name !== 'DependencyExtractionWebpackPlugin' &&
			plugin.constructor.name !== 'RtlCssPlugin'
		) {
			acc.push( plugin );
		}
		return acc;
	}, [] ),
	new I18nLoaderWebpackPlugin( {
		textdomain: 'directorist-gutenberg',
	} ),
	new DependencyExtractionWebpackPlugin(),
];

const moduleConfig = {
	...defaultConfig[ 0 ].module,
	rules: [
		// Filter out default SVG rules from WordPress scripts - we handle SVGs explicitly
		// This prevents WordPress scripts from processing SVGs into React components
		...defaultConfig[ 0 ].module.rules.filter(
			( rule ) => {
				// Exclude any SVG rules that WordPress scripts might have
				// (WordPress scripts may use @svgr/webpack which transforms SVGs)
				if ( rule.test && rule.test.toString().includes( 'svg' ) ) {
					return false;
				}
				return true;
			}
		),
		{
			test: /\.(bmp|png|jpe?g|gif|webp)$/i,
			type: 'asset/resource',
			generator: {
				filename: 'images/[name][ext]',
			},
		},
		{
			// Special rule for SVG icons directory (font-awesome and line-awesome)
			// Only used with require.context to get file names, not to bundle
			test: /\.svg$/i,
			include: [
				path.resolve(__dirname, 'resources/svg/icons/icon-library'),
			],
			// Use a simple loader that just returns the module path for require.context
			// This prevents webpack from trying to emit the files as assets
			use: {
				loader: path.resolve(__dirname, 'webpack-svg-name-loader.js'),
			},
		},
		{
			// All other SVGs (like block icons, times.svg, etc.) - treat as assets
			test: /\.svg$/i,
			exclude: [
				path.resolve(__dirname, 'resources/svg/icons/icon-library'),
			],
			type: 'asset/resource',
			generator: {
				filename: 'icons/[name][ext]',
			},
		},
	],
};

module.exports = [
	{
		...defaultConfig[ 0 ],
		output: {
			...defaultConfig[ 0 ].output,
			path: path.resolve( __dirname, './assets/blocks/' ),
		},
		module: moduleConfig,
		plugins,
		resolve,
	},
	{
		...defaultConfig[0],
		module: moduleConfig,
		entry: {
			/**
			 * Block scripts
			 */
			'js/blocks-editor': './resources/js/block-sripts/editor.js',
			'js/blocks-frontend': './resources/js/block-sripts/frontend.js',
			'css/blocks-frontend': './resources/sass/blocks/frontend.scss',
			'css/blocks-editor': './resources/sass/blocks/editor.scss',
		},
		output: {
			...defaultConfig[ 0 ].output,
			path: path.resolve( __dirname, './assets/build/' ),
			filename: '[name].js',
			chunkFilename: 'chunk/[name].js?ver=' + chunkUniqueKey,
		},
		plugins: plugins.reduce( ( acc, plugin ) => {
			if ( plugin.constructor.name !== 'CopyPlugin' ) {
				acc.push( plugin );
			}
			return acc;
		}, [] ),
		resolve,
	},
];
