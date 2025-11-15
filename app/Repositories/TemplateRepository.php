<?php

namespace DirectoristGutenberg\App\Repositories;

defined( "ABSPATH" ) || exit;

use DirectoristGutenberg\App\DTO\TemplateReadDTO;
use DirectoristGutenberg\App\Models\Post;
use DirectoristGutenberg\App\Models\PostMeta;

class TemplateRepository {
    
    public function get( TemplateReadDTO $read_dto ): array {
        $select_query = Post::query()
            ->where( 'post_type', directorist_gutenberg_post_type() )
            ->where_in( 'posts.post_status', [ 'publish', 'draft', 'pending', 'private', 'future' ] )
            ->left_join( PostMeta::get_table_name() . ' as template_meta', function( $join ) {
                $join->on_column( 'template_meta.post_id', '=', 'posts.ID' )
                    ->where( 'template_meta.meta_key', '=', 'template_type' );
            } )
            ->left_join( PostMeta::get_table_name() . ' as directory_meta', function( $join ) {
                $join->on_column( 'directory_meta.post_id', '=', 'posts.ID' )
                    ->where( 'directory_meta.meta_key', '=', 'directory_type_id' );
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

        if ( ! empty( $read_dto->get_template_type() ) ) {
            $select_query->where( 'template_meta.meta_value', $read_dto->get_template_type() );
        }

        if ( ! empty( $read_dto->get_directory_type() ) ) {
            $select_query->where( 'directory_meta.meta_value', $read_dto->get_directory_type() );
        }

        $count_query = clone $select_query;
        $sql_query   = clone $select_query;
        $count       = $count_query->count( 'DISTINCT posts.ID' );
        $sql         = $sql_query->to_sql();

        file_put_contents( __DIR__ . '/sql.sql', $sql );

        $posts = $select_query
            ->order_by( 'posts.post_date', 'desc' )
            ->pagination( $read_dto->get_page(), $read_dto->get_per_page(), 1, 100 );

        return [
            'items' => $posts,
            'total' => $count,
        ];
    }

}