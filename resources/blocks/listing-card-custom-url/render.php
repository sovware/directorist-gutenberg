<?php $meta_value = directorist_gutenberg_get_block_post_meta( $attributes['meta_key'], get_the_ID() ); ?>

<?php if ( $meta_value ) : ?>
<div <?php echo get_block_wrapper_attributes(); ?> class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-custom-text">
    <div class="directorist-gutenberg-listing-card-element-content">
        <?php if ( ! empty( $attributes['icon'] ) ) : ?>
            <span><?php echo directorist_gutenberg_get_icon( 'icons/icon-library/' . $attributes['icon'] ); ?></span>
        <?php endif; ?>

        <div class="directorist-gutenberg-listing-card-element-details">
            <span class="directorist-gutenberg-listing-card-element-value">
                <a href="<?php echo esc_url( $meta_value ); ?>" target="_blank">
                    <?php echo esc_url( $meta_value ); ?>
                </a>
            </span>
        </div>
    </div>
</div>
<?php endif; ?>