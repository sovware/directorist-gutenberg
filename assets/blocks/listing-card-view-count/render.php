<?php
// Build icon style from icon_color and icon_size attributes
$icon_style = directorist_gutenberg_build_icon_style( $attributes );
// Get block width class
$block_width_class = directorist_gutenberg_get_block_width_class( $attributes );
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'directorist-gutenberg-listing-card-block ' . $block_width_class]); ?>>
    <div class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-view-count">
        <span class="directorist-gutenberg-listing-card-view-count" data-id="<?php the_ID(); ?>">
            <?php if ( ! empty( $attributes['icon'] ) ) : ?>
                <span class="directorist-gutenberg-listing-card-element-icon" style="<?php echo $icon_style; ?>"><?php echo directorist_gutenberg_get_icon( 'icons/icon-library/' . $attributes['icon'] ); ?></span>
            <?php endif; ?>
            <span class="directorist-gutenberg-listing-card-view-count-value">
                <?php echo esc_html( directorist_get_listing_views_count( get_the_ID() ) ); ?>
            </span>
        </span>
    </div>
</div>