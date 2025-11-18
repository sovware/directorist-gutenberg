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
    .directorist-gutenberg-create-template-modal-content-actions{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        button{
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 4px;
            svg{
                width: 16px;
                height: 16px;
                fill: #fff;
            }
        }
        span{
            color: #757575;
            font-size: 12px;
            font-weight: 400;
            line-height: 1.5;
            display: block;
        }
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
`;

export { StyledHeader, StyledTable, StyledTemplates, StyledModalContents };
