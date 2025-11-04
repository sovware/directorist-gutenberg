<div <?php echo get_block_wrapper_attributes(); ?> class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-phone">
    <div class="directorist-gutenberg-listing-card-element-content">
        <?php if ( ! empty( $attributes['icon'] ) ) : ?>
            <span><?php directorist_gutenberg_render_icon( 'icons/icon-library/' . $attributes['icon'] ); ?></span>
        <?php endif; ?>
        <div class="directorist-gutenberg-listing-card-element-details">
            <?php if ( $attributes['show_label'] ) : ?>
                <span class="directorist-gutenberg-listing-card-element-label">Phone:</span>
            <?php endif; ?>
            <span class="directorist-gutenberg-listing-card-element-value">(123) 456-7890</span>
        </div>
    </div>
</div>