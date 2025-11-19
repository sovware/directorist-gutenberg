<?php

namespace DirectoristGutenberg\App\Repositories;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\App\DTO\TemplateReadDTO;
use DirectoristGutenberg\App\DTO\TemplateCreateDTO;
use DirectoristGutenberg\App\DTO\TemplateDeleteDTO;
use DirectoristGutenberg\App\Models\Post;
use DirectoristGutenberg\App\Models\PostMeta;
use DirectoristGutenberg\WpMVC\Exceptions\Exception;

class TemplateRepository {
    
    public function get( TemplateReadDTO $read_dto ): array {
        $select_query = Post::query()
            ->where( 'post_type', directorist_gutenberg_post_type() )
            ->left_join( PostMeta::get_table_name() . ' as directory_meta', function( $join ) {
                $join->on_column( 'directory_meta.post_id', '=', 'posts.ID' )
                    ->where( 'directory_meta.meta_key', '=', 'directory_type_id' );
            } )
            ->left_join( PostMeta::get_table_name() . ' as template_meta', function( $join ) {
                $join->on_column( 'template_meta.post_id', '=', 'posts.ID' )
                    ->where( 'template_meta.meta_key', '=', 'template_type' );
            } )
            ->select(
                'posts.ID', 
                'posts.post_title', 
                'posts.post_date', 
                'posts.post_modified', 
                'posts.post_status',
                'template_meta.meta_value as template_type',
                'directory_meta.meta_value as directory_type'
            );

        if ( ! empty( $read_dto->get_directory_type() ) ) {
            $select_query->where( 'directory_meta.meta_value', $read_dto->get_directory_type() );
        }

        if ( ! empty( $read_dto->get_template_type() ) ) {
            $select_query->where( 'template_meta.meta_value', $read_dto->get_template_type() );
        }

        if ( ! empty( $read_dto->get_status() ) ) {
            $select_query->where_in( 'posts.post_status', $read_dto->get_status() );
        } else {
            $select_query->where_in( 'posts.post_status', [ 'publish', 'draft', 'pending', 'private', 'future' ] );
        }

        $count_query = clone $select_query;
        $count       = $count_query->count( 'DISTINCT posts.ID' );

        switch ( $read_dto->get_order_by() ) {
            case 'latest':
                $select_query->order_by( 'posts.post_modified', 'desc' );
                break;
            case 'oldest':
                $select_query->order_by( 'posts.post_modified', 'asc' );
                break;
            case 'title':
                $select_query->order_by( 'posts.post_title', 'asc' );
                break;
            default:
                $select_query->order_by( 'posts.post_modified', 'desc' );
                break;
        }

        return [
            'items' => $select_query->pagination( $read_dto->get_page(), $read_dto->get_per_page(), 1, 100 ),
            'total' => $count,
        ];
    }

    public function create( TemplateCreateDTO $create_dto ) {
        $post_id = wp_insert_post(
            [
                'post_type'    => directorist_gutenberg_post_type(),
                'post_title'   => $create_dto->get_title(),
                'post_content' => $create_dto->get_content(),
                'post_status'  => $create_dto->get_status(),
            ]
        );

        if ( false === $post_id ) {
            throw new Exception( esc_html__( 'Failed to create the template.', 'directorist-gutenberg' ), 500 );
        }

        update_post_meta( $post_id, 'directory_type_id', $create_dto->get_directory_type() );
        update_post_meta( $post_id, 'template_type', $create_dto->get_template_type() );

        return $post_id;
    }

    public function delete( int $id ) {
        $item = Post::query()
            ->where( 'ID', $id )
            ->first();

        if ( ! $item ) {
            throw new Exception( esc_html__( 'Template not found.', 'directorist-gutenberg' ), 404 );
        }

        $status = Post::query()
            ->where( 'ID', $id )
            ->delete();

        if ( false !== $status ) {
            $this->delete_template_meta( [ $id ] );
        }

        return $status;
    }

    public function delete_by_ids( array $ids ) {
        $status = Post::query()
            ->where_in( 'ID', $ids )
            ->delete();

        if ( false !== $status ) {
            $this->delete_template_meta( [ $ids ] );
        }

        return $status;
    }

    public function delete_by( TemplateDeleteDTO $delete_dto ) {
        $select_query = Post::query()
            ->where( 'post_type', directorist_gutenberg_post_type() )
            ->left_join( PostMeta::get_table_name() . ' as directory_meta', function( $join ) {
                $join->on_column( 'directory_meta.post_id', '=', 'posts.ID' )
                    ->where( 'directory_meta.meta_key', '=', 'directory_type_id' );
            } )
            ->left_join( PostMeta::get_table_name() . ' as template_meta', function( $join ) {
                $join->on_column( 'template_meta.post_id', '=', 'posts.ID' )
                    ->where( 'template_meta.meta_key', '=', 'template_type' );
            } )
            ->where( 'directory_meta.meta_value', $delete_dto->get_directory_type() )
            ->select( 'posts.ID' );

        if ( ! empty( $delete_dto->get_template_type() ) ) {
            $select_query->where( 'template_meta.meta_value', $delete_dto->get_template_type() );
        }

        if ( ! empty( $delete_dto->get_status() ) ) {
            $select_query->where_in( 'posts.post_status', $delete_dto->get_status() );
        }

        $items = $select_query->get();

        if ( empty( $items ) ) {
            throw new Exception( esc_html__( 'No template was found.', 'directorist-gutenberg' ), 404 );
        }

        $ids = array_column( $items, 'ID' );

        $status = Post::query()
            ->where_in( 'ID', $ids )
            ->delete();

        if ( false !== $status ) {
            $this->delete_template_meta( $ids );
        }

        return $status;
    }

    public function delete_template_meta( array $post_ids ) {
        PostMeta::query()
            ->where_in( 'post_id', $post_ids )
            ->where( 'meta_key', 'template_type' )
            ->delete();
    }

    public function get_directories() {
        $directories     = directorist_get_directories( [ 'hide_empty' => false ] );
        $directory_types = [];

        if ( ! is_wp_error( $directories ) && ! empty( $directories ) ) {
            $directory_types = array_map( function( $directory ) {
                $general_config = get_term_meta( $directory->term_id, 'general_config', true );
                $is_default     = get_term_meta( $directory->term_id, '_default', true );

                return [
                    'value'      => $directory->term_id,
                    'label'      => $directory->name,
                    'is_default' => strval( $is_default ) === '1',
                    'icon'       => ! empty( $general_config['icon'] ) ? $general_config['icon'] : null,
                ];
            }, $directories );
        }
        
        return $directory_types;
    }

}