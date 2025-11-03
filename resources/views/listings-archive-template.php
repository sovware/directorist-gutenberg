<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;

$template = get_post( $template_id );

/**
 * @var Directorist_Listings
 */
$controller = $listings_controller;

wp_enqueue_script( 'directorist-gutenberg/blocks-frontend' );
?>

<div <?php $controller->data_atts(); ?> class="directorist-archive-contents directorist-contents-wrap directorist-w-100 directorist-instant-search">
    <?php echo do_blocks( $template->post_content ); ?>
</div>