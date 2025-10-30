<?php

namespace DirectoristGutenberg\App\Providers;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\WpMVC\Contracts\Provider;

class BlockTemplateServiceProvider implements Provider {
    public function boot() {
        add_filter( 'directorist_listings_deferred_props', [ $this, 'add_deferred_props' ], 10, 1 );
        add_action( 'directorist_before_listings_loop', [ $this, 'maybe_set_listing_item_template_id' ], 10, 2 );
        add_action( 'directorist_render_custom_listings_loop_item_template', [ $this, 'render_listings_loop_item_custom_template' ], 10, 2 );
    }

    public function add_deferred_props( array $deferred_props ) {
        $deferred_props[] = 'gbt_listings_grid_view_template_id';
        $deferred_props[] = 'gbt_listings_list_view_template_id';
        
        return $deferred_props;
    }

    public function maybe_set_listing_item_template_id( $listings_controller, array $args ) {
        if ( empty( $listings_controller->directory_type_id ) ) {
            return;
        }

        // $listings_controller->gbt_listings_grid_view_template_id = 53;
        // $listings_controller->gbt_listings_list_view_template_id = 54;

        add_filter( 'directorist_should_render_custom_listings_loop_item_template', '__return_true', 10 );
    }

    public function render_listings_loop_item_custom_template( $listings_controller, array $args ) {
        $template_id = $args['view_type'] === 'grid' ? $listings_controller->gbt_listings_grid_view_template_id : $listings_controller->gbt_listings_list_view_template_id;
        
        directorist_gutenberg_render_view( 'block-templates/archive/listing-item', [ 'template_id' => $template_id ] );
    }
}