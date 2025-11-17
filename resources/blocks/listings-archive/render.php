<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;

$listings = new Directorist_Listings();

$listings->directory_type_id = $attributes['directory_type_id'];

$listings->view    = $attributes['default_view'];
$listings->columns = round(  12 / (int) $attributes['listings_columns'] );

// Get block width class
$block_width_class = directorist_gutenberg_get_block_width_class( $attributes );
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'directorist-gutenberg-listings-archive ' . $block_width_class]); $listings->data_atts() ?>>
    <div class="directorist-gutenberg-listings-archive-contents">
        <?php $listings->archive_view_template(); ?>
    </div>
</div>
