<?php

defined( 'ABSPATH' ) || exit;

use DirectoristGutenberg\App\Http\Controllers\TemplateController;
use DirectoristGutenberg\WpMVC\Routing\Route;

Route::group( 'admin', function() {
    Route::group( 'templates', function() {
        Route::get( '/', [ TemplateController::class, 'index' ] );
        Route::delete( '/delete-by', [ TemplateController::class, 'delete_by' ] );
        Route::delete( '/{id}', [ TemplateController::class, 'delete' ] );
    } );
}, [ 'admin' ] );





