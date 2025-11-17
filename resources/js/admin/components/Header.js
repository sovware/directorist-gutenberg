/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * External dependencies
 */
import ReactSVG from 'react-inlinesvg';

/**
 * Internal dependencies
 */
import { StyledHeader } from '../style';
import Logo from '@icon/logo.svg';

export default function Header() {
    return (
        <StyledHeader className="directorist-gutenberg-templates-header">
            <div className="directorist-gutenberg-templates-header-logo">
                <ReactSVG src={ Logo } />
            </div>
            <div className="directorist-gutenberg-templates-header-title">
                <h1>{ __( 'AI Template Builder', 'directorist-gutenberg' ) }</h1>
            </div>
        </StyledHeader>
    );
}