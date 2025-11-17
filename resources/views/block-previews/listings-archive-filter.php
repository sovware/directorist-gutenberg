<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Helper;
use Directorist\Directorist_Listings;
use Directorist\Directorist_Listing_Search_Form;

$listings = new Directorist_Listings();

$listings->directory_type_id              = $directory_type_id;
$listings->options['sidebar_filter_text'] = $attributes['filters_text'];

$search_field_atts = $listings->get_search_field_atts();

$searchform = new Directorist_Listing_Search_Form( 'search_result', $listings->current_listing_type, $search_field_atts );

$searchform->options['reset_sidebar_filters_text'] = $attributes['reset_text'];

$args = [
    'listings'   => $listings,
    'searchform' => $searchform,
];

?>
<div class="directorist-gutenberg-listings-archive-filter" <?php $listings->data_atts() ?>>
    <?php Helper::get_template( 'archive/advance-search-form', $args ); ?>
</div>
