import Styled from 'styled-components';

const IconPickerStyle = Styled.div`
    margin-bottom: 16px;

    .directorist-gutenberg-control-label {
        margin-bottom: 8px;
        font-weight: 600;
        font-size: 13px;
        color: #1e1e1e;
    }

    .directorist-gutenberg-icon-picker-preview {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    .directorist-gutenberg-icon-picker-preview-content {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: #f0f0f1;
        border-radius: 4px;
    }
    .directorist-gutenberg-icon-picker-preview-icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        svg {
            width: 100%;
            height: 100%;
            fill: currentColor;
        }
    }

    .directorist-gutenberg-icon-picker-preview-name {
        flex: 1;
        font-size: 13px;
        color: #1e1e1e;
    }

    .directorist-gutenberg-icon-picker-preview-empty {
        padding: 12px;
        color: #757575;
        font-size: 13px;
        background: #f0f0f1;
        border-radius: 4px;
        display: flex;
        gap: 5px;
        align-items: center;
        span{
            display: block;
        }
        .directorist-gutenberg-icon-picker-change{
            margin-left: auto;
        }
    }
    .directorist-gutenberg-icon-picker-reset{
        cursor: pointer;
        svg{
            width: 12px;
            height: 12px;
            fill: var(--directorist-color-dark);
            transition: fill 0.3s ease;
        }
        &:hover{
            svg{
                fill: var(--directorist-color-danger);
            }
        }
    }
    .directorist-gutenberg-icon-picker-change{
        cursor: pointer;
        padding: 3px 5px;
        font-size: 12px;
        background: #fefefe;
        border: 1px solid var(--wp-admin-theme-color, #3858e9);
        color: var(--wp-admin-theme-color, #3858e9);
    }
`;

export {
    IconPickerStyle,
}