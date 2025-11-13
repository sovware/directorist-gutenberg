<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;

$listings = new Directorist_Listings();

?>
<div class="directorist-gutenberg-listings-archive" <?php $listings->data_atts() ?>>
    <div class="directorist-gutenberg-listings-archive-contents">
        <?php $listings->archive_view_template(); ?>
    </div>
</div>
