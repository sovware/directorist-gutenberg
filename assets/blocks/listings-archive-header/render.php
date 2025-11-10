<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;

$listings = new Directorist_Listings();

?>
<div <?php echo get_block_wrapper_attributes(); $listings->data_atts() ?>>
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
