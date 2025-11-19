/**
 * WordPress dependencies
 */
import { Button, Popover } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

/**
 * Internal dependencies
 */
import filterIcon from '@icon/filter.svg';
import { StyledTableFilters, StyledFiltersPopover } from '../style';

export default function TableFilters( {
	filters = [],
	onFiltersChange,
	statusOptions = [],
	typeOptions = [],
} ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ localFilters, setLocalFilters ] = useState( filters );

	// Sync local filters with external filters
	useEffect( () => {
		setLocalFilters( filters );
	}, [ filters ] );

	const handleFilterChange = ( field, operator, value ) => {
		const newFilters = [ ...localFilters ];
		const existingIndex = newFilters.findIndex( ( f ) => f.field === field );

		if ( existingIndex >= 0 ) {
			if ( value === null || value === '' || ( Array.isArray( value ) && value.length === 0 ) ) {
				// Remove filter if value is empty
				newFilters.splice( existingIndex, 1 );
			} else {
				// Update existing filter
				newFilters[ existingIndex ] = { field, operator, value };
			}
		} else if ( value !== null && value !== '' && ( ! Array.isArray( value ) || value.length > 0 ) ) {
			// Add new filter
			newFilters.push( { field, operator, value } );
		}

		setLocalFilters( newFilters );
	};

	const handleApplyFilters = () => {
		if ( onFiltersChange ) {
			onFiltersChange( localFilters );
		}
		setIsOpen( false );
	};

	const handleClearFilters = () => {
		setLocalFilters( [] );
		if ( onFiltersChange ) {
			onFiltersChange( [] );
		}
		setIsOpen( false );
	};

	const getFilterValue = ( field ) => {
		const filter = localFilters.find( ( f ) => f.field === field );
		return filter ? filter.value : '';
	};

	const getFilterOperator = ( field ) => {
		const filter = localFilters.find( ( f ) => f.field === field );
		return filter ? filter.operator : 'is';
	};

	const hasActiveFilters = localFilters.length > 0;

	return (
		<StyledTableFilters>
			<Button
				variant={ hasActiveFilters ? 'primary' : 'secondary' }
				onClick={ () => setIsOpen( ! isOpen ) }
				aria-expanded={ isOpen }
				aria-label={ __( 'Filters', 'directorist-gutenberg' ) }
				className="directorist-gutenberg-table-filters-button"
			>
				<ReactSVG src={ filterIcon } width={ 20 } height={ 20 } />
				{ hasActiveFilters && (
					<span className="directorist-gutenberg-table-filters-badge">
						{ localFilters.length }
					</span>
				) }
			</Button>
			{ isOpen && (
				<Popover
					onClose={ () => setIsOpen( false ) }
					placement="bottom-start"
				>
					<StyledFiltersPopover>
						<div className="directorist-gutenberg-table-filters-section">
							<h3 className="directorist-gutenberg-table-filters-title">
								{ __( 'Status', 'directorist-gutenberg' ) }
							</h3>
							<select
								className="directorist-gutenberg-table-filters-select"
								value={ getFilterValue( 'status' ) || '' }
								onChange={ ( e ) => {
									handleFilterChange( 'status', 'is', e.target.value || null );
								} }
							>
								<option value="">{ __( 'All Statuses', 'directorist-gutenberg' ) }</option>
								{ statusOptions.map( ( option ) => (
									<option key={ option.value } value={ option.value }>
										{ option.label }
									</option>
								) ) }
							</select>
						</div>

						<div className="directorist-gutenberg-table-filters-section">
							<h3 className="directorist-gutenberg-table-filters-title">
								{ __( 'Type', 'directorist-gutenberg' ) }
							</h3>
							<select
								className="directorist-gutenberg-table-filters-select"
								value={ getFilterValue( 'type' ) || '' }
								onChange={ ( e ) => {
									handleFilterChange( 'type', 'is', e.target.value || null );
								} }
							>
								<option value="">{ __( 'All Types', 'directorist-gutenberg' ) }</option>
								{ typeOptions.map( ( option ) => (
									<option key={ option.value } value={ option.value }>
										{ option.label }
									</option>
								) ) }
							</select>
						</div>

						<div className="directorist-gutenberg-table-filters-actions">
							<Button
								variant="tertiary"
								onClick={ handleClearFilters }
								disabled={ ! hasActiveFilters }
							>
								{ __( 'Clear', 'directorist-gutenberg' ) }
							</Button>
							<Button
								variant="primary"
								onClick={ handleApplyFilters }
							>
								{ __( 'Apply', 'directorist-gutenberg' ) }
							</Button>
						</div>
					</StyledFiltersPopover>
				</Popover>
			) }
		</StyledTableFilters>
	);
}

