<div <?php echo get_block_wrapper_attributes(); ?> class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-location">
    <?php //echo esc_html( get_the_title( get_the_ID() ) ); ?>
    <div class="directorist-gutenberg-listing-card-element-content">
        <span><?php directorist_gutenberg_render_icon( 'icons/icon-library/' . $attributes['icon'] ); ?></span>
        <div class="directorist-gutenberg-listing-card-element-details">
            <?php if ( $attributes['show_label'] ) : ?>
                <span class="directorist-gutenberg-listing-card-element-label">Location:</span>
            <?php endif; ?>
            <span class="directorist-gutenberg-listing-card-element-value">Dubai</span>
        </div>
    </div>
</div>