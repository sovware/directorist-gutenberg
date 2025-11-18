<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;
use Directorist\Helper;

$listings = new Directorist_Listings();

$listings->directory_type_id = $attributes['directory_type_id'];

?>
<div <?php $listings->data_atts() ?>>
    <?php
        echo '<div class="directorist-gutenberg-listings-archive-header">';
		Helper::get_template( 'archive/header-bar', [ 'listings' => $listings ] );
		echo '</div>';
    ?>
</div>
