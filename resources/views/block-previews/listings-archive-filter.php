<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;

$listings = new Directorist_Listings();

?>
<div class="directorist-gutenberg-listings-archive-filter" <?php $listings->data_atts() ?>>
    <?php
        $listings->advance_search_form_template();
    ?>
</div>
