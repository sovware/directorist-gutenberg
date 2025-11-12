<?php

namespace DirectoristGutenberg\App\Providers;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\WpMVC\Contracts\Provider;

class PostTypeServiceProvider implements Provider {
    public function boot() {
        add_action( 'init', [ self::class, 'register_post_type' ] );
        add_action( 'init', [ $this, 'register_meta_fields' ] );
        add_filter( 'allowed_block_types_all', [ $this, 'allowed_block_types_all' ], 10, 2 );
        add_action( 'save_post_' . directorist_gutenberg_post_type(), [ $this, 'handle_template_enable_toggle' ], 10, 1 );
        add_filter( 'admin_body_class', [ $this, 'add_template_type_body_class' ], 10, 1 );
    }

    public function allowed_block_types_all( $allowed_block_types, $editor_context ) {
        if ( empty( $editor_context->post->post_type ) || directorist_gutenberg_post_type() !== $editor_context->post->post_type ) {
            return $allowed_block_types;
        }

        $blocks = array_keys( directorist_gutenberg_config( 'blocks' ) );

        $blocks[] = "core/paragraph";
        $blocks[] = "core/image";
        $blocks[] = "core/heading";
        $blocks[] = "core/gallery";
        $blocks[] = "core/list";
        $blocks[] = "core/list-item";
        $blocks[] = "core/quote";
        $blocks[] = "core/audio";
        $blocks[] = "core/button";
        $blocks[] = "core/buttons";
        $blocks[] = "core/calendar";
        $blocks[] = "core/code";
        $blocks[] = "core/column";
        $blocks[] = "core/columns";
        $blocks[] = "core/cover";
        $blocks[] = "core/details";
        $blocks[] = "core/embed";
        $blocks[] = "core/file";
        $blocks[] = "core/group";
        $blocks[] = "core/html";
        $blocks[] = "core/media-text";
        $blocks[] = "core/more";
        $blocks[] = "core/nextpage";
        $blocks[] = "core/page-list";
        $blocks[] = "core/page-list-item";
        $blocks[] = "core/pattern";
        $blocks[] = "core/preformatted";
        $blocks[] = "core/pullquote";
        $blocks[] = "core/block";
        $blocks[] = "core/rss";
        $blocks[] = "core/separator";
        $blocks[] = "core/shortcode";
        $blocks[] = "core/social-link";
        $blocks[] = "core/social-links";
        $blocks[] = "core/spacer";
        $blocks[] = "core/table";
        $blocks[] = "core/text-columns";
        $blocks[] = "core/verse";
        $blocks[] = "core/video";
        $blocks[] = "core/footnotes";
        $blocks[] = "core/site-logo";
        $blocks[] = "core/site-title";
        $blocks[] = "core/site-tagline";
        $blocks[] = "core/query";
        $blocks[] = "core/template-part";
        $blocks[] = "core/avatar";
        $blocks[] = "core/post-title";
        $blocks[] = "core/post-excerpt";
        $blocks[] = "core/post-featured-image";
        $blocks[] = "core/post-content";
        $blocks[] = "core/post-author";
        $blocks[] = "core/post-author-name";
        $blocks[] = "core/post-date";
        $blocks[] = "core/post-terms";
        $blocks[] = "core/post-navigation-link";
        $blocks[] = "core/post-template";
        $blocks[] = "core/query-pagination";
        $blocks[] = "core/query-pagination-next";
        $blocks[] = "core/query-pagination-numbers";
        $blocks[] = "core/query-pagination-previous";
        $blocks[] = "core/query-no-results";
        $blocks[] = "core/query-total";
        $blocks[] = "core/read-more";
        $blocks[] = "core/comments";
        $blocks[] = "core/home-link";
        $blocks[] = "core/loginout";
        $blocks[] = "core/term-description";
        $blocks[] = "core/query-title";
        $blocks[] = "core/post-author-biography";
        $blocks[] = "core/freeform";
        $blocks[] = "core/widget-group";

        return apply_filters( 'directorist_gutenberg_allowed_block_types', $blocks );
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

        register_post_meta(
            $post_type,
            'default_view',
            [
                'show_in_rest' => true,
                'single'       => true,
                'type'         => 'string',
                'default'      => 'grid',
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

    /**
     * Add custom body class based on template_type post meta in Gutenberg editor
     *
     * @param string $classes Existing body classes
     * @return string Modified body classes
     */
    public function add_template_type_body_class( $classes ) {
        // Check if we're in the admin
        if ( ! is_admin() ) {
            return $classes;
        }

        // Get current screen
        $screen = get_current_screen();
        if ( ! $screen || directorist_gutenberg_post_type() !== $screen->post_type ) {
            return $classes;
        }

        // Get the post ID from the screen or global post
        $post_id = 0;
        if ( isset( $_GET['post'] ) ) {
            $post_id = absint( $_GET['post'] );
        } elseif ( isset( $_GET['post_ID'] ) ) {
            $post_id = absint( $_GET['post_ID'] );
        } elseif ( isset( $screen->post_id ) ) {
            $post_id = absint( $screen->post_id );
        } else {
            global $post;
            if ( $post && isset( $post->ID ) ) {
                $post_id = $post->ID;
            }
        }

        // If we don't have a post ID, return early
        if ( ! $post_id ) {
            return $classes;
        }

        // Get the template_type post meta
        $template_type = get_post_meta( $post_id, 'template_type', true );

        // Add the class if template_type exists
        if ( ! empty( $template_type ) ) {
            $classes .= ' directorist-gutenberg-' . esc_attr( sanitize_html_class( $template_type ) );
        }

        return $classes;
    }
}