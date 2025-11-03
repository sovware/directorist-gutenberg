<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;

$listings = new Directorist_Listings();

?>
<div <?php echo get_block_wrapper_attributes(); $listings->data_atts() ?>>
    <?php if ( $listings->header_bar_template() ) : ?>    
    <div class="directorist-gutenberg-listings-archive-header">
        <?php $listings->header_bar_template(); ?>
    </div>
    <?php endif; ?>

    <div class="directorist-gutenberg-listings-archive-contents">
        <?php $listings->archive_view_template(); ?>
    </div>
</div>
