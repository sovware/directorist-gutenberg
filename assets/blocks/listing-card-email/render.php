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
$label = __( 'Email', 'directorist' );
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<div class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-email">
		<div class="directorist-gutenberg-listing-card-element-content">
			<span><?php echo directorist_gutenberg_render_icon( 'icons/icon-library/' . $default_icon ); ?></span>
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