<?php

namespace DirectoristGutenberg\App\Providers;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\WpMVC\Contracts\Provider;

class BlockServiceProvider implements Provider {
    public function boot() {
        add_action( 'init', [ $this, 'register_blocks' ] );
        add_filter( 'block_categories_all', [ $this, 'register_block_categories' ] );
    }

    public function register_blocks() {
        foreach ( directorist_gutenberg_config( 'blocks' ) as $block_name => $block_data ) {
            $name = ltrim( $block_name, 'directorist-gutenberg' );
            
            wp_enqueue_block_style(
                $block_name, [
                    'handle' => 'directorist-gutenberg/blocks-frontend',
                    'src'    => directorist_gutenberg_url( 'assets/build/css/blocks-frontend.css' )
                ]
            );

            register_block_type( $block_data['dir'] . $name );
        }
    }

    public function register_block_categories( $categories ) {
        $categories[] = [
            'slug' => 'directorist-listing-card-preset-fields',
            'title' => __( 'Directorist Preset Fields', 'directorist-gutenberg' ),
        ];

        $categories[] = [
            'slug' => 'directorist-listing-card-custom-fields',
            'title' => __( 'Directorist Custom Fields', 'directorist-gutenberg' ),
        ];

        return $categories;
    }
}