/**
 * WordPress dependencies
 */
import { DataViews, filterSortAndPaginate } from '@wordpress/dataviews/wp';
import { useState, useMemo, useEffect, useCallback, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Modal } from '@wordpress/components';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

/**
 * Internal dependencies
 */
import DeleteItemModal from './DeleteItemModal';
import { formatDate } from '@directorist-gutenberg/utils/utils';
import fetchData from '../../helper/fetchData';
import { StyledTable } from '../style';
import CreateTemplate from './CreateTemplate';
import trashIcon from '@icon/trash.svg';
import TemplateActions from './TemplateActions';
import TableSearch from './TableSearch';
import TableFilters from './TableFilters';
import TablePagination from './TablePagination';

const defaultLayouts = {
	table: {
		layout: {
			styles: {},
			primaryField: 'id',
		},
	},
};

export default function Table() {
	const [ items, setItems ] = useState( [] );
	const [ total, setTotal ] = useState( 0 );
	const [ isLoading, setIsLoading ] = useState( true );
	const [ isCreateModalOpen, setIsCreateModalOpen ] = useState( false );
	const [ directoryType, setDirectoryType ] = useState( '' );
	const [ directoryTypes, setDirectoryTypes ] = useState( [] );

	// Custom search, filter, and pagination state
	const [ searchQuery, setSearchQuery ] = useState( '' );
	const [ filters, setFilters ] = useState( [] );
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ hasInitialData, setHasInitialData ] = useState( false );
	const perPage = 10;

	// Helper: Map API response to table format
	const mapItemsToTableFormat = ( apiItems ) => {
		return apiItems.map( ( item ) => ( {
			id: item.ID,
			title: item.post_title,
			status: item.post_status,
			type: item.template_type || '',
			date: item.post_date, // Keep raw date for sorting
			dateFormatted: formatDate( item.post_date ), // Formatted date for display
		} ) );
	};

	// Helper: Create filter elements from values
	const createFilterElements = ( values ) => {
		return values.map( ( value ) => ( {
			value,
			label: value,
		} ) );
	};

	// Helper: Get unique values for filter options
	const getUniqueValues = ( fieldId ) => {
		const values = items.map( ( item ) => item[ fieldId ] ).filter( Boolean );
		return [ ...new Set( values ) ].sort();
	};

	// Build API URL with query parameters
	const buildApiUrl = useCallback( ( directoryType, search, filters, page, perPage ) => {
		if ( ! directoryType ) return null;

		const params = new URLSearchParams();
		params.append( 'directory_type', directoryType );

		// Add search parameter (title)
		if ( search && search.trim() ) {
			params.append( 'title', search.trim() );
		}

		// Add filter parameters - API expects arrays for status and type
		filters.forEach( ( filter ) => {
			if ( filter.value ) {
				// Convert single value to array format for API
				const values = Array.isArray( filter.value ) ? filter.value : [ filter.value ];
				// WordPress REST API expects array parameters as field[]=value
				values.forEach( ( value ) => {
					params.append( `${ filter.field }[]`, value );
				} );
			}
		} );

		// Add pagination parameters
		params.append( 'page', page );
		params.append( 'per_page', perPage );

		return `admin/templates?${ params.toString() }`;
	}, [] );

	// Fetch templates function (memoized)
	const fetchTemplates = useCallback( async () => {
		if ( ! directoryType ) return;

		setIsLoading( true );
		try {
			const apiUrl = buildApiUrl( directoryType, searchQuery, filters, currentPage, perPage );
			if ( ! apiUrl ) return;

			const response = await fetchData( apiUrl );

			if ( response?.items ) {
				const mappedItems = mapItemsToTableFormat( response.items );
				setItems( mappedItems );
				setTotal( response.total || mappedItems.length );
				// Track if we have initial data (when no search/filters)
				if ( ! searchQuery && filters.length === 0 ) {
					setHasInitialData( mappedItems.length > 0 );
				}
			} else {
				setItems( [] );
				setTotal( 0 );
				// Only mark as no initial data if there's no search/filters
				if ( ! searchQuery && filters.length === 0 ) {
					setHasInitialData( false );
				}
			}
		} catch ( error ) {
			console.error( 'Error fetching templates:', error );
			setItems( [] );
			setTotal( 0 );
			if ( ! searchQuery && filters.length === 0 ) {
				setHasInitialData( false );
			}
		} finally {
			setIsLoading( false );
		}
	}, [ directoryType, searchQuery, filters, currentPage, perPage, buildApiUrl ] );

	// Modal handlers
	const openCreateModal = () => setIsCreateModalOpen( true );
	const closeCreateModal = () => setIsCreateModalOpen( false );

	// Get unique values for filters (memoized to prevent unnecessary recalculations)
	// Note: These should ideally come from API, but using items for now
	const statusValues = useMemo( () => getUniqueValues( 'status' ), [ items ] );
	const typeValues = useMemo( () => getUniqueValues( 'type' ), [ items ] );
	const statusElements = useMemo( () => createFilterElements( statusValues ), [ statusValues ] );
	const typeElements = useMemo( () => createFilterElements( typeValues ), [ typeValues ] );

	// Handlers for custom components
	const handleSearchChange = useCallback( ( value ) => {
		setSearchQuery( value );
		setCurrentPage( 1 ); // Reset to first page on search
	}, [] );

	const handleSearch = useCallback( ( value ) => {
		setSearchQuery( value );
		setCurrentPage( 1 );
	}, [] );

	const handleFiltersChange = useCallback( ( newFilters ) => {
		setFilters( newFilters );
		setCurrentPage( 1 ); // Reset to first page on filter change
	}, [] );

	const handlePageChange = useCallback( ( page ) => {
		setCurrentPage( page );
	}, [] );

	// Define fields (stable reference, only updates when filter values change)
	const fields = useMemo( () => {
		return [
			{
				id: 'title',
				type: 'text',
				label: __( 'Template Name', 'directorist-gutenberg' ),
				getValue: ( { item } ) => String( item?.title || '' ),
				render: ( { item } ) => {
					const editUrl = `/wp-admin/post.php?post=${ item?.id }&action=edit`;
					return (
                        <a
                            href={ editUrl }
                            onClick={ ( e ) => {
                                e.stopPropagation();
                            } }
                        >
                            { item?.title || '' }
                        </a>
					);
				},
				enableSorting: true,
				filterBy: false,
			},
			{
				id: 'status',
				type: 'text',
				label: __( 'Status', 'directorist-gutenberg' ),
				getValue: ( { item } ) => String( item?.status || '' ),
				render: ( { item } ) => <span>{ item?.status.charAt(0).toUpperCase() + item?.status.slice(1) || '' }</span>,
				enableSorting: true,
				elements: statusElements,
				filterBy: {
					operators: [ 'is', 'isNot', 'isAny', 'isNone' ],
					elements: statusElements,
				},
			},
			{
				id: 'type',
				type: 'text',
				label: __( 'Type', 'directorist-gutenberg' ),
				getValue: ( { item } ) => String( item?.type || '' ),
				render: ( { item } ) => <span>{ item?.type || '' }</span>,
				elements: typeElements,
				filterBy: {
					operators: [ 'is', 'isNot', 'isAny', 'isNone' ],
					elements: typeElements,
				},
			},
			{
				id: 'date',
				type: 'date',
				label: __( 'Created At', 'directorist-gutenberg' ),
				getValue: ( { item } ) => {
					// Return timestamp for proper sorting
					return item?.date ? new Date( item.date ).getTime() : 0;
				},
				render: ( { item } ) => (
					<span>{ item?.dateFormatted || formatDate( item?.date ) || '' }</span>
				),
				enableSorting: true,
				filterBy: false,
			},
		];
	}, [ statusElements, typeElements ] );

	// Initial view state (only calculated once)
	const initialView = useMemo(
		() => ( {
			search: '',
			page: 1,
			perPage: 10,
			layout: defaultLayouts.table.layout,
			fields: [ 'title', 'status', 'type', 'date' ],
			sort: {
				field: 'title',
				direction: 'asc',
			},
			type: 'table',
			filters: [],
		} ),
		[]
	);

	const [ view, setView ] = useState( initialView );
	const prevDirectoryTypeRef = useRef( directoryType );

	// Fetch templates when directory type changes
	useEffect( () => {
		fetchTemplates();
	}, [ fetchTemplates ] );

	// Reset search, filters, and pagination when directory type changes
	useEffect( () => {
		if ( directoryType && prevDirectoryTypeRef.current !== directoryType ) {
			setSearchQuery( '' );
			setFilters( [] );
			setCurrentPage( 1 );
			setHasInitialData( false ); // Reset initial data flag
			setView( ( prev ) => ( {
				...initialView,
				layout: prev.layout, // Preserve layout preferences
			} ) );
			prevDirectoryTypeRef.current = directoryType;
		}
	}, [ directoryType, initialView ] );

	// Handler for directory type change from TemplateActions
	const handleDirectoryTypeChange = ( value ) => {
		setDirectoryType( value );
	};

	// Handler for directory types ready from TemplateActions
	const handleDirectoryTypesReady = ( types ) => {
		setDirectoryTypes( types );
	};

	// Handler for view changes
	const handleChangeView = useCallback( ( newView ) => {
		setView( ( prev ) => ( {
			...prev,
			...newView,
		} ) );
	}, [] );

	// Process data for sorting only (search, filter, pagination handled by API)
	const processedData = useMemo( () => {
		if ( ! Array.isArray( items ) || items.length === 0 ) {
			return [];
		}

		// Only handle sorting client-side, search/filter/pagination is done by API
		const sortView = {
			...view,
			search: '', // No client-side search
			filters: [], // No client-side filters
			page: 1,
			perPage: Infinity, // Show all items (already paginated by API)
		};

		// Check if filterSortAndPaginate is available
		if ( ! filterSortAndPaginate || typeof filterSortAndPaginate !== 'function' ) {
			return items;
		}

		try {
			const result = filterSortAndPaginate( items, sortView, fields );
			if ( Array.isArray( result ) ) {
				return result;
			}
			return items;
		} catch ( error ) {
			console.error( 'Error in filterSortAndPaginate:', error );
			return items;
		}
	}, [ items, view, fields ] );

	// Calculate pagination info from API response
	const totalPages = Math.ceil( total / perPage );

	// Provide paginationInfo for DataViews (required prop, but we use custom pagination)
	const paginationInfo = useMemo( () => ( {
		totalItems: total,
		totalPages: totalPages,
		infiniteScrollHandler: undefined,
	} ), [ total, totalPages ] );

	return (
		<>
			<TemplateActions
				onDirectoryTypeChange={ handleDirectoryTypeChange }
				onCreateTemplate={ openCreateModal }
				onDirectoryTypesReady={ handleDirectoryTypesReady }
			/>
			<StyledTable className="directorist-gutenberg-templates-table">
				{ ! hasInitialData && ! isLoading && processedData.length === 0 && ! searchQuery && filters.length === 0 ? (
					<div className="directorist-gutenberg-templates-table-no-data">
						<p>{ __( 'No data found', 'directorist-gutenberg' ) }</p>
					</div>
				) : (
					<DataViews
						data={ processedData }
						fields={ fields }
						view={ view }
						onChangeView={ handleChangeView }
						defaultLayouts={ defaultLayouts }
						paginationInfo={ paginationInfo }
						isLoading={ isLoading }
						actions={ [
							{
								RenderModal: ( { items: selectedItems, closeModal } ) => (
									<DeleteItemModal
										items={ selectedItems }
										onClose={ closeModal }
										onDeleteSuccess={ fetchTemplates }
									/>
								),
								hideModalHeader: true,
								id: 'delete',
								label: () => <ReactSVG width={ 16 } height={ 16 } src={ trashIcon } />,
								supportsBulk: true,
								isPrimary: true,
							},
						] }
					>
						<div className="directorist-gutenberg-templates-table-top">
							<div className="directorist-gutenberg-templates-table-top-left">
								<h2>
									{ __(
										'All Templates',
										'directorist-gutenberg'
									) }
								</h2>
							</div>
							<div className="directorist-gutenberg-templates-table-top-right">
								<TableSearch
									value={ searchQuery }
									onChange={ handleSearchChange }
									onSearch={ handleSearch }
								/>
								<TableFilters
									filters={ filters }
									onFiltersChange={ handleFiltersChange }
									statusOptions={ statusElements }
									typeOptions={ typeElements }
								/>
							</div>
						</div>
						<DataViews.Layout />
						<DataViews.BulkActionToolbar />
						<TablePagination
							currentPage={ currentPage }
							totalPages={ totalPages }
							onPageChange={ handlePageChange }
						/>
					</DataViews>
				) }
			</StyledTable>

			{ isCreateModalOpen && (
				<Modal
					isOpen={ isCreateModalOpen }
					onRequestClose={ closeCreateModal }
					shouldCloseOnClickOutside={ true }
					focusOnMount={ true }
					__experimentalHideHeader={ true }
					isFullScreen={ true }
					overlayClassName="directorist-gutenberg-create-template-modal"
				>
					<CreateTemplate
						onClose={ closeCreateModal }
						createType="all"
						directoryType={ directoryType }
					/>
				</Modal>
			) }
		</>
	);
}
