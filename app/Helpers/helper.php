<?php

defined( 'ABSPATH' ) || exit;

use DirectoristGutenberg\WpMVC\App;
use DirectoristGutenberg\DI\Container;
use DirectoristGutenberg\WpMVC\View\View;

function directorist_gutenberg():App {
    return App::$instance;
}

function directorist_gutenberg_config( string $config_key ) {
    return directorist_gutenberg()::$config->get( $config_key );
}

function directorist_gutenberg_app_config( string $config_key ) {
    return directorist_gutenberg_config( "app.{$config_key}" );
}

function directorist_gutenberg_version() {
    return directorist_gutenberg_app_config( 'version' );
}

function directorist_gutenberg_container():Container {
    return directorist_gutenberg()::$container;
}

function directorist_gutenberg_singleton( string $class ) {
    return directorist_gutenberg_container()->get( $class );
}

function directorist_gutenberg_url( string $url = '' ) {
    return directorist_gutenberg()->get_url( $url );
}

function directorist_gutenberg_dir( string $dir = '' ) {
    return directorist_gutenberg()->get_dir( $dir );
}

function directorist_gutenberg_post_type() {
    return directorist_gutenberg_app_config( 'post_type' );
}

function directorist_gutenberg_render_view( string $view, array $data = [] ) {
    View::render( $view, $data );
}

function directorist_gutenberg_get_view( string $view, array $data = [] ) {
    return View::get( $view, $data );
}

function directorist_gutenberg_templates( int $directory_type_id, bool $with_private = false ) {
    $query = new \WP_Query(
        [
            'post_type'      => directorist_gutenberg_post_type(),
            'post_status'    => $with_private ? ['publish', 'private'] : ['publish'],
            'posts_per_page' => -1,
            'meta_query'     => [
                'relation' => 'AND',
                [
                    'key'   => 'directory_type_id',
                    'value' => $directory_type_id,
                ],
            ],
        ]
    );

    $templates = [];

    foreach ( $query->posts as $post ) {
        $templates[] = [
            'id'            => $post->ID,
            'title'         => $post->post_title,
            'status'        => $post->post_status,
            'template_type' => get_post_meta( $post->ID, 'template_type', true ),
        ];
    }

    return $templates;
}

function directorist_gutenberg_render_icon( string $icon ) {
    $svg = directorist_gutenberg_dir( "resources/svg/$icon" );

    if ( ! is_file( $svg ) ) {
        return;
    }

    //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped, WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
    echo file_get_contents( $svg );
}

function directorist_gutenberg_get_block_post_meta( string $meta_key, int $post_id ) {
    if ( empty( $meta_key ) ) {
        return null;
    }
    
    $meta_value = get_post_meta( $post_id, $meta_key, true );
    
    if ( empty( $meta_value ) ) {
        $meta_value = get_post_meta( $post_id, '_' . $meta_key, true );
    }

    if ( empty( $meta_value ) ) {
        return null;
    }

    return $meta_value;
}