<?php defined( 'ABSPATH' ) || exit;

$listing_id = get_the_ID();

// Check if the listing is favorited by the current user
$is_favorite = false;
if ( function_exists( 'directorist_get_user_favorites' ) ) {
	$favourites = directorist_get_user_favorites( get_current_user_id() );
	$is_favorite = in_array( $listing_id, $favourites );
}

?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<div
		class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-badge"
		data-wp-interactive="directorist/favorite-button"
		data-wp-context='<?php echo wp_json_encode( [
			'listingId' => $listing_id,
			'isFavorite' => $is_favorite,
			'showTooltip' => false,
			'tooltipMessage' => '',
		] ); ?>'
	>
		<div
			class="directorist-gutenberg-listing-favorite-button <?php echo $is_favorite ? 'directorist-listing-added-to-favorite' : ''; ?>"
			data-listing-id="<?php echo esc_attr( $listing_id ); ?>"
			data-wp-class--directorist-listing-added-to-favorite="state.isFavorite"
			data-wp-on--click="actions.toggleFavorite"
			data-wp-on--keydown="actions.toggleFavorite"
			role="button"
			tabindex="0"
			aria-label="<?php esc_attr_e( 'Add to favorites', 'directorist-gutenberg' ); ?>"
		>
			<span
				class="directorist-listing-favorite-icon"
				data-wp-class--directorist-hidden="state.isFavorite"
			>
				<?php echo directorist_gutenberg_render_icon( 'icons/heart.svg' ); ?>
			</span>
			<span
				class="directorist-listing-favorite-icon directorist-listing-favorite-icon-filled"
				data-wp-class--directorist-hidden="state.isNotFavorite"
			>
				<?php echo directorist_gutenberg_render_icon( 'icons/heart-solid.svg' ); ?>
			</span>
			<span
				class="directorist-listing-favorite-tooltip"
				data-wp-class--is-visible="state.showTooltip"
			>
				<span data-wp-text="state.tooltipMessage"></span>
			</span>
		</div>
	</div>
</div>