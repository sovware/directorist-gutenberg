<?php

$template = get_post( $template_id );

wp_enqueue_script_module( 'directorist-gutenberg/blocks-frontend' );
?>

<div class="directorist-gutenberg-blocks-wrap">
	<?php echo do_blocks( $template->post_content ); ?>
</div>