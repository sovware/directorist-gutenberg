<div <?php echo get_block_wrapper_attributes(); ?>>
    <div class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-posted-date">
        <?php //echo esc_html( get_the_title( get_the_ID() ) ); ?>
        <div class="directorist-gutenberg-listing-card-element-content">
            <?php if ( ! empty( $attributes['icon'] ) ) : ?>
                <span><?php echo directorist_gutenberg_get_icon( 'icons/icon-library/' . $attributes['icon'] ); ?></span>
            <?php endif; ?>
            <div class="directorist-gutenberg-listing-card-element-details">
                <span class="directorist-gutenberg-listing-card-element-value"><?php echo $attributes['date_type'] === 'posted_date' ? __( '03 November, 2025', 'directorist-gutenberg' ) : __( 'Posted 10 days ago', 'directorist-gutenberg' ); ?></span>
            </div>
        </div>
    </div>
</div>