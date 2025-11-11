<?php defined( 'ABSPATH' ) || exit;

$listing_id = get_the_ID();
$default_icon = isset( $attributes['icon'] ) ? $attributes['icon'] : 'font-awesome/folder-alt.svg';

// Build icon style from icon_color and icon_size attributes
$icon_style = directorist_gutenberg_build_icon_style( $attributes );

// Get categories for the current listing
$cats = array();
if ( defined( 'ATBDP_CATEGORY' ) ) {
	$cats = get_the_terms( $listing_id, ATBDP_CATEGORY );
	if ( is_wp_error( $cats ) || ! $cats ) {
		$cats = array();
	}
}

?>
<div <?php echo get_block_wrapper_attributes(['class' => 'directorist-gutenberg-listing-card-block']); ?>>
    <div class="directorist-gutenberg-listing-card-element directorist-gutenberg-listing-card-element-category">
		<div class="directorist-gutenberg-listing-card-element-content">
			<div class="directorist-gutenberg-listing-category">
				<?php if ( ! empty( $cats ) ) {
					$term_icon  = get_term_meta( $cats[0]->term_id, 'category_icon', true );
					$term_icon  = $term_icon ? $term_icon : $default_icon;
					$term_link  = defined( 'ATBDP_CATEGORY' ) ? esc_url( get_term_link( $cats[0]->term_id, ATBDP_CATEGORY ) ) : '#';
					$term_label = $cats[0]->name;
					?>
					<a href="<?php echo esc_url( $term_link ); ?>">
						<?php
						if ( function_exists( 'directorist_icon' ) && ( strpos( $term_icon, 'fa-' ) === 0 || strpos( $term_icon, 'fas ' ) === 0 || strpos( $term_icon, 'far ' ) === 0 || strpos( $term_icon, 'fab ' ) === 0 ) ) {
							directorist_icon( $term_icon );
						} else {
							echo '<span class="directorist-gutenberg-listing-card-element-icon directorist-gutenberg-listing-category-icon" style="' . $icon_style . '"> ' . directorist_gutenberg_get_icon( 'icons/icon-library/' . $term_icon ) . '</span>';
						}
						?>
						<?php echo esc_html( $term_label ); ?>
					</a>
					<?php
					$totalTerm = count( $cats );
					if ( $totalTerm > 1 ) {
						$totalTerm = $totalTerm - 1; ?>
						<div class="directorist-gutenberg-listing-category__popup">
							<span class="directorist-gutenberg-listing-category__extran-count">+<?php echo esc_html( $totalTerm ); ?></span>
							<div class="directorist-gutenberg-listing-category__popup__content">
								<?php
								foreach ( array_slice( $cats, 1 ) as $cat ) {
									$term_icon  = get_term_meta( $cat->term_id, 'category_icon', true );
									$term_icon  = $term_icon ? $term_icon : $default_icon;
									$term_link  = defined( 'ATBDP_CATEGORY' ) ? esc_url( get_term_link( $cat->term_id, ATBDP_CATEGORY ) ) : '#';
									$term_label = $cat->name;
									?>

									<a href="<?php echo esc_url( $term_link );?>">
										<?php
										if ( function_exists( 'directorist_icon' ) && ( strpos( $term_icon, 'fa-' ) === 0 || strpos( $term_icon, 'fas ' ) === 0 || strpos( $term_icon, 'far ' ) === 0 || strpos( $term_icon, 'fab ' ) === 0 ) ) {
											directorist_icon( $term_icon );
										} else {
											echo '<span class="directorist-gutenberg-listing-card-element-icon directorist-gutenberg-listing-category-icon" style="' . $icon_style . '">' . directorist_gutenberg_get_icon( 'icons/icon-library/' . $term_icon ) . '</span>';
										}
										?>
										<?php echo esc_html( $term_label ); ?>
									</a>

									<?php
								}
								?>
							</div>

						</div>
						<?php
					}
					} else { ?>
					<a href="#">
						<span class="directorist-gutenberg-listing-card-element-icon" style="<?php echo $icon_style; ?>"><?php echo directorist_gutenberg_get_icon( 'icons/icon-library/' . $default_icon ); ?></span>
						<?php esc_html_e( 'Uncategorized', 'directorist' ); ?>
					</a>
					<?php
				}
				?>
			</div>
		</div>
    </div>
</div>