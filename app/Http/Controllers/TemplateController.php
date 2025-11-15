<?php

namespace DirectoristGutenberg\App\Http\Controllers;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\App\Http\Controllers\Controller;
use DirectoristGutenberg\WpMVC\Exceptions\Exception;
use DirectoristGutenberg\WpMVC\Routing\Response;
use DirectoristGutenberg\WpMVC\RequestValidator\Validator;
use DirectoristGutenberg\App\Repositories\TemplateRepository;
use DirectoristGutenberg\App\DTO\TemplateReadDTO;
use DirectoristGutenberg\App\DTO\TemplateCreateDTO;
use DirectoristGutenberg\App\DTO\TemplateDeleteDTO;
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
                "directory_type" => "numeric",
                "status"         => "array",
                "order_by"       => "string"
            ]
        );

        $read_dto = ( new TemplateReadDTO() )
            ->set_per_page( $request->get_param( 'per_page' ) ?? 10 )
            ->set_page( $request->get_param( 'page' ) ?? 1 )
            ->set_template_type( $request->get_param( 'template_type' ) )
            ->set_directory_type( $request->get_param( 'directory_type' ) )
            ->set_status( $request->get_param( 'status' ) )
            ->set_order_by( $request->get_param( 'order_by' ) ?? 'latest' );

        return Response::send(
            $this->repository->get( $read_dto )
        );
    }

    public function create_single_template( Validator $validator, WP_REST_Request $request ): array {
        $validator->validate(
            [
                "directory_type" => "required|numeric",
                "template_type"  => "required|string",
                "status"         => "string",
            ]
        );

        $demo_template = $this->get_demo_template( $request->get_param( 'template_type' ) );

        $title   = $demo_template['title'];
        $content = $demo_template['content'];

        $create_dto = ( new TemplateCreateDTO() )
            ->set_directory_type( $request->get_param( 'directory_type' ) )
            ->set_template_type( $request->get_param( 'template_type' ) )
            ->set_title( $title )
            ->set_content( $content )
            ->set_status( $request->get_param( 'status' ) ?? 'publish' );

        $post_id = $this->repository->create( $create_dto );

        if ( false === $post_id ) {
            throw new Exception( esc_html__( 'Failed to create the template.', 'directorist-gutenberg' ), 500 );
        }

        $post_id = wp_update_post(
            [
                'ID'         => $post_id,
                'post_title' => $title . ' #' . $post_id,
            ] 
        );

        return Response::send(
            [
                'post_id' => $post_id,
                'message' => __( 'The template was created successfully.' )
            ]
        );
    }

    protected function get_demo_template( string $template_type ): array {
        $demo_contents = [
            'listings-archive'           => [
                'title'   => 'Listings Archive',
                'content' => '',
            ],
            'listings-archive-grid-view' => [
                'title'   => 'Listings Archive Grid View',
                'content' => '',
            ],
            'listings-archive-list-view' => [
                'title'   => 'Listings Archive List View',
                'content' => '',
            ],
        ];

        if ( ! isset( $demo_contents[ $template_type ] ) ) {
            throw new Exception( esc_html__( 'Invalid template type.', 'directorist-gutenberg' ), 400 );
        }

        return $demo_contents[ $template_type ];
    }

    public function delete( Validator $validator, WP_REST_Request $request ): array {
        $validator->validate(
            [
                "id" => "numeric"
            ]
        );

        $delete_status = $this->repository->delete( $request->get_param( 'id' ) );
        
        if ( false === $delete_status ) {
            throw new Exception( esc_html__( 'Failed to delete the template.', 'directorist-gutenberg' ), 500 );
        }

        return Response::send(
            [
                'message' => __( 'The template was deleted successfully.' )
            ]
        );
    }

    public function delete_by( Validator $validator, WP_REST_Request $request ): array {
        $validator->validate(
            [
                "directory_id"  => "required|numeric",
                "template_type" => "string",
                "status"        => "array",
            ]
        );

        $delete_dto = ( new TemplateDeleteDTO() )
            ->set_directory_type( $request->get_param( 'directory_id' ) )
            ->set_template_type( $request->get_param( 'template_type' ) )
            ->set_status( $request->get_param( 'status' ) );

        return Response::send(
            [
                'total_deleted' => $this->repository->delete_by( $delete_dto ),
                'message'       => __( 'The templates was deleted successfully.' )
            ]
        );
    }
}