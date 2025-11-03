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

            add_action( 'wp_enqueue_scripts', function() use ( $block_name ) {
                // Check if we're on a page that uses listings
                if ( 
                    is_post_type_archive( 'at_biz_dir' ) ||
                    has_shortcode( get_post_field('post_content', get_the_ID()), 'directorist_all_listing' ) ||
                    has_shortcode( get_post_field('post_content', get_the_ID()), 'directorist_search_listing' ) ||
                    has_shortcode( get_post_field('post_content', get_the_ID()), 'directorist_search_result' )
                ) {
                    // Force enqueue the block's frontend styles
                    $style_handle = generate_block_asset_handle( $block_name, 'style' );
                    wp_enqueue_style( $style_handle );
                }
            } );
        }
    }

    public function register_block_categories( $categories ) {
        $categories[] = [
            'slug' => 'directorist-listings-archive',
            'title' => __( 'Directorist Listings Archive', 'directorist-gutenberg' ),
        ];

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