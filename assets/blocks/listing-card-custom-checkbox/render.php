<?php 
    $meta_value = directorist_gutenberg_get_block_post_meta( $attributes['meta_key'], get_the_ID() );
    $options    = directorist_gutenberg_get_directory_submission_field_options( $attributes['directory_type_id'], 'custom', $attributes['meta_key'], $meta_value );
    $meta_label = $options ? implode( ', ', array_column( $options, 'option_label' ) ) : '';
?>

<?php if ( $meta_label ) : ?>
<div <?php echo get_block_wrapper_attributes(); ?> class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-custom-checkbox">
    <div class="directorist-gutenberg-listing-card-element-content">
        <?php if ( ! empty( $attributes['icon'] ) ) : ?>
        <span><?php directorist_gutenberg_render_icon( 'icons/icon-library/' . $attributes['icon'] ); ?></span>
        <?php endif; ?>

        <div class="directorist-gutenberg-listing-card-element-details">
            <span class="directorist-gutenberg-listing-card-element-value"><?php echo $meta_label; ?></span>
        </div>
    </div>
</div>
<?php endif; ?>