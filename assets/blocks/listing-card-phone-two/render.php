<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$phone_two = directorist_gutenberg_get_block_post_meta( $attributes['meta_key'], get_the_ID() );

if ( empty( $phone_two ) ) {
    return;
}

// Build icon style from icon_color and icon_size attributes
$icon_style = directorist_gutenberg_build_icon_style( $attributes );
// Get block width class
$block_width_class = directorist_gutenberg_get_block_width_class( $attributes );
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'directorist-gutenberg-listing-card-block ' . $block_width_class]); ?>>
    <div class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-phone-two">
        <?php //echo esc_html( get_the_title( get_the_ID() ) ); ?>
        <div class="directorist-gutenberg-listing-card-element-content">
            <?php if ( ! empty( $attributes['icon'] ) ) : ?>
                <span class="directorist-gutenberg-listing-card-element-icon" style="<?php echo $icon_style; ?>"><?php echo directorist_gutenberg_get_icon( 'icons/icon-library/' . $attributes['icon'] ); ?></span>
            <?php endif; ?>
            <div class="directorist-gutenberg-listing-card-element-details">
                <?php if ( $attributes['show_label'] ) : ?>
                    <span class="directorist-gutenberg-listing-card-element-label"><?php echo esc_html__( 'Phone Two:', 'directorist-gutenberg' ); ?></span>
                <?php endif; ?>
                <span class="directorist-gutenberg-listing-card-element-value"><?php echo esc_html( $phone_two ); ?></span>
            </div>
        </div>
    </div>
</div>