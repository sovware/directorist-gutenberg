<?php defined( 'ABSPATH' ) || exit;
// Get block width class
$block_width_class = directorist_gutenberg_get_block_width_class( $attributes );
?>

<h2 <?php echo get_block_wrapper_attributes(['class' => 'directorist-gutenberg-listing-card-block directorist-gutenberg-listing-card-title ' . $block_width_class]); ?>>
    <a href="<?php echo esc_url( get_the_permalink( get_the_ID() ) ); ?>">
        <?php echo esc_html( get_the_title( get_the_ID() ) ); ?>
    </a>
</h2>