<?php
// Get block width class
$block_width_class = directorist_gutenberg_get_block_width_class( $attributes );

// Get text alignment class
$text_align_class = directorist_gutenberg_get_text_align_class( $attributes );

// Combine classes
$wrapper_classes = array_filter( [ $block_width_class, $text_align_class ] );
?>
<div <?php echo get_block_wrapper_attributes(['class' => implode( ' ', $wrapper_classes )]); ?> style="--directorist-gutenberg-listing-badge-background-color: <?php echo esc_attr( $attributes['background_color'] ); ?>; --directorist-gutenberg-listing-badge-text-color: <?php echo esc_attr( $attributes['text_color'] ); ?>;">
    <div class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-badge">
        <?php //echo esc_html( get_the_title( get_the_ID() ) ); ?>
        <div class="directorist-gutenberg-listing-badge directorist-gutenberg-listing-badge-popular">
            <?php echo directorist_gutenberg_get_icon( 'icons/fire-solid.svg' ); ?>
            <?php if ( $attributes['text'] ) : ?>
                <span><?php echo esc_html( $attributes['text'] ); ?></span>
            <?php endif; ?>
        </div>
    </div>
</div>