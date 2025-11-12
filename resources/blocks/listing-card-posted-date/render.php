<?php
// Build icon style from icon_color and icon_size attributes
$icon_style = directorist_gutenberg_build_icon_style( $attributes );
// Get block width class
$block_width_class = directorist_gutenberg_get_block_width_class( $attributes );
?>
<div <?php echo get_block_wrapper_attributes(['class' => 'directorist-gutenberg-listing-card-block ' . $block_width_class]); ?>>
    <div class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-posted-date">
        <?php //echo esc_html( get_the_title( get_the_ID() ) ); ?>
        <div class="directorist-gutenberg-listing-card-element-content">
            <?php if ( ! empty( $attributes['icon'] ) ) : ?>
                <span class="directorist-gutenberg-listing-card-element-icon" style="<?php echo $icon_style; ?>"><?php echo directorist_gutenberg_get_icon( 'icons/icon-library/' . $attributes['icon'] ); ?></span>
            <?php endif; ?>
            <div class="directorist-gutenberg-listing-card-element-details">
                <span class="directorist-gutenberg-listing-card-element-value"><?php echo $attributes['date_type'] === 'posted_date' ? __( '03 November, 2025', 'directorist-gutenberg' ) : __( 'Posted 10 days ago', 'directorist-gutenberg' ); ?></span>
            </div>
        </div>
    </div>
</div>