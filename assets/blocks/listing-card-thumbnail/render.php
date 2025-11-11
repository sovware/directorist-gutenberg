<?php
    $listing_prv_img = directorist_get_listing_preview_image( get_the_ID() );
    
    // Extract inner blocks content if the saved structure contains it
    $inner_content = $content;
    
    // Check if content has the wrapper structure and extract only the front content
    if ( strpos( $content, 'directorist-gutenberg-listing-card-thumbnail-front' ) !== false ) {
        // Extract content from the front element
        preg_match( '/<div class="directorist-gutenberg-listing-card-thumbnail-front">(.*?)<\/div>\s*<\/div>$/s', $content, $matches );
        if ( ! empty( $matches[1] ) ) {
            $inner_content = $matches[1];
        }
    }
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
    <div class="directorist-gutenberg-listing-card-thumbnail">
        <div class="directorist-gutenberg-listing-card-thumbnail-back">
            <img src="<?php echo wp_get_attachment_image_url( $listing_prv_img, 'full' ); ?>" alt="<?php the_title(); ?>">
        </div>
        <div class="directorist-gutenberg-listing-card-thumbnail-front">
            <?php 
                // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                echo $inner_content; 
            ?>
        </div>
    </div>
</div>