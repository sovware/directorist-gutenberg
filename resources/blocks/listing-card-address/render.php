<div <?php echo get_block_wrapper_attributes(); ?>>
    <div class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-address">
        <div class="directorist-gutenberg-listing-card-element-content">
            <span><?php echo directorist_gutenberg_render_icon( 'icons/icon-library/' . $attributes['icon'] ); ?></span>
            <div class="directorist-gutenberg-listing-card-element-details">
                <?php if ( $attributes['show_label'] ) : ?>
                    <span class="directorist-gutenberg-listing-card-element-label">Address:</span>
                <?php endif; ?>
                <span class="directorist-gutenberg-listing-card-element-value">New York, United States</span>
            </div>
        </div>
    </div>
</div>