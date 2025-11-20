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

const StyledChatPanel = Styled.div`
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 100000;

    .directorist-gutenberg-ai-assistant-chat-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid #3E62F5;
        background: #3E62F5;
        width: 48px;
        height: 48px;
        box-shadow: 0 4px 8px 0 rgba(16, 24, 40, 0.08);
        cursor: pointer;
        animation: zoomInOut 1.5s ease-in-out infinite;
        padding: 0;
        min-width: 48px;

        svg {
            width: 24px;
            height: 24px;
            color: #fff;
        }

        &:hover {
            animation-play-state: paused;
        }
    }

    .directorist-gutenberg-ai-assistant-chat-panel-content {
        width: 420px;
        background: #fff;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        animation: slideUp 0.3s ease-out;
        border-radius: 20px;
        border: 1px solid #E5E5E5;
        background: #FFF;
        box-shadow: 0 8px 16px 0 rgba(16, 24, 40, 0.10), 0 6px 8px 2px rgba(16, 24, 40, 0.04);
    }
    .directorist-gutenberg-ai-assistant-chat-content {
        max-height: 500px;
        overflow-y: auto;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes zoomInOut {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }

    .directorist-gutenberg-ai-assistant-chat-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid #E0E0E0;
    }

    .directorist-gutenberg-ai-assistant-chat-header-left {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .directorist-gutenberg-ai-assistant-chat-close,
    .directorist-gutenberg-ai-assistant-chat-minimize {
        background: none;
        border: none;
        padding: 4px;
        cursor: pointer;
        color: #757575;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: auto;
        width: 24px;
        height: 24px;

        &:hover {
            color: #1E1E1E;
            background: #f0f0f0;
            border-radius: 4px;
        }

        svg {
            width: 16px;
            height: 16px;
        }
    }

    .directorist-gutenberg-ai-assistant-chat-title {
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-weight: 600;
        color: #1E1E1E;
        line-height: 1.2;
    }

    .directorist-gutenberg-ai-assistant-chat-greeting {
        padding: 20px;
    }

    .directorist-gutenberg-ai-assistant-chat-greeting-icon {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #F0F3FF;
        border-radius: 8px;
        color:#3E62F5;
        margin-bottom: 16px;
        svg {
            width: 24px;
            height: 24px;
        }
    }

    .directorist-gutenberg-ai-assistant-chat-greeting-text {
        flex: 1;
    }

    .directorist-gutenberg-ai-assistant-chat-greeting-title {
        margin: 0 0 8px 0;
        padding: 0;
        font-size: 16px;
        font-weight: 600;
        color: #141921;
        line-height: 1.2;
        letter-spacing: -0.32px;
    }

    .directorist-gutenberg-ai-assistant-chat-greeting-description {
        margin: 0;
        padding: 0;
        color: #747C89;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5;
        letter-spacing: 0.07px;
    }

    .directorist-gutenberg-ai-assistant-chat-conversation-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px;
    }

    .directorist-gutenberg-ai-assistant-chat-conversation-area-item {
        display: flex;
        gap: 12px;
        align-items: flex-start;
    }

    .directorist-gutenberg-ai-assistant-chat-icon {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #F0F3FF;
        border-radius: 8px;
        color: #3E62F5;

        svg {
            width: 20px;
            height: 20px;
            color: #3E62F5;
        }
    }

    .directorist-gutenberg-ai-assistant-chat-text {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .directorist-gutenberg-ai-assistant-chat-text-role {
        font-size: 14px;
        font-weight: 500;
        color: #141921;
        line-height: 1.2;
    }

    .directorist-gutenberg-ai-assistant-chat-text-content {
        font-size: 14px;
        font-weight: 400;
        color: #141921;
        line-height: 1.6;
        word-wrap: break-word;
        white-space: pre-wrap;
    }

    .directorist-gutenberg-ai-assistant-chat-suggestions {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 8px;
        padding: 16px 20px;
        max-height: 280px;
        overflow-y: auto;
        align-items: flex-start;
    }

    .directorist-gutenberg-ai-assistant-chat-suggestion-button {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        padding: 6px 12px;
        background: #F0F3FF;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        text-align: left;
        transition: all 0.2s ease;
        height: auto;
        border-radius: 25px;
        width: auto;

        &:hover {
            background: #E0E8FF;
        }

        &:focus {
            box-shadow: 0 0 0 2px rgba(62, 98, 245, 0.2);
        }
    }

    .directorist-gutenberg-ai-assistant-chat-suggestion-icon {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #3E62F5;
        svg{
            fill: none;
            width: 16px;
            height: 16px;
        }
    }

    .directorist-gutenberg-ai-assistant-chat-suggestion-label {
        flex: 1;
        font-size: 14px;
        font-weight: 400;
        color: #1E1E1E;
        line-height: 1.4;
    }

    .directorist-gutenberg-ai-assistant-chat-input-wrapper {
        margin: 16px 20px;
        position: relative;
        border: 1px solid #E5E7EB;
        box-sizing: border-box;
        border-radius: 8px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10), 0 1px 2px -1px rgba(0, 0, 0, 0.10);
    }

    .directorist-gutenberg-ai-assistant-chat-input {
        width: 100%;
        padding-bottom: 50px;
        border-radius: 8px;

        textarea {
            width: 100%;
            padding: 12px 16px;
            font-size: 14px;
            font-family: inherit;
            resize: none;
            min-height: 120px;
            line-height: 1.5;
            border: none;
            outline: none;
            box-shadow: none;
            border-radius: 8px;
            &:focus {
                outline: none;
            }

            &::placeholder {
                color: #9E9E9E;
            }
        }
    }

    .directorist-gutenberg-ai-assistant-chat-input-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
        position: absolute;
        right: 10px;
        bottom: 10px;
    }

    .directorist-gutenberg-ai-assistant-chat-attach,
    .directorist-gutenberg-ai-assistant-chat-send {
        padding: 8px;
        cursor: pointer;
        color: #757575;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: auto;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        transition: all 0.2s ease;
        border: 1px solid #E5E7EB;
        background: #fff;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

        &:hover {
            background: #f0f0f0;
            color: #1E1E1E;
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;

            &:hover {
                background: none;
            }
        }

        svg {
            width: 16px;
            height: 16px;
        }
    }

    .directorist-gutenberg-ai-assistant-chat-send {
        background: #3E62F5;
        color: #fff;
        border-color: #3E62F5;

        &:hover:not(:disabled) {
            background: #2C4FD4;
            color: #fff;
            border-color: #2C4FD4;
        }

        &:disabled {
            background: #E0E0E0;
            color: #9E9E9E;
            border-color: #E0E0E0;
        }
    }

    .directorist-gutenberg-ai-assistant-chat-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px 20px;
        background: #FAFAFA;
    }

    .directorist-gutenberg-ai-assistant-chat-footer-text {
        font-size: 12px;
        font-weight: 400;
        color: #757575;
    }

    .directorist-gutenberg-ai-assistant-chat-footer-credits {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        font-weight: 500;
        color: #757575;

        svg {
            width: 16px;
            height: 16px;
            color: #757575;
        }
    }
`;

export { IconPickerStyle, StyledChatPanel };
