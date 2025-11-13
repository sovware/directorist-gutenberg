<?php
/**
 * User Avatar Block Render
 *
 * @package DirectoristGutenberg
 */

defined( 'ABSPATH' ) || exit;

$listing_id = get_the_ID();

if ( ! $listing_id ) {
	return;
}

// Get and sanitize alignment attribute.
$alignment = isset( $attributes['alignment'] ) ? sanitize_text_field( $attributes['alignment'] ) : 'left';
$alignment = in_array( $alignment, array( 'left', 'center', 'right' ), true ) ? $alignment : 'left';

// Get author ID.
$author_id = get_post_field( 'post_author', $listing_id );

if ( ! $author_id ) {
	return;
}

// Get author data.
$author_data = get_userdata( $author_id );

if ( ! $author_data ) {
	return;
}

$author_first_name   = isset( $author_data->first_name ) ? $author_data->first_name : '';
$author_last_name    = isset( $author_data->last_name ) ? $author_data->last_name : '';
$author_display_name = isset( $author_data->display_name ) ? $author_data->display_name : '';

// Get directory type.
$directory_type = directorist_get_listing_directory( $listing_id );
$directory_type = ! empty( $directory_type ) ? $directory_type : default_directory_type();

// Get author profile picture.
$pro_pic_attachment_id = get_user_meta( $author_id, 'pro_pic', true );
$pro_pic              = ! empty( $pro_pic_attachment_id ) ? wp_get_attachment_image_src( $pro_pic_attachment_id, 'thumbnail' ) : false;

// Get author link and class.
$author_link       = ATBDP_Permalink::get_user_profile_page_link( $author_id, $directory_type );
$author_link_class = ! empty( $author_first_name ) && ! empty( $author_last_name ) ? 'atbd_tooltip' : '';

// Get avatar image.
$avatar_size = apply_filters( 'atbdp_avatar_size', 32 );
$avatar_img  = get_avatar( $author_id, $avatar_size, '', $author_display_name );

// Get block width class
$block_width_class = directorist_gutenberg_get_block_width_class( $attributes );

// Get avatar overlap class.
$avatar_overlap_class = $attributes['avatar_overlap'] ? 'directorist-gutenberg-listing-card-element-avatar-overlap' : '';

// Combine classes
$wrapper_classes = array_filter( [ $block_width_class, $avatar_overlap_class ] );
?>

<div <?php echo get_block_wrapper_attributes(['class' => implode( ' ', $wrapper_classes )]); ?>>
    <div class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-user-avatar">
        <div class="directorist-gutenberg-listing-user-avatar directorist-gutenberg-listing-user-avatar-<?php echo esc_attr( $alignment ); ?>">
            <a href="<?php echo esc_url( $author_link ); ?>" aria-label="<?php esc_attr_e( 'Author Image', 'directorist' ); ?>" class="<?php echo esc_attr( $author_link_class ); ?>">
                <?php if ( $pro_pic && isset( $pro_pic[0] ) ) : ?>
                    <img src="<?php echo esc_url( $pro_pic[0] ); ?>" alt="<?php esc_attr_e( 'Author Image', 'directorist' ); ?>" width="<?php echo esc_attr( $pro_pic[1] ?? '' ); ?>" height="<?php echo esc_attr( $pro_pic[2] ?? '' ); ?>">
                <?php else : ?>
                    <?php echo wp_kses_post( $avatar_img ); ?>
                <?php endif; ?>
            </a>
        </div>
    </div>
</div>