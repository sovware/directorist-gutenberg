<?php

defined( 'ABSPATH' ) || exit;

use DirectoristGutenberg\App\Http\Controllers\TemplateController;
use DirectoristGutenberg\WpMVC\Routing\Route;

Route::group( 'admin', function() {
    Route::group( 'templates', function() {
        Route::get( '/', [ TemplateController::class, 'index' ] );
        Route::post( '/create-single', [ TemplateController::class, 'create_single_template' ] );
        Route::post( '/create-all', [ TemplateController::class, 'create_all_templates' ] );
        Route::delete( '/delete-by', [ TemplateController::class, 'delete_by' ] );
        Route::delete( '/{id}', [ TemplateController::class, 'delete' ] );
    } );
}, [ 'admin' ] );





