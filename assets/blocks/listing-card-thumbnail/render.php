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

    // Get block width class
    $block_width_class = directorist_gutenberg_get_block_width_class( $attributes );

    // Build dimension styles
    $extra_styles = '';
    if ( ! empty( $attributes['aspectRatio'] ) ) {
        $extra_styles .= 'width:100%;height:100%;';
    } elseif ( ! empty( $attributes['height'] ) ) {
        $extra_styles .= "height:{$attributes['height']};";
    }
    if ( ! empty( $attributes['width'] ) ) {
        $extra_styles .= "width:{$attributes['width']};";
    }
    if ( ! empty( $attributes['scale'] ) ) {
        $extra_styles .= "object-fit:{$attributes['scale']};";
    }

    // Build thumbnail wrapper styles
    $thumbnail_styles = '';
    if ( ! empty( $attributes['aspectRatio'] ) ) {
        $thumbnail_styles .= "aspect-ratio:{$attributes['aspectRatio']};";
    }
    if ( ! empty( $attributes['width'] ) ) {
        $thumbnail_styles .= "width:{$attributes['width']};";
    }
    if ( ! empty( $attributes['height'] ) ) {
        $thumbnail_styles .= "height:{$attributes['height']};";
    }

    // Get overlay markup
    $overlay_markup = '';
    $has_dim_background = isset( $attributes['dimRatio'] ) && $attributes['dimRatio'] > 0;
    if ( $has_dim_background ) {
        $overlay_classes = array( 'directorist-gutenberg-listing-card-thumbnail-overlay', 'has-background-dim' );
        $overlay_styles = array();

        if ( isset( $attributes['dimRatio'] ) ) {
            $dim_ratio_class = 'has-background-dim-' . ( 10 * round( $attributes['dimRatio'] / 10 ) );
            $overlay_classes[] = $dim_ratio_class;
        }

        if ( isset( $attributes['overlayColor'] ) ) {
            $overlay_classes[] = "has-{$attributes['overlayColor']}-background-color";
        }

        if ( isset( $attributes['customOverlayColor'] ) ) {
            $overlay_styles[] = sprintf( 'background-color: %s;', esc_attr( $attributes['customOverlayColor'] ) );
        }

        if ( isset( $attributes['gradient'] ) || isset( $attributes['customGradient'] ) ) {
            $overlay_classes[] = 'has-background-gradient';
            if ( isset( $attributes['gradient'] ) ) {
                $overlay_classes[] = "has-{$attributes['gradient']}-gradient-background";
            }
            if ( isset( $attributes['customGradient'] ) ) {
                $overlay_styles[] = sprintf( 'background-image: %s;', esc_attr( $attributes['customGradient'] ) );
            }
        }

        $overlay_markup = sprintf(
            '<span class="%s" style="%s" aria-hidden="true"></span>',
            esc_attr( implode( ' ', $overlay_classes ) ),
            esc_attr( implode( ' ', $overlay_styles ) )
        );
    }
?>

<div class="<?php echo esc_attr( $block_width_class ); ?>">
    <div class="directorist-gutenberg-listing-card-thumbnail"<?php echo ! empty( $thumbnail_styles ) ? ' style="' . esc_attr( $thumbnail_styles ) . '"' : ''; ?>>
        <div class="directorist-gutenberg-listing-card-thumbnail-back">
            <img src="<?php echo wp_get_attachment_image_url( $listing_prv_img, 'full' ); ?>" alt="<?php the_title(); ?>"<?php echo ! empty( $extra_styles ) ? ' style="' . esc_attr( $extra_styles ) . '"' : ''; ?>>
            <?php echo $overlay_markup; ?>
        </div>
        <div class="directorist-gutenberg-listing-card-thumbnail-front">
            <?php
                // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                echo $inner_content;
            ?>
        </div>
    </div>
</div>