<?php

defined( 'ABSPATH' ) || exit;

$template = get_post( $template_id );
?>

<?php echo do_blocks( $template->post_content ); ?>