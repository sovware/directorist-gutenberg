<?php

defined( 'ABSPATH' ) || exit;

use DirectoristGutenberg\WpMVC\Enqueue\Enqueue;

Enqueue::register_script( 'directorist-gutenberg/blocks-frontend', 'build/js/blocks-frontend', ['lodash'] );