<?php

defined( 'ABSPATH' ) || exit;

use DirectoristGutenberg\WpMVC\Enqueue\Enqueue;

// Register as script module for WordPress Interactivity API support
$blocks_frontend_asset = include directorist_gutenberg_dir( 'assets/build/js/blocks-frontend.asset.php' );
if ( $blocks_frontend_asset ) {
	// Ensure wp-interactivity is available for script modules
	// WordPress automatically loads it when needed, but we can ensure it's registered
	if ( function_exists( 'wp_enqueue_script_module' ) ) {
		wp_register_script_module(
			'directorist-gutenberg/blocks-frontend',
			directorist_gutenberg_url( 'assets/build/js/blocks-frontend.js' ),
			$blocks_frontend_asset['dependencies'],
			$blocks_frontend_asset['version']
		);
	} else {
		// Fallback for older WordPress versions
		Enqueue::register_script( 'directorist-gutenberg/blocks-frontend', 'build/js/blocks-frontend', $blocks_frontend_asset['dependencies'] );
	}
} else {
	// Fallback to regular script registration if asset file doesn't exist
	Enqueue::register_script( 'directorist-gutenberg/blocks-frontend', 'build/js/blocks-frontend', ['lodash'] );
}