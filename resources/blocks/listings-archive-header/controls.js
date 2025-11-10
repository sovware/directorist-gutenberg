/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, CheckboxControl, __experimentalVStack as VStack, } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useArchiveBlockCommonTask from '@directorist-gutenberg/gutenberg/hooks/useArchiveBlockCommonTask';

export default function Controls( { attributes, setAttributes } ) {

	useArchiveBlockCommonTask( { setAttributes } );

    return (
        <InspectorControls>
            <PanelBody
                title={ __( 'Listings Archive Header Settings', 'directorist-gutenberg' ) }
                initialOpen={ true }
            >
				<ToggleControl
					label={ __( 'Show Listings Count', 'directorist-gutenberg' ) }
					checked={ attributes.show_listings_count }
					onChange={ ( value ) => setAttributes( { show_listings_count: value } ) }
				/>

				<TextControl
					label={ __( 'Listings Count Text', 'directorist-gutenberg' ) }
					value={ attributes.listings_count_text }
					onChange={ ( value ) => setAttributes( { listings_count_text: value } ) }
				/>

				<VStack>
					<span>{ __( 'View Type', 'directorist-gutenberg' ) }</span>
					<CheckboxControl
						label={ __( 'Grid', 'directorist-gutenberg' ) }
						checked={ ( attributes.view_type || [] ).includes( 'grid' ) }
						onChange={ ( value ) => {
							const currentViewType = attributes.view_type || [];
							setAttributes( {
								view_type: value
									? ( currentViewType.includes( 'grid' ) ? currentViewType : [...currentViewType, 'grid'] )
									: currentViewType.filter( v => v !== 'grid' )
							} );
						} }
					/>
					<CheckboxControl
						label={ __( 'List', 'directorist-gutenberg' ) }
						checked={ ( attributes.view_type || [] ).includes( 'list' ) }
						onChange={ ( value ) => {
							const currentViewType = attributes.view_type || [];
							setAttributes( {
								view_type: value
									? ( currentViewType.includes( 'list' ) ? currentViewType : [...currentViewType, 'list'] )
									: currentViewType.filter( v => v !== 'list' )
							} );
						} }
					/>
					<CheckboxControl
						label={ __( 'Map', 'directorist-gutenberg' ) }
						checked={ ( attributes.view_type || [] ).includes( 'map' ) }
						onChange={ ( value ) => {
							const currentViewType = attributes.view_type || [];
							setAttributes( {
								view_type: value
									? ( currentViewType.includes( 'map' ) ? currentViewType : [...currentViewType, 'map'] )
									: currentViewType.filter( v => v !== 'map' )
							} );
						} }
					/>
				</VStack>

				<ToggleControl
					label={ __( 'Enable Sorting', 'directorist-gutenberg' ) }
					checked={ attributes.enable_sorting }
					onChange={ ( value ) => setAttributes( { enable_sorting: value } ) }
				/>

				<TextControl
					label={ __( 'Sort By Label', 'directorist-gutenberg' ) }
					value={ attributes.sort_by_label }
					onChange={ ( value ) => setAttributes( { sort_by_label: value } ) }
				/>

				<VStack>
					<span>{ __( 'Sort By', 'directorist-gutenberg' ) }</span>
					<CheckboxControl
						label={ __( 'A to Z (title)', 'directorist-gutenberg' ) }
						checked={ ( attributes.sort_by || [] ).includes( 'a_z' ) }
						onChange={ ( value ) => {
							const currentSortBy = attributes.sort_by || [];
							setAttributes( {
								sort_by: value
									? ( currentSortBy.includes( 'a_z' ) ? currentSortBy : [...currentSortBy, 'a_z'] )
									: currentSortBy.filter( v => v !== 'a_z' )
							} );
						} }
					/>
					<CheckboxControl
						label={ __( 'Z to A (title)', 'directorist-gutenberg' ) }
						checked={ ( attributes.sort_by || [] ).includes( 'z_a' ) }
						onChange={ ( value ) => {
							const currentSortBy = attributes.sort_by || [];
							setAttributes( {
								sort_by: value
									? ( currentSortBy.includes( 'z_a' ) ? currentSortBy : [...currentSortBy, 'z_a'] )
									: currentSortBy.filter( v => v !== 'z_a' )
							} );
						} }
					/>
					<CheckboxControl
						label={ __( 'Latest Listings', 'directorist-gutenberg' ) }
						checked={ ( attributes.sort_by || [] ).includes( 'latest' ) }
						onChange={ ( value ) => {
							const currentSortBy = attributes.sort_by || [];
							setAttributes( {
								sort_by: value
									? ( currentSortBy.includes( 'latest' ) ? currentSortBy : [...currentSortBy, 'latest'] )
									: currentSortBy.filter( v => v !== 'latest' )
							} );
						} }
					/>
					<CheckboxControl
						label={ __( 'Oldest Listings', 'directorist-gutenberg' ) }
						checked={ ( attributes.sort_by || [] ).includes( 'oldest' ) }
						onChange={ ( value ) => {
							const currentSortBy = attributes.sort_by || [];
							setAttributes( {
								sort_by: value
									? ( currentSortBy.includes( 'oldest' ) ? currentSortBy : [...currentSortBy, 'oldest'] )
									: currentSortBy.filter( v => v !== 'oldest' )
							} );
						} }
					/>
					<CheckboxControl
						label={ __( 'Popular Listings', 'directorist-gutenberg' ) }
						checked={ ( attributes.sort_by || [] ).includes( 'popular' ) }
						onChange={ ( value ) => {
							const currentSortBy = attributes.sort_by || [];
							setAttributes( {
								sort_by: value
									? ( currentSortBy.includes( 'popular' ) ? currentSortBy : [...currentSortBy, 'popular'] )
									: currentSortBy.filter( v => v !== 'popular' )
							} );
						} }
					/>
					<CheckboxControl
						label={ __( 'Price: Low to High', 'directorist-gutenberg' ) }
						checked={ ( attributes.sort_by || [] ).includes( 'price_low_to_high' ) }
						onChange={ ( value ) => {
							const currentSortBy = attributes.sort_by || [];
							setAttributes( {
								sort_by: value
									? ( currentSortBy.includes( 'price_low_to_high' ) ? currentSortBy : [...currentSortBy, 'price_low_to_high'] )
									: currentSortBy.filter( v => v !== 'price_low_to_high' )
							} );
						} }
					/>
					<CheckboxControl
						label={ __( 'Price: High to Low', 'directorist-gutenberg' ) }
						checked={ ( attributes.sort_by || [] ).includes( 'price_high_to_low' ) }
						onChange={ ( value ) => {
							const currentSortBy = attributes.sort_by || [];
							setAttributes( {
								sort_by: value
									? ( currentSortBy.includes( 'price_high_to_low' ) ? currentSortBy : [...currentSortBy, 'price_high_to_low'] )
									: currentSortBy.filter( v => v !== 'price_high_to_low' )
							} );
						} }
					/>
					<CheckboxControl
						label={ __( 'Random Listings', 'directorist-gutenberg' ) }
						checked={ attributes.sort_by.includes( 'random' ) }
						onChange={ ( value ) => setAttributes( { sort_by: value ? [...attributes.sort_by, 'random'] : attributes.sort_by.filter( v => v !== 'random' ) } ) }
					/>
				</VStack>

            </PanelBody>
        </InspectorControls>
    );
}