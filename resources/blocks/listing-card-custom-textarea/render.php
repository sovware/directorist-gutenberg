<?php
$meta_value = directorist_gutenberg_get_block_post_meta( $attributes['meta_key'], get_the_ID() );

// Build icon style from icon_color and icon_size attributes
$icon_style = directorist_gutenberg_build_icon_style( $attributes );
?>

<?php if ( $meta_value ) : ?>
<div <?php echo get_block_wrapper_attributes(['class' => 'directorist-gutenberg-listing-card-block']); ?> class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-custom-textarea">
    <div class="directorist-gutenberg-listing-card-element-content">
        <?php if ( ! empty( $attributes['icon'] ) ) : ?>
            <span class="directorist-gutenberg-listing-card-element-icon" style="<?php echo $icon_style; ?>"><?php echo directorist_gutenberg_get_icon( 'icons/icon-library/' . $attributes['icon'] ); ?></span>
        <?php endif; ?>

        <div class="directorist-gutenberg-listing-card-element-details">
            <span class="directorist-gutenberg-listing-card-element-value"><?php echo nl2br( $meta_value ); ?></span>
        </div>
    </div>
</div>
<?php endif; ?>