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
		...defaultConfig[ 0 ].module.rules.filter(
			( rule ) => rule.type !== 'asset/resource'
		),
		{
			test: /\.(bmp|png|jpe?g|gif|webp)$/i,
			type: 'asset/resource',
			generator: {
				filename: 'images/[name][ext]',
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
