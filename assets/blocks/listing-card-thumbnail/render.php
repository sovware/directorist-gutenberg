<?php
    if ( ! defined( 'ABSPATH' ) ) exit;

    use Directorist\Helper;

    $listing_prv_img = directorist_get_listing_preview_image( get_the_ID() );

    if ( empty( $listing_prv_img ) ) {
        $listing_prv_imgs = directorist_get_listing_gallery_images( get_the_ID() );

        if ( ! empty( $listing_prv_imgs ) ) {
            $listing_prv_img = $listing_prv_imgs[0];
        }
    }

    if ( empty( $listing_prv_img ) ) {
        $listing_prv_img = get_post_thumbnail_id( get_the_ID() );
    }

    if ( empty( $listing_prv_img ) ) {
        $directory_id        = get_post_meta( get_the_ID(), '_directory_type', true );
        $directory_id        = is_array( $directory_id ) && ! empty( $directory_id ) ? $directory_id[0] : $directory_id;
        $listing_prv_img_src = Helper::default_preview_image_src( $directory_id );
    } else {
        $listing_prv_img_src = wp_get_attachment_image_url( $listing_prv_img, 'full' );
    }

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

    // Get wrapper attributes (includes margin, padding, border, border-radius from block supports)
    $wrapper_attributes = get_block_wrapper_attributes( [
        'class' => 'directorist-gutenberg-listing-card-thumbnail',
    ] );

    // Merge custom thumbnail styles with wrapper attributes
    if ( ! empty( $thumbnail_styles ) ) {
        // Check if style attribute already exists in wrapper attributes
        if ( preg_match( '/style="([^"]*)"/', $wrapper_attributes, $matches ) ) {
            // Merge with existing style
            $existing_style = $matches[1];
            $new_style = $existing_style . ' ' . $thumbnail_styles;
            $wrapper_attributes = str_replace( $matches[0], 'style="' . esc_attr( $new_style ) . '"', $wrapper_attributes );
        } else {
            // Add new style attribute before the closing >
            $wrapper_attributes = rtrim( $wrapper_attributes, '>' ) . ' style="' . esc_attr( $thumbnail_styles ) . '">';
        }
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
    <div <?php echo $wrapper_attributes; ?>>
        <div class="directorist-gutenberg-listing-card-thumbnail-back">
            <a href="<?php the_permalink(); ?>">
                <img src="<?php echo $listing_prv_img_src; ?>" alt="<?php the_title(); ?>"<?php echo ! empty( $extra_styles ) ? ' style="' . esc_attr( $extra_styles ) . '"' : ''; ?>>
                <?php echo $overlay_markup; ?>
            </a>
        </div>
        <div class="directorist-gutenberg-listing-card-thumbnail-front">
            <?php
                // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                echo $inner_content;
            ?>
        </div>
    </div>
</div>

