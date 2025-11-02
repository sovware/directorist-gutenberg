<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;

$listings = new Directorist_Listings();

?>
<div <?php echo get_block_wrapper_attributes(); ?>>
    <?php
        $listings->advance_search_form_template();
    ?>
</div>
