<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;

add_filter( 'directorist_listings_query_args', function( $args ) use ( $attributes ) {
    $args['posts_per_page'] = $attributes['listings_per_page'];
    return $args;
}, 10, 1 );

$listings = new Directorist_Listings();

$listings->directory_type_id = $attributes['directory_type_id'];

$listings->view    = $attributes['default_view'];
$listings->columns = round(  12 / (int) $attributes['listings_columns'] );

$listings->options['pagination_type'] = $attributes['pagination_type'];

// Get block width class
$block_width_class = directorist_gutenberg_get_block_width_class( $attributes );

// Get infinite scroll class
$infinite_scroll_class = $listings->pagination_infinite_scroll_class();
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'directorist-gutenberg-listings-archive ' . $block_width_class . ' ' . $infinite_scroll_class]); $listings->data_atts() ?>>
    <div class="directorist-gutenberg-listings-archive-contents">
        <?php $listings->archive_view_template(); ?>
    </div>
</div>
