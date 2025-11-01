<?php

namespace DirectoristGutenberg\App\Providers;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\WpMVC\Contracts\Provider;

class BlockTemplateServiceProvider implements Provider {
    public function boot() {
        add_filter( 'directorist_listings_deferred_props', [ $this, 'add_deferred_props' ], 10, 1 );
        add_action( 'directorist_before_listings_loop', [ $this, 'maybe_set_listing_item_template_id' ], 10, 2 );
        add_action( 'directorist_render_listings_custom_archive_item_template', [ $this, 'render_listings_custom_archive_item_template' ], 10, 2 );
    }

    public function add_deferred_props( array $deferred_props ) {
        $deferred_props[] = 'gbt_archive_grid_item_template_id';
        $deferred_props[] = 'gbt_archive_list_item_template_id';
        
        return $deferred_props;
    }

    public function maybe_set_listing_item_template_id( $listings_controller, array $args ) {
        if ( empty( $listings_controller->directory_type_id ) ) {
            return;
        }

        $current_template_type = $args['view_type'] === 'grid' ? 'archive-grid-item' : 'archive-list-item';

        $with_private = current_user_can( 'edit_post', $listings_controller->directory_type_id );
        $templates    = directorist_gutenberg_templates( $listings_controller->directory_type_id,  $with_private );

        foreach ( $templates as $template ) {
            if ( $template['template_type'] !== $current_template_type ) {
                continue;
            }

            if ( $args['view_type'] === 'grid' ) {
                $listings_controller->gbt_archive_grid_item_template_id = $template['id'];
            } else {
                $listings_controller->gbt_archive_list_item_template_id = $template['id'];
            }

            add_filter( 'directorist_should_render_listings_custom_archive_item_template', [ $this, 'should_render_listings_custom_archive_item_template' ], 10, 3 );
            break;
        }
    }

    public function should_render_listings_custom_archive_item_template( $should_render, $listings_controller, array $args ) {
        if  ( $args['view_type'] === 'grid' && $listings_controller->gbt_archive_grid_item_template_id ) {
            return true;
        }

        if ( $args['view_type'] === 'list' && $listings_controller->gbt_archive_list_item_template_id ) {
            return true;
        }

        return $should_render;
    }

    public function render_listings_custom_archive_item_template( $listings_controller, array $args ) {
        $template_id = $args['view_type'] === 'grid' ? $listings_controller->gbt_archive_grid_item_template_id : $listings_controller->gbt_archive_list_item_template_id;

        directorist_gutenberg_render_view( 'block-templates/archive/listing-item', [ 'template_id' => $template_id ] );
    }
}