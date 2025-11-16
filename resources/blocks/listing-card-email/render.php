<?php
/**
 * Email Block Render
 *
 * @package DirectoristGutenberg
 */

defined( 'ABSPATH' ) || exit;

$listing_id = get_the_ID();

if ( ! $listing_id ) {
	return;
}

// Get email value from post meta.
$email = get_post_meta( $listing_id, '_email', true );

if ( ! $email ) {
	return;
}

// Get icon.
$default_icon = isset( $attributes['icon'] ) ? $attributes['icon'] : 'line-awesome/envelope-solid.svg';
$show_label   = isset( $attributes['show_label'] ) ? $attributes['show_label'] : false;

// Get label text (default to "Email").
$label = __( 'Email', 'directorist-gutenberg' );

// Build icon style from icon_color and icon_size attributes
$icon_style = directorist_gutenberg_build_icon_style( $attributes );
// Get block width class
$block_width_class = directorist_gutenberg_get_block_width_class( $attributes );
?>

<div <?php echo get_block_wrapper_attributes(['class' => 'directorist-gutenberg-listing-card-block ' . $block_width_class]); ?>>
	<div class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-email">
		<div class="directorist-gutenberg-listing-card-element-content">
			<?php if ( ! empty( $default_icon ) ) : ?>
				<span class="directorist-gutenberg-listing-card-element-icon" style="<?php echo $icon_style; ?>"><?php echo directorist_gutenberg_get_icon( 'icons/icon-library/' . $default_icon ); ?></span>
			<?php endif; ?>
			<div class="directorist-gutenberg-listing-card-element-details">
				<?php if ( $show_label ) : ?>
					<span class="directorist-gutenberg-listing-card-element-label"><?php echo esc_html( $label . ' : ' ); ?></span>
				<?php endif; ?>
				<a target="_top" href="mailto:<?php echo esc_attr( $email ); ?>" class="directorist-gutenberg-listing-card-element-value">
					<?php echo esc_html( $email ); ?>
				</a>
			</div>
		</div>
	</div>
</div>