<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;

$listings = new Directorist_Listings();

// Get block width class
$block_width_class = directorist_gutenberg_get_block_width_class( $attributes );
?>
<div <?php echo get_block_wrapper_attributes(['class' => $block_width_class]); $listings->data_atts() ?>>
    <?php
    ob_start();
    $listings->header_bar_template();

    $header_bar = ob_get_clean();

    if ( $header_bar ) :
        echo '<div class="directorist-gutenberg-listings-archive-header">';
        echo $header_bar;
        echo '</div>';
    endif;

    ?>
</div>
