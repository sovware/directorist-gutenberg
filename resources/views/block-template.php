<?php

$template = get_post( $template_id );

wp_enqueue_script( 'directorist-gutenberg/blocks-frontend' );

echo do_blocks( $template->post_content );