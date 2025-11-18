/**
 * WordPress dependencies
 */
import { DataViews } from '@wordpress/dataviews/wp';
import { useState, useMemo, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Modal } from '@wordpress/components';

/**
 * Internal dependencies
 */
import fetchData from '../../helper/fetchData';
import { StyledTable } from '../style';
import CreateTemplate from './CreateTemplate';

const defaultLayouts = {
    table: {
        layout: {
            styles: {},
            primaryField: 'id',
        },
    },
};

export default function Table() {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };
    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    // Define fields
    const fields = useMemo(() => [
        {
            id: 'title',
            header: __('Title', 'directorist-gutenberg'),
            getValue: ({ item }) => item?.title || '',
            render: ({ item }) => (
                <strong>{item?.title || ''}</strong>
            ),
        },
        {
            id: 'status',
            header: __('Status', 'directorist-gutenberg'),
            getValue: ({ item }) => item?.status || '',
            render: ({ item }) => (
                <span>{item?.status || ''}</span>
            ),
        },
        {
            id: 'type',
            header: __('Type', 'directorist-gutenberg'),
            getValue: ({ item }) => item?.type || '',
            render: ({ item }) => (
                <span>{item?.type || ''}</span>
            ),
        },
        {
            id: 'date',
            header: __('Date', 'directorist-gutenberg'),
            getValue: ({ item }) => item?.date || '',
            render: ({ item }) => (
                <span>{item?.date || ''}</span>
            ),
        },
    ], []);

    // Initial view state
    const initialView = useMemo(() => ({
        search: '',
        page: 1,
        perPage: 10,
        layout: defaultLayouts.table.layout,
        fields: fields.map((field) => field.id),
        sort: {
            field: 'title',
            direction: 'asc',
        },
        type: 'table',
    }), [fields]);

    const [view, setView] = useState(initialView);

    // Fetch templates
    useEffect(() => {
        const getTemplates = async () => {
            setIsLoading(true);
            try {
                const response = await fetchData('admin/templates?directory_type=3');
                if (response?.items) {
                    // Map API response to table format
                    const mappedItems = response.items.map((item) => ({
                        id: item.ID,
                        title: item.post_title,
                        status: item.post_status,
                        type: item.template_type || '',
                        date: new Date(item.post_date).toLocaleDateString(),
                    }));
                    setItems(mappedItems);
                    setTotal(response.total || mappedItems.length);
                }
            } catch (error) {
                console.error('Error fetching templates:', error);
            } finally {
                setIsLoading(false);
            }
        };

        getTemplates();
    }, []);

    console.log(items);

    const handleChangeView = (newView) => {
        setView((prev) => ({
            ...prev,
            ...newView,
        }));
    };

    return (
        <>
        <StyledTable className="directorist-gutenberg-templates-table">
            <DataViews
                data={items}
                fields={fields}
                view={view}
                onChangeView={handleChangeView}
                defaultLayouts={defaultLayouts}
                paginationInfo={{
                    totalItems: total,
                    totalPages: Math.ceil(total / view.perPage),
                }}
                isLoading={isLoading}
                actions={[
                    {
                        RenderModal: () => (
                            <div className="directorist-formgent-table-modal">
                                <h1>{__('Are you sure to delete this item?', 'directorist-gutenberg')}</h1>
                                <p>{__('This action cannot be undone.', 'directorist-gutenberg')}</p>
                                <div className="directorist-formgent-table-modal-action">
                                    <button
                                        onClick={() => {}}
                                        className="directorist-btn directorist-btn-danger"
                                    >
                                        {__('Delete', 'directorist-gutenberg')}
                                    </button>
                                    <button
                                        onClick={() => {}}
                                        className="directorist-btn directorist-btn-light"
                                    >
                                        {__('Cancel', 'directorist-gutenberg')}
                                    </button>
                                </div>
                            </div>
                        ),
                        hideModalHeader: true,
                        id: 'delete',
                        label: __('Delete', 'directorist-gutenberg'),
                        modalFocusOnMount: 'firstContentElement',
                        supportsBulk: false,
                    },
                ]}
            >
                <div className="directorist-gutenberg-templates-table-top">
                    <div className="directorist-gutenberg-templates-table-top-left">
                        <div className="directorist-gutenberg-templates-table-create-new">
                            <h2>{__('All Templates', 'directorist-gutenberg')}</h2>
                            <button
                                className="directorist-btn directorist-btn-primary"
                                onClick={openCreateModal}
                            >
                                {__('Create New Template', 'directorist-gutenberg')}
                            </button>
                        </div>
                    </div>
                    <div className="directorist-gutenberg-templates-table-top-right">
                        <DataViews.Search />
                        <DataViews.FiltersToggle />
                        <DataViews.FiltersToggled />
                    </div>
                </div>
                <DataViews.Layout />
                <DataViews.Pagination />
            </DataViews>
        </StyledTable>

        {isCreateModalOpen && (
            <Modal
                isOpen={isCreateModalOpen}
                onRequestClose={closeCreateModal}
                shouldCloseOnClickOutside={true}
                focusOnMount={true}
                __experimentalHideHeader={true}
                isFullScreen={true}
                overlayClassName="directorist-gutenberg-create-template-modal"
            >
                <CreateTemplate onClose={closeCreateModal} createType="all" />
            </Modal>
        )}
        </>
    );
}