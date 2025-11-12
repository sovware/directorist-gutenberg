<?php

namespace DirectoristGutenberg\App\Http\Controllers;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\App\Http\Controllers\Controller;
use DirectoristGutenberg\WpMVC\Routing\Response;
use DirectoristGutenberg\WpMVC\RequestValidator\Validator;
use DirectoristGutenberg\App\Repositories\BlocksPreviewTemplateRepository;
use WP_REST_Request;

class BlocksPreviewTemplateController extends Controller {

    public BlocksPreviewTemplateRepository $repository;

    public function __construct( BlocksPreviewTemplateRepository $repository ) {
        $this->repository = $repository;
    }

    public function listings_archive_blocks_preview( Validator $validator, WP_REST_Request $request ): array {
        $validator->validate( 
            [
                "directory_id" => "required|numeric",
                "block_type"   => "required|string",
            ]
        );

        return Response::send(
            [
                "template" => $this->repository->get_listings_archive_block_preview_template( 
                    $request->get_param( 'directory_id' ), 
                    $request->get_param( 'block_type' ),
                    $request->get_params()
                )
            ]
        );
    }
}