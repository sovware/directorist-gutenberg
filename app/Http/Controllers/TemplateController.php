<?php

namespace DirectoristGutenberg\App\Http\Controllers;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\App\Http\Controllers\Controller;
use DirectoristGutenberg\WpMVC\Exceptions\Exception;
use DirectoristGutenberg\WpMVC\Routing\Response;
use DirectoristGutenberg\WpMVC\RequestValidator\Validator;
use DirectoristGutenberg\App\Repositories\TemplateRepository;
use DirectoristGutenberg\App\DTO\TemplateReadDTO;
use WP_REST_Request;

class TemplateController extends Controller {

    public TemplateRepository $repository;

    public function __construct( TemplateRepository $repository ) {
        $this->repository = $repository;
    }

    public function index( Validator $validator, WP_REST_Request $request ): array {
        $validator->validate(
            [
                "per_page"       => "numeric",
                "page"           => "numeric",
                "template_type"  => "string",
                "directory_type" => "numeric"
            ]
        );

        $read_dto = ( new TemplateReadDTO() )
            ->set_per_page( $request->get_param( 'per_page' ) ?? 10 )
            ->set_page( $request->get_param( 'page' ) ?? 1 )
            ->set_template_type( $request->get_param( 'template_type' ) )
            ->set_directory_type( $request->get_param( 'directory_type' ) );

        return Response::send(
            $this->repository->get( $read_dto )
        );
    }
}