<?php

defined( 'ABSPATH' ) || exit;

use Directorist\Directorist_Listings;

$listings = new Directorist_Listings();

// Get block width class
$block_width_class = directorist_gutenberg_get_block_width_class( $attributes );

// Get wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes(['class' => $block_width_class]);

// Add drop shadow style if set
if ( ! empty( $attributes['drop_shadow'] ) ) {
	$box_shadow = 'box-shadow: ' . esc_attr( $attributes['drop_shadow'] ) . ';';

	// Check if style attribute already exists in wrapper attributes
	if ( preg_match( '/style="([^"]*)"/', $wrapper_attributes, $matches ) ) {
		// Merge with existing style
		$existing_style = $matches[1];
		$new_style = $existing_style . ' ' . $box_shadow;
		$wrapper_attributes = str_replace( $matches[0], 'style="' . esc_attr( $new_style ) . '"', $wrapper_attributes );
	} else {
		// Add new style attribute before the closing >
		$wrapper_attributes = rtrim( $wrapper_attributes, '>' ) . ' style="' . esc_attr( $box_shadow ) . '">';
	}
}
?>
<div <?php echo $wrapper_attributes; $listings->data_atts() ?>>
    <?php
        ob_start();
        $listings->header_bar_template();

        $header_bar = ob_get_clean();

        if ( $header_bar ) :
            echo '<div class="directorist-gutenberg-listings-archive-header">';
            echo $header_bar;
            echo '</div>';
        endif;
    ?>
</div>
