<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;

$listings = new Directorist_Listings();

// Get block width class
$block_width_class = directorist_gutenberg_get_block_width_class( $attributes );
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'directorist-gutenberg-listings-archive-filters ' . $block_width_class]); $listings->data_atts() ?>>
    <?php
        $listings->advance_search_form_template();
    ?>
</div>
