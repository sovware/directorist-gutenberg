<?php defined( 'ABSPATH' ) || exit;

use \Directorist\Helper;

$id = get_the_ID();
$default_icon = isset( $attributes['icon'] ) ? $attributes['icon'] : 'line-awesome/file-invoice-dollar-solid.svg';

if ( ! Helper::has_price_range( $id ) && ! Helper::has_price( $id ) ) {
	return;
}

// Build icon style from icon_color and icon_size attributes
$icon_style = directorist_gutenberg_build_icon_style( $attributes );
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'directorist-gutenberg-listing-card-block']); ?>>
	<div class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-pricing">
		<div class="directorist-gutenberg-listing-card-element-content">
			<?php if ( ! empty( $default_icon ) ) : ?>
				<span class="directorist-gutenberg-listing-card-element-icon" style="<?php echo $icon_style; ?>"><?php echo directorist_gutenberg_get_icon( 'icons/icon-library/' . $default_icon ); ?></span>
			<?php endif; ?>
			<span class="directorist-gutenberg-pricing-meta">
				<?php
				if ( 'range' === Helper::pricing_type( $id ) ) {
					Helper::price_range_template( $id );
				} elseif ( ! get_directorist_option( 'disable_list_price', 0 ) ) {
					Helper::price_template( $id );
				}
				?>
			</span>
		</div>
	</div>
</div>