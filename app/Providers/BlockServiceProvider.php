<?php

namespace DirectoristGutenberg\App\Providers;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\WpMVC\Contracts\Provider;
use WP_Block_Editor_Context;
use DirectoristGutenberg\App\Repositories\TemplateRepository;
use DirectoristGutenberg\App\DTO\TemplateReadDTO;

class BlockServiceProvider implements Provider {
    public function boot() {
        add_action( 'init', [ $this, 'register_blocks' ] );
        add_filter( 'block_categories_all', [ $this, 'register_block_categories' ], 10, 2 );
        add_action( 'enqueue_block_editor_assets', [ $this, 'localize_block_editor_scripts' ] );
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

    public function localize_block_editor_scripts() {
        // Get the first block to localize data for all blocks
        $blocks = directorist_gutenberg_config( 'blocks' );
        
        if ( empty( $blocks ) ) {
            return;
        }

        // Get the first block name to attach the localized data
        $first_block = array_key_first( $blocks );
        
        // Generate the editor script handle for the first block
        $script_handle = generate_block_asset_handle( $first_block, 'editorScript' );

        $directory_type_id = get_post_meta( get_post()->ID, "directory_type_id", true );

        /**
         * @var TemplateRepository
         */
        $template_repository = directorist_gutenberg_singleton( TemplateRepository::class );

        $templates = $template_repository->get( 
            ( new TemplateReadDTO )
                ->set_directory_type( $directory_type_id )
                ->set_page( 1 )
                ->set_per_page( 100 )
        );

        $template_links = array_map( function( $template ) {
            return [
                'id'         => $template->ID,
                'title'      => $template->post_title,
                'is_current' => (int) $template->ID === (int) get_post()->ID,
                'status'     => $template->post_status,
                'url'        => get_edit_post_link( $template->ID ),
            ];
        }, $templates['items'] );

        // Prepare localized data
        $localized_data = [
            'template_type'          => get_post_meta( get_post()->ID, "template_type", true ),
            'directory_type_id'      => get_post_meta( get_post()->ID, "directory_type_id", true ),
            'submission_form_fields' => ! empty( $directory_type_id ) ? get_term_meta( $directory_type_id, "submission_form_fields", true ) : null,
            'template_links'         => $template_links,
        ];

        // Localize the script
        wp_localize_script(
            $script_handle,
            'directorist_gutenberg_block_data',
            $localized_data
        );
    }

    public function register_block_categories( array $categories, WP_Block_Editor_Context $block_editor_context ) {
        if ( $block_editor_context->post->post_type !== directorist_gutenberg_post_type() ) {
            return $categories;
        }

        $custom_categories = [
            [
                'slug'  => 'directorist-listings-archive',
                'title' => __( 'Directorist Listings Archive', 'directorist-gutenberg' ),
            ],
            [
                'slug'  => 'directorist-listing-card-preset-fields',
                'title' => __( 'Directorist Preset Fields', 'directorist-gutenberg' ),
            ],
            [
                'slug'  => 'directorist-listing-card-custom-fields',
                'title' => __( 'Directorist Custom Fields', 'directorist-gutenberg' ),
            ],
        ];

        return array_merge( $custom_categories, $categories );
    }
}