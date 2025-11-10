<?php defined( 'ABSPATH' ) || exit; ?>

<h2 <?php echo get_block_wrapper_attributes(); ?>>
    <a href="<?php echo esc_url( get_the_permalink( get_the_ID() ) ); ?>">
        <?php echo esc_html( get_the_title( get_the_ID() ) ); ?>
    </a>
</h2>
