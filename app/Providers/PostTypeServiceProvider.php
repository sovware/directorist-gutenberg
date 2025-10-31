<?php

namespace DirectoristGutenberg\App\Providers;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\WpMVC\Contracts\Provider;

class PostTypeServiceProvider implements Provider {
    public function boot() {
        add_action( 'init', [ self::class, 'register_post_type' ] );
        add_action( 'init', [ $this, 'register_meta_fields' ] );
    }

    public static function register_post_type() {
        $labels = [
            'name'                  => _x( 'Builder Templates', 'Post Type General Name', 'directorist-gutenberg' ),
            'singular_name'         => _x( 'Builder Template', 'Post Type Singular Name', 'directorist-gutenberg' ),
            'menu_name'             => __( 'Builder Templates', 'directorist-gutenberg' ),
            'name_admin_bar'        => __( 'Builder Templates', 'directorist-gutenberg' ),
            'archives'              => __( 'Template Archives', 'directorist-gutenberg' ),
            'attributes'            => __( 'Template Attributes', 'directorist-gutenberg' ),
            'parent_item_colon'     => __( 'Parent Item:', 'directorist-gutenberg' ),
            'all_items'             => __( 'Builder Templates', 'directorist-gutenberg' ),
            'add_new_item'          => __( 'Add New Template', 'directorist-gutenberg' ),
            'add_new'               => __( 'Add New', 'directorist-gutenberg' ),
            'new_item'              => __( 'New Template', 'directorist-gutenberg' ),
            'edit_item'             => __( 'Edit Template', 'directorist-gutenberg' ),
            'update_item'           => __( 'Update Template', 'directorist-gutenberg' ),
            'view_item'             => __( 'View Template', 'directorist-gutenberg' ),
            'view_items'            => __( 'View Templates', 'directorist-gutenberg' ),
            'search_items'          => __( 'Search Template', 'directorist-gutenberg' ),
            'not_found'             => __( 'Not found', 'directorist-gutenberg' ),
            'not_found_in_trash'    => __( 'Not found in Trash', 'directorist-gutenberg' ),
            'featured_image'        => __( 'Featured Image', 'directorist-gutenberg' ),
            'set_featured_image'    => __( 'Set featured image', 'directorist-gutenberg' ),
            'remove_featured_image' => __( 'Remove featured image', 'directorist-gutenberg' ),
            'use_featured_image'    => __( 'Use as featured image', 'directorist-gutenberg' ),
            'insert_into_item'      => __( 'Insert into item', 'directorist-gutenberg' ),
            'uploaded_to_this_item' => __( 'Uploaded to this item', 'directorist-gutenberg' ),
            'items_list'            => __( 'Templates list', 'directorist-gutenberg' ),
            'items_list_navigation' => __( 'Templates list navigation', 'directorist-gutenberg' ),
            'filter_items_list'     => __( 'Filter templates list', 'directorist-gutenberg' ),
        ];
    
        $args = [
            'label'                 => __( 'Directorist Gutenberg Template', 'directorist-gutenberg' ),
            'description'           => __( 'Gutenberg templates for Directorist', 'directorist-gutenberg' ),
            'labels'                => $labels,
            'hierarchical'          => false,
            'public'                => true,
            'show_ui'               => true,
            'show_in_menu'          => 'edit.php?post_type=at_biz_dir',
            'rewrite'               => [ 'slug' => 'directorist-gutenberg-template' ],
            'show_in_nav_menus'     => false,
            'can_export'            => true,
            'has_archive'           => false,
            'exclude_from_search'   => true,
            'capability_type'       => 'post',
            'supports'              => [ 'title', 'editor', 'author', 'custom-fields' ],
            'show_in_rest'          => true,
        ];
    
        register_post_type( directorist_gutenberg_post_type(), $args );
    }

    public function register_meta_fields() {
        register_post_meta(
            directorist_gutenberg_post_type(),
            'is_enabled',
            [
                'show_in_rest' => true,
                'single'       => true,
                'type'         => 'boolean',
                'default'      => false,
            ]
        );
    }
}