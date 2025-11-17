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
`;

const StyledTemplates = Styled.div`
    display: flex;
    flex-direction: column;
    margin-left: -20px;
`;

const StyledTable = Styled.div`
    display: flex;
    flex-direction: column;
    margin-left: -20px;
`;

const StyledModalContents = Styled.div`

`;

export {
    StyledHeader,
    StyledTable,
    StyledTemplates,
    StyledModalContents,
};