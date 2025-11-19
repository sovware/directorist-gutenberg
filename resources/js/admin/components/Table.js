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

	// Fetch templates function (memoized)
	const fetchTemplates = useCallback( async () => {
		if ( ! directoryType ) return;

		setIsLoading( true );
		try {
			const response = await fetchData(
				`admin/templates?directory_type=${ directoryType }`
			);

			if ( response?.items ) {
				const mappedItems = mapItemsToTableFormat( response.items );
				setItems( mappedItems );
				setTotal( response.total || mappedItems.length );
			}
		} catch ( error ) {
			console.error( 'Error fetching templates:', error );
		} finally {
			setIsLoading( false );
		}
	}, [ directoryType ] );

	// Modal handlers
	const openCreateModal = () => setIsCreateModalOpen( true );
	const closeCreateModal = () => setIsCreateModalOpen( false );

	// Get unique values for filters (memoized to prevent unnecessary recalculations)
	const statusValues = useMemo( () => getUniqueValues( 'status' ), [ items ] );
	const typeValues = useMemo( () => getUniqueValues( 'type' ), [ items ] );
	const statusElements = useMemo( () => createFilterElements( statusValues ), [ statusValues ] );
	const typeElements = useMemo( () => createFilterElements( typeValues ), [ typeValues ] );

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

	// Reset view (search, filters, pagination) when directory type changes
	useEffect( () => {
		if ( directoryType && prevDirectoryTypeRef.current !== directoryType ) {
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

	// Filter, sort, and paginate data manually (required for free composition mode)
	// According to DataViews docs: "It's the consumer's responsibility to query the data source
	// appropriately and update the dataset based on the user's choices for sorting, filtering, etc."
	const processedData = useMemo( () => {
		if ( ! Array.isArray( items ) || items.length === 0 ) {
			return [];
		}

		// Check if filterSortAndPaginate is available
		if ( ! filterSortAndPaginate || typeof filterSortAndPaginate !== 'function' ) {
			console.warn( 'filterSortAndPaginate is not available, using raw data' );
			return items;
		}

		try {
			const result = filterSortAndPaginate( items, view, fields );
			// filterSortAndPaginate returns an array
			if ( Array.isArray( result ) ) {
				return result;
			}
			console.warn( 'filterSortAndPaginate did not return an array, using raw data' );
			return items;
		} catch ( error ) {
			console.error( 'Error in filterSortAndPaginate:', error );
			console.error( 'Error details:', { items: items.length, view, fields: fields.length } );
			// Fallback to raw data if filtering fails
			return items;
		}
	}, [ items, view, fields ] );

	// Calculate pagination info based on filtered (but not paginated) data
	const paginationInfo = useMemo( () => {
		if ( ! Array.isArray( items ) || items.length === 0 ) {
			return {
				totalItems: 0,
				totalPages: 0,
				infiniteScrollHandler: undefined,
			};
		}
		try {
			// Get filtered data without pagination to calculate total count
			const filteredView = {
				...view,
				page: 1,
				perPage: Infinity, // Get all filtered results
			};
			const filteredData = filterSortAndPaginate( items, filteredView, fields );
			const filteredCount = Array.isArray( filteredData ) ? filteredData.length : items.length;

			return {
				totalItems: filteredCount,
				totalPages: Math.ceil( filteredCount / ( view.perPage || 10 ) ),
				infiniteScrollHandler: undefined,
			};
		} catch ( error ) {
			console.error( 'Error calculating pagination info:', error );
			return {
				totalItems: items.length,
				totalPages: Math.ceil( items.length / ( view.perPage || 10 ) ),
				infiniteScrollHandler: undefined,
			};
		}
	}, [ items, view, fields ] );

	return (
		<>
			<TemplateActions
				onDirectoryTypeChange={ handleDirectoryTypeChange }
				onCreateTemplate={ openCreateModal }
				onDirectoryTypesReady={ handleDirectoryTypesReady }
			/>
			<StyledTable className="directorist-gutenberg-templates-table">
				{ processedData.length === 0 ? (
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
								<DataViews.Search />
								<DataViews.FiltersToggle />
								<DataViews.FiltersToggled>
									<DataViews.Filters />
								</DataViews.FiltersToggled>
							</div>
						</div>
						<DataViews.Layout />
						<DataViews.BulkActionToolbar />
						<DataViews.Pagination />
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
