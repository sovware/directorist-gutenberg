<?php

use DirectoristGutenberg\WpMVC\Enqueue\Enqueue;

defined( 'ABSPATH' ) || exit;

/**
 * Builder scripts
 */
if ( directorist_gutenberg_post_type() === get_post_type() ) {
    Enqueue::script( 'directorist-gutenberg/blocks-editor', 'build/js/blocks-editor', ['lodash'] );
    Enqueue::style( 'directorist-gutenberg/blocks-editor', 'build/css/blocks-editor' );

    wp_localize_script(
        'directorist-gutenberg/blocks-editor', 'directorist_gutenberg_editor_data', [
            'template_type' => get_post_meta( get_post()->ID, "_directorist_template_type", true ),
        ]
    );
}
