<div <?php echo get_block_wrapper_attributes(); ?>>
    <div class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-view-count">
        <span class="directorist-gutenberg-listing-card-view-count" data-id="<?php the_ID(); ?>">
            <span class="directorist-gutenberg-listing-card-view-count-icon">
                <?php echo directorist_gutenberg_render_icon( 'icons/icon-library/' . $attributes['icon'] ); ?>
            </span>
            <span class="directorist-gutenberg-listing-card-view-count-value">
                <?php echo esc_html( $listings->loop['post_view'] ?? 0 ); ?>
            </span>
        </span>
    </div>
</div>