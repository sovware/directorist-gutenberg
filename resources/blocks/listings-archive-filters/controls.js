/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useRef, useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import useArchiveBlockCommonTask from '@directorist-gutenberg/gutenberg/hooks/useArchiveBlockCommonTask';
import debounce from '@directorist-gutenberg/utils/debounce';

export default function Controls( { attributes, setAttributes } ) {
	useArchiveBlockCommonTask( { setAttributes } );

	// Local state for immediate UI updates
	const [ filtersText, setFiltersText ] = useState( attributes.filters_text );
	const [ resetText, setResetText ] = useState( attributes.reset_text );

	// Sync local state with attributes when they change externally
	useEffect( () => {
		setFiltersText( attributes.filters_text );
	}, [ attributes.filters_text ] );

	useEffect( () => {
		setResetText( attributes.reset_text );
	}, [ attributes.reset_text ] );

	// Create debounced setAttributes functions
	const debouncedSetFiltersTextRef = useRef(
		debounce( ( value ) => {
			setAttributes( { filters_text: value } );
		}, 500 )
	);

	const debouncedSetResetTextRef = useRef(
		debounce( ( value ) => {
			setAttributes( { reset_text: value } );
		}, 500 )
	);

	// Update debounced functions when setAttributes changes
	useEffect( () => {
		debouncedSetFiltersTextRef.current = debounce( ( value ) => {
			setAttributes( { filters_text: value } );
		}, 500 );
	}, [ setAttributes ] );

	useEffect( () => {
		debouncedSetResetTextRef.current = debounce( ( value ) => {
			setAttributes( { reset_text: value } );
		}, 500 );
	}, [ setAttributes ] );

	return (
		<InspectorControls>
			<PanelBody
				title={ __(
					'Listings Archive Settings',
					'directorist-gutenberg'
				) }
				initialOpen={ true }
			>
				<TextControl
					label={ __( 'Filters Text', 'directorist-gutenberg' ) }
					value={ filtersText }
					onChange={ ( value ) => {
						setFiltersText( value );
						debouncedSetFiltersTextRef.current( value );
					} }
				/>

				<TextControl
					label={ __( 'Reset Text', 'directorist-gutenberg' ) }
					value={ resetText }
					onChange={ ( value ) => {
						setResetText( value );
						debouncedSetResetTextRef.current( value );
					} }
				/>
			</PanelBody>
		</InspectorControls>
	);
}
