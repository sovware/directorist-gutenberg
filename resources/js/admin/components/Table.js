/**
 * WordPress dependencies
 */
import { DataViews } from '@wordpress/dataviews/wp';
import { useState, useMemo, useEffect, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Modal, SelectControl, Button } from '@wordpress/components';

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
import plusIcon from '@icon/plus-solid.svg';

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
	const [ directoryTypes, setDirectoryTypes ] = useState( [] );
	const [ directoryType, setDirectoryType ] = useState( '' );

	// Helper: Map API response to table format
	const mapItemsToTableFormat = ( apiItems ) => {
		return apiItems.map( ( item ) => ( {
			id: item.ID,
			title: item.post_title,
			status: item.post_status,
			type: item.template_type || '',
			date: new Date( item.post_date ).toLocaleDateString(),
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

	// Helper: Update URL query params
	const updateQueryParams = ( label ) => {
		if ( ! label ) return;

		const queryParams = new URLSearchParams( window.location.search );
		queryParams.set( 'directory_type', label );
		window.history.pushState(
			{},
			'',
			window.location.pathname + '?' + queryParams.toString()
		);
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

			// Update URL query params
			const currentDirectoryLabel = directoryTypes.find(
				( type ) => type?.value === directoryType
			)?.label || '';
			updateQueryParams( currentDirectoryLabel );
		} catch ( error ) {
			console.error( 'Error fetching templates:', error );
		} finally {
			setIsLoading( false );
		}
	}, [ directoryType, directoryTypes ] );

	// Modal handlers
	const openCreateModal = () => setIsCreateModalOpen( true );
	const closeCreateModal = () => setIsCreateModalOpen( false );

	// Define fields
	const fields = useMemo( () => {
		const statusValues = getUniqueValues( 'status' );
		const typeValues = getUniqueValues( 'type' );
		const statusElements = createFilterElements( statusValues );
		const typeElements = createFilterElements( typeValues );

		return [
			{
				id: 'title',
				type: 'text',
				label: __( 'Template Name', 'directorist-gutenberg' ),
				getValue: ( { item } ) => item?.title || '',
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
				filterBy: false,
			},
			{
				id: 'status',
				type: 'text',
				label: __( 'Status', 'directorist-gutenberg' ),
				getValue: ( { item } ) => item?.status || '',
				render: ( { item } ) => <span>{ item?.status || '' }</span>,
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
				getValue: ( { item } ) => item?.type || '',
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
				getValue: ( { item } ) => item?.date || '',
				render: ( { item } ) => (
					<span>{ formatDate( item?.date ) || '' }</span>
				),
				filterBy: false,
			},
		];
	}, [ items ] );

	// Initial view state
	const initialView = useMemo(
		() => ( {
			search: '',
			page: 1,
			perPage: 10,
			layout: defaultLayouts.table.layout,
			fields: fields.map( ( field ) => field.id ),
			sort: {
				field: 'title',
				direction: 'asc',
			},
			type: 'table',
			filters: [],
		} ),
		[ fields ]
	);

	const [ view, setView ] = useState( initialView );

	// Fetch directory types on mount
	useEffect( () => {
		const getDirectoryTypes = async () => {
			try {
				const response = await fetchData( 'admin/templates/directories' );
				setDirectoryTypes( response.directories );

				// Set the first directory type as selected after fetching
				if ( response.directories?.length > 0 ) {
					setDirectoryType( response.directories[ 0 ].value );
				}
			} catch ( error ) {
				console.error( 'Error fetching directory types:', error );
			}
		};

		getDirectoryTypes();
	}, [] );

	// Fetch templates when directory type changes
	useEffect( () => {
		fetchTemplates();
	}, [ fetchTemplates ] );

	// Handlers
	const handleChangeView = ( newView ) => {
		setView( ( prev ) => ( {
			...prev,
			...newView,
		} ) );
	};

	const handleDirectoryTypeChange = ( value ) => {
		setDirectoryType( value );
	};

	return (
		<>
			<StyledTable className="directorist-gutenberg-templates-table">
				<DataViews
					data={ items }
					fields={ fields }
					view={ view }
					onChangeView={ handleChangeView }
					defaultLayouts={ defaultLayouts }
					paginationInfo={ {
						totalItems: total,
						totalPages: Math.ceil( total / view.perPage ),
					} }
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
							<div className="directorist-gutenberg-templates-table-create-action">
								<h2>
									{ __(
										'All Templates',
										'directorist-gutenberg'
									) }
								</h2>
								<Button
                                    variant="primary"
									onClick={ openCreateModal }
								>
                                    <ReactSVG src={ plusIcon } />
									{ __(
										'Create New Template',
										'directorist-gutenberg'
									) }
								</Button>
							</div>
						</div>
						<div className="directorist-gutenberg-templates-table-top-right">
							<div className="directorist-gutenberg-templates-toggle-directory-type">
								<SelectControl
									options={ directoryTypes }
									value={ directoryType }
									onChange={ handleDirectoryTypeChange }
								/>
							</div>
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
						directoryTypes={ directoryTypes }
					/>
				</Modal>
			) }
		</>
	);
}
