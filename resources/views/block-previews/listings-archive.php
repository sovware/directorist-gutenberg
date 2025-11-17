<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;

$listings = new Directorist_Listings();

$listings->directory_type_id = $attributes['directory_type_id'];

$listings->view              = $attributes['default_view'];
$listings->columns           = round(  12 / (int) $attributes['listings_columns'] );
$listings->listings_per_page = $attributes['listings_per_page'];

echo '<pre>';
print_r( [
    'listings_per_page' => $listings->listings_per_page,
] );
echo '</pre>';

// $listings->options['pagination_type']   = $attributes['pagination_type'];
?>
<div class="directorist-gutenberg-listings-archive" <?php $listings->data_atts() ?>>
    <div class="directorist-gutenberg-listings-archive-contents">
        <?php $listings->archive_view_template(); ?>
    </div>
</div>
