import Styled from 'styled-components';

const StyledHeader = Styled.div`
    display: flex;
    align-items: center;
    padding: 14px 25px;
    background: #ffffff;
    gap: 8px;

    .directorist-gutenberg-templates-header-logo{
        border-right: 1px solid #ddd;
        padding-right: 8px;
    }
    h1{
        margin: 0;
        padding: 0;
        color: var(--directorist-color-body);
        font-size: 16px;
        font-weight: 500;
    }
    .directorist-gutenberg-templates-header-actions{
        margin-left: auto;
    }
    .directorist-gutenberg-templates-header-actions-close{
        cursor: pointer;
        svg{
            width: 18px;
            height: 18px;
        }
    }
`;

const StyledTemplates = Styled.div`
    display: flex;
    flex-direction: column;
    margin-left: -20px;
    position: relative;
    overflow: visible;
    z-index: 1;
`;

const StyledTable = Styled.div`
    display: flex;
    flex-direction: column;
    /* margin-left: -20px; */
    position: relative;
    overflow: visible;
    z-index: 1;
    background: #fff;
    margin: 24px;
    padding: 24px 32px;
    border-radius: 4px;
    .directorist-gutenberg-templates-table-top{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }
    .directorist-gutenberg-templates-table-create-action{
        display: flex;
        align-items: center;
        gap: 24px;
        h2{
            color: #2C3239;
            font-size: 22px;
            font-weight: 600;
            line-height: 28px;
        }
    }
    .dataviews-view-table{
        .dataviews-view-table__col-checkbox{
            width: 0.05% !important;
        }
        .dataviews-view-table__row{
            .dataviews-view-table__checkbox-column{
                padding-left: 15px;
            }
        }
        .dataviews-item-actions{
            .components-button{
                opacity: 1 !important;
                color: #747C89;
                transition: 0.3s ease;
                &:hover{
                    color: #DA3949;
                }
            }
        }
        .dataviews-view-table__cell-content-wrapper{
            a{
                color: #2C3239;
                font-size: 15px;
                font-weight: 500;
                line-height: 1.06;
                text-decoration: none;
                padding: 8px 0;
                transition: 0.3s ease;
                &:hover{
                    color: var(--wp-admin-theme-color, #3858e9);
                }
            }
        }
    }
    .dataviews-bulk-actions-footer__container{
        padding: 15px 15px 0 15px ;
    }
    .components-checkbox-control__input[type=checkbox]{
        border: 1px solid #c6c6c6;
        border-radius: 2px;
        &:checked{
            background: var(--wp-admin-theme-color, #3858e9);
            border-color: var(--wp-admin-theme-color, #3858e9);
        }
    }
    .directorist-gutenberg-templates-table-top-right{
        display: flex;
        align-items: center;
        gap: 8px;
        .dataviews-search{
            .components-input-control__backdrop{
                border-color: #E0E0E0;
                border-radius: 4px;
            }
        }
        .components-input-control__container{
            border-radius: 4px;
        }
        .components-base-control__field{
            margin-bottom: 0;
        }
    }
`;

const StyledTablePagination = Styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    border-top: 1px solid #ddd;
    gap: 8px;
    margin-top: 16px;
`;

const StyledPaginationButton = Styled.button`
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    padding: 6px 12px;
    min-width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        background-color: #f5f5f5;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    ${ props => props.$isActive && `
        background-color: #333;
        color: #fff;
        border-color: #333;

        &:hover {
            background-color: #333;
        }
    `}
    svg{
        width: 16px;
        height: 16px;
    }
`;

const StyledPaginationEllipsis = Styled.span`
    padding: 0 8px;
    color: #666;
    display: flex;
    align-items: center;
`;

const StyledTableFilters = Styled.div`
    .directorist-gutenberg-table-filters-button {
        position: relative;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        background: #f0f0f0;
        box-shadow: none;
        border: none;
        color: #4D5761;
    }

    .directorist-gutenberg-table-filters-badge {
        position: absolute;
        top: -4px;
        right: -4px;
        background-color: #fff;
        color: #0073aa;
        border-radius: 50%;
        width: 18px;
        height: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
        border: 1px solid currentColor;
    }
`;

const StyledFiltersPopover = Styled.div`
    padding: 16px;
    min-width: 300px;

    .directorist-gutenberg-table-filters-section {
        margin-bottom: 16px;

        &:last-of-type {
            margin-bottom: 0;
        }
    }

    .directorist-gutenberg-table-filters-title {
        margin: 0 0 12px 0;
        font-size: 14px;
        font-weight: 600;
        color: #1E1E1E;
    }

    .directorist-gutenberg-table-filters-select {
        width: 100%;
        padding: 6px;
        border: 1px solid #E0E0E0;
        border-radius: 4px;
        font-size: 14px;
        color: #1E1E1E;
        background-color: #fff;
        cursor: pointer;

        &:focus {
            outline: none;
            border-color: var(--wp-admin-theme-color, #3858e9);
        }
    }

    .directorist-gutenberg-table-filters-actions {
        display: flex;
        gap: 8px;
        justify-content: flex-end;
        margin-top: 16px;
    }
`;

const StyledModalContents = Styled.div`
    height: 100%;
    .directorist-gutenberg-create-template-modal-content{
        height: calc(100% - 62px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 682px;
        margin: 0 auto;
    }
    .directorist-gutenberg-choose-directory-type{
        width: 100%;
        display: flex;
        padding: 24px 24px 32px 24px;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        border-radius: 8px;
        border: 1px solid #E0E0E0;
        background: #FFF;
        margin-bottom: 24px;
        h2{
            color: #1E1E1E;
            font-size: 24px;
            font-weight: 510;
            line-height: 1.2;
            letter-spacing: -0.48px;
            margin: 0;
            padding: 0;
        }
        p{
            color: #757575;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }
    }
    .directorist-gutenberg-choose-directory-type-options{
        width: 100%;
        h3{
            margin: 0 0 10px;
            color: #1E1E1E;
            font-size: 14px;
            font-weight: 590;
            line-height: 1.14;
        }
        .components-base-control .components-input-control__backdrop{
            border-radius: 4px;
            border: 1px solid #E0E0E0;
            padding: 8px 12px;
        }
        .components-base-control__field{
            margin-bottom: 0;
        }
    }
    .directorist-gutenberg-choose-template-type{
        width: 100%;
        padding: 0;
        margin-bottom: 0;
        padding: 24px;
        background: #fff;
        border-radius: 12px;
        max-width: 500px;
        h2{
            color: #1E1E1E;
            font-size: 20px;
            font-weight: 600;
            line-height: 1.2;
            margin: 0 0 6px;
            padding: 0;
        }
        p{
            color: #757575;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }
    }
    .directorist-gutenberg-template-type-options{
        width: 100%;
        margin-top: 12px;
        .components-base-control{
            margin-bottom: 0;
        }
        .components-radio-control__option{
            padding: 16px;
            border: 1px solid #E0E0E0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: flex-start;
            gap: 12px;
            position: relative;
            &:hover{
                border-color: #3858E9;
                background-color: #F8F9FF;
            }
            &:last-child{
                margin-bottom: 0;
            }
            input[type="radio"]{
                margin-top: 2px;
                width: 18px;
                height: 18px;
                min-width: 18px;
                cursor: pointer;
                flex-shrink: 0;
                accent-color: #3858E9;
            }
            label{
                cursor: pointer;
                flex: 1;
                margin: 0;
                width: 100%;
            }
        }
        .components-radio-control__option:has(input[type="radio"]:checked){
            border-color: #3858E9;
            background-color: #F8F9FF;
        }
    }
    .directorist-gutenberg-template-type-option{
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .directorist-gutenberg-template-type-option-label{
        color: #1E1E1E;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.4;
        &:after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    }
    .directorist-gutenberg-template-type-option-description{
        color: #757575;
        font-size: 12px;
        font-weight: 400;
        line-height: 1.5;
    }
    .directorist-gutenberg-create-template-modal-content-loading{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
        h2{
            color: #1E1E1E;
            text-align: center;
            font-size: 32px;
            font-weight: 500;
            line-height: 1.2;
            letter-spacing: -0.64px;
            margin: 0;
            padding: 0;
        }
        span{
            display: block;
            width: 170px;
            height: 2px;
            position: relative;
            background: #ddd;
            margin-top: 5px;
            &:before{
                position: absolute;
                content: '';
                width: var(--directorist-gutenberg-loading-progress);
                height: 100%;
                background: #3858E9;
                transition: 0.3s ease;
                left: 0;
                top: 0;
            }
        }
    }
    .directorist-gutenberg-create-template-modal-content-actions{
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 30px;
        .components-button{
            flex: 1;
            padding: 10px 16px;
            justify-content: center;
            border-radius: 8px;
        }
    }
`;

const StyledDeleteModal = Styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;

    .directorist-gutenberg-delete-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
    }
    .directorist-gutenberg-delete-modal-header-left {
        display: flex;
        align-items: center;
        gap: 12px;

        .directorist-gutenberg-delete-modal-icon {
            width: 24px;
            height: 24px;
            color: #DA3949;
            flex-shrink: 0;

            svg {
                width: 100%;
                height: 100%;
                fill: #DA3949;
            }
        }

        h1 {
            margin: 0;
            padding: 0;
            color: #1E1E1E;
            font-size: 20px;
            font-weight: 600;
            line-height: 1.2;
        }
    }

    .directorist-gutenberg-delete-modal-close {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 4px;
        transition: background-color 0.2s ease;

        &:hover {
            background-color: #f0f0f0;
        }

        svg {
            width: 18px;
            height: 18px;
            color: #757575;
        }
    }

    .directorist-gutenberg-delete-modal-content {
        display: flex;
        flex-direction: column;
        gap: 12px;

        p {
            margin: 0;
            padding: 0;
            color: #757575;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.5;

            strong {
                color: #1E1E1E;
                font-weight: 600;
            }
        }
    }

    .directorist-gutenberg-delete-modal-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
        margin-top: auto;
        padding-top: 16px;
        border-top: 1px solid #E0E0E0;

        .components-button {
            padding: 8px 20px;
            border-radius: 4px;
        }
    }
`;

const StyledTemplateActions = Styled.div`
    margin: 24px 24px 0;
    padding: 24px 32px;
    border-radius: 4px;
    background: #fff;
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
    .directorist-gutenberg-directory-type-button{
        padding: 8px 12px;
        border-radius: 40px;
        border: 1px solid #E5E7EB;
        background: #FFF;
        box-shadow: 0 2px 8px 0 rgba(16, 24, 40, 0.08);
        display: flex;
        align-items: center;
        gap: 12px;
        width: 300px;
        cursor: pointer;
        box-sizing: border-box;
    }
    .directorist-gutenberg-directory-type-icon{
        display: flex;
        width: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background: #3E62F5;
        flex: none;
        svg{
            width: 17px;
            height: 17px;
            fill: #fff;
        }
    }
    .directorist-gutenberg-directory-type-name{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        overflow: hidden;
        span{
            color: #747C89;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.5;
            display: block;
            margin-bottom: 2px;
        }
        strong{
            color: #2C3239;
            font-size: 16px;
            font-weight: 600;
            line-height: 1.2;
            letter-spacing: -0.32px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .directorist-gutenberg-templates-types-toggle-icon{
        margin-left: auto;
        margin-right: 10px;
    }
    .directorist-gutenberg-create-template-action{
        button{
            border-radius: 25px;
            gap: 4px;
            svg{
                width: 16px;
                height: 16px;
            }
        }
    }
`;

export {
    StyledHeader,
    StyledTable,
    StyledTemplates,
    StyledModalContents,
    StyledDeleteModal,
    StyledTemplateActions,
    StyledTablePagination,
    StyledPaginationButton,
    StyledPaginationEllipsis,
    StyledTableFilters,
    StyledFiltersPopover,
};
