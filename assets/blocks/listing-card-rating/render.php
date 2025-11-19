<?php defined( 'ABSPATH' ) || exit;

// Return early when review is disabled.
if ( ! directorist_is_review_enabled() ) {
	return;
}

$listing_id = get_the_ID();

// Get review data
$average       = directorist_get_listing_rating( $listing_id );
$reviews_count = directorist_get_listing_review_count( $listing_id );

// Icons
$icon_empty_star = directorist_gutenberg_get_icon( 'icons/icon-library/font-awesome/star-alt.svg' );
$icon_half_star  = directorist_gutenberg_get_icon( 'icons/icon-library/font-awesome/star-half-alt-2.svg' );
$icon_full_star  = directorist_gutenberg_get_icon( 'icons/icon-library/font-awesome/star.svg' );

// Generate stars
$review_stars = '';
for ( $i = 1; $i <= 5; $i++ ) {
	$star_value = $i - 1;
	$is_active  = $average >= $i;
	$is_half    = $average > $star_value && $average < $i;

	$star_icon = $icon_empty_star;
	if ( $is_active ) {
		$star_icon = $icon_full_star;
	} elseif ( $is_half ) {
		$star_icon = $icon_half_star;
	}

	$star_class = $is_active || $is_half ? 'directorist-gutenberg-listing-card-rating-star-active' : 'directorist-gutenberg-listing-card-rating-star-inactive';
	$review_stars .= '<span class="' . esc_attr( $star_class ) . '">' . $star_icon . '</span>';
}
// Get block width class
$block_width_class = directorist_gutenberg_get_block_width_class( $attributes );
// Get text alignment class
$text_align_class = directorist_gutenberg_get_text_align_class( $attributes );
// Combine classes
$wrapper_classes = array_filter( [ $block_width_class, $text_align_class ] );

?>
<div <?php echo get_block_wrapper_attributes(['class' => ' directorist-gutenberg-listing-card-block directorist-gutenberg-listing-card-rating ' . implode( ' ', $wrapper_classes )]); ?>>
	<div class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-rating">
		<div class="directorist-gutenberg-listing-card-element-content">
			<div class="directorist-gutenberg-listing-card-rating-stars">
				<?php echo $review_stars; ?>
			</div>
			<div class="directorist-gutenberg-listing-card-rating-info">
				<span class="directorist-gutenberg-listing-card-rating-value"><?php echo esc_html( number_format( $average, 1 ) ); ?></span>
				<span class="directorist-gutenberg-listing-card-rating-count">(<?php echo esc_html( $reviews_count ); ?>)</span>
			</div>
		</div>
	</div>
</div>