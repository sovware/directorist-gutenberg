<div <?php echo get_block_wrapper_attributes(); ?> class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-badge">
    <?php //echo esc_html( get_the_title( get_the_ID() ) ); ?>
    <div class="directorist-gutenberg-listing-badge directorist-gutenberg-listing-badge-favorite">
        <?php echo directorist_gutenberg_render_icon( 'icons/heart.svg' ); ?>
        <span>Favorite</span>
    </div>
</div>