<?php

namespace DirectoristGutenberg\App\Providers;

defined( 'ABSPATH' ) || exit;

use DirectoristGutenberg\WpMVC\Contracts\Provider;

class MenuServiceProvider implements Provider {
    public function boot() {
        add_action( 'admin_menu', [ $this, 'action_admin_menu' ] );
    }

    public function action_admin_menu() {
        add_submenu_page( 
            'edit.php?post_type=at_biz_dir',
            esc_html__( 'Template Builder', 'directorist-gutenberg' ),
            esc_html__( 'Template Builder', 'directorist-gutenberg' ),
            'manage_options',
            'directorist-template-builder',
            [ $this, 'content' ],
            6
        );
    }

    public function content() {
        echo '<div class="directorist-gutenberg-root"></div>';
    }
}