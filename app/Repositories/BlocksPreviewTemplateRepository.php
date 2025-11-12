<?php

namespace DirectoristGutenberg\App\Repositories;

use Exception;
defined( "ABSPATH" ) || exit;

class BlocksPreviewTemplateRepository {
    public function get_listings_archive_block_preview_template( int $directorist_id, string $block_type, array $args = [] ): string {
        $templates = [
            'search'  => 'block-previews/listings-archive-search',
            'header'  => 'block-previews/listings-archive-header',
            'filter'  => 'block-previews/listings-archive-filter',
            'archive' => 'block-previews/listings-archive',
        ];

        if ( ! isset( $templates[ $block_type ] ) ) {
            throw new Exception( 'Invalid template type' );
        }

        return directorist_gutenberg_get_view( $templates[ $block_type ] );
    }
}