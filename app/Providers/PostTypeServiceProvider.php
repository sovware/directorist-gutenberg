<?php

namespace DirectoristGutenberg\App\Providers;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\WpMVC\Contracts\Provider;

class PostTypeServiceProvider implements Provider {
    public function boot() {
        add_action( 'init', [ self::class, 'register_post_type' ] );
        add_action( 'init', [ $this, 'register_meta_fields' ] );
        add_action( 'save_post_' . directorist_gutenberg_post_type(), [ $this, 'handle_template_enable_toggle' ], 10, 1 );
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
        $post_type = directorist_gutenberg_post_type();

        register_post_meta(
            $post_type,
            'directory_type_id',
            [
                'show_in_rest' => true,
                'single'       => true,
                'type'         => 'integer',
                'default'      => 0,
            ]
        );

        register_post_meta(
            $post_type,
            'template_type',
            [
                'show_in_rest' => true,
                'single'       => true,
                'type'         => 'string',
                'default'      => '',
            ]
        );
    }

    public function handle_template_enable_toggle( $post_id ) {
        // Check if this is an autosave or revision
        if ( wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) ) {
            return;
        }

        $post = get_post( $post_id );

        if ( ! in_array( $post->post_status, [ 'publish', 'private' ] ) ) {
            return;
        }
        
        // Get the directory and template type of the current post
        $directory_type_id = get_post_meta( $post_id, 'directory_type_id', true );
        $template_type     = get_post_meta( $post_id, 'template_type', true );

        // Query all other templates with the same directory_type_id and template_type 
        $query = new \WP_Query(
            [
                'post_type'      => directorist_gutenberg_post_type(),
                'post_status'    => $post->post_status === 'publish' ? 'publish' : 'private',
                'posts_per_page' => -1,
                'post__not_in'   => [ $post_id ],
                'meta_query'     => [
                    'relation' => 'AND',
                    [
                        'key'   => 'directory_type_id',
                        'value' => $directory_type_id,
                    ],
                    [
                        'key'   => 'template_type',
                        'value' => $template_type,
                    ],
                ],
            ]
        );

        // Disable all other templates
        if ( $query->have_posts() ) {
            foreach ( $query->posts as $template_post ) {
                wp_update_post( [
                    'ID'          => $template_post->ID,
                    'post_status' => 'draft',
                ] );
            }
        }

        wp_reset_postdata();
    }
}