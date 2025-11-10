<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;

$template = get_post( $template_id );

/**
 * @var Directorist_Listings
 */
$controller = $listings_controller;

wp_enqueue_script_module( 'directorist-gutenberg/blocks-frontend' );
?>

<?php echo do_blocks( $template->post_content ); ?>