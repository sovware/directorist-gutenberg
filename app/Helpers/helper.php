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