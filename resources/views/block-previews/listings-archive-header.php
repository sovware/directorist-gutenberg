<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;
use Directorist\Helper;

$listings = new Directorist_Listings();

$default_view = get_post_meta( $attributes['template_id'], 'default_view', true );

$listings->view = ! empty( $default_view ) ? $default_view : 'grid';

$listings->directory_type_id = $attributes['directory_type_id'];

$listings->header_title = $attributes['listings_count_text'];

if ( strval( $attributes['show_listings_count'] ) !== '1' ) {
    $listings->header_title = '';
}

$listings->views = [];

foreach ( $attributes['view_type'] as $view ) {
    $listings->views[ $view ] = ucfirst( $view );
}

$listings->display_viewas_dropdown = ! empty( $listings->views ) ? 1 : 0;
$listings->display_sortby_dropdown = strval( $attributes['enable_sorting'] ) === '1' ? true : false;

$listings->sort_by_text  = $attributes['sort_by_label'];
$listings->sort_by_items = $attributes['sort_by'];

?>
<div <?php $listings->data_atts() ?>>
    <?php
        echo '<div class="directorist-gutenberg-listings-archive-header">';
		Helper::get_template( 'archive/header-bar', [ 'listings' => $listings ] );
		echo '</div>';
    ?>
</div>
