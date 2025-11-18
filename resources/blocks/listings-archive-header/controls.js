/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl, FormTokenField } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

// View Type mappings
const VIEW_TYPE_MAP = {
	grid: __( 'Grid', 'directorist-gutenberg' ),
	list: __( 'List', 'directorist-gutenberg' ),
	map: __( 'Map', 'directorist-gutenberg' ),
};

const VIEW_TYPE_VALUES = Object.keys( VIEW_TYPE_MAP );
const VIEW_TYPE_SUGGESTIONS = Object.values( VIEW_TYPE_MAP );

// Sort By mappings
const SORT_BY_MAP = {
	a_z: __( 'A to Z (title)', 'directorist-gutenberg' ),
	z_a: __( 'Z to A (title)', 'directorist-gutenberg' ),
	latest: __( 'Latest Listings', 'directorist-gutenberg' ),
	oldest: __( 'Oldest Listings', 'directorist-gutenberg' ),
	popular: __( 'Popular Listings', 'directorist-gutenberg' ),
	price_low_high: __( 'Price: Low to High', 'directorist-gutenberg' ),
	price_high_low: __( 'Price: High to Low', 'directorist-gutenberg' ),
	random: __( 'Random Listings', 'directorist-gutenberg' ),
};

const SORT_BY_VALUES = Object.keys( SORT_BY_MAP );
const SORT_BY_SUGGESTIONS = Object.values( SORT_BY_MAP );

// Reverse maps for onChange handlers (label to value)
const VIEW_TYPE_LABEL_TO_VALUE = Object.fromEntries(
	Object.entries( VIEW_TYPE_MAP ).map( ( [ key, value ] ) => [ value, key ] )
);
const SORT_BY_LABEL_TO_VALUE = Object.fromEntries(
	Object.entries( SORT_BY_MAP ).map( ( [ key, value ] ) => [ value, key ] )
);

// Helper function to convert values to labels
const valuesToLabels = ( values, valueToLabelMap ) => {
	return ( values || [] ).map( ( value ) => valueToLabelMap[ value ] || value );
};

// Helper function to convert tokens to values
const tokensToValues = ( tokens, labelToValueMap, validValues ) => {
	return tokens
		.map( ( token ) => {
			// Handle label (translated)
			if ( labelToValueMap[ token ] ) {
				return labelToValueMap[ token ];
			}
			// Handle value (already a valid value)
			if ( validValues.includes( token ) ) {
				return token;
			}
			return null;
		} )
		.filter( ( value ) => value !== null );
};
/**
 * Internal dependencies
 */
import useArchiveBlockCommonTask from '@directorist-gutenberg/gutenberg/hooks/useArchiveBlockCommonTask';
import ShadowControl from '@directorist-gutenberg/gutenberg/components/controls/shadow-control';

export default function Controls( { attributes, setAttributes } ) {

	useArchiveBlockCommonTask( { setAttributes } );

	// Inside your component
	const templateID = useSelect( ( select ) => {
		return select( 'core/editor' ).getCurrentPostId();
	}, [] );

	useEffect( () => {
		setAttributes( { template_id: templateID } );
	}, [ templateID ] );

    return (
        <InspectorControls>
            <PanelBody
                title={ __( 'Listings Archive Header Settings', 'directorist-gutenberg' ) }
                initialOpen={ true }
            >
				<ToggleControl
					label={ __( 'Show Listings Count', 'directorist-gutenberg' ) }
					checked={ attributes.show_listings_count === 1 }
					onChange={ ( value ) => setAttributes( { show_listings_count: value ? 1 : 0 } ) }
				/>

				<TextControl
					label={ __( 'Listings Count Text', 'directorist-gutenberg' ) }
					value={ attributes.listings_count_text }
					onChange={ ( value ) => setAttributes( { listings_count_text: value } ) }
				/>

				<FormTokenField
					label={ __( 'View Type', 'directorist-gutenberg' ) }
					value={ valuesToLabels( attributes.view_type, VIEW_TYPE_MAP ) }
					suggestions={ VIEW_TYPE_SUGGESTIONS }
					onChange={ ( tokens ) => {
						setAttributes( {
							view_type: tokensToValues( tokens, VIEW_TYPE_LABEL_TO_VALUE, VIEW_TYPE_VALUES ),
						} );
					} }
					__experimentalExpandOnFocus
				/>

				<ToggleControl
					label={ __( 'Enable Sorting', 'directorist-gutenberg' ) }
					checked={ attributes.enable_sorting === 1 }
					onChange={ ( value ) => setAttributes( { enable_sorting: value ? 1 : 0} ) }
				/>

				<TextControl
					label={ __( 'Sort By Label', 'directorist-gutenberg' ) }
					value={ attributes.sort_by_label }
					onChange={ ( value ) => setAttributes( { sort_by_label: value } ) }
				/>

				<FormTokenField
					label={ __( 'Sort By', 'directorist-gutenberg' ) }
					value={ valuesToLabels( attributes.sort_by, SORT_BY_MAP ) }
					suggestions={ SORT_BY_SUGGESTIONS }
					onChange={ ( tokens ) => {
						setAttributes( {
							sort_by: tokensToValues( tokens, SORT_BY_LABEL_TO_VALUE, SORT_BY_VALUES ),
						} );
					} }
					__experimentalExpandOnFocus
				/>

            </PanelBody>
        </InspectorControls>
    );
}

export function StylesControls( { attributes, setAttributes } ) {
	return (
		<InspectorControls group="styles">
			<ShadowControl
				attributes={attributes}
				setAttributes={setAttributes}
				attrName="drop_shadow"
				label={__( 'Drop Shadow', 'directorist-gutenberg' )}
				initialOpen={false}
			/>
		</InspectorControls>
	);
}