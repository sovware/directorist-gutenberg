/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { SelectControl, TextControl } from '@wordpress/components';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useArchiveBlockCommonTask from '@directorist-gutenberg/gutenberg/hooks/useArchiveBlockCommonTask';

export default function Controls( { attributes, setAttributes } ) {

	useArchiveBlockCommonTask( { setAttributes } );

	const defaultViewOptions = [
		{ label: __( 'Grid', 'directorist-gutenberg' ), value: 'grid' },
		{ label: __( 'List', 'directorist-gutenberg' ), value: 'list' },
		{ label: __( 'Map', 'directorist-gutenberg' ), value: 'map' },
	];

	// Get default_view from block attributes (preferred) or post meta (fallback)
	const { defaultView } = useSelect( ( select ) => {
		// First try to get from block attributes
		if ( attributes?.default_view ) {
			return {
				defaultView: attributes.default_view,
			};
		}
		// Fallback to post meta
		const meta = select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {};
		return {
			defaultView: meta.default_view || 'grid',
		};
	}, [ attributes?.default_view ] );

	const { editPost } = useDispatch( 'core/editor' );

	const handleDefaultViewChange = ( value ) => {
		// Set as block attribute (preferred method)
		setAttributes( { default_view: value } );

		// Also save to post meta for backward compatibility
		editPost( {
			meta: {
				default_view: value,
			},
		} );
	};

	const listingsColumnsOptions = [
		{ label: __( '1', 'directorist-gutenberg' ), value: 1 },
		{ label: __( '2', 'directorist-gutenberg' ), value: 2 },
		{ label: __( '3', 'directorist-gutenberg' ), value: 3 },
		{ label: __( '4', 'directorist-gutenberg' ), value: 4 },
		{ label: __( '5', 'directorist-gutenberg' ), value: 5 },
		{ label: __( '6', 'directorist-gutenberg' ), value: 6 },
	];

	const paginationTypeOptions = [
		{ label: __( 'Numbered', 'directorist-gutenberg' ), value: 'numbered' },
		{ label: __( 'Infinite Scroll', 'directorist-gutenberg' ), value: 'infinite-scroll' },
	];

    return (
        <InspectorControls>
            <PanelBody
                title={ __( 'Listings Archive Settings', 'directorist-gutenberg' ) }
                initialOpen={ true }
            >

				<SelectControl
					label={ __( 'Default View', 'directorist-gutenberg' ) }
					value={ defaultView }
					options={ defaultViewOptions }
					onChange={ handleDefaultViewChange }
				/>

				<SelectControl
					label={ __( 'Listings Columns', 'directorist-gutenberg' ) }
					value={ attributes.listings_columns }
					options={ listingsColumnsOptions }
					onChange={ ( value ) => setAttributes( { listings_columns: parseInt( value, 10 ) } ) }
				/>

				<TextControl
					label={ __( 'Listings Per Page', 'directorist-gutenberg' ) }
					value={ attributes.listings_per_page }
					onChange={ ( value ) => setAttributes( { listings_per_page: parseInt( value, 10 ) } ) }
					type="number"
					min={ 1 }
					max={ 100 }
					step={ 1 }
				/>

				<SelectControl
					label={ __( 'Pagination Type', 'directorist-gutenberg' ) }
					value={ attributes.pagination_type }
					options={ paginationTypeOptions }
					onChange={ ( value ) => setAttributes( { pagination_type: value } ) }
				/>
            </PanelBody>
        </InspectorControls>
    );
}