/**
 * WordPress dependencies
 */
import { SearchControl } from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export default function TableSearch( { value = '', onChange, onSearch } ) {
	const [ searchValue, setSearchValue ] = useState( value );
	const debounceTimerRef = useRef( null );

	// Sync with external value changes
	useEffect( () => {
		setSearchValue( value );
	}, [ value ] );

	const handleChange = ( newValue ) => {
		setSearchValue( newValue );

		// Clear existing timer
		if ( debounceTimerRef.current ) {
			clearTimeout( debounceTimerRef.current );
		}

		// Call onChange immediately for UI responsiveness
		if ( onChange ) {
			onChange( newValue );
		}

		// Debounce API call
		debounceTimerRef.current = setTimeout( () => {
			if ( onSearch ) {
				onSearch( newValue );
			}
		}, 500 ); // 500ms debounce
	};

	// Cleanup on unmount
	useEffect( () => {
		return () => {
			if ( debounceTimerRef.current ) {
				clearTimeout( debounceTimerRef.current );
			}
		};
	}, [] );

	return (
		<SearchControl
			value={ searchValue }
			onChange={ handleChange }
			placeholder={ __( 'Search templates...', 'directorist-gutenberg' ) }
		/>
	);
}

