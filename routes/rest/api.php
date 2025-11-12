<?php

defined( 'ABSPATH' ) || exit;

use DirectoristGutenberg\App\Http\Controllers\BlocksPreviewTemplateController;
use DirectoristGutenberg\WpMVC\Routing\Route;

Route::group( 'blocks-preview', function() {
    
    Route::get( 'listings-archive/{block_type}', [ BlocksPreviewTemplateController::class, 'listings_archive_blocks_preview' ] );

}, [] );




