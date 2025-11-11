<?php
// Get block width class
$block_width_class = directorist_gutenberg_get_block_width_class( $attributes );
?>
<div <?php echo get_block_wrapper_attributes(['class' => $block_width_class]); ?>>
	<div class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-badge">
        <?php //echo esc_html( get_the_title( get_the_ID() ) ); ?>
        <div class="directorist-gutenberg-listing-badge directorist-gutenberg-listing-badge-featured">
            <?php echo directorist_gutenberg_get_icon( 'icons/star.svg' ); ?>
            <span>Featured</span>
        </div>
	</div>
</div>