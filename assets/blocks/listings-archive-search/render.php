<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;

$listings = new Directorist_Listings();

?>
<div <?php echo get_block_wrapper_attributes(); ?>>
    <div class="directorist-gutenberg-listings-archive-search-nav">
        <?php
            $listings->directory_type_nav_template();
        ?>
    </div>

    <div class="directorist-gutenberg-listings-archive-search-form">
        <?php
            $listings->basic_search_form_template();
        ?>
    </div>
</div>
