<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;

$listings = new Directorist_Listings();

?>
<div <?php echo get_block_wrapper_attributes(['class' => 'directorist-gutenberg-listings-archive']); $listings->data_atts() ?>>
    <div class="directorist-gutenberg-listings-archive-contents">
        <?php $listings->archive_view_template(); ?>
    </div>
</div>
