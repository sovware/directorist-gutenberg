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

function directorist_gutenberg_get_directory_submission_fields( int $directory_type_id ) {
    if ( empty( $directory_type_id ) ) {
        return null;
    }

    $fields = get_term_meta( $directory_type_id, "submission_form_fields", true );

    if ( empty( $fields ) ) {
        return null;
    }

    return $fields['fields'];
}

function directorist_gutenberg_get_directory_submission_field( int $directory_type_id, string $field_type, string $field_name_or_key ) {
    $fields = directorist_gutenberg_get_directory_submission_fields( $directory_type_id );

    if ( empty( $fields ) ) {
        return null;
    }

    foreach ( $fields as $field ) {
        if ( $field['widget_group'] !== $field_type ) {
            continue;
        }

        if ( $field_type === 'preset' && $field['widget_name'] === $field_name_or_key ) {
            return $field;
        }

        if ( $field_type === 'custom' && $field['field_key'] === $field_name_or_key ) {
            return $field;
        }
    }

    return null;
}

function directorist_gutenberg_get_directory_submission_field_option( int $directory_type_id, string $field_type, string $field_name_or_key, ?string $field_value = null ) {
    if ( empty( $field_value ) ) {
        return null;
    }

    $field = directorist_gutenberg_get_directory_submission_field( $directory_type_id, $field_type, $field_name_or_key );
    
    if ( empty( $field ) ) {
        return null;
    }

    if ( empty( $field['options'] ) ) {
        return null;
    }

    foreach ( $field['options'] as $option ) {
        if ( strval( $option['option_value'] ) === $field_value ) {
            return $option;
        }
    }

    return null;
}

function directorist_gutenberg_get_directory_submission_field_options( int $directory_type_id, string $field_type, string $field_name_or_key, ?array $field_values ) {
    if ( empty( $field_values ) ) {
        return null;
    }

    $field = directorist_gutenberg_get_directory_submission_field( $directory_type_id, $field_type, $field_name_or_key );

    if ( empty( $field ) ) {
        return null;
    }

    if ( empty( $field['options'] ) ) {
        return null;
    }

    $selected_options = [];

    foreach ( $field['options'] as $option ) {
        if ( in_array( strval( $option['option_value'] ), $field_values ) ) {
            $selected_options[] = $option;
        }
    }

    return $selected_options;
}