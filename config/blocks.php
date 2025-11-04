<?php

defined( "ABSPATH" ) || exit;

$blocks_dir = directorist_gutenberg_dir( "assets/blocks" );

return apply_filters( 'directorist_gutenberg_template_blocks', [
    'directorist-gutenberg/listings-archive' => [
        'dir'        => $blocks_dir,
        'field_type' => 'listings-archive',
        'types'      => ['listings-archive'],
    ],
    'directorist-gutenberg/listings-archive-search' => [
        'dir'        => $blocks_dir,
        'field_type' => 'listings-archive-search',
        'types'      => ['listings-archive'],
    ],
    'directorist-gutenberg/listings-archive-filters' => [
        'dir'        => $blocks_dir,
        'field_type' => 'listings-archive-filters',
        'types'      => ['listings-archive'],
    ],
    'directorist-gutenberg/listing-card-title' => [
        'dir'        => $blocks_dir,
        'field_type' => 'listing-card-title',
        'types'      => ['listings-grid-view', 'listings-list-view'],
    ],
    'directorist-gutenberg/listing-card-thumbnail' => [
        'dir'        => $blocks_dir,
        'field_type' => 'listing-card-thumbnail',
        'types'      => ['listings-grid-view', 'listings-list-view'],
    ],
    'directorist-gutenberg/listing-card-custom-text' => [
        'dir'        => $blocks_dir,
        'field_type' => 'listing-card-custom-text',
        'types'      => ['listings-grid-view', 'listings-list-view'],
    ],
] );