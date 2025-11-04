<div <?php echo get_block_wrapper_attributes(); ?> class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-custom-text">
    <div class="directorist-gutenberg-listing-card-element-content">
        <?php if ( ! empty( $attributes['icon'] ) ) : ?>
        <span><?php directorist_gutenberg_render_icon( 'icons/icon-library/' . $attributes['icon'] ); ?></span>
        <?php endif; ?>

        <div class="directorist-gutenberg-listing-card-element-details">
            <span class="directorist-gutenberg-listing-card-element-value">Custom Text</span>
        </div>
    </div>
</div>