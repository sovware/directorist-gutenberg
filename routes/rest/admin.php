<?php

defined( 'ABSPATH' ) || exit;

use DirectoristGutenberg\App\Http\Controllers\TemplateController;
use DirectoristGutenberg\WpMVC\Routing\Route;

Route::group( 'admin', function() {
    Route::group( 'templates', function() {
        Route::get( '', [ TemplateController::class, 'index' ] );
    } );
}, [ 'admin' ] );





