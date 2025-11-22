<?php

defined( 'ABSPATH' ) || exit;

use DirectoristGutenberg\WpMVC\App;
use DirectoristGutenberg\Database\Setup;

/**
 * Plugin Name:       Directorist Gutenberg Template
 * Description:       Create templates for Directorist using Gutenberg blocks
 * Version:           0.0.1
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Tested up to:      6.8
 * Author:            wpWax
 * Author URI:        https://github.com/sovware/directorist-gutenberg
 * License:           GPL v3 or later
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       directorist-gutenberg
 * Depends on:        directorist
 * Domain Path:       /languages
 */

require_once __DIR__ . '/vendor/vendor-src/autoload.php';
require_once __DIR__ . '/app/Helpers/helper.php';

final class DirectoristGutenberg {
    public static DirectoristGutenberg $instance;

    public static function instance(): DirectoristGutenberg {
        if ( empty( self::$instance ) ) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    public function load() {
        // Run Activation Tasks
        register_activation_hook(
            __FILE__, function() {
                ( new Setup )->execute();
            } 
        );

        $application = App::instance();

        $application->boot( __FILE__, __DIR__ );

        /**
         * Fires once activated plugins have loaded.
         *
         */
        add_action(
            'plugins_loaded', function () use ( $application ): void {

                do_action( 'directorist_gutenberg_before_load' );

                $application->load();

                do_action( 'directorist_gutenberg_after_load' );
            }
        );
    }
}

DirectoristGutenberg::instance()->load();
