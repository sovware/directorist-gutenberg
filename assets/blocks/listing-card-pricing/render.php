<?php defined( 'ABSPATH' ) || exit;

use \Directorist\Helper;

$id = get_the_ID();
$default_icon = isset( $attributes['icon'] ) ? $attributes['icon'] : 'line-awesome/file-invoice-dollar-solid.svg';

if ( ! Helper::has_price_range( $id ) && ! Helper::has_price( $id ) ) {
	return;
}
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-pricing">
		<div class="directorist-gutenberg-listing-card-element-content">
			<?php echo directorist_gutenberg_render_icon( 'icons/icon-library/' . $default_icon ); ?>
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